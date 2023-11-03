<template>
	<view class="settings-page">
		
		<view class="scrollable-view">
			<view class="setting-item" v-for="(item, index) in settings" :key="index"
				@click="handleItemClick(item.label)"
				:style="{ 'border-bottom': (index === 1)||(index === 3) ? '20rpx solid #F5F5F5' : '1rpx solid #EEE9E9' }"
				>
				<view class="setting-item-left">
					{{ item.label }}
				</view>
				<view class="setting-item-right">
					<image class="icon" src="@/static/temp_pic/right.png" mode="aspectFill" />
				</view>
			</view>
		</view>
		<uni-popup ref="unLogin" type="dialog">
			<uni-popup-dialog type="msgType" cancelText="取消" confirmText="确认" title="询问" content="你确定要退出登录吗" @confirm="confirm_unLogin" @close="cancle_unLogin"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import $store from '@/store/mian_store.js';
	const app = getApp()
	export default {
		name: 'SettingsPage',
		data() {
			return {
				settings: [{
						label: '意见反馈'
					},
					{
						label: '用户协议'
					},
					{
						label: '隐私设置'
					},
	
					{
						label: '退出登录'
					},
				],
			};
		},
		methods: {
			goback() {

			},
			handleItemClick(label) {
				// You can add different logic for each item based on its label
				console.log("你好")
				switch (label) {
					case '意见反馈':
						this.openFeedbackPage();
						console.log("进来")
						break;
					case '用户协议':
						this.openUserAgreementPage();
						break;
					case '隐私设置':
						this.openUserPrivacy();
						break;
					case '关于我们':
						this.openAboutUs();
						break;
					case '注销账号':
						this.openUnregist();
						break;
					case '退出登录':
						this.unLogin();
						break;
						// Add more cases for other settings
					default:
						// Default action if no specific action defined
						break;
				}
			},
			openFeedbackPage() {
				console.log("再次进来");
				uni.navigateTo({
					url: '../user_feedback/user_feedback'
				})
			},
			openUserAgreementPage() {
				uni.navigateTo({
					url: '../user_agreement/user_agreement'
				})
			},
			openUserPrivacy() {
				uni.navigateTo({
					url: '../user_privacy/user_privacy'
				})
			},
			openAboutUs() {
				uni.navigateTo({
					url: '../about_us/about_us'
				})
			},
			openUnregist() {
				uni.navigateTo({
					url: '../user_zhuxiao/user_zhuxiao'
				})
			},
			unLogin(){
				this.$refs.unLogin.open("center")
			},
			confirm_unLogin(){
				this.$H.post("/user/logout.do").then(res => {
					console.log(res);
					if (res.data.code == 200) {
						uni.setStorageSync('token', null)
						$store.state.token = null
						app.globalData.socketObj.closeSocket()
						uni.showToast({
							icon: 'success',
							title: "退出登录成功",
							duration: 2000
						})
						// 导航到登录页面
						setTimeout(() => {
							uni.reLaunch({
								url: '../head_denglu/head_denglu?repeat=2', // 这是示例路径，根据你的实际情况进行修改
							});
						}, 1000)
				
					} else {
						uni.showToast({
							icon: 'none',
							title: "退出登录失败，请重试",
							duration: 2000
						})
					}
				})
			},
			cancle_unLogin(){
				this.$refs.UnLogin.close()
			},
			
			
			// Add more methods for other actions
		},
	};
</script>

<style>
	.settings-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.header {
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		border-bottom: solid 1rpx #ccc;
	}

	.scrollable-view {
		overflow-y: scroll;
		height: calc(100% - 100px);
		/* Adjust the height to make space for the buttons */
	}

	.setting-item {
		display: flex;
		align-items: center;
		padding: 10px;
		padding-left: 40rpx;
	}

	.setting-item-left {
		flex: 1;
		font-size: medium;
	}

	.setting-item-right {
		flex-shrink: 0;
		margin-left: 10px;
		display: flex;
		align-items: center;
		/* Center the icon vertically */
	}

	.setting-item-right .icon {
		width: 40rpx;
		height: 40rpx;
		display: block;
		/* Ensure the image is a block element for alignment */
	}

	.buttons-container {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
</style>