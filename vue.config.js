module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,//これがないと "__dirname" がつかえないらしい
      builderOptions: {
        win: {
          icon: 'src/assets/icon.png', //exeをビルドした時のアイコンを指定
          target: [
            {
              target: 'portable', 
              arch: ['x64'], 
            },
          ],
        },
      },
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
