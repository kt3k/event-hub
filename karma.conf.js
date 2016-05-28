module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'sinon', 'browserify'],
    files: ['spec.js'],
    preprocessors: {'spec.js': 'browserify'},
    browserify: {debug: true, transform: ['babelify']},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
