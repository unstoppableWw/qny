<template>
	<view class="head_bg">
		<view class="flex flex-column align-center justify-center" style="height: 25%;">
			
			<view style="font-size: 50rpx;font-weight: 700;">用户注册</view>
		</view>
		<view class="chushi_shuru">
			<image class="small_icon" src="../../static/head/shoujihaoma.svg"></image>
			<view style="width: 5rpx;height: 90rpx;background-color: #DDDDDD;margin-right: 40rpx;"></view>
			<input v-model="user_phone" style="font-size: 30rpx;" placeholder="请输入手机号码">
		</view>
		<view class="chushi_shuru" >
			<image class="small_icon" src="../../static/head/yanzhengma.svg"></image>
			<view style="width: 5rpx;height: 90rpx;background-color: #DDDDDD;margin-right: 40rpx;"></view>
			<input v-model="yanzheng_code" style="font-size: 30rpx;" placeholder="请输入验证码">
			<view  class="huoqu_yanzheng flex justify-center align-center" style="color: white;" >
				<view v-if="is_yanzheng" @click="huoqu_yanzheng" style="width: 80%;" class="flex justify-center align-center">获取验证</view>
				<text v-else="is_yanzheng">{{yanzheng_time}}</text>
			</view>
		</view>
		<view class="chushi_shuru">
			<image class="small_icon" src="../../static/head/mima.svg"></image>
			<view style="width: 5rpx;height: 90rpx;background-color: #DDDDDD;margin-right: 40rpx;"></view>
			<input v-model="password" style="font-size: 30rpx;" placeholder="请输入密码" password type="text">
		</view>
		<view class="chushi_shuru">
			<image class="small_icon" src="../../static/head/mima.svg"></image>
			<view style="width: 5rpx;height: 90rpx;background-color: #DDDDDD;margin-right: 40rpx;"></view>
			<input v-model="repeat_password" style="font-size: 30rpx;" placeholder="请再次输入密码" password type="text">
		</view>
		<view style="color: #C8C8C8;padding-left: 20%; width: 100%;margin-bottom: 40rpx"></view>
		
		<button class="chushi_denglu" style="color: white; font-size: 30rpx; " :loading="loading" @click="zhuce">{{this.loading?'注册中':'注册'}}</button>
		
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_yanzheng:true,
				yanzheng_time:60,
				timer: null,//计时器
				//前后端逻辑代码
				user_phone:"",
				yanzheng_code:"",
				password:"",
				repeat_password:"",
				loading:false,
			}
		},
		methods: {
			zhuce(){
				if(!this.validate_zhuce()) return;//如果表单数据不过关，直接重来
				console.log(this.user_phone)
				console.log(this.password)
				console.log(this.yanzheng_code)
				this.$H.post('/user/register.do',{mobile:this.user_phone,password:this.password,code:this.yanzheng_code
				}).then(res=>{
					if(res.data.code==200){
						//注册成功
						console.log(res)
						uni.showToast({
							title:'注册成功',
							icon:'success',
							duration:2000
						})
						uni.navigateTo({
							url:'../head_bianji/head_bianji'
						})
					}else if(res.data.code==409){
						uni.showToast({
							title:'手机号已注册',
							icon:'none',
							duration:2000
						})
					}else if(res.data.code==401){
						uni.showToast({
							title:'验证码错误',
							icon:'none',
							duration:2000
						})
					}else if(res.data.code==405){
						uni.showToast({
							title:'数据库出错',
							icon:'none',
							duration:2000
						})
					}
					else{
						console.log(res)
						uni.showToast({
							title:'注册失败',
							icon:'none',
							duration:2000
						})
					}
					
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
			validate_zhuce(){
				let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				if(!this.validate_phone()) return;
				if(this.yanzheng_code==""||this.password==""||this.repeat_password==""){
					uni.showToast({
						title:'请填完整信息',
						icon:'none',
						duration:2000
					})
					return false
				}
				return true
			},
			async huoqu_yanzheng(){
				if(!this.validate_phone()) return
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
		height: 120rpx;
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
