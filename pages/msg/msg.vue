<template>
	<view class="flex flex-column align-center" style=" height: 100%;width: 100%;position: absolute;">
		<uni-nav-bar  :fixed="true"   status-bar     leftWidth="390rpx" rightWidth="200rpx"
					 :border="false">
			<template v-slot:left>
				 
			    <view style="font-size: 40rpx;margin-left: 30rpx;font-weight: 550;">消息通知</view>
			</template>
			<template v-slot:right>
				<image class="small_icon" src="../../static/msg/msg-delete.svg"></image>
			    
			  </template>
		</uni-nav-bar>
		
		<view class="msg_select">
			<view class="msg_button" style="color: white; font-size: 30rpx;" @click="to_guanzhu">
				<image class="small_icon" style="margin-right: 10rpx;margin-left: 0rpx;" src="../../static/msg/msg_guanzhu.svg" ></image>
				关注
				
			</view>
			<view class="msg_button" style="color: white; font-size: 30rpx;" @click="to_fensi">
				<image class="small_icon" style="margin-right: 10rpx;margin-left: 0rpx;" src="../../static/msg/msg_fensi.svg" ></image>
				粉丝
			</view>
			<view class="msg_button" style="color: white; font-size: 30rpx;" @click="to_tongzhi">
				<image class="small_icon" style="margin-right: 10rpx;margin-left: 0rpx;" src="../../static/msg/msg_tongzhi.svg" ></image>
				通知
				<view v-if="this.msg_tipNum>0" class="msg_tip">{{this.msg_tipNum}}</view>
			</view>
		</view>
		<view class="msg_sixin" >
			<view >全部私信</view>
			<view class="flex align-center justify-center" style="margin-top: 30rpx;">
				
				<scroll-view scroll-y="true" style="height: 900rpx;width: 100%;">
					<view v-for="(item,index) in msg_list " :key="index" class="flex align-center p-2  border-light-secondary animated fast fadeIn" hover-class="bg-light" @click="to_chat(item.userId, item.userName, item.userImg, item.sessionId, item.type)">
						<image :src="item.userImg"
						style="height: 100rpx;width: 100rpx;"
						class="rounded-circle mr-2 bg-secondary"></image>
						
						<view class="flex flex-column flex-1">
							<view class="flex align-center justify-between">
								<text style="font-size: 30rpx; font-weight: 550;">{{item.userName}}</text>
								<text class="font-sm text-secondary" style="color: #D5D5D5;">
								{{timeAgo(item.time)}}</text>
							</view>
							<view class="flex align-center justify-between">
								<text class="text-secondary text-ellipsis" 
								style="max-width: 500rpx; font-size: 20rpx;color: #D5D5D5;">{{item.content}}</text>
								<view v-if="item.unread!=0" class="flex align-center justify-center" style="font-size: 10rpx;background-color: red;border-radius: 100%;height: 30rpx;width: 30rpx;color: white;">{{item.unread}}</view>
							</view>
						</view>
					</view>
					
				</scroll-view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg_list:[],
				msg_tipNum:0,
			}
		},
		onLoad(){
			console.log("onload");
			this.getData()
		},
		onShow() {
			this.getData()
			console.log("onshow");
		},
		onBackPress() {
			this.getData()
		},
		methods: {
			timeAgo(dateString) {
				  const currentDate = new Date();
				  const targetDate = new Date(dateString);
				  const timeDiff = currentDate - targetDate;
				  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
				  		
				  if (daysAgo === 0) {
				  			const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
				  			if (hoursAgo === 0) {
				  			  const minutesAgo = Math.floor(timeDiff / (1000 * 60));
				  			  return `${minutesAgo} 分钟前`;
				  			}
				  			return `${hoursAgo} 小时前`;
				  } else if (daysAgo < 30) {
				  			return `${daysAgo} 天前`;
				  } else {
				  			const month = targetDate.getMonth() + 1;  // 月份从 0 开始，需要加 1
				  			const day = targetDate.getDate();
				  			return `${month} 月 ${day} 日`;
				  }
			},
			to_guanzhu(){
				// 打开发布页面
				uni.navigateTo({
					url: '../msg_guanzhu/msg_guanzhu',
				})
			},
			to_fensi(){
				// 打开发布页面
				uni.navigateTo({
					url: '../msg_fensi/msg_fensi',
				})
			},
			to_tongzhi(){
				// 打开发布页面
				uni.navigateTo({
					url: '../msg_tongzhi/msg_tongzhi',
				})
			},
			to_chat(targetUserId, targetUserName, targetUserImg, sessionId, type){
				uni.navigateTo({
					url:`../user_chat/user_chat?targetUserId=${targetUserId}&targetUserName=${targetUserName}&targetUserImg=${targetUserImg}&sessionId=${sessionId}&type=${type}`
				})
			},
			
			getData(){
				// 获取聊天信息数据
				this.$H.post("/message/list").then(res=>{
					let data =res.data
					if(data.code==200){
						var arr = []
						for (let i = 0; i < data.data.length; i++) {
							// 生成列表模板
							arr.push({
								userId:data.data[i].userId,
								userName:data.data[i].userName,
								userImg:data.data[i].userImg,
								sessionId:data.data[i].sessionId,
								content:data.data[i].content,
								time:data.data[i].time,
								unread:data.data[i].unread,
								type:data.data[i].type
							})
						}
						this.msg_list=arr
						console.log(this.msg_list)
					}else{
						uni.showToast({
							title:"获取聊天信息失败",
							icon:"none",
							duration:2000
						})
					}
					
				})
				//获取是否有未读通知
				// this.$H.post("/notice").then(res=>{
				// 	let data = res.data
				// 	console.log(data);
				// 	if(data.code==200){
				// 		this.msg_tipNum=data.data.isUnRead
				// 		console.log(this.msg_list)
				// 	}else{
						
				// 	}
				// })
			}
		}
	}
</script>

<style>
	@import '../../common/msg.css';
	.msg_tip{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		margin-bottom: 10%;
		margin-left: 20%;
		font-size: 10rpx;
		border-radius: 100%;
		background-color: red;
		height: 30rpx;
		width: 30rpx;
	}
</style>
