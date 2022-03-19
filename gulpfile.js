const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber')
const sass = require("gulp-sass")(require("node-sass"))
const imagemin = require('gulp-imagemin');
const recompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const prefixer = require('gulp-autoprefixer');




gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
  });




const scripts = [
   "node_modules/jquery/dist/jquery.min.js",
   "node_modules/swiper/swiper-bundle.min.js",
   "node_modules/micromodal/dist/micromodal.min.js"
];

const styles = [
    "src/sass/style.scss",
    "node_modules/swiper/swiper.min.css",
    "node_modules/bootstrap/dist/css/bootstrap-grid.min.css",
    "node_modules/bootstrap/dist/css/bootstrap-reboot.min.css",
];

gulp.task('html', () =>{
    gulp.src('src/**/*.html' )
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('images', () => {
    gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(changed('build/img'))
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
    },[
        recompress({
            loops: 6,
            min: 50,
            max: 90,
            quality: 'high',
            use: [pngquant({
                quality: [0.8, 1],
                strip: true,
                speed: 1
            })],
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
    ], ), )
    .pipe(gulp.dest('build/img'))
});

gulp.task('sass',  () => {
     gulp.src(cssFiles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(bulk())
        .pipe(prefixer({
			overrideBrowserslist: ['last 8 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			],
		}))
        .pipe(concat(('style.css')))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
    return gulp.src(scripts) 
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify()) 
    .pipe(concat(('script.js')))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
    });

    
gulp.task('watch', function(){
    gulp.watch('src/*.html', gulp.series('html')),
    gulp.watch(cssFiles, gulp.series("sass"), browserSync.reload),
    gulp.watch(scripts, gulp.series('js')),
    gulp.watch("src/img/**/*.{png,jpg}", gulp.series("images"))
  });
  
  gulp.task('default', gulp.series(
    gulp.parallel('html','js', 'sass', 'images', ),
    gulp.parallel('watch', 'serve' )
  ));