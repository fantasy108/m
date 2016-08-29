/**
 * 组件安装
 * npm install gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean tiny-lr gulp-cache gulp-header gulp-replace gulp-notify gulp-livereload --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'),                 //基础库
    //imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    cache = require('gulp-cache'),
    header = require('gulp-header'),
    replace = require('gulp-replace');
    notify = require('gulp-notify'),
    //port = 8080,
    livereload = require('gulp-livereload');   //livereload


var pkg = require('./package.json');
var headerinfo = ['/**',
  ' * <%= pkg.name %>',
  ' * @version v<%= pkg.version %>',
  ' * Modify-Date:'+new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),
  ' */',
  ''].join('\n');

// HTML处理
gulp.task('html', function() {  
  return gulp.src('src/html/**/*.html')
    .pipe(replace('http://img.autostreetscdn.com/'+pkg.appname+'/src/','http://img.autostreetscdn.com/'+pkg.appname+'/build/'+pkg.version+'/'))
    .pipe(gulp.dest('build/'+pkg.version+'/html'))
    .pipe(notify({ message: 'HTML task complete' }))
    .pipe(livereload());
});

// 样式build
gulp.task('css', function() {  
  return gulp.src('src/css/**/*.css')
    .pipe(minifycss())
    .pipe(header(headerinfo, { pkg : pkg }))
    .pipe(replace('http://img.autostreetscdn.com/'+pkg.appname+'/src/','http://img.autostreetscdn.com/'+pkg.appname+'/build/'+pkg.version+'/'))
    .pipe(gulp.dest('build/'+pkg.version+'/css'))
    .pipe(notify({ message: 'CSS task complete' }))
    .pipe(livereload());
});

// 图片处理
gulp.task('images', function() {  
  return gulp.src('src/images/**/*.+(jpeg|jpg|png|gif)')
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/'+pkg.version+'/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('tag', function() {  
  return gulp.src('build/**/*')
    .pipe(gulp.dest('../../tags/'+pkg.appname+'/build/'))
    .pipe(notify({ message: 'tag task complete' }));
});

// js处理
gulp.task('js', function() {  
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(replace('http://img.autostreetscdn.com/'+pkg.appname+'/src/','http://img.autostreetscdn.com/'+pkg.appname+'/build/'+pkg.version+'/'))
    .pipe(header(headerinfo, { pkg : pkg }))
    .pipe(gulp.dest('build/'+pkg.version+'/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./build/html','./build/css', './build/js', './build/images'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default',function(){
    gulp.start('css','html','images','js');
});

gulp.task('live',function(){
    livereload.listen();

    // 监听html
    gulp.watch('./src/html/**/*.html', function(event){
        gulp.run('html');
    })

    // 监听css
    gulp.watch('./src/css/*.css', function(){
        gulp.run('css');
    });

    // 监听images
    gulp.watch('./src/images/**/*', function(){
        gulp.run('images');
    });

    // 监听js
    gulp.watch('./src/js/*.js', function(){
        gulp.run('js');
    });
})

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    // server.listen(port, function(err){
    //     if (err) {
    //         return console.log(err);
    //     }

    //     // // 监听html
        // gulp.watch('./src/html/**/*.html', function(event){
        //     gulp.run('html');
        // })

        // // 监听css
        // gulp.watch('./src/css/*.css', function(){
        //     gulp.run('css');
        // });

        // // 监听images
        // gulp.watch('./src/images/**/*', function(){
        //     gulp.run('images');
        // });

        // 监听js
        // gulp.watch('./src/js/*.js', function(){
        //     gulp.run('js');
        // });

    // });
});