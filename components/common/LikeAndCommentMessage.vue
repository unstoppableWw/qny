<template>
	<view class="chat-message" @click="to_tiezi(message.articleId)">
		<view class="avatar">
		  <image :src="message.userImg" class="avatar_img"/>
		  <!-- <image src="../../static/tom.jpg" class="avatar_img"/> -->
		  
		</view>
		<view v-if="message.isLike == true" class="tongzhi_card">
			<view>
				{{message.userName}}
			</view>
			
			<view style="color: grey;">
				点赞了你的帖子
				<!-- {{message.articleId}} -->
			</view>
			<view style="margin-top: 6%;" class="time">{{ timeAgo(message.time) }}</view>
		</view>
		
		<view v-else-if = "message.isLike == false" class="tongzhi_card">
			
			<view>
				{{message.userName}}
			</view>
			
			<text class="pinglun_text">
				评论了你的帖子：{{message.content}}你不知道我你不知道我你不知道我你不知道我你不知道我你不知道我你不知道我
				<!-- {{message.articleId}}: -->
			</text>
			<view style="margin-top: 6%;" class="time">{{ timeAgo(message.time) }}</view>
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
  },
  data:{
	
  },
  methods:{
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
		to_tiezi(){
			
		}
  }
};
</script>

<style scoped>
.pinglun_text{
	color: grey;
	width: 500rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	
}
.tongzhi_card{
	margin-bottom: 20rpx;
}
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
  font-weight: bold;
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
  font-weight: bold;
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
.out_view{
	display: flex;
	margin-bottom: 10px;
	align-items: flex-start;
	position: relative;
	margin-top: 6%;
}
.card {
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 16px;
  
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20%;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #4095E5;
}

.room-number {
  font-size: 32rpx;
  font-weight: bold;
  color: #888;
}

.description {
  height: 50%;
  margin-top: 16px;
  font-size: medium;
}

.button-container {
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-button {
  margin-top: 10%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50rpx;
}
</style>
