import Vue from 'vue'
import App from './App'
import store from './store/mian_store.js';
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';


import Vant from 'vant'
Vue.use(Vant)

Vue.prototype.$store = store

Vue.config.productionTip = false

// Vue.use(ElementUI)
// 引入全局组件
import divider from './components/common/divider.vue';
Vue.component('divider',divider)
import noThing from './components/common/no-thing.vue';
Vue.component('no-thing',noThing)

// 引入配置文件
import $C from './common/config.js';
Vue.prototype.$C = $C
// 挂在助手函数库
import $U from './common/util.js';
Vue.prototype.$U = $U
// 引入请求库
import $H from './common/mian_request.js';
Vue.prototype.$H = $H



App.mpType = 'app'

const app = new Vue({
	
	store,
    ...App
	 
})
app.$mount()
