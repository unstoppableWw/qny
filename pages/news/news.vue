<template>
  <view class="bg">
	 
	 
	  
	<view style="height: 90rpx;"></view>
	<uni-fab  ref="fab"	
				:pattern="pattern"
				:horizontal="horizontal"
				
				@fabClick="fatie"
				style="z-index: 999;"
	></uni-fab>
	<view id="app" @click="openSearch" class="gradient-background flex flex-column justify-start align-center">
      
      <!-- 中间搜索框 -->
      <view class="flex justify-center align-center rounded text-muted bg-light  mt-1" style="height: 70rpx;width: 700rpx;border-radius: 20rpx;"  >
        <view class="iconfont icon-sousuo mr-1" ></view>搜索帖子
      </view>
    <!-- 顶部选项卡 -->
    
	</view>
    <scroll-view
      scroll-x
      :scroll-into-view="scrollInto"
      scroll-with-animation
      class="scroll-row border-bottom border-light-secondary"
      style="height: 100rpx; margin-top: 20rpx;padding-left: 20rpx;"
    >
      <view
        v-for="(item, index) in tabBars"
        :key="index"
        class="scroll-row-item px-1 py-2 font-md"
		
        :id="'tab' + index"
        :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
		:style="tabIndex === index ? '' : 'color:black'"
        @click="changeTab(index)" style="color:#4095E5;font-size: 32rpx;"
      >
        {{ item.classname }}
		
      </view>
    </scroll-view>
	
    <swiper
      :duration="150"
      :current="tabIndex"
      @change="onChangeTab"
      :style="{height: `${windowHeight}rpx`}"
	  disable-touch="true"
    >
      <swiper-item v-for="(item, index) in newsList" :key="index" ref="swiperItems" style="background-color: white;">
        <scroll-view scroll-y="true" :style="{height: `${windowHeight}rpx`}"
		 @scrolltolower="loadmore(index)"
		 :refresher-triggered = "loading"
		 @refresherrefresh="onRefresh(index)"
		 refresher-enabled="true"  
		 show-scrollbar="false"
		      >
		  <view class="refresh-text" v-if="showRefresh">{{ refreshText }}</view>
          <template v-if="item.list.length > 0">
		  
            <!-- 列表 -->
            <block v-for="(item2, index2) in item.list" :key="index2">
              <!-- 列表样式 -->	
			  <!-- 学习区和闲聊区帖子列表 -->
	
			  <view v-if="tabIndex==0||tabIndex==1">
				<view class="post-container" >
					<view style="background-color: white;border-radius: 5%;" :key="item2.articleId" :class="{ 'enlarge': showAnimation }" ref="card">
						<!-- 上半部分 -->
						<view class="post-header">
							<!-- 左边：帖子标题 -->
							<!-- <view class="post-title">{{ item2.title }}</view> -->
							<view style="width: 100%;height: auto;"  class="flex-column" @click="showAnimationAndNavigate(item2.articleId,0)">
								<view style="display: flex;flex-direction: row;margin-left: 30rpx;">
									<view class="post-title" style="margin-right: auto;">{{ item2.title }}</view>
									<view style="font-size: 25rpx;color: gray;width: 150rpx;display: flex;justify-content: center;">{{timeAgo(item2.createTime)}}</view>
								</view>
								
								<view class="content_container" style="margin-left: 30rpx;font-size: 30rpx;"  >
									<text>
										{{ getContentToShow(item2,index2) }}
										<!-- click.stop-阻断向父容器的传递，防止点击展开或者收起会进入详情页面 -->
										<span v-if="shouldShowExpandButton(item2)" class="expand-button" @click.stop="toggleExpand(item2,index2)">
										    {{ getExpandButtonLabel(item2,index2) }}
										</span>
									</text>
									
								</view>
								<!-- 帖子图片 -->
								<view class="post-images" @click.stop="to_bigImage">
									<!-- 单张图片 -->
								   <view v-if="tolist(item2.articleImg).length==1&&item2.articleImg!=''" style="width: 75%;">
								        <image :src="tolist(item2.articleImg)[0]" mode="widthFix" class="single-image" @tap="previewImage(tolist(item2.articleImg),0)"></image>
								    </view>
									<!-- 两张或三图片 -->
									<view v-if="tolist(item2.articleImg).length>1" style="width: 100%;">
									     <view class="image-grid">
											 <image v-for="(imageUrl, index) in tolist(item2.articleImg)" :src="imageUrl" :key="index" mode="aspectFill" :class="{'two-images': tolist(item2.articleImg).length === 2, 'grid-image': tolist(item2.articleImg).length === 3}" @tap="previewImage(tolist(item2.articleImg),index)" />
									     </view>
									 </view>
								</view>
							</view>
							<!-- 帖子图片
							<!-- <image src="https://th.bing.com/th?id=ORMS.351c32bb194918017df0007136988466&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.25&p=0" mode="aspectFill" style="width: 200rpx;height: 200rpx;margin-top: 10rpx;"></image> -->
							
						</view>
						<!-- 下半部分 -->
						<view class="post-footer">
						  <view class="post-footer-info">
							  <view style="width: 500rpx">
							  	<!-- 头像昵称 -->
							  	<view class="post-footer-info-item" style="display: flex;margin-right: auto;" >
							  		<image :src="item2.userImg" style="width: 85rpx; height: 85rpx;border-radius: 50%;" @click="toHis(item2.userId)"></image>
									<view>
										<view style="font-size: 25rpx;color: black;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">{{item2.userName}}</view>
										<view style="font-size: 20rpx;color: lightgrey;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">黄金会员</view>
									</view>
							  		
							  	</view>
							  </view>
							  <view style="width: 60%;display: flex;justify-content: flex-end;">
							  	<!-- 收藏数 -->
							  	<view class="post-footer-info-item" >
							  	  <image v-if="item2.save==0" src="../../static/temp_pic/shoucang1.png" style="width: 42rpx; height: 42rpx;background-color: white;" @click="handleIconClick(1,index,index2)"></image>
								  <image v-else src="../../static/temp_pic/shoucang3.png" style="width: 42rpx; height: 42rpx;background-color: white;" @click="handleIconClick(1,index,index2)"></image>
							  	  <view style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;" >{{item2.saveNum}}</view>
							  	</view>
							  	<!-- 点赞数 -->
							  	<view class="post-footer-info-item" >
							  	  <image v-if="item2.like==0" src="../../static/temp_pic/dianzan1.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="handleIconClick(2,index,index2)"></image>
							  	  <image v-else src="../../static/temp_pic/dianzan3.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="handleIconClick(2,index,index2)"></image>
							  	  <view style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">{{item2.likeNum}}</view>
							  	</view>
							  	<!-- 评论数 -->
							  	<view class="post-footer-info-item" >
							  	  <image src="../../static/temp_pic/pinglun.png" style="width: 42rpx; height: 42rpx;background-color: white;" @click="showAnimationAndNavigate(item2.articleId,0)"></image>
							  	  <view style="font-size: 21rpx;color: lightgray;width: 40rpx;margin-left: 2rpx;">{{item2.viewNum}}</view>
							  	</view>
							  </view>
						  </view>
						</view>
						
					</view>
				</view>
				<view style="height: 1px;width: ; background-color: #EFEFEF;margin-top: 10rpx;margin-bottom: 20rpx;"></view>
				
			  </view>
			  <!-- 训练区帖子列表 -->
			  <view v-else>
				  <view class="post-container">
				  	<view style="background-color: white;border-radius: 5%;">
				  		<!-- 上半部分 -->
				  		<view class="post-header" style="height: 380rpx;"  @click="showAnimationAndNavigate(item2.articleId,3)">
				  			<!-- 左边：帖子标题 -->
							<view style="width: 70%; display: flex; flex-direction: column;margin-left: 10rpx;">
							  <view class="post-title" style="margin-left: 20rpx;">{{ item2.roomName }}</view>
							
							  <view class="popup_shuru">
							  	<view style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">开始时间</view>
							  	<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;"></view>
							  	<view>{{getTime(item2.startTime)}}</view>
							  </view>
							  <view class="popup_shuru">
							  	<view style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">最大人数</view>
							  	<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;"></view>
							  	<view>{{item2.maxNumber}}人场</view>
							  </view>
							  <view class="popup_shuru">
							  	<view style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">针对地区</view>
							  	<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;"></view>
							  	<view>{{item2.area}}</view>
							  </view>
							  <view class="popup_shuru">
							  	<view style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">组员水平</view>
							  	<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;"></view>
							  	<view>{{item2.preference}}</view>
							  </view>
							  <view class="popup_shuru">
							  	<view style="margin-right:40rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">房间信息</view>
							  	<view style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;"></view>
							  	<view  style="font-size: 23rpx;word-wrap: break-word;color: grey;" maxlength="15" >
									<text>{{item2.content}}</text>
								</view>
							  </view>
							</view>
				  			<!-- 右边：帖子图片 -->
				  			<view style="background-color: #4095E5;color:white;font-weight:bold;width: 130rpx;height: 90rpx;border-radius: 5%;display: flex; justify-content: center; align-items: center;">{{item2.roomType}}无领导</view>
				  		</view>
				  		<!-- 下半部分 -->
				  		<!-- 下半部分 -->
				  		<view class="post-footer">
				  		  <view class="post-footer-info">
				  			  <view style="width: 40%">
				  			  	<!-- 头像昵称 -->
				  			  	<view class="post-footer-info-item" style="display: flex;margin-right: auto;">
				  			  		<image :src="item2.userImg" style="width: 75rpx; height: 75rpx;border-radius: 50%; " @click="toHis(item2.userId)"></image>
				  					<view>
				  						<view style="font-size: 25rpx;color: black;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">{{item2.userName}}</view>
				  						<view style="font-size: 20rpx;color: lightgrey;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">黄金会员</view>
				  					</view>
				  			  		
				  			  	</view>
				  			  </view>
				  			  <view style="width: 60%;display: flex;justify-content: flex-end;">
				  			  	<!-- 收藏数 -->
				  			  	<view class="post-footer-info-item" >
				  			  	  <image v-if="item2.save==0" src="../../static/temp_pic/shoucang1.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="handleIconClick(1,index,index2)"></image>
				  				  <image v-else src="../../static/temp_pic/shoucang3.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="handleIconClick(1,index,index2)"></image>
				  			  	  <view style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;" >{{item2.saveNum}}</view>
				  			  	</view>
				  			  	<!-- 点赞数 -->
				  			  	<view class="post-footer-info-item" >
				  			  	  <image v-if="item2.like==0" src="../../static/temp_pic/dianzan1.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="handleIconClick(2,index,index2)"></image>
				  			  	  <image v-else src="../../static/temp_pic/dianzan3.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="handleIconClick(2,index,index2)"></image>
				  			  	  <view style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">{{item2.likeNum}}</view>
				  			  	</view>
				  			  	<!-- 评论数 -->
				  			  	<view class="post-footer-info-item" >
				  			  	  <image src="../../static/temp_pic/pinglun.png" style="width: 45rpx; height: 45rpx;background-color: white;" @click="showAnimationAndNavigate(item2.articleId,0)"></image>
				  			  	  <view style="font-size: 21rpx;color: lightgray;width: 20rpx;margin-left: 2rpx;">{{item2.viewNum}}</view>
				  			  	</view>
				  			  </view>
				  		  </view>
				  		</view>
				  	</view>
				  </view>
				  <view style="height: 1px;width: ; background-color: #EFEFEF;margin-top: 20rpx;"></view>
			  </view>
			  
              <!-- 全局分割线 -->
              <view class="viewider"></view>
            </block>
            <!-- 上拉加载 -->
            <load-more :loadmore="item.loadmore"></load-more>
          </template>
          <!-- 加载中
          <!-- ... 省略加载中部分 ... -->
          <!-- 无数据 -->
          <!-- ... 省略无数据部分 ... -->
        </scroll-view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>

