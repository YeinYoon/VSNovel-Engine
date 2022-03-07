module.exports = { 
    lintOnSave: false,
    devServer: { 
      proxy: { 
        '/engine': { 
          target: 'http://localhost:3001/engine',
          changeOrigin: true, 
          pathRewrite: { 
            '^/engine': ''
          } 
        } 
      } 
    },
    outputDir: './backend/public',
}