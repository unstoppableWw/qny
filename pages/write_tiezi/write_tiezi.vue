<template>
	<view class="feedback-page">



		<view class="section">
			<view class="button-group">
				<uni-segmented-control :current="tiezi_current" :values="tiezi_type" style-type="text"
					active-color="#4095E5" @clickItem="tiezi_onClickItem" style="width: 100%;" />

			</view>
			<view style="width: 100%;height: 1rpx; background-color:#F8F8F8;margin-top: 15rpx;"></view>
		</view>
		<!-- 学习区和闲聊区显示页面 -->
		<view v-if="selectedButtonType=='新闻' || selectedButtonType=='娱乐' || selectedButtonType=='其他'">
			<view class="section_new">
				<textarea class="text-title" maxlength="10" v-model="title" placeholder="帖子标题(10字以内)"></textarea>
			</view>
			<view class="section ">
				<textarea maxlength="2000" auto-height class="text-area" v-model="feedbackText"
					placeholder="这一刻的想法~"></textarea>
			</view>

			<view class="section">
				<view class="add-image" style="display: flex; align-items: center;">
					<view class="image-text">
						添加视频
					</view>
					<view class="image-container" style="margin-left: 2%;">
						<view class="image-center">
							<image v-if="selectedVideoPath==''" style="width: 50rpx; height: 50rpx;"
								class="image-preview" src="../../static/head/photo.png" @click="openFileInput()" />
						</view>
						<view @click="deleteVideo" v-if="selectedVideoPath!=''" style="color: #4095E5;font-size: 28rpx;">
							删除视频
						</view>
					</view>
				</view>

				<video v-if="selectedVideoPath!=''" :src="selectedVideoPath" controls width="320" height="240"></video>

			</view>


		
		</view>

		


		<view style="margin-top: 100rpx;">
			<button class="chushi_denglu" style="color: white; font-size: 30rpx;margin-top: 5%;" @click="submit_acticle"
				:loading="loading">{{this.loading ? '提交中...':'提交'}}</button>
		</view>

	</view>


</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	import typeSelect from '@/components/common/type_select.vue';
	import typeSelect2 from '@/components/common/type_select2.vue';
	import $store from '@/store/mian_store.js';
	import $C from '@/common/config.js';
