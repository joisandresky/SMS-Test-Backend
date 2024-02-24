module.exports = {
    APP: {
        PORT: process.env.APP_PORT || 8000,
    },
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        USER: process.env.DB_USER || 'root',
        PASS: process.env.DB_PSWD || '<PASSWORD>',
        NAME: process.env.DB_NAME || 'test',
    }
}