module.exports = { 
    lintOnSave: false,
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          productName: "VSNovel-Engine",
          appId: 'VSNovel.com',
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
          target: 'http://localhost:8080/engine',
          // 로컬 개발용 서버 3001, 따로 backend 폴더에서 서버를 키는 식으로 개발 테스트 할것
          //target: 'http://localhost:3001/engine',
          changeOrigin: true, 
          pathRewrite: { 
            '^/engine': ''
          } 
        } 
      } 
    },
    outputDir: './backend/public',
}