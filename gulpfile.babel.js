import gulp, { watch, series } from 'gulp'
import concat from 'gulp-concat'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import GulpPug from 'gulp-pug'
import sass from 'gulp-sass'
import imagemin from 'gulp-imagemin'
import cachebust from 'gulp-cache-bust'

gulp.task('pug',()=>{
  return gulp .src('./src/views/pages/*.pug')
    .pipe(GulpPug({
      pretty: false     //False para minificar y True para desminificar
    }))
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('sass',()=>{
  return gulp .src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('babel',()=>{
  return gulp .src('./src/js/*.js')
    .pipe(concat('index.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('imgmin',()=>{
  return gulp .src('./src/assets/img/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(gulp.dest('./public/assets/img'))
})

gulp.task('default',()=>{
  watch('./src/views/**/*.pug', series('pug'))
  watch('./src/scss/**/*.scss', series('sass'))
  watch('./src/js/*.js', series('babel'))
})