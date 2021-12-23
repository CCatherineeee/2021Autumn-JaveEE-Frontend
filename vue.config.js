module.exports = {
    lintOnSave: false,
    // 配置跨域代理
    devServer: {
        // Paths
        // host: 'localhost',
        // port: '8080',
        // https: false,
        open: true,
        proxy: {
            '/api': { // 匹配所有以 '/api'开头的请求路径
                // target: 'http://ip:5050', // 代理目标的基础路径
                target: 'http://localhost:8080', //遇到以此开头的地址则进行转发，端口号勿动
                // changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    '^/api': ''
                }
            }
        },
        /*
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Origin-Type': '*',
        }
        */
    }
};
