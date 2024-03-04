const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'https://youtubeclonebackend.onrender.com',
      changeOrigin: true,
    })
  ),
  app.use(
    '/video',
    createProxyMiddleware({
      target: 'https://youtubeclonebackend.onrender.com',
      changeOrigin: true,
    })
  ),
  app.use(
    '/comment',
    createProxyMiddleware({
      target: 'https://youtubeclonebackend.onrender.com',
      changeOrigin: true,
    })
  )
}  