import $T from '@/common/time.js';
import { mapState } from 'vuex';
import commonList from '@/components/common/common-list.vue';
import loadMore from '@/components/common/load-more.vue';
import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
export default {
  mounted() {
	   // 添加事件监听
  this.$el.addEventListener('touchstart', this.onTouchStart);
  this.$el.addEventListener('touchmove', this.onTouchMove);
  // this.$el.addEventListener('touchend', this.onTouchEnd);
  	this.getData()
  },
  beforeDestroy() {
      // 移除事件监听
      this.$el.removeEventListener('touchstart', this.onTouchStart);
      this.$el.removeEventListener('touchmove', this.onTouchMove);
      // this.$el.removeEventListener('touchend', this.onTouchEnd);
    },

  components: {
    commonList,
    loadMore,
    uniNavBar
  },
  computed: {
  	windowHeight() {
  	    return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
  	},
  	// 键盘弹起来的高度+发送框高度
  	inputHeight(){
  		return this.bottomHeight
  	}
  },
  data() {
    return {
	showLargeImage: false, // 控制是否显示大图
	largeImageUrl: '',
	maxContentLength:100, //帖子内容默认显示长度
	expandedMap: [], // 用于存储每个帖子内容的展开状态
	bottomHeight:100,
	loading:false,
	horizontal:"right",
	vertical:"bottom",
	myId:-1,
	pattern: {
		icon:'compose',
		color: '#4095E5',
		backgroundColor: '#4095E5',
		iconColor: '#fff'
	},
	showAnimation: false,
	scrollHeight:90,
	refreshText: '下拉刷新',
	refreshThreshold: 50,
	startY: 0,
	isTouching: false,
	showRefresh: false,
	largeImgIndex:0,
      // 列表高度
      scrollH: 700,
      // 顶部选项卡
      scrollInto: "",
      tabIndex: 0,
      tabBars: [
        { id: 1, classname: '学习区' },
        { id: 2, classname: '线下约练区' },
        { id: 3, classname: '线上对练区' },
        // 在这里添加其他 TabBar 的选项
      ],
      // 帖子信息列表
       newsList: [
            {
              category_id: 1,
              loadmore: "上拉加载更多",
              list: [],
              page: 1,
              firstLoad: true
            },
            {
              category_id: 2,
              loadmore: "上拉加载更多",
              list: [],
              page: 1,
              firstLoad: true
            },
			{
			  category_id: 3,
			  loadmore: "上拉加载更多",
			  list: [],
			  page: 1,
			  firstLoad: true
			},
            // 添加更多分类和对应的帖子数据（根据需要添加）
          ],
     
    };
  },
created() {
	// 发起后端请求
	var bodyData = null
	this.$H.post('/forum',bodyData)
	   .then(response => {
		console.log(response)
		
		
		this.newsList[0].list = response.data.data.learnArticle.records
		this.newsList[1].list = response.data.data.chatArticle.records
		this.newsList[2].list = response.data.data.trainArticle.records
		console.log(this.newsList[0].list)
	  })
	.catch(error => {
		console.error('Error fetching data:', error);
	});
	  
},
  // 监听点击导航栏搜索框
  onNavigationBarSearchInputClicked() {
    uni.navigateTo({
      url: "../search/search?type=post",
    });
  },
  // 监听导航按钮点击事件
  onNavigationBarButtonTap() {
    this.navigateTo({
      url: "../add-input/add-input",
    });
  },
  onShow() {
  	this.showLargeImage = false;
  },
  onLoad() {
    
    // 监听刷新首页
    uni.$on("updateIndex", () => {
      this.getData();
    });
    // 根据选项生成列表
    this.getData();
    // 监听关注和顶踩操作
    uni.$on("updateFollowOrSupport", (e) => {
      // console.log('接收到了');
      switch (e.type) {
        case "follow": // 关注
          this.follow(e.data.user_id);
          break;
        case "support": // 顶踩
          this.doSupport(e.data);
          break;
      }
    });
    // 监听评论数变化
    uni.$on("updateCommentsCount", ({ id, count }) => {
      this.newsList.forEach((tab) => {
        tab.list.forEach((item) => {
          if (item.id === id) {
            item.comment_count = count;
          }
        });
      });
    });
	
  },
  onUnload() {
    uni.$off("updateFollowOrSupport", (e) => {});
    uni.$off("updateIndex", (e) => {});
    uni.$off("updateCommentsCount", (e) => {});
  },
  methods: {
	adjustModalSize(event) {
	       // 图片加载完成后调整模态框大小
	console.log("自适应")
	       const imageInfo = event.detail;
	       this.modalStyle = `width: ${imageInfo.width}px; height: ${imageInfo.height}px;`;
	     },
	  previewImage(url,index) {
	  
			console.log(url);
			uni.previewImage({
				urls:url,
				current:url[index],
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
	  handleIconClick(iconNumber,index,index2) {
		  if(index2<0){
			  return;
		  }
		  // item = this.newsList[index]
		  var item = this.newsList[index].list[index2]
	  			 var bodyData = {
	  			 	"articleId":item.articleId,
	  			 }
	  		      switch (iconNumber) {
	  		        case 1:
	  					// 收藏/取消收藏
	  					if(item.save==0){
	  						this.$H.post('/article/save.do',bodyData)
	  						   .then(response => {  
	  						   })
	  						   this.newsList[index].list[index2].saveNum++
							   this.newsList[index].list[index2].save=1
	  					}
	  					else{
	  						this.$H.post('/article/cancle_save.do',bodyData)
	  						   .then(response => {  
	  						   })
	  						   this.newsList[index].list[index2].saveNum--
							   this.newsList[index].list[index2].save=0
	  					}
	  				
	  		          // 处理第一个图标的点击事件
	  		          // 执行你想要的功能逻辑
	  		          break;
	  		        case 2:
	  					// 点赞/取消点赞
	  					if(item.like==0){
	  						this.$H.post('/article/like.do',bodyData)
	  						   .then(response => {  
	  						   })
	  						   this.newsList[index].list[index2].likeNum++
							   this.newsList[index].list[index2].like =1
	  					}
	  					else{
	  						this.$H.post('/article/cancle_like.do',bodyData)
	  						   .then(response => {  
	  						   })
	  						   this.newsList[index].list[index2].likeNum--
							   this.newsList[index].list[index2].like=0
	  					}
	  					// this.isLiked = !this.isLiked;
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
	  		
	  tolist(str1){
		  console.log("进入tolist")
		  console.log(str1)
		  if(str1==="[]"||str1==null)
		  {
			  
			  console.log("字符为空")
			  console.log([])
			  return []
		  }
		  var urlListString = str1.replace(/\[|\]| /g, '');
		  // 使用逗号拆分字符串为数组
		  var urlList = urlListString.split(',');
		  console.log(urlList)
		  return urlList;
	  },
	  rpxTopx(px){
	  	let deviceWidth = wx.getSystemInfoSync().windowWidth
	  	let rpx = ( 750 / deviceWidth ) * Number(px)
	  	return Math.floor(rpx)
	  },
	  /**
	  * 下拉刷新
	  */
	  onRefresh(index) {
	        console.log('Refreshing...');
	        // 模拟异步请求
	  			
	  			if(!this.loading){
	  					this.loading = true; //下拉加载，先让其变true再变false才能关闭
	  					//关闭加载状态 (转动的圈)，需要一点延时才能关闭
	  					setTimeout(e =>{
	  						this.loading = false;
	  					},1000)
	  				}
		  this.scrollHeight=105
	      this.refreshData(index)
	      },
	  showAnimationAndNavigate(id,type) {
			console.log(type)
	      uni.navigateTo({
	        url: `../pai_show_topic/pai_show_topic?articleId=${id}&type=${type}`
	      });
	      },
	       refreshData(index) {
	         // 在这里执行刷新数据的逻辑
			 console.log(index)
			  let item = this.newsList[index];
			   // 由于 TabBar内容是静态的，不再需要获取数据和更新数据
			  var bodyData = {
				  "page":1,
				  "typeNum":item.category_id
			   }
	
			   this.$H.post('/forum/up_refresh.do',bodyData)
				  .then(response => {
				// 请求成功时更新dataItems
			   var learn_article = []
			   var chat_article = []
			   var train_article = []
			   if(item.category_id==1){

				  this.newsList[0].list = response.data.data.learnArticle.records
				  this.newsList[0].page = 1
				  item.loadmore = "上拉加载更多"

			   }
			   else if(item.category_id==2){

				  this.newsList[1].list = response.data.data.chatArticle.records
				  this.newsList[1].page = 1
				  item.loadmore = "上拉加载更多"

			   }
			   else if(item.category_id==3){
				  this.newsList[2].list = response.data.data.trainArticle.records
				  this.newsList[2].page = 1
				  item.loadmore = "上拉加载更多"
			   }
			   
			   })
			 
			 // 刷新完数据后调用 resetRefreshState() 方法重置下拉刷新状态
			 this.resetRefreshState();
	       },
	       resetRefreshState() {
	         this.scrollH = 700; // 重置滚动高度
	       },
	// 加载帖子列表
	getData(){
		console.log("666")
	},
	//跳转到他的页面
	toHis(userId){
		//看看是不是自己的页面
		
		this.$H.post("/user/my").then(res=>{
					console.log(res);
				  this.myId = res.data.data.userId
				  console.log("去他的页面咯");
				  console.log(userId)
				  console.log(this.myId);
				  if(userId==this.myId){
				  	uni.switchTab({
				  		url:'/pages/my/my'
				  	})
				  }else{
				  	uni.navigateTo({
				  	  url: `../his_page/his_page?userId=${userId}`
				  	});
				  }
		})
		
		
	},
	//获得时间
	getTime(dateTimeString){
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
			const month = targetDate.getMonth() + 1;  // 月份从 0 开始，需要加 1
			const day = targetDate.getDate();
			return `${month} 月 ${day} 日`;
		  }
		},
	openSearch() {
	  console.log("进入搜索页面")
	  uni.navigateTo({
	  	url: '../search/search',
	  })
	},
    // #ifndef APP-PLUS
    clickLeft() {
      // console.log('左边事件')
    },
	
    clickRight() {
      // 打开发布页面
      uni.navigateTo({
        url: "../add-input/add-input",
      });
    },
    
    // #endif
    // 监听滑动
    onChangeTab(e) {
      this.changeTab(e.detail.current);
    },
    // 切换选项
    changeTab(index) {
      if (this.tabIndex === index) {
        return;
      }
      this.tabIndex = index;
      // 滚动到指定元素
      this.scrollInto = "tab" + index;
      // 由于 TabBar内容是静态的，不再需要获取数据和更新数据
    },
    // 关注
    follow(user_id) {
      // 找到当前作者的所有列表
      this.newsList.forEach((tab) => {
        tab.list.forEach((item) => {
          if (item.user_id === user_id) {
            item.isFollow = true;
          }
        });
      });
      uni.showToast({ title: "关注成功" });
    },
    // 顶踩操作
    doSupport(e) {
      // 拿到当前的选项卡对应的list
      this.newsList[this.tabIndex].list.forEach((item) => {
        if (item.id === e.id) {
          // 之前没有操作过
          if (item.support.type === "") {
            item.support[e.type + "_count"]++;
          } else if (item.support.type === "support" && e.type === "unsupport") {
            // 顶 - 1
            item.support.support_count--;
            // 踩 + 1
            item.support.unsupport_count++;
          } else if (item.support.type === "unsupport" && e.type === "support") {
            // 之前踩了
            // 顶 + 1
            item.support.support_count++;
            // 踩 - 1
            item.support.unsupport_count--;
          }
          item.support.type = e.type;
        }
      });
      let msg = e.type === "support" ? "顶" : "踩";
      uni.showToast({ title: msg + "成功" });
    },
	
	//发帖
	fatie(){
		console.log("去发帖");
		uni.navigateTo({
			url:('/pages/write_tiezi/write_tiezi')
		})
	},
	
    //上拉加载更多
    async loadmore(index) {
      // 拿到当前列表
      let item = this.newsList[index];
      // 判断是否处于可加载状态（上拉加载更多）
	  console.log(item.loadmore)
      if (item.loadmore !== "上拉加载更多") {
		  return;
	  }
      // 修改当前列表加载状态
      item.loadmore = "加载中...";
      // 请求数据
      item.page++;
      // 由于 TabBar内容是静态的，不再需要获取数据和更新数据
	  var bodyData = {
		  "page":item.page,
		  "typeNum":item.category_id
	  }

	  this.$H.post('/forum/down_load.do',bodyData)
	     .then(response => {
	  	// 请求成功时更新dataItems
	  var learn_article = []
	  var chat_article = []
	  var train_article = []
	  console.log(response)
	  console.log(item.category_id)
	  if(item.category_id==1){
		  this.newsList[0].list = [...this.newsList[0].list,...response.data.data.learnArticle.records]
		  if(this.newsList[0].list.length<response.data.data.learnArticle.total)
		  		item.loadmore = "上拉加载更多"
	  }
	  else if(item.category_id==2){
		  this.newsList[1].list = [...this.newsList[1].list,...response.data.data.chatArticle.records]
		  if(this.newsList[1].list.length<response.data.data.chatArticle.total)
		  				item.loadmore = "上拉加载更多"
	  }
	  else if(item.category_id==3){
		  this.newsList[2].list = [...this.newsList[2].list,...response.data.data.trainArticle.records]  
	  }
	  })
    },
	// 帖子展开/收起相关函数
		 getContentToShow(item2, index) {
		   if (this.expandedMap[index] || item2.content.length <= this.maxContentLength) {
		     return item2.content;
		   } else {
		     return item2.content.slice(0, this.maxContentLength) + '...';
		   }
		 },
	
		shouldShowExpandButton(item2) {
		    return item2.content.length > this.maxContentLength;
		},
		getExpandButtonLabel(item2,index2) {
		    return this.expandedMap[index2] ? ' 收起' : ' 展开';
		},
		toggleExpand(item2, index) {
		  this.$set(this.expandedMap, index, !this.expandedMap[index]);
		},
		to_bigImage(){
			console.log("图片变大");
		}
  },
};

</script>

<style>
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
  max-width: 100%; /* 设置图片最大宽度 */
  max-height: 100%; /* 设置图片最大高度 */
  display: block; /* 将图片设置为块级元素 */
  margin: 0 auto; /* 水平居中显示 */
  margin-top: auto; /* 垂直居中显示 */
  margin-bottom: auto; /* 垂直居中显示 */
}
/* 添加动态效果的 CSS 定义 */
.card {
  /* 卡片的样式 */
  background-color: white;
  border-radius: 5%;
  transition: transform 0.5s;
}
.enlarge {
  transform: scale(1.1); /* 放大效果 */
}
.bg{
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.refresh-text {
  text-align: center;
  line-height: 80px;
  color: #999;
}

.gradient-background {
  /* 使用linear-gradient设置渐变背景 */
  
  width: 100%;
  background-size: cover;
  height: 80rpx;
}	

.post-container{
	display: block;
	align-self: center;
	padding-top: 1%;
	width: 100%;
	margin: 0 auto; /* 添加水平居中对齐 */
	
}

.post-header{
	display: flex; /* 设置为flex布局 */
	justify-content: space-between; /* 将标题和图片在同一行并排显示 */
	width: 98%;
	height: auto;
	margin-top: 1%;
	
}

.post-footer {
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 96%;
  padding: 10rpx;
  padding-bottom: 0rpx;
}

.post-footer-info {
  display: flex;
  align-items: center;
  width: 100%;
 
}

.post-footer-info-item {
  display: flex;
  align-items: center;
  margin-left: 3%;
}


.post-item {
	border: solid;
	border-color: #333;
	width: 86%;
	background-color: white;
	border-radius: 10rpx !important;
	height: 300rpx;
}

.post-title {
  font-size: 35rpx;
  font-weight: bold;
  color: black;
  width: 60%;
  padding-left: 20rpx;
  word-wrap: break-word; /* 允许单词在容器宽度超过时自动换行 */
  white-space: normal; /* 让文本超出容器宽度时自动换行 */
  text-align: justify; /* 设置文字两端对齐 */
}

.post-content {
  margin-top: 6px;
  font-size: 14px;
  color: #666;
}

.post-image {
  width: 80%;
  height: 80rpx;
  margin-top: 10px;
}

.swiper-container {
  width: 80%; /* Set the maximum width to 80% of the page width */
  margin: 0 ; /* Center the swiper-container on the page */
  
  margin-top: 30rpx;
}

.swiper-img {
	width: 100%;
	height: 96%;
	object-fit: cover;
	border-radius: 10px;
	border: solid;
	border-color: gainsboro;
}

.info_describe{
	font-size: 30rpx;
	margin-left: 35rpx;
}
.content_container {
    width: 80%;
    height: auto;
    padding-left: 20rpx;
    overflow: hidden;
    word-wrap: break-word; /* 允许单词在容器宽度超过时自动换行 */
    white-space: normal; /* 让文本超出容器宽度时自动换行 */
    text-overflow: ellipsis;/* 文本超出时省略号 */
	text-align: justify; /* 设置文字两端对齐 */
}

.text {
    width: 100%;
}
.expand-button{
	color: #4095E5;
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
.popup_shuru{
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
movable-view {display: flex;align-items: center;justify-content: center;width: 100%;height:100%;}
movable-area {height: 100%;width: 100%;position:fixed;overflow: hidden;}
movable-view image{width:100%;}
</style>

