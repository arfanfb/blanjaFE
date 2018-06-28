const gulp = require('gulp');
const sass = require('gulp-sass');
const glob = require('glob');
const babel = require('gulp-babel');
const babelify =  require('babelify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const browserify = require("browserify");
const source = require('vinyl-source-stream');

gulp.task('sass', function () {
    gulp.src(['./sass/**/*.scss','../node_modules/bootstrap/scss/*.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass({ includePaths : ['sass/'] , outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('../build/src/assets/css'));
});

gulp.task('babelify', function () {
    // gulp.src('./**/*.js')
		// .pipe(sourcemaps.init())
		// .pipe(babel({
		// 	presets: ['@babel/env']
		// }))
		// .pipe(concat('server.js'))
		// .pipe(sourcemaps.write('.'))
		// .pipe(gulp.dest('./build/src'))

    gulp.src('server.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('../build/src'))
});

gulp.task('react', function () {
    glob('./js/main/*.js', function(err, files) {
      if(err) done(err);

      var tasks = files.map(function(entry) {
        // browserify(entry)
        // .transform("babelify", {presets: ["@babel/env", "@babel/react"]})
        // .bundle()
        // .pipe(fs.createWriteStream("bundle.js"));
    		// // .pipe(gulp.dest('./build/src/assets/js'))
        // // gulp.src(entry)
    		// // .pipe(sourcemaps.init())
    		// // .pipe(babel({
    		// // 	presets: ['@babel/env','@babel/react']
    		// // }))
    		// // .pipe(gulp.dest('./build/src/assets/js'))

        browserify({
          entries: entry,
          extensions: [ '.js', '.jsx' ],
          debug: true // Add sourcemaps
        })
        .transform(babelify, {presets: ['@babel/env',"@babel/react"]})
        .bundle()
          .on('error', console.error.bind(console))
        .pipe(source(entry))
        .pipe(gulp.dest('../build/src/assets'))
        console.log(entry)
      })
    })
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['react']);
});
