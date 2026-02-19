module.exports = {
  '/api': {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req) => {
      // Explicitly preserve Content-Type (including multipart boundary)
      // The webpack-dev-server body parser can strip the boundary parameter
      if (req.headers['content-type']) {
        proxyReq.setHeader('content-type', req.headers['content-type']);
      }
    }
  }
};
