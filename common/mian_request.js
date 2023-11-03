import $C from '@/common/config.js'
import $store from '@/store/mian_store.js';
export default{
	common:{
		method:'POST',
		header:{
				"content-type":"application/json",
				
		},
		data:{}
	},
	
	request(options = {}){
		options.url = $C.webUrl + options.url
		options.method =options.method || this.common.method 
		options.header =options.header || this.common.header
		//判断是否在vuex
		let store_token
		if($store.state.token){//如果vuex有token
			store_token = $store.state.token
			console.log("vuex存储")
		}else {
		 	store_token =  uni.getStorageSync('token');
			console.log("localStore存储")
		}
		return new Promise((resolve,reject) => {
				uni.request({
					...options,
					header: {token:store_token},
					success: (res) => {
						console.log(store_token)
						if (res == '') {
							return uni.showToast({
								icon: 'loading',
								title:'获取数据失败'
							})
						}
						else if(res.data.code==998) {
							console.log("请重新登录登录");
							return uni.reLaunch({
								url:'/pages/head_denglu/head_denglu?repeat=0'
							})
						}
						else if(res.data.code==999){
							console.log("有人登录了你的账号");
							return uni.reLaunch({
								url:'/pages/head_denglu/head_denglu?repeat=1'
							})
						}
						
						console.log("mian_request.js成功发送请求到当前页面");
						
						resolve(res)
					},
					fail: (err) => {
						return uni.showToast({
							icon: 'loading',
							title:'网络错误'
						})
						reject(err)
					}
				})
			})
		
	},
	get(url,data ={},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url,data ={},options = {}){
		options.url = url
		options.data = data
		options.method = 'POST'
		
		return this.request(options)
		
	}
}