if (window.innerWidth < 768) {
	document.querySelectorAll('.steps__item--desktop').forEach((item) => {
		item.remove();
	});
}

// ! Анимации
document.addEventListener('DOMContentLoaded', function () {
	const circle = document.querySelector('.header__circle');
	const city = document.querySelector('.header__city-img');
	const chess = document.querySelectorAll('.header__chess');

	setTimeout(() => {
		city.classList.add('header__city-img--loaded');
	}, 500);

	setTimeout(() => {
		circle.classList.add('header__circle--loaded');
	}, 1500);

	setTimeout(() => {
		circle.classList.add('header__circle--spinning');
	}, 4500);

	setTimeout(() => {
		chess.forEach((item, index) => {
			setTimeout(() => {
				item.classList.add('header__chess--loaded');
			}, (index + 1) * 500);
		});
	}, 1500);
});

// ! Карусель участников
document.addEventListener('DOMContentLoaded', function () {
	const slider = document.querySelector('.part__carousel');
	const slides = Array.from(document.querySelectorAll('.part__carousel-item'));
	const nextButton = document.querySelector('.part__carousel-button-right');
	const prevButton = document.querySelector('.part__carousel-button-left');
	const slideWidth = slides[0].getBoundingClientRect().width;
	const isDesktop = window.innerWidth >= 1280;
	let autoplay = true;

	slides.forEach((item, index) => item.setAttribute('data-slide', index + 1));

	const currentIndex = document.querySelector(
		'.part__carousel-buttons-current'
	);
	currentIndex.innerHTML = isDesktop ? 3 : 1;

	const totalIndex = document.querySelector('.part__carousel-buttons-total');
	totalIndex.innerHTML = ` / ${slides.length}`;

	const setSlidePosition = (slide, index) => {
		isDesktop
			? (slide.style.left = (slideWidth + 20) * index + 'px')
			: (slide.style.left = slideWidth * index + 'px');
	};
	slides.forEach(setSlidePosition);

	const moveToSlide = (slider, currentSlide, targetSlide) => {
		slider.style.transform = 'translateX(-' + targetSlide.style.left + ')';
		currentSlide.classList.remove('current-slide');
		targetSlide.classList.add('current-slide');
	};

	setInterval(() => {
		if (!autoplay) {
			return;
		} else {
			if (isDesktop) {
				currentIndex.innerHTML < slides.length
					? currentIndex.innerHTML++
					: (currentIndex.innerHTML = 3);
			} else {
				currentIndex.innerHTML < slides.length
					? currentIndex.innerHTML++
					: (currentIndex.innerHTML = 1);
			}

			const currentSlide = slider.querySelector('.current-slide');
			const nextSlide = isDesktop
				? currentSlide.nextElementSibling.dataset.slide === '5'
					? slides[0]
					: currentSlide.nextElementSibling || slides[0]
				: currentSlide.nextElementSibling || slides[0];

			moveToSlide(slider, currentSlide, nextSlide);
		}
	}, 4000);

	prevButton.addEventListener('click', () => {
		autoplay = false;

		if (isDesktop) {
			currentIndex.innerHTML > 3
				? currentIndex.innerHTML--
				: (currentIndex.innerHTML = slides.length);
		} else {
			currentIndex.innerHTML > 1
				? currentIndex.innerHTML--
				: (currentIndex.innerHTML = slides.length);
		}

		const currentSlide = slider.querySelector('.current-slide');

		const prevSlide = isDesktop
			? currentSlide.previousElementSibling || slides[3]
			: currentSlide.previousElementSibling || slides[slides.length - 1];
		moveToSlide(slider, currentSlide, prevSlide);

		setTimeout(() => {
			autoplay = true;
		}, 6000);
	});

	nextButton.addEventListener('click', () => {
		autoplay = false;

		if (isDesktop) {
			currentIndex.innerHTML < slides.length
				? currentIndex.innerHTML++
				: (currentIndex.innerHTML = 3);
		} else {
			currentIndex.innerHTML < slides.length
				? currentIndex.innerHTML++
				: (currentIndex.innerHTML = 1);
		}

		const currentSlide = slider.querySelector('.current-slide');
		const nextSlide = isDesktop
			? currentSlide.nextElementSibling.dataset.slide === '5'
				? slides[0]
				: currentSlide.nextElementSibling || slides[0]
			: currentSlide.nextElementSibling || slides[0];

		moveToSlide(slider, currentSlide, nextSlide);

		setTimeout(() => {
			autoplay = true;
		}, 6000);
	});
});

// ! Мобильные табы
document.addEventListener('DOMContentLoaded', function () {
	if (window.innerWidth >= 1024) {
		return;
	} else {
		const tabsBody = document.querySelector('.steps__wrapper');
		const tabsPagination = document.querySelector('.steps__pagination-bullets');
		const tabsBullets = document.querySelectorAll('.steps__pagination-bullet');
		const prevButton = document.querySelector('.steps__pagination-left');
		const nextButton = document.querySelector('.steps__pagination-right');

		function checkDisabledArrows() {
			if (
				Array.from(tabsBullets)[0].classList.contains(
					'steps__pagination-bullet--active'
				)
			) {
				prevButton.classList.add('steps__pagination-left--disabled');
			} else if (
				Array.from(tabsBullets)[tabsBullets.length - 1].classList.contains(
					'steps__pagination-bullet--active'
				)
			) {
				nextButton.classList.add('steps__pagination-right--disabled');
			} else {
				[prevButton, nextButton].forEach((item) => {
					item.classList.remove('steps__pagination-left--disabled');
					item.classList.remove('steps__pagination-right--disabled');
				});
			}
		}

		function changeTab(current, next, currentBullet, nextBullet) {
			if (next && next.tagName === 'DIV' && nextBullet) {
				current.classList.remove('steps__item--active');
				next.classList.add('steps__item--active');

				currentBullet.classList.remove('steps__pagination-bullet--active');
				nextBullet.classList.add('steps__pagination-bullet--active');
			} else {
				return;
			}
		}

		Array.from(
			document.querySelectorAll('.steps__item--mobile-carousel')
		)[0].classList.add('steps__item--active');

		Array.from(
			document.querySelectorAll('.steps__pagination-bullet')
		)[0].classList.add('steps__pagination-bullet--active');

		checkDisabledArrows();

		prevButton.addEventListener('click', () => {
			const currentTab = tabsBody.querySelector('.steps__item--active');
			const currentBullet = tabsPagination.querySelector(
				'.steps__pagination-bullet--active'
			);
			const prevTab = currentTab.previousElementSibling;
			const prevBullet = currentBullet.previousElementSibling;

			changeTab(currentTab, prevTab, currentBullet, prevBullet);
			checkDisabledArrows();
		});

		nextButton.addEventListener('click', () => {
			const currentTab = tabsBody.querySelector('.steps__item--active');
			const currentBullet = tabsPagination.querySelector(
				'.steps__pagination-bullet--active'
			);
			const nextTab = currentTab.nextElementSibling;
			const nextBullet = currentBullet.nextElementSibling;

			changeTab(currentTab, nextTab, currentBullet, nextBullet);
			checkDisabledArrows();
		});
	}
});
