import $store from '@/store/mian_store.js';
import $C from '@/common/config.js';
import webSocketClass from '@/webSocket/webSocket.js';
import NERTC from "@/NERtcUniappSDK-JS/lib/index";
import permision from "@/NERtcUniappSDK-JS/permission.js";
import {
	NERTCLogLevel,
	NERTCAudioProfile,
	NERTCAudioScenario
} from '@/NERtcUniappSDK-JS/lib/NERtcDefines';
import TrainChatMessage from '@/components/common/TrainChatMessage.vue';
export default {
		components: {
			TrainChatMessage,
		},
		data() {
			return {
				// 连接websocket的数据
				userId: null,		//当前用户ID
				roomId: null,		//当前房间ID
				webscoket: null,	//websocket对象
				
				// 音频通讯相关数据
				engine: undefined,
				
				// 房间信息
				hisId:-1,		//点击用户头像的用户ID
				realNumber:0,	//真实对战人数
				roomInfo: {
					"roomId": 0,
					"userId": 0,
					"roomName": "无领导",
					"roomState": 1,
					"roomType": 1,
					"realNumber": 3,
					"maxNumber": 12,
					"area": "地区",
					"preference": "偏好"
				},
				
				// 用户信息
				//所有用户信息（不改变的）
				roomUsers_nochange:[
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,//0代表未准备，1代表准备，2代表不能准备
						location_state:true,//代表锁不锁
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
				],
				//所有用户信息（改变的）
				roomUsers:[
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
				],
				//用户信息左边
				roomUsers_left:[
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:"小天老师",
						userState:1,//是否准备
						location_state:true,//边框不透明
					},
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:"小天老师",
						userState:1,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:"小天老师",
						userState:1,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:" ",
						userState:2,
						location_state:false,
					},
				],
				//用户信息右边
				roomUsers_right:[
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:"小天老师",
						userState:1,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/common/image_touxiang.png',
						userName:"小天老师",
						userState:1,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"小天老师",
						userState:1,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/wait_circle_3.png',
						userName:"空闲位置",
						userState:2,
						location_state:true,
					},
					{
						userId:-1,
						userImg:'../../static/compete/lock_circle.png',
						userName:" ",
						userState:2,
						location_state:false
					},
				],
				//用户信息弹窗的具体信息
				userPopup_message:{
					follow:"关注",
					userId: null,
					userImg: null,
					userName: null,
					sex: null,
					area: null,
					description: null,
					articleNum: null,
					followNum: null,
					fansNum: null,
				},
				//聊天信息
				inputText: "",
				messages: [
					{
						userImg: '../../static/common/image_touxiang.png',
						userName: '小天老师',
						text: '666',
						isMyMessage: false
					}
				],
				
				// 题目信息
				book_id:null,				//题目Id
				book_range: [{ value: "不限", text: "不限" },{ value: "广东省", text: "广东省" },{ value: "河北省", text: "河北省" },{ value: "山西省", text: "山西省" },{ value: "吉林省", text: "吉林省" },{ value: "辽宁省", text: "辽宁省" },{ value: "黑龙江省", text: "黑龙江省" },{ value: "陕西省", text: "陕西省" },{ value: "甘肃省", text: "甘肃省" },{ value: "青海省", text: "青海省" },{ value:"山东省", text: "山东省" },{ value: "福建省", text: "福建省" },{ value: "浙江省", text: "浙江省" },{ value: "河南省", text: "河南省" },{ value: "湖北省", text: "湖北省" },{ value: "湖南省", text: "湖南省" },{ value: "江西省", text: "江西省" },{ value: "江苏省", text: "江苏省" },{ value: "安徽省" , text: "安徽省" },{ value: "海南省", text: "海南省" },{ value: "四川省", text: "四川省" },{ value: "贵州省", text: "贵州省" },{ value: "云南省", text: "云南省" },{ value: "北京市", text: "北京市" },{ value:"上海市", text: "上海市" },{ value: "天津市", text: "天津市" },{ value: "重庆市", text: "重庆市" },{ value: "内蒙古自治区", text: "内蒙古自治区" },{ value:"新疆维吾尔自治区", text: "新疆维吾尔自治区" },{ value: "宁夏回族自治区", text: "宁夏回族自治区" },{ value: "广西壮族自治区", text: "广西壮族自治区" },{ value:  "西藏自治区", text: "西藏自治区" }],
				book_list:[],				//题目
				book_area:"不限",			//选题地区
				book_name:"广东省省考第一套",//选题名字
				book_content:"asdfasd",		//选题内容
				
				// 权限信息
				is_ready:false,			//是否准备
				is_all_ready:false,		//是否全员准备
				is_start:false,			//是否开始
				is_book:false,			//是否选题
				is_host:true,			//是否是房主
				is_book:false,			//选题弹窗能否显示
				is_chating:true,		//是否打开聊天窗
				isToupiao:false,		//是否投票
				canTalk:true,			//能否说话
				is_connect:false,		//是否连接RTC
				
				// 阶段信息
				jieduan_active1:0,		//主页的阶段
				jieduan_active2:0,		//对练页的阶段 //处于什么阶段:0准备 1选题 2个陈 3自由 4总结 5复盘
				jieduan_list:[{title:'选题'},{title:"阅读思考"},{title:"个人陈述"},{title:"自由讨论"},{title:"总结陈词"}],	//对练页的阶段
				zhuyejieduan_list:[{title:'准备阶段'},{title:"面试阶段"},{title:"复盘阶段"}],								//主页的阶段
				
				//投票相关
				agreeNum:0,
				agreement:false,
				agreeTimer:null,
				agreePercentage:100,
					
				//时间相关	
				all_change_time: 120,	//总共训练时间
				compete_time:5,			//各个阶段的训练时间
				timer:null,				//全场倒计时
				stateTimer:null,		//阶段倒计时
				percentage:100,			//统计时间消耗比例
				
				//页面相关
				index:0,				//哪个页面
				pipei_message:"停止匹配",
				button_big:false,		//按钮是否变大
				user_talking:[
					{Num:0,userImage:"null",is_user:true},{Num:0,userImage:"null",is_user:false},{Num:0,userImage:"null",is_user:false}
				],
			}
		},
		onLoad: function (option) {
			uni.getSystemInfo({
				success:res=>{
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			
			//更新当前用户ID和房间ID
			this.roomId = option.roomId
			this.userId = option.userId
			
			//创建webscoket对象
			let token
			if($store.state.token){token = $store.state.token}
			else {token =  uni.getStorageSync('token')}
			let name = 'trainWebsocket'
			let url = `${$C.webUrl_vuex}/ws/train?roomId=${this.roomId}&token=${token}`
			let time = 30
			this.webscoket = new webSocketClass(name, url, time)
			this.webscoket.initSocket()
			
		},
		onBackPress(options) {
			this.go_out()
			return true
		},
		beforeMount() {
			//开启监听事件
			uni.$on('trainWebsocketMessage', this.handleMessage)
		},
		beforeDestroy() {
			//关闭监听事件
			uni.$off('trainWebsocketMessage', this.handleMessage)
			
			//关闭所有计时器
			clearInterval(this.timer)
		},
		methods: {
			//处理服务器发送的信息
			handleMessage(res) {
				let message = JSON.parse(res.data)
				//用户进入房间事件
				if (message.type == 'register') {
					console.log("用户进入房间事件")
					this.roomInfo = message.data.roomInfo
					for(let i=this.roomUsers_nochange.length-1;i>=message.data.roomInfo.maxNumber;i--){
						this.roomUsers_nochange[i].userId=-1
						this.roomUsers_nochange[i].userImg='../../static/compete/lock_circle.png'
						this.roomUsers_nochange[i].userName=" "
						this.roomUsers_nochange[i].userState=2
						this.roomUsers_nochange[i].location_state=false
					}
					// console.log(this.roomUsers_nochange);
					this.reset(message)
					// console.log(this.roomUsers_left);
					// console.log(this.roomUsers_right);
					if (this.userId == this.roomInfo.userId) {
						this.is_host = true;
					} else {
						this.is_host = false;
					}
					//全员没准备
					this.is_all_ready=false
				}
				//用户退出房间事件
				else if (message.type == 'logout') {
					console.log("用户退出房间事件")
					this.roomInfo = message.data.roomInfo
					this.reset(message)
				} 
				//房主销毁房间事件
				else if (message.type == 'destory') {
					console.log("房主销毁房间事件")
					this.go_out()
				}
				//房主踢人事件
				else if(message.type=='kick'){
					console.log("房主踢人事件");
					this.roomInfo = message.data.roomInfo
					//roomUsers赋值
					this.reset(message)
					//看看自己还在不在user表中
					for(let i=0;i<this.roomUsers.length;i++){
						if(this.roomUsers[i].userId==this.userId){
							return
						}
					}
					this.webscoket.closeSocket()
					// 关闭rtc的操作
					if (this.is_connect) {
						this.leaveChannel()
						this.closeRTC()
					}
					
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
				//交换房主权限事件
				else if (message.type == 'change') {
					console.log("交换房主权限事件")
					this.roomInfo = message.data.roomInfo
					if (this.userId == this.roomInfo.userId) {
						this.is_host = true;
					} else {
						this.is_host = false;
					}
				}
				//文字交流事件（未完成）
				else if (message.type == 'chat') {
					console.log("文字交流事件");
					let isMyMessage = false
					if(message.data.userId == this.userId) {
						isMyMessage = true
					}
					this.messages.push({
						userImg: message.data.userImg,
						userName: message.data.userName,
						text: message.data.content,
						isMyMessage: isMyMessage
					})
				}
				//组员准备事件
				else if (message.type == 'ready') {
					console.log("组员准备事件");
					this.reset(message)
					//判断是否全员准备
					for(let i=0;i<message.data.roomUsers.length;i++){
						if(this.roomUsers[i].userId!=this.roomInfo.userId){
							if(this.roomUsers[i].userState!=1 ){
								console.log("这是第几个没有准备");
								console.log(i);
								return
							}
						}
						
					}
					console.log("allready");
					this.is_all_ready=true
				}
				//组员取消准备事件
				else if (message.type == 'noReady') {
					console.log("组员取消准备事件");
					this.reset(message)
					this.is_all_ready=false
				}
				//开始训练成功事件
				else if (message.type == 'startSuccess') {
					console.log("开始训练成功事件");
					
					this.is_start = true
					this.timeFn()
					this.jieduan_active1=1
					this.realNumber = message.data.roomUsers.length
					this.right_slip()
					this.state_timeFn()
					
					//启动rtc
					this.is_connect = true
					this.startRTC()
					this.joinChannel(this.roomId, this.userId)
					
					//设置间隔为500ms的人声音量提示
					this.engine.enableAudioVolumeIndication({
						enable: true,
						interval: 500,
						enableVad: true
					});
				}
				//开始训练失败事件
				else if (message.type == 'startFail') {
					console.log("开始训练失败事件");
				}
				//结束选题阶段
				else if(message.type=='endChooseBook'){
					console.log("结束选题阶段");
					clearInterval(this.stateTimer);
					if(this.userId==this.roomInfo.userId){
						this.webscoket.sendMsg({
							type: "endChooseBook",
							bookId: this.book_id
						})
					}
					
				}
				//开始阅读思考阶段
				else if(message.type=='startRead'){
					console.log("开始阅读思考阶段");
					this.jieduan_active2 = 1
					this.canTalk=false
					this.compete_time=10
					clearInterval(this.stateTimer);
					this.state_timeFn()
					this.book_id = message.data.bookId
					this.book_name = message.data.bookName
					this.book_area = message.data.area
					this.book_content = message.data.content
				}
				//结束阅读思考阶段
				else if(message.type=='endRead'){
					console.log("结束阅读思考阶段");
					clearInterval(this.stateTimer);
					this.jieduan_active2 = 2
					this.compete_time=3
					this.state_timeFn()
					// console.log(message);
					if(this.userId==message.data.speakUserId){
						console.log("发送startpersonal");
						this.canTalk=true
						this.webscoket.sendMsg({
							type: "startPersonal"
						})
					}else{
						this.canTalk=false
					}
				}
				//下一个进行个人陈述
				else if(message.type=='nextPersonal'){
					console.log("下一个进行个人陈述");
					if(this.userId==message.data.speakUserId){
						this.canTalk=true
						this.webscoket.sendMsg({
							type: "startPersonal"
						})
					}else{
						this.canTalk=false
					}
				}
				//结束个人陈述
				else if(message.type=='endAllPersonal'){
					console.log("结束个人陈述");
					this.jieduan_active2 = 3
					if(this.realNumber<8){
						this.compete_time=40
					}else{
						this.compete_time=50
					}
					this.canTalk=true
					clearInterval(this.stateTimer);
					this.state_timeFn()
					if(this.userId==this.roomInfo.userId){
						console.log("房主发送开始自由讨论");
						this.webscoket.sendMsg({
							type: "startDiscussion"
						})
					}
				}
				//结束自由讨论
				else if(message.type=='endDiscussion'){
					console.log("结束自由讨论");
					this.canTalk=false
					this.jieduan_active2 = 4
					this.compete_time=2
					clearInterval(this.stateTimer);
					this.state_timeFn()
					this.isToupiao=false
					clearInterval(this.agreeTimer);
					if(this.userId==message.data.speakUserId){
						this.canTalk=true
						this.webscoket.sendMsg({
							type: "startSummary"
						})
					}else{
						this.canTalk=false
					}
				}
				//同意提前结束自由讨论（接收服务器）
				else if(message.type=='agreeEndDiscussion'){
					console.log("同意提前结束自由讨论（接收服务器）");
					if(this.agreement==false){
						this.isToupiao=true
						this.agree()
					}
					this.agreeNum=message.data.agreeNum
				}
				//下一个总结陈词
				else if(message.type=='nextSummary'){
					console.log("下一个总结陈词");
					if(this.userId==message.data.speakUserId){
						this.canTalk=true
						this.webscoket.sendMsg({
							type: "startSummary"
						})
					}else{
						this.canTalk=false
					}
				}
				//结束所有总结陈词
				else if(message.type=='endAllSummary'){
					console.log("结束所有总结陈词");
					this.jieduan_active1=3
					this.jieduan_active2=5
					this.canTalk=true
				}
			},
			
			// 更新roomUsers
			reset(message){
				//下面是四个for循环才能全面刷新
				for(let i=0;i<this.roomUsers.length;i++){
					this.roomUsers[i].userId=this.roomUsers_nochange[i].userId
					this.roomUsers[i].userImg=this.roomUsers_nochange[i].userImg
					this.roomUsers[i].userName=this.roomUsers_nochange[i].userName
					this.roomUsers[i].userState=this.roomUsers_nochange[i].userState
					this.roomUsers[i].location_state=this.roomUsers_nochange[i].location_state
				}
				for(let i=0;i<message.data.roomUsers.length;i++){
					this.roomUsers[i].userId=message.data.roomUsers[i].userId
					this.roomUsers[i].userName=message.data.roomUsers[i].userName
					this.roomUsers[i].userImg=message.data.roomUsers[i].userImg
					this.roomUsers[i].userState=message.data.roomUsers[i].userState
					
				}
				// console.log(this.roomUsers);
				for(let i=0;i<5;i++){
					this.roomUsers_left[i].userId=this.roomUsers[i].userId
					this.roomUsers_left[i].userImg=this.roomUsers[i].userImg
					this.roomUsers_left[i].userName=this.roomUsers[i].userName
					this.roomUsers_left[i].userState=this.roomUsers[i].userState
					this.roomUsers_left[i].location_state=this.roomUsers[i].location_state
				}
				for(let i=5;i<10;i++){
					this.roomUsers_right[i-5].userId=this.roomUsers[i].userId
					this.roomUsers_right[i-5].userImg=this.roomUsers[i].userImg
					this.roomUsers_right[i-5].userName=this.roomUsers[i].userName
					this.roomUsers_right[i-5].userState=this.roomUsers[i].userState
					this.roomUsers_right[i-5].location_state=this.roomUsers[i].location_state
				}
			},
			//发送聊天信息
			sendChatMessage() {
				if (this.inputText.trim() === "") {
				  return;
				}
				this.webscoket.sendMsg({
					type: 'chat',
					data: this.inputText
				})
				this.inputText = "";
			},
			
			// 结束按钮
			end_state(){
				if(this.jieduan_active2==0){
					this.webscoket.sendMsg({
						type: "endChooseBook",
						bookId: this.book_id
					})
				}else if(this.jieduan_active2==2){
					console.log("提前结束个人陈述");
					this.webscoket.sendMsg({
						type: "endPersonal"
					})
				}else if(this.jieduan_active2==3){
					console.log("个人申请提前结束自由讨论");
					this.agree_timeFn()
					this.webscoket.sendMsg({
						type: "applyEndDiscussion"
					})
					
				}else if(this.jieduan_active2==4){
					this.webscoket.sendMsg({
						type: "endSummary"
					})
				}
			},
			
			//投票弹窗
			toupiao(){
				console.log("投票结束自由讨论弹窗");
				this.$refs.alertDialog.open('center')
			},
			
			//确认申请结束自由讨论
			alert1_confirm(){
				console.log("确认申请结束自由讨论");
				this.end_state()
			},
			
			//取消申请
			alert1_close(){
				console.log("取消申请");
				this.$refs.alertDialog.close()
			},
			
			//同意弹窗
			agree(){
				console.log("同意结束自由讨论弹窗");
				this.$refs.agreeDialog.open('center')
			},
			
			//同意结束自由讨论
			alert2_confirm(){
				console.log("确认申请结束自由讨论");
				this.agreement=true
				this.webscoket.sendMsg({
					type: "agreeEndDiscussion"
				})
			},
			
			//拒绝结束自由讨论
			alert2_close(){
				console.log("取消申请");
				this.$refs.agreeDialog.close()
			},
			
			//同意弹窗
			agree_popup(){
				this.webscoket.sendMsg({
					type: "agreeEndDiscussion"
				})
			},
			
			// 开始按钮
			start(){
				this.ready()
				this.webscoket.sendMsg({
					type: 'start'
				})
				this.jieduan_active1=1
				this.jieduan_active2=0
				
			},
			
			//点击右滑
			right_slip(){
				this.index++
			},
			
			// 点击左滑
			left_slip(){
				this.index--
			},
			
			//全场倒计时
			timeFn() {
			    this.timer = setInterval(() => {
			        if (this.all_change_time> 0) {
						this.all_change_time-= 1
			            // console.log('打印', this.countdown / this.countdownNum)
			        } else {
			            uni.showToast({
			            	title:"感谢您的面试",
							icon:"success",
							duration:2000,
			            })
						uni.switchTab({
							url:'../index/index'
						})
			            clearInterval(this.timer);
			        }
			    }, 60000);
				
			},
			
			//每个小阶段的倒计时
			state_timeFn() {
				let change_time=this.compete_time*60
				console.log("倒计时开始")
				clearInterval(this.stateTimer);
			    this.stateTimer = setInterval(() => {
			        if (change_time> 0) {
						change_time-= 1
						
			            // console.log('打印', this.countdown / this.countdownNum)
			        } else {
			            uni.showToast({
			            	title:"时间到",
							icon:"none",
							duration:2000,
			            })
						console.log("时间到");
						clearInterval(this.stateTimer);   
			        }
					this.percentage = ((change_time/(this.compete_time*60)).toFixed(2)*100)
					console.log(this.percentage);
			    }, 1000);
				
			},
			
			//投票阶段的倒计时
			agree_timeFn() {
				let agreeTime = 60
				console.log("投票aaaaaaaaaaaaa倒计时开始")
				clearInterval(this.agreeTimer);
			    this.agreeTimer = setInterval(() => {
					
					console.log(agreeTime);
			        if (agreeTime> 0) {
						agreeTime-= 1
						
			            // console.log('打印', this.countdown / this.countdownNum)
			        } else {
			            uni.showToast({
			            	title:"时间到",
							icon:"none",
							duration:2000,
			            })
						console.log("时间到");
						clearInterval(this.agreeTimer);
						this.isToupiao=false
			        }
					this.agreePercentage = ((agreeTime/60).toFixed(2)*100)
					//console.log(this.percentage);
			    }, 1000);
				
			},
			
			//改变匹配状态
			change_pipei(e){
				console.log(e.detail.value)
				if(e.detail.value==true){
					this.pipei_message="匹配中..."
				}else{
					this.pipei_message="停止匹配"
				}
			},
			
			//开关聊天弹窗
			//左边弹窗
			open_chat_left(){
				console.log(this.is_chating);
				this.is_chating=false
			},
			close_chat_left(){
				console.log(this.is_chating);
				this.is_chating=true
			},
			//右边弹窗
			open_chat_right(){
				console.log(this.is_chating);
				this.is_chating=false
			},
			close_chat_right(){
				console.log(this.is_chating);
				this.is_chating=true
			},
			
			// 退出房间
			go_out(){
				
				if(this.is_host==true&&this.roomInfo.realNumber<1){
					console.log(this.roomInfo.realNumber);
					console.log("你是房主别退出");
					this.host_goout_alert()
					return
				}
				console.log("退出房间1");
				clearInterval(this.stateTimer);
				this.webscoket.sendMsg({
					type: "logout"
				})
				console.log("退出房间2");
				this.webscoket.closeSocket()
				// 关闭rtc的操作
				console.log("退出房间3");
				if (this.is_connect) {
					this.leaveChannel()
					this.closeRTC()
				}
				console.log("退出房间4");
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			
			//准备
			ready(){
				this.is_ready=true
				this.webscoket.sendMsg({
					type: "ready"
				});
			},
			
			//取消准备
			disready(){
				this.is_ready=false
				this.webscoket.sendMsg({
					type: "noReady"
				});
				
			},
			
			//选题
			choose_book(){
				this.is_book=true
			},
			
			hide_choosebook(){
				this.is_book=false
			},
			//确定题目
			determine_book(book_Id){
				console.log("hi");
				this.$H.post("/room/show_book.do",{"bookId":book_Id}).then(res=>{
					let data=res.data
					console.log(data)
					this.book_id = book_Id
					this.book_area=data.data.area
					this.book_name=data.data.bookName
					this.book_content=data.data.content
					
				})
				this.hide_choosebook()
			},
			//改变题目地区
			change_book_area(e){
				console.log("e:",e);
				this.$H.post("/room/choose_book.do",{
					"type":"无领导",
					"area":e
				}).then(res=>{
					let data = res.data
					console.log(data);
					this.book_list=data.data
				})
			},
			
			//召唤
			zhaohuan(){
				this.$H.post("/room/room_match_request.do",{"roomId":this.roomId}).then(res=>{
					data = res.data
					//还没确定逻辑
				})
			},
			
			//长按按钮 开始
			button_start(){
				this.button_big=true
				this.openAudio()
			},
			//长按按钮 结束
			button_end(){
				this.button_big=false
				this.closeAudio()
			},
			//点击用户头像弹窗
			touxiang_popup(touxiang_userId){
				// console.log(touxiang_userId);
				// console.log(this.userId);
				//获取用户信息并渲染到弹窗上
				this.hisId=touxiang_userId
				
				if(this.userId==touxiang_userId){
					console.log("你点自己干嘛");
					return
				}
				else if(touxiang_userId<0){
					console.log("你点空位干嘛");
					return
				}
				else if(this.is_start==false){
					if(this.is_host==true){
						//弹出房主专属弹窗
						this.host_toggle()
					}
					else{
						//弹出用户资料
						this.user_toggle()
					}
				}else{
					this.user_toggle()
					//都弹出用户资料
				}
			},
			//出现房主弹窗
			host_toggle() {
				console.log("房主弹窗");
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.host_doing.open('center')
			},
			//出现房主退出警告弹窗
			host_goout_alert() {
				console.log("房主警告弹窗");
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.host_goout_alert.open('center')
			},
			//关闭房主退出警告弹窗
			guanbi_host_goout_alert(){
				console.log("关闭弹窗");
				this.$refs.host_goout_alert.close()
			},
			//弹出用户信息
			user_toggle() {
				console.log("用户弹窗");
				this.$refs.host_doing.close()
				//在此填入用户信息
				this.$H.post("/user/he",{
					"userId":this.hisId
				}).then(res=>{
					console.log(res)
					if(res.data.data.follow==1){
						this.userPopup_message.follow = "已关注"
					}
					this.userPopup_message.userId = res.data.data.userId
					this.userPopup_message.userName = res.data.data.userName
					this.userPopup_message.userImg = res.data.data.userImg
					this.userPopup_message.sex = res.data.data.sex
					this.userPopup_message.area = res.data.data.area
					this.userPopup_message.description = res.data.data.description
					this.userPopup_message.followNum = res.data.data.followNum
					this.userPopup_message.fansNum = res.data.data.fansNum
					this.userPopup_message.articleNum = res.data.data.articleNum
				})
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.roomUsers.open('center')
			},
			//关注
			guanzhu(){
			  console.log("关注");
			  console.log(this.hisId);
			  var bodyData = {
				  "followId":this.hisId
			  }
			  if(this.userPopup_message.follow=="关注"){
				  console.log(bodyData)
				  this.$H.post('/article/follow.do',bodyData)
								   .then(response => {
									   console.log("实施关注")
									this.userPopup_message.follow = "已关注"
				  })
			  }
			  else{
				  this.$H.post('/article/cancle_follow.do',bodyData)
								   .then(response => {
									   console.log("取消关注")
									this.userPopup_message.follow = "关注"
				  })
			  }
				
			},
			
			//踢出房间
			tichu(){
				this.webscoket.sendMsg({
					target:this.hisId,
					type:"kick"
				})
				
				this.$refs.host_doing.close()
			},
			
			//交换房主权限
			jiaohuan(){
				this.webscoket.sendMsg({
					"target": this.hisId,
					"type": "change"
				})
				this.$refs.host_doing.close()
			},
			
			// 启动音频通讯
			startRTC() {
				// 初始化 engine
				this.engine = NERTC.setupEngineWithContext({
					appKey: 'c6f88e56f2b03780b30c8157809bc8bd',
					logDir: '', // expected log directory
					logLevel: NERTCLogLevel.INFO
				});
				
				// 判断权限
				if (uni.getSystemInfoSync().platform === "android") {
				    permision.requestAndroidPermission(
				        "android.permission.RECORD_AUDIO"
				    );
				    permision.requestAndroidPermission(
				        "android.permission.CAMERA"
				    );
				};
				
				// 注册监听事件
				this.engine.addEventListener("onsetupEngineWithContext", (message) => {
					const imessage = `onsetupEngineWithContext通知：message = ${message}`
					console.log(imessage)
				});
				
				this.engine.addEventListener("onJoinChannel", (result, channelId, elapsed, userID) => {
					let message = `onJoinChannel通知：加入房间状况，result = ${result}, channelId = ${channelId}, elapsed = ${elapsed}, userID = ${userID}`
					console.log(message)
					
					//加入房间后设置音频profile
					this.engine.setAudioProfile({
						profile: NERTCAudioProfile.STANDARD, //设置profile为标准模式
						scenario: NERTCAudioScenario.SPEECH ,//scenario为语音场景
					})
					
					//设置采集音量
					this.engine.adjustRecordingSignalVolume(0)
					this.engine.enableMediaPub(false)
					const connectState = this.engine.getConnectionState()
					message = `getConnectionState：获取链接状态，connectState = ${connectState}`
					console.log(message)
				});	
				
				this.engine.addEventListener("onRemoteAudioVolumeIndication", (volumeList, totalVolume)=> {
					const message = `onRemoteAudioVolumeIndication通知：总音量totalVolume = ${totalVolume}`
					console.log(message)
					console.log(volumeList)
					// volumeList.forEach((user)=>{
					// 	console.log(`用户 ${user.userID} 的音频音量为: ${user.volume},音频辅流的音量为: ${user.subStreamVolume} `)
					// 	//音频显示
					// 	for(let i=0;i<this.roomUsers.length;i++){
					// 		if(user.userID==this.roomUsers[i].userID){
					// 			this.user_talking.Num=i
					// 			this.user
					// 		}
					// 	}
					// })
					//谁在说话显示
					
					for(let j=0;j<this.user_talking.length;j++){
						this.user_talking[j].is_user=false
					}
					if(totalVolume!=0){
						for(let j=0;j<volumeList.length;j++){
							for(let i=0;i<this.roomUsers.length;i++){
								if(volumeList[j].userID==this.roomUsers[i].userId){
									this.user_talking[j].Num=i+1 
									this.user_talking[j].userImage=this.roomUsers[i].userImg
									this.user_talking[j].is_user=true
								}
							}
						}
					}
					
					// setTimeout(function() {
					// 	for(let j=0;j<this.user_talking.length;j++){
					// 		this.user_talking[j].is_user=false
					// 	}
					// }, 500)
					// for(let j=0;j<this.user_talking.length;j++){
					// 	this.user_talking[j].is_user=false
					// }
					
					
				});
			},
			
			// 加入房间
			joinChannel(roomId, userId) {
				this.engine.joinChannel({
				    token: '',
				    channelName: roomId,
				    myUid: parseInt(userId)
				});
			},
			
			// 离开房间
			leaveChannel() {
				this.engine.leaveChannel();
			},
			
			// 销毁引擎
			closeRTC() {
				console.log('销毁引擎')
				this.engine?.removeAllEventListener()
				this.engine?.destroyEngine()
				this.engine = null
			},
			// 开麦控制
			openAudio() {
				this.engine.enableMediaPub(true)
				this.engine.adjustRecordingSignalVolume(100)
				//this.engine.enableLocalAudio(true)
			},
			closeAudio() {
				// this.engine.enableMediaPub(false)
				this.engine.adjustRecordingSignalVolume(0)
				//this.engine.enableMediaPub(false)
				//this.engine.enableLocalAudio(false)
			}
		}
	}