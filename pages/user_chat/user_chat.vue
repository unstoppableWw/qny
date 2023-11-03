<template>
  <view class="chat-container" style="overflow: hidden; display: flex; flex-direction: column; justify-content: flex-start;align-items: center;">
    <uni-nav-bar  :fixed="true"   status-bar left-icon="left"    leftWidth="290rpx" rightWidth="200rpx"   
    			 @clickLeft="goout"   background-color="#F7F7F7" :border="false">
		<template v-slot:left>
			 <uni-icons  type="left" size="24"  />
		    <view style="font-size: 33rpx;margin-left: 30rpx;">{{targetUserName}}</view>
		</template>
		<template v-slot:right>
			 <uni-icons  type="more-filled" size="24" @click="show_popup" style="margin-right: 30rpx;"/>
		    
		  </template>
	</uni-nav-bar>
	<!-- <view class="chat-header" style="display: flex;align-items: flex-end; padding-left: 30rpx;">
		<image src="../../static/compete/go_out.svg" style="height: 50rpx; width: 50rpx;margin-bottom: 20rpx;" @click="goout"></image>
		<view style="font-size: 35rpx; text-align: left;margin-left: 50rpx;margin-bottom: 20rpx;margin-right: auto;">{{ targetUserName }}</view>
		<image @click="show_popup" src="../../static/temp_pic/caozuo.png"
			style="width: 45rpx;height: 45rpx;margin-right: 40rpx;margin-bottom: 30rpx;"></image>
	</view> -->
	<view>
		<!-- <view class="chat-messages" ref="messagesContainer">
		  <ChatMessage
		    v-for="(message, index) in messages"
		    :key="index"
		    :message="message"
		    :is-my-message="message.isMyMessage"
		  />
		  
		</view> -->
		<!-- 280是因为上面130 下面150 -->
		<scroll-view  :style="{height: `${windowHeight-upHeight-320}rpx`}"
		id="scrollview"
		scroll-y="true" 
		:scroll-top="scrollTop"
		class="chat-messages"
		>
		<view id="msglistview">
			<view v-if="type==2">
				<LikeAndCommentMessage
					v-for="(message, index) in messages"
					:key="index"
					:message="message"
				/>
			</view>
			<!-- <view v-else-if="conversationId=='reserve'">
				<reserveMessage
					v-for="(message, index) in messages"
					:key="index"
					:message="message"
				/>
			</view> -->
			<view v-else>
				<ChatMessage
				  v-for="(message, index) in messages"
				  :key="index"
				  :message="message"
				  :is-my-message="message.isMyMessage"
				  :myId = "userId"
				  :hisId = "targetUserId"
				/>
			</view>
		</view>
			
		</scroll-view>
	</view>
    
    <view class="chat-input" :style="{bottom: `${downHeight}rpx`}">
          <!-- 选择图片图标 -->
         <!-- <view class="icon-container" @click="chooseImage">
            <image class="icon-image" src="@/static/temp_pic/insert_pic.png" alt="Image Icon" />
          </view> -->
          <!-- 带有表情切换图标的输入框 -->
          <view class="input-wrapper" style="height: 60rpx;">
            <input ref="emojiInput" selection-end="-1" v-model="inputText" style="font-size: 25rpx;" :adjust-position="false"  placeholder="请输入消息..." 
                @blur="cursorss"  />
			
            <view class="icon-container" @click.stop="toogleDialogEmoji" color="#fff">
              <image  src="@/static/temp_pic/smile.svg" alt="Heart Icon"  style="width: 40rpx;height: 40rpx;"/>
            </view>
          </view>
          
          <!-- 发送消息按钮 -->
          <view class="send-button" @click="sendMessage">发送</view>
    </view>
	<!-- 表情包 -->
    <view class="emoji_box" v-show="showDialog" style="z-index: 1000;">
		<view class="emoji-container" :style="{height:`${windowHeight*0.3}rpx`}">
		  <view class="emoji-row">
		    <view
		      class="emoji-item"
		      v-for="(emoji, index) in emojis"
		      :key="index"
		      @click="insertEmoji(emoji)"
		    >
		      {{ emoji }}
		    </view>
		  </view>
		</view>
	</view>
	<view style= "position: absolute; width: 100%;height: 100%;" v-show="showDialog" @click="closeEmoji" >
	</view>
	<!-- 帖子反馈弹窗 -->
	<view style="position: absolute;z-index: 2000;">
		<uni-popup ref="fankui" background-color="#fff">
			<view class="tanchuang_inner" style="height: 400rpx;">
				<view class="tanchuang_top">
					<view style="height: 15%;display: flex;justify-content: flex-start;width: 100%;height: 10%;">
						<text style="margin: 20rpx;margin-right: auto;">用户操作</text>
	
					</view>
					<view class="flex align-center justify-center"
						style="height: 70%;width: 100%; font-size: 40rpx;color: black;opacity: 0.5;margin-bottom: auto; ">
						对ta有什么意见吗
					</view>
					<view class="tanchuang_bottom" style="margin-top: 100rpx;">
	
						<view class="tanchuang_tijiao"
							style="color: white; font-size: 30rpx;background-color: #4095E5;" @click="jubao">举报用户
						</view>
						<view class="tanchuang_tijiao" 
							style="color: white; font-size: 30rpx;background-color: #6C6C6C;"
							@click="lahei">拉黑删除</view>
	
					</view>
	
				</view>
			</view>
		</uni-popup>
	</view>
	<!-- 帖子举报弹窗 -->
	<view style="position: absolute;z-index: 2000;">
		<uni-popup ref="jubao" background-color="#fff">
			<view class="tanchuang_inner" style="height: 800rpx;">
				<view class="tanchuang_top">
					<view style="height: 15%;display: flex;justify-content: flex-start;width: 100%;height: 10%;">
						<text style="margin: 20rpx;margin-right: auto;">举报标签</text>
	
					</view>
					<!-- 举报的标签 -->
					<scroll-view scroll-y="true" class="jubao_view" :show-scrollbar="false">
						<!-- 可滚动标签区域 -->
						<view v-for="(tag, index) in jubaolabel" :key="index" @click="chooseJubaoLabel(index)"
							:class="{ 'selected-tag': tag.selected, 'unselected-tag': !tag.selected }">
							{{ tag.label }}
						</view>
					</scroll-view>
					<view class="tanchuang_bottom" style="margin-top: 50rpx;">
	
						<view @click="submit_jubao" class="tanchuang_tijiao"
							style="color: white; font-size: 30rpx;background-color: #4095E5;">提交举报</view>
	
	
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
  </view>
