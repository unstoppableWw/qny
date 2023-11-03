
<template>
  <view class="chat-message" :class="{ 'my-message': isMyMessage }">
    <view class="avatar" style="display: flex;flex-direction: column;margin-right: 5rpx;justify-content: center;align-items: center;">
      <image :src="message.userImg" class="avatar_img"/>
	  
    </view>
    <view class="content">
		<text v-if="!message.isXitong" class="userName " :class="{ 'my-userName': isMyMessage }" >{{message.userName}}</text>
		<text v-else class="userName xitong" :class="{ 'my-userName': isMyMessage }" >{{message.userName}}</text>
      <view class="text" :class="{ 'my-text': isMyMessage }" ref="text">{{ message.text }}</view>
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
	isXitong: {
	  type: Boolean,
	  default: false,
	},
  },
  
  methods: {
   
  },
};
</script>

<style scoped>
.chat-message {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  position: relative;
  
}

.my-message {
  flex-direction: row-reverse;
}

.avatar_img {
  margin-right: 20rpx;
  margin-left: 20rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 100%;
  
}

.content {
  display: flex;
  flex-direction: column;
  position: relative; 
  width: 62%;
}
.userName{
	font-size: 18rpx;
	font-weight: 100;
	color: darkgrey;
}
.my-userName{
	font-size: 18rpx;
	font-weight: 100;
	color: darkgrey;
	align-self: flex-end;
}
.xitong{
	color: #4095E5;
}

.text {
  display: inline-block;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 24rpx;
  
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
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 24rpx;
  
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
</style>
