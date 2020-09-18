// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            // 匹配所有以api开头的请求路径
            '/api': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true,
                secure: false,
                // 把api替换掉
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