</template>

<script>
import ChatMessage from "@/components/common/ChatMessage.vue";
import LikeAndCommentMessage from "@/components/common/LikeAndCommentMessage.vue";
import reserveMessage from "@/components/common/reserveMessage.vue";
import emojiData from "@/pages/user_chat/emojis.json";
import { watch } from "vue";
// import {VEmojiPicker} from 'v-emoji-picker'

const app = getApp()

export default {
  components: {
    ChatMessage,
	LikeAndCommentMessage,
	reserveMessage,
	// VEmojiPicker
  },
  created() {
      // 加载 emoji.json 文件并填充 emojis 数组
      this.loadEmojiData();
    },
	onHide() {
	    uni.offKeyboardHeightChange();  // 取消监听键盘高度变化事件，避免内存消耗
	},
  onLoad:function(option){
	  console.log(option);
	//获取scroll-view高度
	let _sysInfo = uni.getSystemInfoSync()
	let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight
	this.xuniHeight = _heightDiff > 0 ? _heightDiff : 0
	uni.onKeyboardHeightChange(res => {
		console.log(res);
		this.keyboardHeight = (res.height-this.xuniHeight)>0 ? (res.height-this.xuniHeight):0
		this.downHeight = this.rpxTopx(this.keyboardHeight)
		 this.upHeight = this.rpxTopx(this.keyboardHeight)
	  })
	
  	this.targetUserId = option.targetUserId
	this.targetUserName = option.targetUserName
	this.targetUserImg = option.targetUserImg
	this.sessionId = option.sessionId
	this.type = option.type
	
	//查看是否可以私聊
	this.$H.post("/UserPrivacy/isCanChat.do", {"userId": this.targetUserId}).then(res => {
		let data = res.data
		console.log(data);
		if(data.data!=1&&this.type==1){
			uni.showToast({
				icon:"error",
				title:"您已被拉黑",
				duration:2000
			})
			setTimeout(()=>{
				uni.navigateBack()
			},2000)
		}
		
		
	})
	var arr = []
	if (this.type == 1) {
		this.$H.post("/chat_message/detail", {"sessionId": this.sessionId}).then(res => {
			let data = res.data.data
			console.log(data);
			this.userId = data.userId
			this.userImg = data.userImg
			for (let i = 0; i < data.messageList.length; i++) {
				var isMyMessage = false
				var avatar = option.targetUserImg
				if (data.messageList[i].fromId == this.userId) {
					isMyMessage = true
					avatar = this.userImg
				}
				if (data.messageList[i].type == 1) {
					arr.push({
						avatar: avatar,
						type: data.messageList[i].content.split('_')[0],
						roomId: data.messageList[i].content.split('_')[1],
						time: data.messageList[i].time,
						isMyMessage: isMyMessage,
						isInvite: true
					})
				} else {
					arr.push({
						avatar: avatar,
						text: data.messageList[i].content,
						time: data.messageList[i].time,
						isMyMessage: isMyMessage,
						isInvite: false
					})
				}
			}
		})
	} else if (this.type == 2) {
		this.$H.post("/notice_message/detail", {"sessionId": this.sessionId}).then(res => {
			let data = res.data.data
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				var isLike = true
				if (data[i].type == 1) {
					isLike = false
				}
				arr.push({
					avatar: option.targetUserImg,
					userId: data[i].userId,
					userName: data[i].userName,
					userImg: data[i].userImg,
					articleId: data[i].articleId,
					content: data[i].content,
					isLike: isLike,
					time: data[i].time,
					isMyMessage: false
				})
			}
		})
	}
	
	// this.$H.post("/message/detail", {"conversationId": this.conversationId}).then(res => {
	// 	let data = res.data.data
	// 	console.log(data);
	// 	var arr = []
	// 	if (this.conversationId == "like_comment") {
	// 		for (let i = 0; i < data.messageList.length; i++) {
	// 			arr.push({
	// 				avatar: option.targetUserImg,
	// 				userId: data.messageList[i].userId,
	// 				userName: data.messageList[i].userName,
	// 				userImg: data.messageList[i].userImg,
	// 				articleId: data.messageList[i].articleId,
	// 				content: data.messageList[i].content,
	// 				isLike: data.messageList[i].isLike,
	// 				time: data.messageList[i].createTime,
	// 				isMyMessage: false
	// 			})
	// 		}
	// 	} else if (this.conversationId == "reserve") {
	// 		console.log("123")
	// 		console.log(data)
	// 		for (let i = 0; i < data.messageList.length; i++) {
	// 			arr.push({
	// 				// 需要什么可后续添加
	// 				avatar: option.targetUserImg,
	// 				roomId: data.messageList[i].roomId,
	// 				userId: data.messageList[i].userId,
	// 				roomName: data.messageList[i].roomName,
	// 				type: data.messageList[i].type,
	// 				maxNumber: data.messageList[i].maxNumber,
	// 				area: data.messageList[i].area,
	// 				preference: data.messageList[i].preference,
	// 				startTime: data.messageList[i].startTime,
	// 				isMyMessage: false,
	// 			})
	// 		}
	// 		console.log(data)
	// 		console.log("465")
	// 	} else {
	// 		this.userId = data.userId
	// 		this.userImg = data.userImg
	// 		for (let i = 0; i < data.messageList.length; i++) {
	// 			var isMyMessage = false
	// 			var avatar = option.targetUserImg
	// 			if (data.messageList[i].fromId == this.userId) {
	// 				isMyMessage = true
	// 				avatar = this.userImg
	// 			}
	// 			if (data.messageList[i].isInvite == 1) {
	// 				arr.push({
	// 					avatar: avatar,
	// 					type: data.messageList[i].content.split('_')[1],
	// 					roomId: data.messageList[i].content.split('_')[0],
	// 					time: data.messageList[i].createTime,
	// 					isMyMessage: isMyMessage,
	// 					isInvite: true
	// 				})
	// 			} else {
	// 				arr.push({
	// 					avatar: avatar,
	// 					text: data.messageList[i].content,
	// 					time: data.messageList[i].createTime,
	// 					isMyMessage: isMyMessage,
	// 					isInvite: false
	// 				})
	// 			};
	// 		}
	// 	}
		
		this.messages = arr
		//滚动到底部
		this.$nextTick(() => {
		           const messagesContainer = this.$refs.messagesContainer;
		           if (messagesContainer) {
		             messagesContainer.scrollTo({
		               top: messagesContainer.scrollHeight,
		               behavior: "smooth",
		             });
		           }
		         });
	
	
  },
  beforeMount() {
	  uni.$on("Message", this.handleMessage)
  },
  beforeDestroy() {
	  uni.$off("Message", this.handleMessage)
  },
  updated(){
  	//页面更新时调用聊天消息定位到最底部
  	this.scrollToBottom();
  },
  computed: {
  	windowHeight() {
  	    return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
  	},
  	
  	
  },
  data() {
    return {
		show: false,
		cursor: false, //是否聚焦
		value:'',
		active_Up: false,
		resStart:0, //input光标位置
		targetUserId: null,
		targetUserName: null,
		targetUserImg: null,
		userId: null,
		userImg: null,
		sessionId: null,
		type: null,
		messages: [],
		emojis:[],
		inputText: "",
		showDialog:false,
		upHeight:0,//上面的scroll上移距离
		downHeight:0,//下面的input离底边的距离
		//键盘高度
		keyboardHeight:0,
		//虚拟高度
		xuniHeight:0,
		//滚动距离
		scrollTop: 0,
		selectedJubaoTags: [], // 用于存储选中的打法倾向标签
		jubaolabel: [{
				label: '色情内容',
				selected: false
			},
			{
				label: '政治敏感',
				selected: false
			},
			{
				label: '侮辱威胁',
				selected: false
			},
			{
				label: '性别歧视',
				selected: false
			},
			{
				label: '冒充他人',
				selected: false
			},
			{
				label: '虚假信息',
				selected: false
			},
			{
				label: '广告滥用',
				selected: false
			},
			{
				label: '人身攻击',
				selected: false
			},
			{
				label: '仇恨言论',
				selected: false
			},
			{
				label: '传播谣言',
				selected: false
			},
			{
				label: '不当用语',
				selected: false
			},
			{
				label: '违法行为',
				selected: false
			},
			{
				label: '种族歧视',
				selected: false
			},
			{
				label: '暴力威胁',
				selected: false
			},
			{
				label: '恶意链接',
				selected: false
			},
			{
				label: '涉及诈骗',
				selected: false
			},
			{
				label: '恶意举报',
				selected: false
			},
			{
				label: '人肉搜索',
				selected: false
			},
			{
				label: '宣扬自杀自残行为',
				selected: false
			},
			{
				label: '侮辱宗教信仰',
				selected: false
			},
			{
				label: '隐私侵犯',
				selected: false
			},
			{
				label: '刷屏灌水',
				selected: false
			},
			{
				label: '滥用权力',
				selected: false
			},
			{
				label: '违反使用条款',
				selected: false
			},
			{
				label: '煽动暴力',
				selected: false
			},
			{
				label: '其他',
				selected: false
			},
		],
    };
  },
  methods: {
		  
		// 失去焦点时获取当前光标的位置
			cursorss(event){
				console.log("市区焦点")
	                  this.active_Up = false
	                  this.cursor = false; //取消聚焦
	                  this.resStart = event.target.cursor //保存光标位置
					  console.log("获取光标位置");
					  console.log(this.resStart )
	              },
	              ChooseToLook(val){
	                  // 返回获取从0到光标位置的字符串
	                  let str = this.value.substring(0,this.resStart)
	                  // 将表情插入指定位置
	                  this.value = this.value.replace(str,str + val)
	                  // 光标向后移动两位
	                  this.resStart += 2; //光标加2(表情是占两个位置)
	                  this.cursor = true //设置聚焦
	              },
	              close(){
	                  this.show = false;
	                  this.useful_flag = false
	              },
	              // 打开常用语
	              openUseful(e){
	                  if(this.useful_flag){
	                      if(this.useful_expression === e){
	                          // 如果已经打开过常用语
	                          this.useful_expression = e
	                          this.useful_flag = false //关闭
	                      }else{
	                          this.useful_expression = e
	                      }
	                  }else{
	                      this.useful_expression = e
	                      this.useful_flag = true //开启动画
	                  }
	              },
	              // 软键盘按下确定的事件监听
	              startSearch(){
	                  console.log(1111)
	              },
				  
	  //天宇：用于调节scroll-view长度
	  // 滚动至聊天底部
	  scrollToBottom(e){
	  	setTimeout(()=>{
	  		let query = uni.createSelectorQuery().in(this);
	  		query.select('#scrollview').boundingClientRect();
	  		query.select('#msglistview').boundingClientRect();
	  		query.exec((res) =>{
	  			console.log("滚");
	  			console.log(res);
	  			if(res[1].height > res[0].height){
	  				this.scrollTop = this.rpxTopx(res[1].height - res[0].height)
	  			}
	  		})
	  	},15)
	  },
	  // px转换成rpx
	  rpxTopx(px){
	  	let deviceWidth = wx.getSystemInfoSync().windowWidth
	  	let rpx = ( 750 / deviceWidth ) * Number(px)
	  	return Math.floor(rpx)
	  },
	  handleMessage(msg) {
	  	let data = JSON.parse(msg.data)
		console.log(data)
	  	if (data.type == "chat" && data.data.sessionId == this.sessionId) {
			if (data.data.type == 1) {
				this.messages.push({
					avatar: this.targetUserImg,
					type: data.data.content.split('_')[0],
					roomId: data.data.content.split('_')[1],
					time: data.data.time,
					isMyMessage: false,
					isInvite: true
				})
			} else {
				this.messages.push({
					avatar: this.targetUserImg,
					text: data.data.content,
					time: data.data.time,
					isMyMessage: false,
					isInvite: false
				})
			};
			//滚动到底部
			this.scrollToBottom()
	  	}
	  },
    sendMessage() {
		this.showDialog=false
		this.upHeight=0
		this.downHeight = 0
      if (this.inputText.trim() === "") {
        return;
      }
	  
	  app.globalData.socketObj.sendMsg({
		  type: "chat",
		  data: 
		  {
			  sessionId: this.sessionId,
			  fromId: this.userId,
			  toId: this.targetUserId,
			  content: this.inputText,
			  time: new Date(),
			  type: 0
		  }
	  })
	  
	  this.$H.post("/chat_message/send", {
		  sessionId: this.sessionId,
		  toId: this.targetUserId,
		  content: this.inputText,
		  type: 0
	  })
      const newMessage = {
        avatar: this.userImg, // 替换成你的头像链接
        text: this.inputText,
        time: new Date(),
        isMyMessage: true,
		isInvite: false
      };
      this.messages.push(newMessage);
      this.inputText = "";
       // 滚动到底部
         this.scrollToBottom()
		 this.showDialog=false
    },
    // scrollToBottom() {
    //   const messagesContainer = this.$refs.messagesContainer;
    //   if (messagesContainer) {
    //     messagesContainer.scrollTop = messagesContainer.scrollHeight;
    //   }
    // },
	// 表情包相关函数
	     loadEmojiData() {
	          // 将 JSON 文件中的表情包信息填充到 emojis 数组中
	          this.emojis = emojiData.data.split(",");
	        },
			insertEmoji(emoji) {
			  // 获取当前输入框的内容
			  const currentText = this.inputText;
			
			  // 获取光标的位置
			  const cursorPosition = this.resStart
			  const selectionEnd = this.inputText.length
			console.log(cursorPosition)
			console.log(selectionEnd)
			console.log(emoji.length)
			console.log(currentText.slice(0, cursorPosition));
			console.log(emoji);
			console.log(currentText.slice(cursorPosition,selectionEnd));
			  // 将表情插入到输入框中
			  const newText = currentText.slice(0, cursorPosition) + emoji + currentText.slice(cursorPosition,selectionEnd);
			
			  // 更新输入框中的内容，并将光标移动到插入表情后面
			  this.inputText = newText;
			  this.resStart= this.resStart+emoji.length
			  const newCursorPosition = cursorPosition + emoji.length;
			  this.$nextTick(() => {
			    this.$refs.emojiInput.selectionStart = newCursorPosition;
			    this.$refs.emojiInput.selectionEnd = newCursorPosition;
			  });
			  
			},


		  // 表情输入
		// selectEmoji (emoji) {
		//     var elInput = this.$refs.emojiInput
		//     // console.log(elInput);
		//     var start = elInput.selectionStart // 记录光标开始的位置
		//     var end = elInput.selectionEnd // 记录选中的字符 最后的字符的位置
		//     if (start === undefined || end === undefined) return
		//     var txt = elInput.value
		//     // 将表情添加到选中的光标位置
		//     var result =txt.substring(0, start) + emoji.data + txt.substring(end)
		//     elInput.value = result // 赋值给input的value
		//     // 重置光标位置
		// 	elInput.$el.focus();
		//     elInput.selectionStart = start + emoji.data.length
		//     elInput.selectionEnd = start + emoji.data.length
		//     this.inputText= result // 赋值(注意这里一定要赋值给表情输入框绑定的那个值)
		//     },
	      //打开表情弹窗
	      toogleDialogEmoji () {
			  console.log("点击了笑脸");
			console.log(this.upHeight);
			setTimeout(()=>{
				this.upHeight = 0.3*this.windowHeight
				this.downHeight = 0.3*this.windowHeight
			},100)
			
			console.log(this.upHeight);
	        this.showDialog = true
	      },
		  // 选择照片
		  chooseImage(){
			const input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.addEventListener("change", this.handleImageSelection);
			input.click();
		  },
		  handleImageSelection(event) {
		        const selectedImage = event.target.files[0];
		        if (selectedImage) {
		          const reader = new FileReader();
		          reader.onload = () => {
		            const imageDataURL = reader.result;
		            this.sendMessageWithImage(imageDataURL);
		          };
		          reader.readAsDataURL(selectedImage);
		        }
		      },
		sendMessageWithImage(imageDataURL) {
		        const newMessage = {
		          avatar: "https://img0.baidu.com/it/u=1691000662,1326044609&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
		          image: imageDataURL, // 添加图片的数据URL
		          time: new Date().toLocaleString(),
		          isMyMessage: true,
		        };
				
		        // this.messages.push(newMessage);
		      },
		//退出当前页面
		goout(){
			this.$H.post("/message/read", {"sessionId": this.sessionId})
			uni.navigateBack({
				delta:1
			})
		},
		closeEmoji(){
			this.showDialog=false
			this.upHeight=0
			this.downHeight = 0
		},
		//展示弹窗
		show_popup() {
			this.$refs.fankui.open("center")
		},
		jubao() {
			this.$refs.fankui.close()
			this.$refs.jubao.open('center')
		},
		lahei() {
			this.$refs.fankui.close()
			this.$H.post("/Blacklist/insertBlack.do", {"secondaryUserId": this.targetUserId}).then(res => {
				let data = res
				console.log(data);
				uni.showToast({
					title: "已将该用户拉入黑名单",
					icon: 'none',
					duration: 2000
				})
			})
			
		},
		chooseJubaoLabel(index) {
		    if (this.selectedJubaoTags.length < 3) {
		        this.jubaolabel[index].selected = !this.jubaolabel[index].selected;
		        // 如果选中，则将标签存入对应的数组中
		        if (this.jubaolabel[index].selected) {
		            this.selectedJubaoTags.push(this.jubaolabel[index].label);
		        } else {
		            // 如果取消选中，则从数组中移除标签
		            const tagIndex = this.selectedJubaoTags.indexOf(this.jubaolabel[index].label);
		            if (tagIndex !== -1) {
		                this.selectedJubaoTags.splice(tagIndex, 1);
		            }
		        }
		    } else {
		        if(!this.jubaolabel[index].selected){
					console.log('最多选中三个标签')
				}else{
					// 如果取消选中，则从数组中移除标签
					this.jubaolabel[index].selected = !this.jubaolabel[index].selected;
					const tagIndex = this.selectedJubaoTags.indexOf(this.jubaolabel[index].label);
					if (tagIndex !== -1) {
					    this.selectedJubaoTags.splice(tagIndex, 1);
					}
				}
		    }
		},submit_jubao() {
				if(this.selectedJubaoTags.length==0){
					console.log('至少选择一个标签');
				}else{
					console.log('用户选择举报标签如下:' + this.selectedJubaoTags);
					// 所有标签恢复未选中状态
					this.$H.post('/feedback', {
							content:"举报用户id为："+this.articleId+"； "+this.selectedJubaoTags,
							complainUserId:this.authorId,
							type:3
						})
						.then(response => {
							if(response.data.code==200){
								
								uni.showToast({
								    title: '举报成功',
								    duration: 2000
								});
								this.$refs.jubao.close()
							}
							else{
								uni.showToast({
								    title: '举报失败',
								    duration: 2000
								});
							}
							console.log("absd")
						})
					this.jubaolabel.forEach(function(item) {
						item.selected = false;
					});
					// 清空用户举报标签存储数组
					this.selectedJubaoTags = [];
				}
			},
		  
	
  },
		
};
</script>

