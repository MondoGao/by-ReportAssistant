var gulp = require("gulp");

var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var server = require('browser-sync');
var proxy = require('http-proxy-middleware');

var compass = require("gulp-compass");
// var webpack = require("gulp-webpack");
// var webserver = require("gulp-webserver");

gulp.task("mobile_sass", function () {
    return gulp.src("./mobile/scss/*.scss")
        .pipe(compass({
            css: "./mobile/styles",
            sass: "./mobile/scss",
            image: "./mobile/images",
            require: ["compass/import-once/activate"],
            style: "compressed",
            sourcemap: true,
            task: "compile"
        }))
        .pipe(gulp.dest("./mobile/styles"));
});

gulp.task("mobile_webpack", function () {
    return gulp.src("./mobile/scripts/src/index.js")
        .pipe(webpack({
            entry: {
                index: "./mobile/scripts/src/index.js",
                report_detail: "./mobile/scripts/src/report_detail.js"
            },
            output: {
                filename: "[name].js"
            },
            module: {
                loaders: [{
                    test: /\.tpl$/, loader: "tmodjs"
                }, {
                    test: /\.css$/, loader: "style!css?minimize&-autoprefixer"
                }]
            }
        }))
        .pipe(gulp.dest("./mobile/scripts/dist/"));
});

gulp.task("mobile_module_sass", function () {
    return gulp.src("./mobile/tpl/modules/*/*.scss")
        .pipe(compass({
            css: "./mobile/tpl/modules",
            sass: "./mobile/tpl/modules",
            require: ["compass/import-once/activate"],
            style: "compressed",
            sourcemap: true,
            task: "compile",
        }))
        .pipe(gulp.dest("./mobile/tpl/modules"));
});

gulp.task('serve', ["mobile_sass", "mobile_webpack", "mobile_module_sass"], function () {
    server.init({
        server: {
            baseDir: './',
            middleware: [
                proxy(["/list","/document_detail","/mobi/"], {target: "http://report.hustonline.net", changeOrigin: true}),
            ]
        },
        startPath: './mobile/index.html'
    });

})

// gulp.task("webserver", function() {
//   gulp.src("./")
//     .pipe(webserver({
//       livereload: true,
//       directoryListing: true,
//       open: true
//     }));
// });

gulp.task("watch", function () {
    gulp.watch("./mobile/scss/*.scss", ["mobile_sass"]);
    gulp.watch("./mobile/scripts/src/*.js", ["mobile_webpack"]);
    gulp.watch("./mobile/tpl/modules/*/*.scss", ["mobile_module_sass"]);
});

gulp.task("default", ["mobile_sass", "mobile_webpack", "mobile_module_sass","serve", "watch"]);
