var gulp = require('gulp'),
    awspublish = require('gulp-awspublish');


// var PATHS = {
//     src: 'src/**/*.ts'
// };

gulp.task('publish', function() {

    // create a new publisher using S3 options
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
    var publisher = awspublish.create({
        params: {
            Bucket: 'jetpath'
        }
    });

    // define custom headers
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'

    };

    return gulp.src(['views/*.html','js/**/*.js','css/**/*.css','css/**/*.jpg'],{base: '.'})


        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        .pipe(publisher.publish(headers))

        // create a cache file to speed up consecutive uploads
        .pipe(publisher.cache())

        // print upload updates to console
        .pipe(awspublish.reporter());
});
