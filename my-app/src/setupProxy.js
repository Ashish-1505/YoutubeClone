const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  ),
  app.use(
    '/video',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  ),
  app.use(
    '/comment',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  )
}  