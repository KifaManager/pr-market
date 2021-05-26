const { src, dest, watch, parallel, series } = require('gulp');

const browserSync = require('browser-sync').create();
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false
  });
}

function scripts() {
  return src('app/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function libsJs() {
  return src([
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/jquery/dist/jquery.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/libs'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function build() {
  return src([
    'app/*.html',
    'app/css/*.css',
    'app/js/*.js',
    'app/js/libs/*.js',
    'app/fonts/**/*'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/*.html']).on('change', browserSync.reload);
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/scss/den/styleDen.scss'], stylesDen);
  watch(['app/js/**/*.js', '!app/js/script.min.js'], scripts);
}



function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowsersList: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}


function stylesDen() {
    return src('app/scss/den/styleDen.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('styleDen.min.css'))
        .pipe(autoprefixer({
            overrideBrowsersList: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css/den'))
        .pipe(browserSync.stream())
}



exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.libsJs = libsJs;
exports.images = images;
exports.watching = watching;
exports.cleanDist = cleanDist;

exports.stylesDen = stylesDen;



exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, stylesDen, libsJs, scripts, browsersync, watching);
