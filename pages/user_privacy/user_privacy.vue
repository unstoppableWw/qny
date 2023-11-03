<template>
	<view class="privacy-settings">

		<view class="settings-list">
			<view v-for="(setting, index) in privacySettings" :key="index" class="setting">
				<view class="setting-details">
					<p class="setting-name">{{ setting.name }}</p>
					<label class="switch">
						<input type="checkbox" />
						<view style="position: absolute; right: 20rpx; ">
							<switch @change="event=>change_pipei(event,index)" :checked="setting.enabled" />
						</view>
					</label>
				</view>
			</view>
		</view>
		<view  class="setting" @click="to_blackList">
				<view class="setting-details">
					<p class="setting-name">黑名单</p>
					<label class="switch">
						<input type="checkbox" />
						<view style="position: absolute; right: 50rpx; ">
							<uni-icons  type="forward" size="20"></uni-icons>
						</view>
					</label>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				privacySettings: [{
						name: '主页我的帖子可见',
						enabled: true
					},
					{
						name: '主页我的收藏可见',
						enabled: true
					},
					
					
					
					// ... 可继续添加更多隐私设置
				],
				serverData: [],
			};
		},
		methods: {
			//改变匹配状态
			change_pipei(e,index) {
				this.privacySettings[index].enabled=!this.privacySettings[index].enabled;
				var state0=this.getState(0);
				var state1=this.getState(1);
				var state2=this.getState(2);
				var state3=this.getState(3);
				var state4=this.getState(4);
				var settingInfo = {
					"viewMyFavorites": state1,
					"allowPrivateMessages": state2,
					"viewMyPosts": state0,
					"displayLocation": state4,
					"displayProfile": state3,
				}
				this.$H.post('/UserPrivacy/updataSetting.do', settingInfo)
					.then(response => {})
					.catch(error => {
						console.error('Error fetching data:', error);
					});
			},
			getState(index) {
				console.log('是否还不舍得放回家时被警方'+this.privacySettings[index].enabled)
				if (this.privacySettings[index].enabled) {
					return 1;
				} else {
					return 0;
				}
			},
			to_blackList(){
				uni.navigateTo({
					url:"/pages/user_blacklist/user_blacklist"
				})
			}
		},
		onLoad() {
			this.$H.post("/UserPrivacy/getMySetting.do").then(res => {
				if (res.data.code == 200) {
					console.log('隐私设置数据返回成功！')
					this.serverData = res.data.data;
					console.log(this.serverData);
					// 下面是依据服务器返回数据修改对应显示状态
					if (this.serverData['viewMyPosts'] == 1) {
						this.privacySettings[0].enabled = true;
					} else {
						this.privacySettings[0].enabled = false;
					}

					if (this.serverData['viewMyFavorites'] == 1) {
						this.privacySettings[1].enabled = true;
					} else {
						this.privacySettings[1].enabled = false;
					}

					if (this.serverData['allowPrivateMessages'] == 1) {
						this.privacySettings[2].enabled = true;
					} else {
						this.privacySettings[2].enabled = false;
					}

					if (this.serverData['displayProfile'] == 1) {
						this.privacySettings[3].enabled = true;
					} else {
						this.privacySettings[3].enabled = false;
					}

					if (this.serverData['displayLocation'] == 1) {
						this.privacySettings[4].enabled = true;
					} else {
						this.privacySettings[4].enabled = false;
					}
				} else {
					console.log('隐私设置数据返回失败！')
				}
			})
		}
	};
</script>

<style scoped>
	/* 样式部分 */
	.privacy-settings {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
	}

	h2 {
		font-size: 28px;
		margin-bottom: 20px;
	}

	.settings-list {
		display: flex;
		flex-direction: column;
	}

	.setting {
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 10px;
		padding-left: 30rpx;
		border-bottom: 1rpx solid #EEE9E9;
	}

	.header {
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		border-bottom: solid 1rpx #ccc;
	}

	.setting-details {
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.setting-name {
		flex: 1;
	}

	.switch {
		display: inline-block;
		width: 40px;
		height: 24px;
		display: flex;
		align-items: center;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: relative;
		cursor: pointer;
		display: inline-block;
		width: 40px;
		height: 24px;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 24px;
	}

	.slider.active {
		background-color: #007bff;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 18px;
		width: 18px;
		left: 3px;
		top: 3px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked+.slider:before {
		transform: translateX(16px);
	}
</style>