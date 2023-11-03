<template>
	<view class="head_bg">
		<view class="flex flex-column align-center justify-center" style="height: 30%;">
			
			<view style="font-size: 55rpx;font-weight: 600;margin-bottom: 40rpx;">个人资料</view>
			
			<view  class="chushi_touxiang flex align-center content-center" :style="{backgroundImage: 'url('+userImg+')'}"  lazy-load>
				<image src="../../static/head/photo.png" class="small_icon"lazy-load @click="post_photo"></image>
			</view>
		</view>
		<view class="bianji_shuru">
			<view style="margin-right:80rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">昵称</view>
			<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;"></view>
			<input v-model="nickname" style="font-size: 30rpx;" maxlength="8" placeholder="请输入昵称">
		</view>
		
		<view class="bianji_shuru">
			<view  style="margin-right:80rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">性别</view>
			<view>
				<radio-group name="radio" @change="change_sex">
					<label>
						<radio checked="true" value="男" /><text>男</text>
					</label>
					<label>
						<radio value="女" /><text>女</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="bianji_shuru">
			<view style="margin-right:80rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">水平</view>
			<view>
				<radio-group  name="radio">
					<label>
						<radio checked="true" value="小白" /><text>小白</text>
					</label>
					<label>
						<radio value="老鸟" /><text>老鸟</text>
					</label>
				</radio-group>
			</view>
		</view>
		<!-- <view class="bianji_shuru">
			<view  style="margin-right:80rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">地区</view>
			
			<uni-data-select style="font-size: 30rpx;width: 200rpx; "
			      v-model="value"
			      :localdata="range"
				  @change="change_area"
			    ></uni-data-select>
		</view> -->
		<view class="bianji_shuru" style="width: 600rpx;">
			<view style="margin-right:80rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">签名</view>
			<view style="width: 5rpx;height: 40rpx;background-color:#4095E5;margin-right: 40rpx;"></view>
			<input v-model="description" style="font-size: 20rpx;width: 350rpx;" maxlength="15" placeholder="最能鼓舞你的话(15字内)" >
		</view>
		
		<view class="bianji_denglu" style="color: white; font-size: 30rpx;" @click="denglu">确定</view>
		
		
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index.js'
	export default {
		data() {
			return {
				userImg:"../../static/common/nothing.png",
				nickname:"",
				sex:1,
				level:1,
				area:"",
				description:"",
				value:"广东省",
				range: [{ value: "不限", text: "不限" },{ value: "广东省", text: "广东省" },{ value: "河北省", text: "河北省" },{ value: "山西省", text: "山西省" },{ value: "吉林省", text: "吉林省" },{ value: "辽宁省", text: "辽宁省" },{ value: "黑龙江省", text: "黑龙江省" },{ value: "陕西省", text: "陕西省" },{ value: "甘肃省", text: "甘肃省" },{ value: "青海省", text: "青海省" },{ value:"山东省", text: "山东省" },{ value: "福建省", text: "福建省" },{ value: "浙江省", text: "浙江省" },{ value: "河南省", text: "河南省" },{ value: "湖北省", text: "湖北省" },{ value: "湖南省", text: "湖南省" },{ value: "江西省", text: "江西省" },{ value: "江苏省", text: "江苏省" },{ value: "安徽省" , text: "安徽省" },{ value: "海南省", text: "海南省" },{ value: "四川省", text: "四川省" },{ value: "贵州省", text: "贵州省" },{ value: "云南省", text: "云南省" },{ value: "北京市", text: "北京市" },{ value:"上海市", text: "上海市" },{ value: "天津市", text: "天津市" },{ value: "重庆市", text: "重庆市" },{ value: "内蒙古自治区", text: "内蒙古自治区" },{ value:"新疆维吾尔自治区", text: "新疆维吾尔自治区" },{ value: "宁夏回族自治区", text: "宁夏回族自治区" },{ value: "广西壮族自治区", text: "广西壮族自治区" },{ value:  "西藏自治区", text: "西藏自治区" }],
				
			}
		},
		onLoad() {
			console.log("hhhh");
			  this.$H.post("/user/my").then(res=>{
					
				  console.log(res);
				  this.nickname = res.data.data.userName
				  this.userImg = res.data.data.userImg
				  this.sex = res.data.data.sex
				  this.value = res.data.data.area
				  this.description = res.data.data.description
				  	
			  })
			  
		},
		methods: {
			validate_denglu(){
				if(this.nickname=="" || this.description==""){
					uni.showToast({
						title:'请填写信息',
						icon:'none',
						duration:2000
					})
					return false
				}
				return true
			},
			//改变地区
			change_area(e){
				console.log("e:",e);
				this.area=e
			},
			denglu(){
				if(!this.validate_denglu()) return
				this.$H.post("/user/update_user.do",{
					"userName":this.nickname,
					"userImg":this.userImg,
					"area":this.value,
					"sex":this.sex,
					"description":this.description,
				}).then(res=>{
					let data = res.data
					if(data.code==200){
						console.log(data)
						uni.showToast({
							title:"编辑成功",
							icon:"success",
							duration:2000
						})
						uni.reLaunch({
							url:"../index/index"
						})
					}else{
						uni.showToast({
							title:"编辑失败",
							icon:"success",
							duration:2000
						})
					}
					
				})
				// uni.switchTab({
				// 	url:'../index/index'
				// })
			},
			post_photo(){
				 uni.chooseImage({
									count: 1,
									sizeType: ['original', 'compressed'],
									sourceType: ['album', 'camera'],
									success: res => {
									  const imagePath = res.tempFilePaths[0];
									 //  const arrayBuffer = new Uint8Array(res.tempFilePaths[0]); //先将本地图片路径转换成array类型 
									 // const base64Img = uni.arrayBufferToBase64(arrayBuffer);  //再转换成base64类型
									  
									 pathToBase64(imagePath)
									   .then(base64 => {
									     console.log(base64)
										 this.userImg = base64
									   })
									   .catch(error => {
									     console.error(error)
									   })
									},
									fail: err => {
									  console.error('选择图片失败', err);
									}
								  });
			},
			change_sex: function(evt) {
				if(evt.detail.value=="男"){
					this.sex=1
				}else{
					this.sex=0
				}
				console.log(this.sex)
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
	.chushi_touxiang{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 145rpx;
		height: 145rpx;
		border-style: solid;
		border: 4px solid #4095E5;
		border-radius: 100%;
		
		
		background-size: cover;
	}
	.bianji_shuru{
		display: flex;
		
		border-radius: 40rpx;
		width: 600rpx;
		height: 70rpx;
		margin: 30rpx;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 3rpx;
	}
	.bianji_button{
		display: flex;
		background-color: #4095E5;
		border-radius: 40rpx;
		width: 95rpx;
		height: 65rpx;
		margin: 30rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10rpx;
		margin-right: 20rpx;
	}
	.bianji_denglu{
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
		margin-top:70rpx ;
	}
	.small_icon{
		width: 65rpx;
		height: 65rpx;
		
		border-radius: 100%;
		
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
