<template>
	<view class="total_view">

		<!-- 黑名单列表，如有 -->
		<view>
			<view v-for="(item, index) in blacklist" :key="item.id">
				<view class="blacklist-item">
					<view class="touxiang">
						<image :src="item.userImg" mode="aspectFill"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;">
						</image>
					</view>
					<view style="width: 50%;height: 140rpx;display: flex;flex-direction: column;">
						<view style="width: 100%;height: 70rpx;font-size: 32rpx;padding-top: 16rpx;">
							{{item.userName}}
						</view>
						<view class="signature">
							{{item.description}}
						</view>
					</view>
					<view style="width: 30%;height: 140rpx;display: flex;justify-content: center;align-items: center;">
						<view class="btn" @click="showComfirm(item)">
							取消拉黑
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 如果无黑名单 -->
		<view v-if="blacklist.length==0"
			style="margin-top: 5%;font-size: 32rpx;color:gray;width: 100%;display: flex;justify-content: center;">
			暂无黑名单~
		</view>
		<!-- 弹窗确认 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="msgType" cancelText="关闭" confirmText="同意" title="操作" content="确认取消拉黑该用户?"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'BlacklistPage',
		data() { 
			return {
				curUser: {}, //当前选中用户
				blacklist: [
					// {
					// 	id: 0,
					// 	userName: 'Micheal',
					// 	userSignature: 'What the hell!!!',
					// 	userImg: 'https://ts3.cn.mm.bing.net/th?id=ORMS.afb99db7dfaae86c25a91a65f04244a1&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0',
					// },
					// {
					// 	id: 1,
					// 	userName: '老补丁',
					// 	userSignature: '播放结束的发掘和发噶几号发噶就会分公司',
					// 	userImg: 'https://ts3.cn.mm.bing.net/th?id=ORMS.dbff89ad0d403a53318170bb75bbeeec&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.25&p=0',
					// },
					// {
					// 	id: 2,
					// 	userName: '费德迷',
					// 	userSignature: '四格漫画杀反贼打发士大夫把什么都你绽放是撒旦发射点',
					// 	userImg: 'https://ts3.cn.mm.bing.net/th?id=ORMS.faedc282c23fdf2a0a924e7be57b276c&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.25&p=0',
					// },
				],
			}
		},
		onLoad(option) {
			this.$H.post('/Blacklist/getBlack.do')
				.then(response => {
					// 请求成功时更新blacklist      
					this.blacklist = response.data.data;
					console.log(this.blacklist);
				})
				.catch(error => {
					console.error('Error fetching data:', error);
				});
		},
		methods: {
			showComfirm(item){
				this.curUser=item
				this.$refs.alertDialog.open()
			},
			// 取消拉黑操作
			dialogConfirm() {
				const index = this.blacklist.indexOf(this.curUser);
				// 拉出黑名单
				var userInfo={
					"secondaryUserId":this.curUser.userId,
				}
				this.$H.post('/Blacklist/delelteBlack.do',userInfo)
					.then(response => {
						// 本地黑名单也拉出
						if (index !== -1) {
							this.blacklist.splice(index, 1);
						}
					})
					.catch(error => {
						console.error('Error fetching data:', error);
					});
				this.$refs.alertDialog.close()
				console.log('成功取消拉黑用户:' + this.curUser.name)
			},
		}
	}
</script>

<style>
	.total_view {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		overflow-x: auto;
	}

	.header {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid lightgrey;
		flex-direction: row;
	}

	.blacklist-item {
		width: 100%;
		height: 140rpx;
		display: flex;
		flex-direction: row;
	}

	.touxiang {
		width: 20%;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.signature {
		color: gray;
		width: 100%;
		height: 70rpx;
		font-size: 26rpx;
		padding-bottom: 20rpx;
		white-space: nowrap;
		/* 防止文本换行 */
		overflow: hidden;
		/* 隐藏文本溢出部分 */
		text-overflow: ellipsis;
		/* 显示省略号 */
		max-width: 80%;
	}
	
	.btn{
		width: 130rpx;
		height: 60rpx;
		border-radius: 50rpx;
		background-color: #4095e5;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
	}
</style>