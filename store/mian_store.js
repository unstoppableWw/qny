import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $C from '@/common/config.js';
import $http from '@/common/mian_request.js';
import $U from '@/common/util.js';


export default new Vuex.Store({
	state:{
		token:"",
		user:{
			//对象
		}
	},
	mutations:{
		//登录
		login(state,token){
			state.token = token
			console.log("这个用户的token为：");
			console.log(token)
			uni.setStorageSync('token',token)
		}
	}
})