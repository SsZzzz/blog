module.exports = {
	publicPath: '/blog/',
	devServer: {
		disableHostCheck: true,//内网穿透时得加上这个
		proxy:'http://192.168.1.196:3001',
		port:9002
	}
}