<style>


/* 样式... */
.chat-container {
	position: absolute;
  width: 100%;
  height: 100%;
 
}

.chat-header {
  width: 100%;
  height: 150rpx;
  background-color: white;
  
  
  border-bottom: 1px solid #f0f0f0;
}
.chat-messages {
  display: flex;
  flex-direction: column;
  width: 700rpx;
  overflow-y: auto;
  height:1300rpx ;
  flexGrow: 1
}

.chat-input {
  display: flex;
  position: fixed; /* 父容器相对定位 */
  width: 100%;
  height: 130rpx;
  align-items: center;
  z-index: 1000;
  background-color: white;
  border: solid 1rpx #F7F7F7;
  
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 0.5rpx solid #efefef;
  border-radius: 5px;
  
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  margin-left: 10rpx;
  border-radius: 50%;
  cursor: pointer;
}

.icon-heart,
.icon-send {
  width: 20px;
  height: 20px;
  fill: white;
}

.emoji_box{
	width: 100%;
	
	display: flex; 
	justify-content: center;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-radius: 50%;
  cursor: pointer;
}

.icon-image{
  width: 46rpx;
  height: 46rpx;
  fill: white;
},
.icon-heart,
.icon-send {
  width: 42rpx;
  height: 42rpx;
  fill: white;
  margin-left: auto;
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  border: 1px solid #efefef;
  border-radius: 20rpx;
  padding: 5rpx 10rpx;
  margin: 0 10px;
  height: 40rpx;

}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
}
.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120rpx;
  height: 70rpx;
  background-color: #4095E5;
  color: white;
  border-radius: 20px;
  cursor: pointer;
 margin-right: 20rpx;
  position: relative;
  
  font-size: 25rpx;
}

