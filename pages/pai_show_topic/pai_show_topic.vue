<template>

	<view id="app" class="gradient-background">
		<uni-nav-bar  :fixed="true"   status-bar left-icon="left"    right-icon="more-filled"
		@clickRight="show_popup"	 @clickLeft="goBack()" title="详情"  background-color="white" :border="false" />
			
		
		<view style="width: 100%;height: 1rpx;"></view>
		
		<scroll-view scroll-y="true" :style="{height: `${windowHeight-upHeight}rpx`}"
		@scrolltolower="loadmorea()">
			<view style="width: 100%;height: 70%;">

				<!-- 内容展示区域 -->

				<view class="container">
					<!-- 标题与头像 -->

					<view class="first-row">
						<view class="title">{{title}}</view>
						<view
							style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
							<image :src="authorImg"
								style="width: 85rpx;height: 85rpx; margin-right: 5%;border: solid 1rpx cornflowerblue; border-radius: 50%;"
								@click="toHis(authorId)"></image>
							<view class="flex justify-center align-center" style="color: grey;font-size: 25rpx;">
								{{authorName}}
							</view>
						</view>
					</view>
					<!-- 学习区闲聊区内容 -->
					<view v-if="type==0||type==1">
						<!-- 内容 -->
						<view class="content_view">
							<text>
								{{content}}
							</text>

						</view>
						<!-- <view style="font-size: medium;color: gray;text-align: center;">下拉继续浏览内容</view> -->
					</view>
					<!-- 训练区内容 -->
					<view v-else-if="type!=0&&type!=1" class="flex justify-between">

						<view class="content_view" style="width: 70%; display: flex; flex-direction: column;">
							<view class="popup_shuru">
								<view style="margin-right:40rpx;font-weight: 550;font-size: 30rpx;">开始时间</view>
								<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
								</view>
								<view>{{getTime(startTime)}}</view>
							</view>
							<view class="popup_shuru">
								<view style="margin-right:40rpx;font-weight: 550;font-size: 30rpx;">最大人数</view>
								<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
								</view>
								<view>{{maxNumber}}</view>
							</view>
							<view class="popup_shuru">
								<view style="margin-right:40rpx;font-weight: 550;font-size: 30rpx;">针对地区</view>
								<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
								</view>
								<view>{{area}}</view>
							</view>
							<view class="popup_shuru">
								<view style="margin-right:40rpx;font-weight: 550;font-size: 30rpx;">组员水平</view>
								<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
								</view>
								<view>{{preference}}</view>
							</view>
							<view class="popup_shuru">
								<view style="margin-right:40rpx;font-weight: 550;font-size: 30rpx;">房间信息</view>
								<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
								</view>
								<view style="font-size: 23rpx;word-wrap: break-word;color: grey;" maxlength="15">
									<text>{{content}}</text>
								</view>
							</view>

						</view>
						<view>
							<view class="flex align-center justify-between">
								<view
									style="color:#4095E5;font-weight: 700;font-size: 35rpx; width: 120rpx;height: 80rpx;border-radius: 5%;display: flex; justify-content: center; align-items: center;">
									无领导</view>
							</view>
						</view>
					</view>
					<view v-if="type!=0&&type!=1" style="width: 100%;" class="flex justify-center">
						<view
							style="background-color: #4095E5;color:white;margin-top: 50rpx; font-weight:bold;margin-left: 5%;margin-right: 10rpx; width: 120rpx;height: 80rpx;border-radius: 40rpx;display: flex; justify-content: center; align-items: center;">
							跟随</view>

					</view>
				</view>
				<!-- 帖子图片 -->
				<view class="post-images" @click.stop="toggleExpand(item2,index2)">
					<!-- 单张图片 -->
					<view v-if="imageList.length==1&&imageList!=''" style="width: 75%;">
						<image :src="imageList[0]" mode="widthFix" class="single-image"
							@tap="previewImage(imageList,0)"></image>
					</view>
					<!-- 两张或三图片 -->
					<view v-if="imageList.length>1" style="width: 100%;">
						<view class="image-grid">
							<image v-for="(imageUrl, index) in imageList" :src="imageUrl" :key="index" mode="aspectFill"
								:class="{'two-images': imageList.length === 2, 'grid-image': imageList.length === 3}"
								@tap="previewImage(imageList,index)" />
						</view>
					</view>
				</view>


				<!-- 点赞收藏 -->
				<view class="icon-container  justify-between"
					style="width: 100%; margin-top: 30rpx;margin-bottom: 50rpx;">
					<view style="margin-right: auto;margin-left: 10rpx;" class="new-container">
						<text class="icon-number">{{timeAgo(createTime)}}</text>
					</view>

					<view style="margin-right: 30rpx;" class="new-container">
						<image v-if="isCollected" src="@/static/temp_pic/shoucang3.png" class="icon"
							style="width:42rpx;height: 42rpx;" @click="handleIconClick(1)"></image>
						<image v-else src="@/static/temp_pic/shoucang1.png" class="icon"
							style="width:42rpx;height: 42rpx;" @click="handleIconClick(1)"></image>
						<view style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">{{ saveNumber }}
						</view>
					</view>
					<view style="margin-right: 30rpx;" class="new-container">
						<image v-if="isLiked" src="@/static/temp_pic/dianzan3.png" class="icon"
							style="width:45rpx;height: 45rpx;" @click="handleIconClick(2)"></image>
						<image v-else src="@/static/temp_pic/dianzan1.png" style="width:45rpx;height: 45rpx;"
							@click="handleIconClick(2)"></image>
						<view style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">{{ likeNumber }}
						</view>
					</view>
					<view style="margin-right: 30rpx;" class="new-container">
						<image src="../../static/temp_pic/pinglun.png"
							style="width: 45rpx; height: 45rpx;background-color: white;"
							@click="showAnimationAndNavigate(item2.articleId,0)"></image>
						<view style="font-size: 21rpx;color: lightgray;width: 20rpx;margin-left: 2rpx;">
							{{commentsLength}}
						</view>
					</view>



				</view>

				<!-- <view class="swiper-container flex-row"  >
						<view v-for="(item,index) in imageList" :key="index" style="width: 25rpx;">
							<image :src="item" mode="aspectFill" class="swiper-img"></image>
						</view>	
					</view> -->
				<!-- 评论区域 -->
				<view style="font-size: 32rpx;color: black;margin-top: 5%;margin-left: 5%;">全部评论</view>



				<view class="zwz-comment">


					<view class="comment-item-main" v-for="(item, index) in comments" :key="item.id" :id="index">
						<view class="comment-item">
							<view class="left" style="margin-top: 10rpx;margin-left: 20rpx;">
								<image :src="item.userImg"
									style="width: 75rpx;height: 75rpx; margin-right: 5%; border-radius: 50%;"
									mode="aspectFill" @click="toHis(item.userId)"></image>
							</view>
							<view class="content">
								<view class="title-name" style="display: flex;flex-direction: row">
									<view style="margin-right: auto;color: darkgrey">{{ item.userName }}</view>
									<text class="icon-number">{{timeAgo(item.createTime)}}</text>
								</view>
								<view class="content-text"
									@click="replyComment(item.userName, item.userId, 2, index,item)">
									<view>

										<text v-if="item.replyUserId!==null"
											style="font-size: 30rpx;color: #4095E5;">回复{{item.replyName }}:</text>

										<text v-if="item.replyUserId!==null"
											style="font-size: 30rpx;">{{ item.content }}</text>
										<text v-else style="font-size: 30rpx;">{{ item.content }}</text>
									</view>

								</view>

							</view>

						</view>
						<view
							style="height: 1px;width: 80%;margin-left: 17%; background-color:#FFFAFA; margin-top: 20rpx;margin-bottom: 20rpx;">
						</view>

					</view>



				</view>
			</view>
		</scroll-view>
		<load-more :loadmore="loadmore"></load-more>
		<view class="comment-btm" :style="{bottom: `${downHeight}rpx`}">
			<input class="shuru" v-if="isReplying" v-model="newComment" :adjust-position="false" type="text" :placeholder="placeholderComment2+replyToUser+':'"
				:focus="iptFocus" @input="input" @confirm="sendReply" />
			<input class="shuru" v-else v-model="newComment" :adjust-position="false" type="text" :placeholder="placeholderComment1" :focus="iptFocus"
				@input="input" @confirm="sendPersonalComment" />
			<view class="send-button" @click="sendMessage">发送</view>

		</view>
		<!-- 帖子反馈弹窗 -->
		<view style="position: absolute;z-index: 2000;">
			<uni-popup ref="fankui" background-color="#fff">
				<view class="tanchuang_inner" style="height: 400rpx;">
					<view class="tanchuang_top">
						<view style="height: 15%;display: flex;justify-content: flex-start;width: 100%;height: 10%;">
							<text style="margin: 20rpx;margin-right: auto;">帖子操作</text>

						</view>
						<view class="flex align-center justify-center"
							style="height: 70%;width: 100%; font-size: 40rpx;color: black;opacity: 0.5;margin-bottom: auto; ">
							文明反馈，愉快体验
						</view>
						<view class="tanchuang_bottom" style="margin-top: 100rpx;">

							<view class="tanchuang_tijiao"
								style="color: white; font-size: 30rpx;background-color: #4095E5;" @click="jubao">举报帖子
							</view>
							<view class="tanchuang_tijiao"
								style="color: white; font-size: 30rpx;background-color: #6C6C6C;"
								@click="no_interest">不感兴趣</view>

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
						<scroll-view scroll-y="true" class="jubao_view">
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
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			loadMore,
		},
		computed: {
			windowHeight() {
				return this.rpxTopx(uni.getSystemInfoSync().windowHeight) - 200
			},

		},
		data() {
			return {
				keyboardHeight: 0,
				showLargeImage: false, // 控制是否显示大图
				largeImageUrl: '',
				//训练页的信息
				area: '',
				createTime: '',
				maxNumber: '',
				preference: '',
				roomId: '',
				startTime: '',
				trainType: '',
				authorId: '',
				authorImg: "https://img1.baidu.com/it/u=2526782352,137544254&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690995600&t=0fbfa7d31353cfa62f615ea81df2d3c3", //用户头像,
				authorName: '',
				MyImg: '',
				MyName: '',
				articleId: '',
				type: '',
				saveNumber: 0,
				likeNumber: 0,
				//键盘上移
				upHeight:0,//上面的scroll上移距离
				downHeight:0,//下面的input离底边的距离
				//键盘高度
				keyboardHeight:0,
				//虚拟高度
				xuniHeight:0,
				//滚动距离
				scrollTop: 0,
				loadmore:"上拉加载更多",
				page:1,
				newsList: [{
						loadmore: "上拉加载更多",
						list: [],
						page: 1,
						firstLoad: true
					}
					// 添加更多分类和对应的帖子数据（根据需要添加）
				],
				commentsLength: 0,
				showReplyList: [],
				placeholderComment1: '发条评论吧~',
				placeholderComment2: '回复',
				iptFocus: false,
				layer: 1,
				superCommentId: null,
				myId: -1,
				// 图片轮播的图片链接列表
				imageList: [

				],
				title: "时间发货速度就会", // 帖子标题
				head_sculpture: "https://img1.baidu.com/it/u=2526782352,137544254&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690995600&t=0fbfa7d31353cfa62f615ea81df2d3c3", //用户头像
				showText: false, // 控制是否展开文本
				content: "",
				comments: [

					// Add more comments and replies here
				],
				newComment: '', // 用户输入的评论内容
				isReplying: false, // 是否正在回复
				replyToUser: '', // 被回复的用户名
				replyToCommentId: null, // 被回复的评论ID
				isCollected: false, // 是否已收藏
				isLiked: false, // 是否已点赞
				jubaolabel: [{
						label: '政治敏感',
						selected: false
					},
					{
						label: '血腥暴力',
						selected: false
					},
					{
						label: '攻击辱骂',
						selected: false
					},
					{
						label: '性别歧视',
						selected: false
					},
					{
						label: '违反隐私权',
						selected: false
					},
					{
						label: '虚假信息',
						selected: false
					},
					{
						label: '恶意广告宣传',
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
						label: '恶意传播谣言',
						selected: false
					},
					{
						label: '侵犯版权',
						selected: false
					},
					{
						label: '骚扰行为',
						selected: false
					},
					{
						label: '虚假新闻',
						selected: false
					},
					{
						label: '非法内容',
						selected: false
					},
					{
						label: '垃圾信息',
						selected: false
					},
					{
						label: '种族歧视言论',
						selected: false
					},
					{
						label: '性别骚扰',
						selected: false
					},
					{
						label: '人肉搜索',
						selected: false
					},
					{
						label: '宣扬自杀或自伤行为',
						selected: false
					},
					{
						label: '侮辱宗教信仰',
						selected: false
					},
					{
						label: '恶意冒充他人',
						selected: false
					},
					{
						label: '盗用他人身份',
						selected: false
					},
					{
						label: '色情内容',
						selected: false
					},
					{
						label: '不当引导',
						selected: false
					},
					{
						label: '非法交易',
						selected: false
					},
					{
						label: '侵犯知识产权',
						selected: false
					},
					{
						label: '虚假宣传',
						selected: false
					},
					{
						label: '危险品宣传',
						selected: false
					},
					{
						label: '虚假医疗信息',
						selected: false
					},
					{
						label: '侵犯动物权益',
						selected: false
					},
					{
						label: '其他',
						selected: false
					},
				],
				selectedJubaoTags: [], // 用于存储选中的打法倾向标签
			}
		},
		onLoad(option) {
			//初始化一些数据
			//监听键盘高度
			let _sysInfo = uni.getSystemInfoSync()
			let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight
			this.xuniHeight = _heightDiff > 0 ? _heightDiff : 0
			uni.onKeyboardHeightChange(res => {
				console.log(res);
				this.keyboardHeight = (res.height-this.xuniHeight)>0 ? (res.height-this.xuniHeight):0
				this.downHeight = this.rpxTopx(this.keyboardHeight)
				 this.upHeight = this.rpxTopx(this.keyboardHeight)
				 console.log(this.downHeight);
			  })

			// 发起后端请求
			this.articleId = option.articleId;
			this.type = option.type;

			var bodyData = {
				"articleId": this.articleId,
				"type": this.type
			}
			console.log("dasdsa")
			console.log(bodyData)
			this.$H.post('/article', bodyData)
				.then(response => {
					console.log(response)

					if (this.type != 3) {
						var urlListString = response.data.data.articleContent.articleImg.replace(/\[|\]| /g, '');
						// 使用逗号拆分字符串为数组
						var urlList = urlListString.split(',');
						this.imageList = urlList
						this.createTime = response.data.data.articleContent.createTime
						this.authorId = response.data.data.articleContent.userId
						this.saveNumber = response.data.data.articleContent.saveNum
						this.likeNumber = response.data.data.articleContent.likeNum
						this.commentsLength = response.data.data.commentList.total
						this.title = response.data.data.articleContent.title; // 将返回的数据存储到dataList中
						this.content = response.data.data.articleContent.content
						this.isCollected = response.data.data.isSave
						this.isLiked = response.data.data.isLike
						this.comments = response.data.data.commentList.records
					} else {
						this.area = response.data.data.trainArticleVo.area
						this.createTime = response.data.data.trainArticleVo.createTime
						this.maxNumber = response.data.data.trainArticleVo.maxNumber
						this.preference = response.data.data.trainArticleVo.preference
						this.roomId = response.data.data.trainArticleVo.roomId
						this.startTime = response.data.data.trainArticleVo.startTime
						this.trainType = response.data.data.trainArticleVo.type
						this.authorId = response.data.data.trainArticleVo.userId
						this.saveNumber = response.data.data.trainArticleVo.saveNum
						this.likeNumber = response.data.data.trainArticleVo.likeNum
						this.commentsLength = response.data.data.commentList.total
						this.title = response.data.data.trainArticleVo.roomName; // 将返回的数据存储到dataList中
						this.content = response.data.data.trainArticleVo.content
						this.isCollected = response.data.data.isSave
						this.isLiked = response.data.data.isLike
						this.comments = response.data.data.commentList.records
					}
				})
			console.log(this.articleId)
			this.$H.post('/article/myHeInfo.do', {
					"hisArticleId": this.articleId
				})
				.then(response => {
					console.log("absd")
					console.log(response)
					this.authorImg = response.data.data.authorImg
					this.authorName = response.data.data.hisName
					this.MyImg = response.data.data.myImg
					this.MyName = response.data.data.myName
				})

		},
		methods: {
			// 提交举报
			sendMessage(){
				if(this.isReplying==true){
					this.sendReply()
				}
				else{
					this.sendPersonalComment()
				}
			},
			submit_jubao() {
				if(this.selectedJubaoTags.length==0){
					console.log('至少选择一个标签');
				}else{
					console.log('用户选择举报标签如下:' + this.selectedJubaoTags);
					// 所有标签恢复未选中状态
					this.$H.post('/feedback', {
							content:"举报帖子id为："+this.articleId+"； "+this.selectedJubaoTags,
							complainUserId:this.authorId,
							type:4
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
						})
					this.jubaolabel.forEach(function(item) {
						item.selected = false;
					});
					// 清空用户举报标签存储数组
					this.selectedJubaoTags = [];
				}
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
			},


			adjustModalSize(event) {
				// 图片加载完成后调整模态框大小
				console.log("自适应")
				const imageInfo = event.detail;
				this.modalStyle = `width: ${imageInfo.width}px; height: ${imageInfo.height}px;`;
			},
			previewImage(url, index) {
				console.log(url);
				uni.previewImage({
					urls: url,
					current: url[index],
				})
			},
			closeImage() {
				this.showLargeImage = false; // 关闭大图显示
			},
			showContextMenu(imgUrl) {
				// 在大图上长按时触发的操作，例如保存图片
				console.log(imgUrl)
				uni.showActionSheet({
					itemList: ['保存图片'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.saveImage(imgUrl);
						}
					},
				});
			},
			saveImage(imageUrl) {
				// 保存图片到相册
				uni.saveImageToPhotosAlbum({
					filePath: imageUrl,
					success: () => {
						uni.showToast({
							title: '保存成功',
							icon: 'success',
						});
					},
					fail: () => {
						uni.showToast({
							title: '保存失败',
							icon: 'none',
						});
					},
				});
			},
			getTime(dateTimeString) {
				const dateObj = new Date(dateTimeString);

				const year = dateObj.getFullYear();
				const month = dateObj.getMonth() + 1; // 月份是从0开始的，所以要加1
				const day = dateObj.getDate();
				const hours = dateObj.getHours();
				const minutes = dateObj.getMinutes();

				let timeOfDay;
				if (hours < 12) {
					timeOfDay = "上午";
				} else {
					timeOfDay = "下午";
				}

				const formattedDateTime = `${year}年${month}月${day}日 ${hours}:${minutes}`;
				return formattedDateTime
			},
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
					const month = targetDate.getMonth() + 1; // 月份从 0 开始，需要加 1
					const day = targetDate.getDate();
					return `${month} 月 ${day} 日`;
				}
			},
			toHis(userId) {
				this.$H.post("/user/my").then(res => {
					console.log(res);
					this.myId = res.data.data.userId
					console.log(userId)
					console.log(this.myId);
					if (userId == this.myId) {
						uni.switchTab({
							url: '/pages/my/my'
						})
					} else {
						uni.navigateTo({
							url: `../his_page/his_page?userId=${userId}`
						});
					}
				})
			},
			loadmorea() {
				console.log(this.loadmore)
				if (this.loadmore !== "上拉加载更多") {
					return;
				}
				// 修改当前列表加载状态
				this.loadmore = "加载中...";
				// 请求数据
				this.page++;
				// 由于 TabBar内容是静态的，不再需要获取数据和更新数据
				var bodyData = {
					"pageNum": this.page,
					"articleId": this.articleId
				}
				this.$H.post('/article/article_comment.do', bodyData)
					.then(response => {
						console.log(response)
						this.comments = [...this.comments, ...response.data.data.records]
						if (this.comments.length < response.data.data.total)
							this.loadmore = "上拉加载更多"
						else
							this.loadmore = "已到底线"
					})
			},
			// 展开、收起
			isShowReply(id, index) {
				if (this.showReplyList.indexOf(id) == -1) {
					this.showReplyList.push(id);
					this.$emit('reply-click', this.book);
				} else {
					let index = this.showReplyList.indexOf(id);
					this.showReplyList.splice(index, 1);
				}
			},
			// 点赞
			commentLike(item) {
				if (item.isLike === 0 || item.isLike === null) {
					item.isLike = 1; // 设置为已点赞状态
					item.likeNums++; // 点赞数加1
				} else {
					item.isLike = 0; // 设置为未点赞状态
					item.likeNums--; // 点赞数减1
				}
			},
			// 回复评论
			replyComment(userNickName, id, tier, index, reply) {
				this.iptFocus = true;
				this.placeholderComment = '回复' + userNickName + ": ";
				this.replyToUser = userNickName;
				this.replyToCommentId = id;
				this.isReplying = true;
			},
			// 发送个人评论
			sendPersonalComment() {
				if (this.newComment.trim() === '') {
					alert('输入内容不能为空');
					return;
				}
				var bodyData = {
					"info_id": this.articleId,
					"content": this.newComment,
					"reply_user_id": '',
				}
				this.$H.post('/article/insert_comment.do', bodyData)
					.then(response => {
						console.log(response)
					})
				// 创建个人评论对象，并添加到 comments 数组



				const newCommentObj = {
					id: null,
					userImg: this.MyImg,
					userName: this.MyName,
					content: this.newComment,
					createTime: new Date(),
					replyUserId: null
				};
				console.log(newCommentObj)
				this.comments.unshift(newCommentObj);

				// 清空用户输入
				this.newComment = '';
			},

			// 发送回复
			sendReply() {
				if (this.newComment.trim() === '') {
					alert('输入内容不能为空');
					return;
				}

				var bodyData = {
					"info_id": this.articleId,
					"content": this.newComment,
					"reply_user_id": this.replyToCommentId,
				}
				this.$H.post('/article/insert_comment.do', bodyData)
					.then(response => {
						console.log(response)
					})
				// 创建回复对象，并添加到 comments 数组中相应的评论中
				const newReplyObj = {
					id: null,
					userImg: this.MyImg,
					userName: this.MyName,
					replyName: this.replyToUser,
					content: this.newComment,
					createTime: new Date(),
					replyUserId: -1
					// info_id
					// content:this.newComment,
					// reply_user_id:
				};
				this.comments.unshift(newReplyObj);
				// 找到被回复的评论并添加回复
				const targetComment = this.comments.find(comment => comment.id === this.replyToCommentId);
				if (targetComment) {
					targetComment.children.push(newReplyObj);
				}

				// 清空用户输入
				this.newComment = '';
				this.isReplying = false;
				this.replyToUser = '';
				this.replyToCommentId = null;
			},
			input(event) {
				console.log("dadas")
				this.$emit('input', event.target.value);
			},
			lower() {
				console.log('222222')
				// this.$emit('lower');
			},

			// 底部收藏/分享等功能
			handleIconClick(iconNumber) {
				var bodyData = {
					"articleId": this.articleId,
				}
				switch (iconNumber) {
					case 1:
						// 收藏/取消收藏
						if (!this.isCollected) {
							this.$H.post('/article/save.do', bodyData)
								.then(response => {})
							this.saveNumber++
						} else {
							this.$H.post('/article/cancle_save.do', bodyData)
								.then(response => {})
							this.saveNumber--
						}
						this.isCollected = !this.isCollected;
						// 处理第一个图标的点击事件
						// 执行你想要的功能逻辑
						break;
					case 2:
						// 点赞/取消点赞
						if (!this.isLiked) {
							this.$H.post('/article/like.do', bodyData)
								.then(response => {})
							this.likeNumber++
						} else {
							this.$H.post('/article/cancle_like.do', bodyData)
								.then(response => {})
							this.likeNumber--
						}
						this.isLiked = !this.isLiked;
						// 处理第二个图标的点击事件
						// 执行你想要的功能逻辑
						break;
					case 3:
						// 处理第三个图标的点击事件
						// 执行你想要的功能逻辑
						break;
					default:
						// 默认情况
						break;
				}
			},
			goBack() {
				// 实现返回的逻辑
				uni.navigateBack()
			},
			rpxTopx(px) {
				let deviceWidth = wx.getSystemInfoSync().windowWidth
				let rpx = (750 / deviceWidth) * Number(px)
				return Math.floor(rpx)
			},
			show_popup() {
				this.$refs.fankui.open("center")
			},
			jubao() {
				this.$refs.fankui.close()
				this.$refs.jubao.open('center')
			},
			no_interest() {
				this.$refs.fankui.close()
				uni.showToast({
					title: "将减少展示该类型帖子",
					icon: 'none',
					duration: 2000
				})
			}

		},
	}
