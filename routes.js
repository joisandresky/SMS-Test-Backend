module.exports = (app) => {
    app.use('/api/courses', require('./api/course'))
}