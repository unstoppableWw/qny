
<template>
  <view class="chat-message" :class="{ 'my-message': isMyMessage }">
    <view class="avatar">
      <image :src="message.avatar" class="avatar_img" @click="to_selfpage()" />
    </view>
	<view v-if="message.isInvite == true" :class="{ out_view_my: !isMyMessage, out_view_notmy: isMyMessage }">
		<view class="card">
		  <view class="header">
		    <view class="title">{{message.type}}</view>
		    <view class="room-number">房间号：{{message.roomId}}</view>
		  </view>
		  <view class="description">有空吗？诚挚地邀请你加入咱的{{message.type}}训练房间，和我一起提高面试技巧吧~</view>
		  <view class="button-container">
		    <button class="centered-button" @click="agree(message.roomId)">接受邀请</button>
		  </view>
		</view>
		<!-- <view style="margin-top: 8%;" class="time">{{ timeAgo(message.time) }}</view> -->
	</view>
    
	<view v-else class="content">
      <view class="text" :class="{ 'my-text': isMyMessage }" ref="text">{{ message.text }}</view>
      <view class="time" :class="{ 'my-time': isMyMessage }">{{ timeAgo(message.time) }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    message: {
      type: Object, 
      required: true,
    },
    isMyMessage: {
      type: Boolean,
      default: false,
    },
	myId:0,
	hisId:0,
  },

  methods: {
    timeAgo(dateString) {
		  const currentDate = new Date();
		  const targetDate = new Date(dateString);
		  const timeDiff = currentDate - targetDate + 2000;
		  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		  		
		  if (daysAgo === 0) {
		  			const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
		  			if (hoursAgo === 0) {
		  			  const minutesAgo = Math.floor(timeDiff / (1000 * 60));
					  if(minutesAgo==0){
						  return "刚刚"
					  }
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
	to_selfpage(){
		console.log(this.myId);
		console.log(this.hisId);
		if (this.isMyMessage==true) {
			uni.switchTab({
				url: '/pages/my/my'
			})
		} else {
			uni.navigateTo({
				url: `../his_page/his_page?userId=${this.hisId}`
			});
		}
	},
	
	agree(roomId) {
		this.$H.post("/room/come_room.do", {"roomId": roomId}).then(res => {
			let data = res.data
			if(data.code==200){
				//进房逻辑
				if(data.data.type== "无领导"){
					uni.navigateTo({
						url:`../compete_wulingdao/compete_wulingdao?roomId=${data.data.roomId}&userId=${data.data.userId}`
					})
				}else{
					uni.navigateTo({
						url:`../compete_jiegouhua/compete_jiegouhua?roomId=${data.data.roomId}&userId=${data.data.userId}`
					})
				}
			}else if(data.code==404){
				
				uni.showToast({
					title:"房间不存在",
					icon:"none",
					duration:2000
				})
			}else if(code==402){
				
				uni.showToast({
					title:"房间人数已满",
					icon:"none",
					duration:2000
				})
			}
		})
	}
  },
};
</script>

<style scoped>
.chat-message {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;
  position: relative;
  margin-top: 6%;
}

.my-message {
  flex-direction: row-reverse;
}

.avatar_img {
  margin-right: 20rpx;
  margin-left: 20rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  
}

.content {
  display: flex;
  flex-direction: column;
  position: relative; 
  width: 62%;
}

.text {
  display: inline-block;
  padding: 10px;
  font-size: small;
  font-weight: 600;
  border-radius: 10px;
  background-color: #F5F5F5;
  text-align: justify;
  word-break: break-all;
  margin-bottom: 5px;
  white-space: pre-wrap;
 align-self: flex-start;
}

.my-text {
  display: inline-block;
  padding: 10px;
  font-size: small;
  font-weight: 600;
  border-radius: 10px;
  align-self: flex-end;
  background-color: #4095E5;
  color: white;
  text-align: justify;
  word-break: break-all;
  margin-bottom: 5px;
  white-space: pre-wrap;
  
}

.time {
  font-size: 12px;
  color: lightgray;
  position: absolute;
  bottom: -15px;
  width: 260rpx;
}

.my-time {
  right: 0;
  left: auto;
  width: 260rpx;
  text-align: right;
}

.my-text .time {
  right: 0;
  left: auto;
}

.text .time {
  left: 0;
  right: auto;
}
.out_view_my{
	display: flex;
	
	margin-bottom: 10px;
	align-items: flex-start;
	position: relative;
	justify-content: flex-start;
	
}
.out_view_notmy{
	display: flex;
	
	margin-bottom: 10px;
	align-items: flex-start;
	position: relative;
	justify-content: flex-end;
	
}
.card {
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid #EFEFEF;
  padding: 16px;
  margin-bottom: 10px;
  border-radius: 40rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20%;
}

.title {
  font-size: 35rpx;
  font-weight: bold;
  color: #4095E5;
}

.room-number {
  font-size: 22rpx;
  /* font-weight: bold; */
  color: lightgrey;
}

.description {
  color: grey;
  height: 50%;
  margin-top: 16px;
  font-size: 30rpx;
}

.button-container {
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-button {
  margin-top: 10%;
  background-color: #4095E5;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 30rpx;
  border-radius: 50rpx;
}

</style>
