import gulp from 'gulp';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
const sass = gulpSass(nodeSass);

import imagemin from'gulp-imagemin';
import recompress from'imagemin-jpeg-recompress';
import pngquant from'imagemin-pngquant';
import changed from'gulp-changed';
import prefixer from'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify  from 'gulp-uglify';
import concat  from 'gulp-concat';
import bulk from 'gulp-sass-bulk-importer';
import optipng from 'optipng-bin';

gulp.task('serve', function ()  {
   return browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
  });




const scripts = [
    "node_modules/micromodal/dist/micromodal.min.js",
   "node_modules/jquery/dist/jquery.min.js",
   "node_modules/swiper/swiper-bundle.min.js",

   "src/js/script.js"
];

const styles = [
    "src/scss/style.scss",
    "node_modules/swiper/swiper-bundle.css",
    "node_modules/bootstrap/dist/css/bootstrap-grid.min.css",
    "node_modules/bootstrap/dist/css/bootstrap-reboot.min.css",
];

gulp.task('html', function () {
  return  gulp.src('src/**/*.html' )
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('images', function ()  {
      return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(plumber())
    .pipe(changed('build/images'))
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
            // imagemin.svgo()
        ], ), )
    .pipe(gulp.dest('build/images'))
});

gulp.task('sass', function ()  {
    return gulp.src(styles)
        .pipe(plumber())
        .pipe(sass())
        // .pipe(bulk())
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
    // .pipe(uglify()) 
    .pipe(concat(('script.js')))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
    });


    gulp.task('json', function(){
        return gulp.src("src/data.json") 
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({stream: true}));
        });


    
gulp.task('watch', function(){
    gulp.watch('src/*.html', gulp.series('html')),
    gulp.watch(styles, gulp.series("sass"), browserSync.reload),
    gulp.watch(scripts, gulp.series('js')),
    gulp.watch('src/images/**/*.+(png|jpg|jpeg|gif|svg|ico)', gulp.series("images")),
    gulp.watch("src/data.json", gulp.series("json"))
  });
  
  gulp.task('default', gulp.series(
    gulp.parallel('html','images', 'sass',  'js', "json"  ),
    gulp.parallel('watch', 'serve' )
  ));