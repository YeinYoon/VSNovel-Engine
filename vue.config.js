module.exports = { 
    lintOnSave: false,
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          productName: "VSNovel-Engine",
          appId: 'VSNovel-Engine',
          win: {
            "target": [
              "nsis"
            ],
            icon: 'public/engine.png',
            "requestedExecutionLevel": "requireAdministrator"
          },
          "nsis": {
            "installerIcon": "public/favicon.ico",
            "uninstallerIcon": "public/favicon.ico",
            "oneClick": false,
            "allowToChangeInstallationDirectory": true
          }
        },
      },
    },
    
    devServer: { 
      proxy: { 
        '/engine': { 
          target: 'http://localhost:2022/engine',
          changeOrigin: true, 
          pathRewrite: { 
            '^/engine': ''
          } 
        } 
      } 
    },
    outputDir: './backend/public',
}