.emoji-container {
  background-color: white;
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
  
  overflow-y: auto;
  margin-top: 2%;
   bottom: 0;
    position: absolute; /* 相对定位 */
}

.emoji-row {
  
  width: 80%;
  height: 300rpx;
  margin-left: 10%;
  display: flex;
  flex-wrap: wrap; /* 换行 */
  white-space: wrap; /* 不换行 */
}

.emoji-item {
  width: 56rpx;
  margin-right: 10rpx; /* 表情之间的间距 */
  font-size: 56rpx; /* 表情大小 */
  cursor: pointer;
}
.tanchuang_inner {
	position: fixed;
	top: 20%;
	left: 10%;
	width: 75%;
	height: 400rpx;
	border-radius: 20rpx;
	border: 10px solid white;
	background-color: white;
	z-index: 1002;


}

.tanchuang_bottom {
	flex: 1;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	margin-top: 20rpx;
}

.tanchuang_tijiao {
	display: flex;
	background-color: #4095E5;
	border-radius: 40rpx;
	width: 160rpx;
	height: 90rpx;

	flex-direction: row;
	justify-content: center;
	align-items: center;

}

.jubao_view {
	padding-left: 5%;
	width: 90%;
	height: 540rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.selected-tag {
	background-color: #4095E5;
	color: white;
	display: inline-block;
	margin-left: 6%;
	margin-top: 4%;
	padding: 5rpx 10rpx;
	border-radius: 10rpx;
}

.unselected-tag {
	background-color: #F8F8F8;
	color: #4F4F4F;
	display: inline-block;
	margin-left: 6%;
	margin-top: 4%;
	padding: 5rpx 10rpx;
	border-radius: 10rpx;
}

</style>
