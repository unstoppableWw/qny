<template>
	<view class="head_bg">
		<view class="flex flex-column align-center justify-center" style="height: 25%;">
			<view style="font-size: 50rpx;font-weight: 700;">欢迎您</view>
			<view style="font-size: 50rpx;font-weight: 700;">未来橘长</view>
		</view>
		<view class="chushi_shuru">
			<image class="small_icon" src="../../static/head/shoujihaoma.svg"></image>
			<view style="width: 5rpx;height: 90rpx;background-color: #DDDDDD;margin-right: 40rpx;"></view>
			<input v-model="user_phone" style="font-size: 30rpx;" placeholder="请输入手机号码">
		</view>
		<view class="chushi_shuru" >
			<image class="small_icon" src="../../static/head/yanzhengma.svg"></image>
			<view style="width: 5rpx;height: 90rpx;background-color: #DDDDDD;margin-right: 40rpx;"></view>
			<!-- 获取验证码 -->
			<input v-model="yanzheng_code" v-show="login_manner_is"  style="font-size: 30rpx;" :placeholder="login_manner" >
			<view  v-show="login_manner_is" class="huoqu_yanzheng flex justify-center align-center" style="color: white;" >
				<view v-if="is_yanzheng" @click="huoqu_yanzheng" >获取验证</view>
				<text v-else="is_yanzheng">{{yanzheng_time}}</text>
			</view>
			<!-- 密码 -->
			<input v-model="password" v-show="!login_manner_is"  style="font-size: 30rpx;" :placeholder="login_manner" password type="text">
			
		</view>
		<view style="color: #C8C8C8;margin-right: 390rpx; margin-bottom: 40rpx" @click="change_login_manner">更换登陆方式</view>
		
		<button class="chushi_denglu" style="color: white; font-size: 30rpx;" @click="denglu" :loading="loading" >{{this.loading ? '登陆中...':'登录'}}</button>
		<view @click="to_zhuce">没有账号？点击注册</view>
		<view class="denglu_bottom" >
			<image class="small_icon" src="../../static/head/weixin.svg"></image>
			<view>微信</view>
		</view>
		<view style="margin-top: 10%;">
			
			<text style="color: #C8C8C8;margin-right: 4rpx;margin-right: 4rpx;">登录即同意</text>
			<text style="color: #C8C8C8;margin-right: 4rpx;text-decoration: underline;">用户协议</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repeat: 0,
				login_manner_is:true,//登陆方式,true代表验证码登录
				login_manner:"请输入验证码",
				is_yanzheng:true,//是否出现验证码按钮（60s时间）
				yanzheng_time:60,
				timer: null,//计时器
				loading:false,
				//前后端交互代码
				user_phone:"",
				yanzheng_code:"",
				password:"",
			}
		},
		onLoad:function(option){
			setTimeout(()=>{
				if(option.repeat==0){
					uni.showToast({
						icon: 'none',
						title:'账号登录失效，请重新登录',
						duration:2000
					})
				}
				else if(option.repeat==1){
					uni.showToast({
						icon: 'none',
						title:'账号异地登录，请重新登录',
						duration:2000
					})
				}
				
				
			},500)
			
		},
		methods: {
			to_zhuce(){
				uni.navigateTo({
					url:'../head_zhuce/head_zhuce'
				})
			},
			validate_phone(){
				let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				if(this.user_phone=="" || !phoneReg.test(this.user_phone)){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none',
						duration:2000
					})
					return false
				}
				return true
			},
			
			validate_denglu(){
				if(!this.validate_phone()) return;
				if(this.login_manner_is==true){
					console.log("你好")
					if(this.yanzheng_code==""){
						uni.showToast({
							title:'请输入验证码',
							icon:'none',
							duration:2000
						})
						return false
					}else{
						return true
					}
				}else{
					if(this.password==""){
						uni.showToast({
							title:'请输入密码',
							icon:'none',
							duration:2000
						})
						return false
					}else{
						return true
					}
				}
				
			},
			
			denglu(){
				console.log("点击登录")
				// if(!this.validate_denglu()) return;//如果表单数据不过关，直接重来
				this.loading=true
				if(this.login_manner_is==true){
					//如果是验证码登录
					this.$H.post('/user/smscode_login.do',{
						mobile:this.user_phone,
						code:this.yanzheng_code
					}).then(res=>{
						let data = res.data
						if(data.code==200){
							//登录成功
							console.log(res)
							uni.showToast({
								title:"登录成功",
								icon:'success',
								duration:2000
							})
							console.log("登录的token：")
							console.log(data.data.token)
							//持久化存储
							this.$store.commit('login',data.data.token)
							uni.reLaunch({
								url:'../index/index'
							})
						}else if(data.code==401){
							uni.showToast({
								title:data.msg,
								icon:'none',
								duration:2000
							})
						}else if(data.code==404){
							uni.showToast({
								title:data.msg,
								icon:'none',
								duration:2000
							})
						}else{
							uni.showToast({
								title:"登录失败",
								icon:'none',
								duration:2000
							})
						}
						
					})
				}else{
					//如果是密码登录
					console.log("密码登录")
					this.$H.post('/user/password_login.do',{
						mobile:this.user_phone,
						password:this.password
					}).then(res=>{
						console.log(res)
						let data = res.data
						if(data.code==200){
							//登录成功
							console.log(res)
							uni.showToast({
								title:"登陆成功",
								icon:'success',
								duration:2000
							})
							console.log("登录的token：")
							console.log(data.data.token)
							//持久化存储
							
							this.$store.commit('login',data.data.token)
							uni.reLaunch({
								url:'../index/index'
							})
						}else if(data.code==401){
							uni.showToast({
								title:data.msg,
								icon:'none',
								duration:2000
							})
						}else if(data.code==404){
							uni.showToast({
								title:data.msg,
								icon:'none',
								duration:2000
							})
						}else{
							uni.showToast({
								title:"登录失败",
								icon:'none',
								duration:2000
							})
						}
					})
				}
				this.loading=false
				
			},
			change_login_manner(){
				this.login_manner_is = !this.login_manner_is
				if(this.login_manner_is==true){
					this.login_manner = "请输入验证码"
					this.password = ""
					console.log(this.login_manner)
				}else{
					this.login_manner = "请输入密码"
					this.yanzheng_code=""
					console.log(this.login_manner)
				}
				console.log(this.login_manner_is)
			},
			async huoqu_yanzheng(){
				if(!this.validate_phone()) return;//如果表单数据不过关，直接重来
				let res = await this.$H.post('/user/send_smscode.do',{mobile:this.user_phone})
				console.log(res)
				if(res.data.code==200){
					uni.showToast({
						title:'短信已发送',
						icon:'success',
						duration:2000
					})
					this.timeFn()//开始倒计时
					console.log("获取验证码")
				}else{
					uni.showToast({
						title:'验证码请求失败',
						icon:'none',
						duration:2000
					})
				}
				
			},
			timeFn() {
				this.is_yanzheng=false
			    this.timer = setInterval(() => {
			        if (this.yanzheng_time > 0) {
			            this.yanzheng_time--;
			            
			            
			        } else {
			            clearInterval(this.timer);
			            // 倒计时结束后需要执行的操作
			            this.yanzheng_time=60
						this.is_yanzheng=true
			        }
			    }, 1000);
			},
		}
	}
</script>

<style>
	.head_bg{
		
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		 position: absolute;
		 display: flex;
	}
	.chushi_shuru{
		display: flex;
		background-color: #F5F5F5;
		border-radius: 40rpx;
		width: 600rpx;
		height: 130rpx;
		margin: 30rpx;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 3rpx;
	}
	.huoqu_yanzheng{
		display: flex;
		background-color: #4095E5;
		border-radius: 40rpx;
		width: 180rpx;
		height: 80rpx;
		margin: 30rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10rpx;
		margin-right: 20rpx;
	}
	.chushi_denglu{
		display: flex;
		background-color: #4095E5;
		border-radius: 40rpx;
		width: 600rpx;
		height: 110rpx;
		margin: 30rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10rpx;
		
	}
	.small_icon{
		width: 45rpx;
		height: 45rpx;
		padding-right: 1rpx;
		padding-left: 5rpx;
		border-radius: 100%;
		margin-left: 20rpx;
		margin-right: 30rpx;
		border: #4095E5;
	}
	.denglu_bottom{
		display: flex;
		height: 20%;
		flex-direction: column;
		align-items: center;
		margin-top: 40rpx;
	}
</style>