import { Static } from "vue";
	export default {
		components: {

			typeSelect2,
		},
		name: 'FeedbackPage',
		data() {
			return {
				selectedVideoPath:'',   // 获取的视频
				xinxi: '',
				title: '',
				feedbackText: '',
				selectedButtonType: '新闻', // Add this line
				loading: false,
				//发帖的
				tiezi_current: 0,
				tiezi_type: ["新闻", "娱乐", "其他"],


				//预约弹窗的表单
				type_items: ['结构化', '无领导'],
				yy_current: 1,
				yy_roomName: "",
				yy_roomType: 1,
				yy_maxNumber: 10,
				yy_area: "",
				yy_preference: "小白",
				yy_isMatch: 1,
				yy_startTime: "",
				yuyue_compete_type: true,
				range: [{
					value: "不限",
					text: "不限"
				}, {
					value: "广东省",
					text: "广东省"
				}, {
					value: "河北省",
					text: "河北省"
				}, {
					value: "山西省",
					text: "山西省"
				}, {
					value: "吉林省",
					text: "吉林省"
				}, {
					value: "辽宁省",
					text: "辽宁省"
				}, {
					value: "黑龙江省",
					text: "黑龙江省"
				}, {
					value: "陕西省",
					text: "陕西省"
				}, {
					value: "甘肃省",
					text: "甘肃省"
				}, {
					value: "青海省",
					text: "青海省"
				}, {
					value: "山东省",
					text: "山东省"
				}, {
					value: "福建省",
					text: "福建省"
				}, {
					value: "浙江省",
					text: "浙江省"
				}, {
					value: "河南省",
					text: "河南省"
				}, {
					value: "湖北省",
					text: "湖北省"
				}, {
					value: "湖南省",
					text: "湖南省"
				}, {
					value: "江西省",
					text: "江西省"
				}, {
					value: "江苏省",
					text: "江苏省"
				}, {
					value: "安徽省",
					text: "安徽省"
				}, {
					value: "海南省",
					text: "海南省"
				}, {
					value: "四川省",
					text: "四川省"
				}, {
					value: "贵州省",
					text: "贵州省"
				}, {
					value: "云南省",
					text: "云南省"
				}, {
					value: "北京市",
					text: "北京市"
				}, {
					value: "上海市",
					text: "上海市"
				}, {
					value: "天津市",
					text: "天津市"
				}, {
					value: "重庆市",
					text: "重庆市"
				}, {
					value: "内蒙古自治区",
					text: "内蒙古自治区"
				}, {
					value: "新疆维吾尔自治区",
					text: "新疆维吾尔自治区"
				}, {
					value: "宁夏回族自治区",
					text: "宁夏回族自治区"
				}, {
					value: "广西壮族自治区",
					text: "广西壮族自治区"
				}, {
					value: "西藏自治区",
					text: "西藏自治区"
				}],
				mode: 'aspectFill',
			};
		},
		methods: {
			//改变区域
			yy_changeLevel(event) {
				this.yy_preference = event.detail.value
			},


			yy_change_area(event) {
				this.yy_area = event
			},
			yy_changeNum(event) {
				this.yy_maxNumber = event
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			//提交
			submitFeedback() {
				this.loading = true
				const feedbackType = this.selectedButtonType; // 所选单选按钮的内容
				const feedbackText = this.feedbackText; // 输入的文字
				// const uploadedImages = this.uploadedImages; // 所选择的图片

				if (!feedbackText.trim()) {
					alert("请输入反馈内容");
					return;
				}

				if (this.selectedVideoPath == '') {
					alert("请上传视频");
					return;
				}
				// 显示确认对话框
				const confirmSubmission = confirm("确定要提交反馈吗？");
				if (confirmSubmission) {
					// 执行提交逻辑
					console.log("Feedback Type:", feedbackType);
					console.log("Feedback Text:", feedbackText);
					console.log("Uploaded Video:", this.selectedVideoPath);

					// 清空输入和选择
					this.selectedButtonType = "Bug问题";
					this.feedbackText = "";
					this.selectedVideoPath = '';

					alert("提交成功！谢谢您的反馈~我们会做得更好")
				} else {
					console.log("取消提交");
				}
				this.loading = false
			},

			// 上传照片
			// 修改 openFileInput 方法
			  openFileInput() {
			    uni.chooseVideo({
			      sourceType: ['album', 'camera'],
			      maxDuration: 60,
			      camera: 'back',
			      success: (res) => {
			        // 用户选择视频后的逻辑
					console.log(res);
			         this.selectedVideoPath = res.tempFilePath;
					 console.log(this.selectedVideoPath);
			      },
			      fail: (error) => {
			        // 处理选择视频失败的情况
			        console.error(error);
			      }
			    });
			  },
			
			 
			// 点击删除视频
			deleteVideo() {
				this.selectedVideoPath=''
			},
			yy_onClickItem(e) {
				if (this.yy_current != e.currentIndex) {
					this.yy_current = e.currentIndex
					this.yuyue_type_back()
				}
			},
			//预约里面的type改变
			yuyue_type_back() { //改变预约弹窗房间信息
				if (this.yy_current == 0) {
					this.yuyue_compete_type = false
					this.yy_maxNumber = 2
					this.yy_roomType = 2 //结构化
				} else {
					this.yuyue_compete_type = true
					this.yy_maxNumber = 8
					this.yy_roomType = 1 //无领导
				}

			},

			//提交预约表单
			submit_xunlian() {
				console.log(this.yy_maxNumber)
				console.log(this.yy_area)
				console.log(this.yy_startTime)
				console.log(this.yy_roomType)
				if (this.yy_maxNumber == "" || this.yy_area == "" || this.yy_startTime == "") {
					uni.showToast({
						title: "请填完整信息",
						icon: "none",
						duration: 2000
					})
				} else {
					var bodyData = {
						"roomName": this.yy_roomName,
						"roomType": this.yy_roomType, //无领导是1，结构化是2
						"number": this.yy_maxNumber,
						"area": this.yy_area,
						"preference": this.yy_preference,
						"isMatch": this.yy_isMatch,
						"startTime": this.yy_startTime,
						"context": this.xinxi,
						"arctleType": 3
					}
					console.log(bodyData)
					this.$H.post("/article/publish_trainArticle.do", bodyData).then(res => {
						let data = res.data
						console.log(data);
						if (data.code == 200) {
							uni.showToast({
								title: "预约成功",
								icon: "success",
								duration: 2000
							})
							setTimeout(function() {
								uni.switchTab({
									url: ('/pages/news/news')
								})
							}, 2000);
						} else if (data.code == 409) {
							uni.showToast({
								title: "您已预约其他房间",
								icon: "none",
								duration: 2000
							})
						} else {
							uni.showToast({
								title: "预约失败",
								icon: "none",
								duration: 2000
							})
						}
					})

					//桂锦写：还要额外加的
				}
			},
			tiezi_onClickItem(e) {
				if (this.tiezi_current != e.currentIndex) {
					this.tiezi_current = e.currentIndex
					this.selectButtonType()
				}
			},
			//换页面
			selectButtonType() {
				if (this.tiezi_current == 0) {
					this.selectedButtonType = "新闻"
				} else if (this.tiezi_current == 1) {
					this.selectedButtonType = "娱乐"
				} else if (this.tiezi_current == 2) {
					this.selectedButtonType = "其他"
				}

			},


			//提交学习区桂锦
			submit_study() {
				const title = this.title;
				const content = this.feedbackText;
				
				if (content == "" || title == "") {
					uni.showToast({
						title: "请填完整信息",
						icon: "none",
						duration: 2000
					})
					return;
				}
				
					let store_token
					
					store_token =  uni.getStorageSync('token');
					console.log(store_token);
					console.log(this.selectedVideoPath);
					uni.uploadFile({
						url: $C.webUrl+"/video/uploadVideo", 
						filePath: "../../static/compete_audio/eeeee.mp4", 
						header:{
							"content-type" :  "multipart/form-data; boundary=--------------------------628036270003031507720152",
							"token":store_token
							},
						name:'file',
						
						// formData: {
						// 	"context":content,
						// 	"title":title,
						// 	"arctleType":1
						// },
						fail: (res) => {
							console.log(res)
						},
						success: (res) => {
							console.log(res);
							let data = JSON.parse(res.data)
							console.log("返回成功");
							console.log(data);
							
						}
					});
			},
			//提交闲聊区桂锦
			submit_xianliao() {
				const title = this.title;
				const content = this.feedbackText;
				// const imagesArray = this.uploadedImages;
				if (content == "" || title == "") {
					uni.showToast({
						title: "请填完整信息",
						icon: "none",
						duration: 2000
					})
					return;
				}
				var bodyData = {
					"arctleType": 2,
					"title": title,
					"context": content,
					"articleImg": this.selectedVideoPath
				}
				console.log("闲聊区信息提交开始");
				this.$H.post('/article/publish_learnArticle.do', bodyData)
					.then(response => {
						let data = response.data
						console.log(data);
						if (data.code == 200) {
							console.log(data);
							uni.showToast({
								title: "发帖成功",
								icon: "success",
								duration: 2000
							})
							setTimeout(function() {
								uni.switchTab({
									url: ('/pages/index/index')
								})
							}, 2000);
						} else {
							uni.showToast({
								title: "发帖失败",
								icon: "none",
								duration: 2000
							})
						}
					})
			},
			submit_qita(){
				const title = this.title;
				const content = this.feedbackText;
				// const imagesArray = this.uploadedImages;
				if (content == "" || title == "") {
					uni.showToast({
						title: "请填完整信息",
						icon: "none",
						duration: 2000
					})
					return;
				}
				var bodyData = {
					"arctleType": 3,
					"title": title,
					"context": content,
					"articleImg": this.selectedVideoPath
				}
				console.log("闲聊区信息提交开始");
				this.$H.post('/article/publish_learnArticle.do', bodyData)
					.then(response => {
						let data = response.data
						console.log(data);
						if (data.code == 200) {
							console.log(data);
							uni.showToast({
								title: "发帖成功",
								icon: "success",
								duration: 2000
							})
							setTimeout(function() {
								uni.switchTab({
									url: ('/pages/index/index')
								})
							}, 2000);
						} else {
							uni.showToast({
								title: "发帖失败",
								icon: "none",
								duration: 2000
							})
						}
					})
			},
			submit_acticle() {
				console.log(this.loading)
				if (this.loading == true) {
					return
				}
				this.loading = true
				console.log(this.loading)
				if (this.selectedButtonType == "新闻") {
					this.submit_study()

				} else if (this.selectedButtonType == "娱乐") {
					this.submit_xianliao()

				} else if (this.selectedButtonType == "其他") {
					this.submit_qita()

				}
				setTimeout(function() {
					this.loading = false
				}, 2000);
				// 
				console.log("dad")

			},
		},


	};
</script>

<style>
	.image-center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.feedback-page {

		padding: 40rpx;
		background-color: white;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: solid lightgray 1rpx;
	}

	.icon {
		flex: 0 0 auto;
		margin-right: 10px;
	}

	.icon img {
		width: 30px;
		height: 30px;
	}

	.title {
		flex: 1;
		font-size: 18px;
		text-align: center;
	}

	.submit {
		flex: 0 0 auto;
		font-size: 16px;
		color: #007bff;
		cursor: pointer;
	}

	.section_new {
		margin-bottom: 10px;
	}

	.section {
		margin-bottom: 20rpx;
	}

	.section-title {
		font-size: 16px;

	}

	.text-title {
		width: 96%;
		height: 48rpx;
		font-size: 35rpx;


		padding: 20rpx;
	}

	.text-area {
		width: 96%;
		margin-bottom: 100rpx;
		font-size: 30rpx;
		border-radius: 10rpx;

		padding: 20rpx;
	}

	.add-image {
		font-size: 16px;
		margin-bottom: 10px;
		display: flex;
	}

	.image-preview {
		display: flex;
		flex-wrap: wrap;
	}

	.image-item {
		position: relative;
		margin-right: 10px;
		margin-bottom: 10px;
	}

	.image-preview img {
		border: 1px solid #ccc;
		padding: 5px;
	}

	.delete-icon {
		position: absolute;
		top: 5px;
		right: 5px;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 2px;
		border-radius: 50%;
		cursor: pointer;
	}

	.button-group {
		display: flex;
		justify-content: space-evenly;
	}

	.custom-button {
		padding: 6px 12px;
		/* Adjust padding for smaller button size */
		border: 1px solid #4095E5;
		background-color: white;
		color: #4095E5;
		cursor: pointer;
		font-size: 30rpx;
		/* Adjust font size for smaller button text */
	}

	.custom-button.active {
		background-color: #4095E5;
		color: white;
	}

	.image-container {
		position: relative;
		display: inline-block;
		margin-right: 10rpx;
		/* 添加右边间隙 */
	}

	.image-container image {
		border-radius: 10rpx;

		width: 160rpx;
		height: 160rpx;
	}

	.delete-btn {
		position: absolute;

		display: flex;
		justify-content: center;
		align-items: center;
		top: 2rpx;
		right: 2rpx;
		cursor: pointer;
		background-color: #4095E5;
		color: white;
		padding: 12rpx;
		height: 12rpx;
		width: 12rpx;
		font-size: 20rpx;
		border-radius: 10%;
	}

	.chushi_denglu {
		display: flex;
		background-color: #4095E5;
		border-radius: 40rpx;
		width: 600rpx;
		height: 110rpx;

		flex-direction: row;
		justify-content: center;
		align-items: center;


	}

	.popup_content {

		height: 600rpx;
		border-radius: 10%;
		border: 10px solid white;
		background-color: white;
		z-index: 1002;


	}

	.popup_content_in {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;

	}

	.popup_top {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		height: 10%;

	}

	.popup_middle {
		display: flex;
		flex-direction: column;
		height: 90%;
		width: 100%;

	}


	.popup_shuru {
		display: flex;
		border-radius: 40rpx;
		width: 600rpx;
		height: 70rpx;
		margin: 10rpx;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 3rpx;
	}

	.select_button {
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

	.popup_tijiao {
		display: flex;
		background-color: #4095E5;
		border-radius: 40rpx;
		width: 150rpx;
		height: 90rpx;

		flex-direction: row;
		justify-content: center;
		align-items: center;

	}
</style>