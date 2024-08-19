const { src, dest } = require('gulp');
const include = require('gulp-file-include');
const plumber = require('gulp-plumber');

// Обновление HTML в папке build
module.exports = function refreshHtml(browserSync) {
	return src(['src/**/*.html', '!src/components/**/*.html'])
		.pipe(plumber())
		.pipe(include())
		.pipe(dest('build/'))
		.pipe(browserSync.stream())
};