</script>

<style lang="scss" scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		overflow: auto;
	}

	.centered-image {
		max-width: 100%;
		/* 设置图片最大宽度 */
		max-height: 100%;
		/* 设置图片最大高度 */
		display: block;
		/* 将图片设置为块级元素 */
		margin: 0 auto;
		/* 水平居中显示 */
		margin-top: auto;
		/* 垂直居中显示 */
		margin-bottom: auto;
		/* 垂直居中显示 */
	}

	.icon-number {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 140rpx;
		// margin-top: 2px; /* 调整上边距 */
		font-size: 10px;
		color: #999;
		text-align: center;
		padding-left: 5rpx;
	}

	.gradient-background {
		position: absolute;
		width: 100%;
		height: 100%;
		/* 使用linear-gradient设置渐变背景 */
		// background-image: url("../../static/compete_bg2.png");
		

	}

	.swiper-container {
		width: 85%;
		/* Set the maximum width to 80% of the page width */
		margin: 0 auto;
		/* Center the swiper-container on the page */
		padding-top: 30rpx;
	}

	.swiper-img {
		width: 25rpx;
		height: 250rpx;
		object-fit: cover;
		border-radius: 10px;


	}

	.container {
		display: flex;
		flex-direction: column;
		margin-top: 3%;

	}

	.first-row {
		display: flex;
		align-items: flex-center;
		/* 根据需要设置第一行的样式，例如设置 padding、margin 等 */
	}

	.title {
		flex: 1;
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
		width: 70%;
		margin-left: 5%;
		display: flex;
		align-items: flex-center;
		/* 根据需要设置内容区域的样式 */
	}

	img {
		width: 60rpx;
		/* 根据需要设置图片的宽度 */
		height: 60rpx;
		/* 根据需要设置图片的高度 */
		object-fit: cover;
		/* 根据需要设置图片的填充方式 */
		border-radius: 50%;
	}

	.content_view {
		width: 90%;
		font-size: 30rpx;


		margin-left: 5%;

		text-align: justify;
		/* 设置文本两端对齐 */
		text-justify: inter-word;
		/* 用于支持更好的两端对齐效果 */
		word-wrap: break-word;
		/* 自动换行 */



		/* 根据需要设置多行文本框的样式，例如设置宽度、高度、padding、margin 等 */
	}

	/* 样式可以根据实际需求进行调整 */
	.comment-section {
		max-height: 700rpx;
		overflow-y: auto;
	}

	.comment {
		padding: 10px;
		margin-bottom: 10px;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
	}

	.comment-user {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.comment-like {
		display: flex;
		align-items: center;
	}

	.like-count {
		margin-right: 5px;
		color: gray;
		padding-right: 36rpx;
	}

	.comment-content {
		margin-bottom: 10px;
	}

	.reply-section {
		margin-left: 80rpx;
		background-color: lightgrey;
	}

	.reply {
		margin-bottom: 5px;
		margin-left: 2%;
	}

	/* 样式可以根据实际需求进行调整 */
	.reply-container {
		margin-top: 10px;
		padding: 5px;
		cursor: pointer;
	}

	input[type="text"] {
		width: 200px;
		padding: 5px;
		display: block;
		/* 让输入框在回复时换行显示 */
		margin-top: 5px;
		border: 1px solid #ccc;
	}

	button {
		margin-top: 5px;
		padding: 5px 10px;
		background-color: cornflowerblue;
		color: #fff;
		border: none;
		cursor: pointer;
	}

	/* 隐藏输入框的样式 */
	input[type="text"][v-cloak] {
		display: none;
	}

	.zwz-comment {
		height: 53%;
		width: 100vw;
		background-color: #fff;

	}

	.zwz-comment .comment-num {
		text-align: center;
		color: black;
		height: 40rpx;
		margin-top: 10rpx;
	}

	.comment-item-main {

		.comment-item {
			display: flex;
			padding: 0 20rpx;

			.left {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;

				.img {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.content {
				flex: 1;
				margin: 0 20rpx;

				.title-name {
					color: black;

					/* display: inline-block; */
					view {
						max-width: 150rpx;
						display: inline-block;
						margin-right: 20rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.content-text {
					/* width: 480rpx; */
					font-size: 16px;
					display: flex;
					align-items: flex-start;
				}

				.content-btm {
					color: #bbbbbb;

					.btm-back {
						margin-left: 40rpx;
						font-size: 16px;
					}
				}
			}

			.right {
				height: 70rpx;

				.img-like {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						display: block;
						width: 50rpx;
						height: 50rpx;
						margin-top: 20rpx;
					}
				}
			}
		}

		.spread {
			color: #bbbbbb;
			margin-left: 120rpx;
			height: 17px;
			position: relative;

			.down {
				width: 0;
				height: 0;
				position: absolute;
				margin-left: 5px;
				top: 7px;
				border-right: 8px solid transparent;
				border-left: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-top: 8px solid #bbbbbb;
			}

			.up {
				width: 0;
				height: 0;
				position: absolute;
				margin-left: 5px;
				bottom: 4px;
				border-right: 8px solid transparent;
				border-left: 8px solid transparent;
				border-bottom: 8px solid #bbbbbb;
				border-top: 8px solid transparent;
			}
		}
	}

	.items {
		margin-left: 80rpx;
	}

	.comment-btm {

		
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		/* position: absolute; */
		position: fixed;
		
		background-color: #fff;
		border-top: 1rpx solid #FFFAFA;

		

		
	}
.shuru {
			height: 50rpx;
			width: 500rpx;
			border-radius: 40rpx;
			background-color: #F9FAFC;
			font-size: 30rpx;
			margin-top: 1%;
			margin-bottom: 1%;
			padding: 10rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
		}
	.comment-like-num {

		width: 50rpx;

	}

	.new-container {
		display: flex;

		align-items: center;
	}

	.icon-container {
		width: 36%;
		display: flex;

		align-items: center;

	}

	.icon {
		width: 50rpx;
		height: 50rpx;
	}

	.info_describe {
		font-size: 30rpx;
		margin-left: 30rpx;
	}

	/* 帖子图片样式 */
	.post-images {
		width: 95%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 10px;
		padding-left: 20rpx;
		margin-left: 30rpx;
	}

	.single-image {
		width: 100%;
		max-height: 900rpx;
		border-radius: 10rpx;
	}

	.two-images {
		width: 300rpx;
		height: 300rpx;
		border-radius: 10rpx;
		margin-right: 5px;
		margin-bottom: 5px;

	}

	.image-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;

		margin-top: 5px;
	}

	.grid-image {
		width: 220rpx;
		height: 220rpx;
		margin-right: 5px;
		margin-bottom: 5px;
		border-radius: 10rpx;
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

	.dingbu {
		width: 100%;
		height: 8%;
		justify-content: space-between;
		position: fixed;
		z-index: 1000;
		background-color: white;
	}

	.tanchuang {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;

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
		justify-content: flex-start;
	}

	.selected-tag {
		background-color: #4095E5;
		color: white;
		display: inline-block;
		margin-left: 4%;
		margin-top: 4%;
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
	}
	
	.unselected-tag {
		background-color: #F8F8F8;
		color: #4F4F4F;
		display: inline-block;
		margin-left: 4%;
		margin-top: 4%;
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
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

	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	movable-area {
		height: 100%;
		width: 100%;
		position: fixed;
		overflow: hidden;
	}

	movable-view image {
		width: 100%;
	}
</style>