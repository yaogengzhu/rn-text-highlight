const gulp = require("gulp");
const del = require("del");
const through = require("through2");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

/**
 *
 * @returns cleanup the lib folder
 */
function clean() {
  return del("./lib/**");
}

function buildES() {
  return gulp
    .src("./src/**/*.js")
    .pipe(
      babel()
    )
    .pipe(uglify())
    .pipe(gulp.dest("./lib/es"));
}

function buildCJS(){
    return gulp.src(["lib/es/**/*.js"])
        .pipe(babel({
            'plugins': ['@babel/plugin-transform-modules-commonjs']
        }))
        .pipe(gulp.dest("lib/cjs/"));
}

function copyMetaFiles() {
  return gulp.src(["./README.md", "./LICENSE"]).pipe(gulp.dest("./lib/"));
}

function generatePackageJSON() {
  return gulp
    .src("./package.json")
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        delete parsed.resolutions;
        delete parsed.packageManager;
        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      })
    )
    .pipe(gulp.dest("./lib/"));
}

exports.default = gulp.series(
  clean,
  buildES,
  buildCJS,
  copyMetaFiles,
  generatePackageJSON
);
