const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app =>{
    app.use(
        createProxyMiddleware('/announcements',
        {
            target: 'https://localhost:7015/',
            changeOrigin: true
        })
    )
}