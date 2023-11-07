<template>
	<view id="app" >
		
		<view  v-if="isVideo">
			<video :src="videoSrc" show-center-play-btn="true" autoplay="true"  style="position: fixed;width: 100%;height: 100%;z-index: 9999;" @click="small_video"
		      >
				
			</video>
		</view>
		<!-- <image src="../../static/tom.jpg" style="width:100%;height: 500rpx;position: absolute;filter: blur(50px);" ></image> -->
		<view class="bg" >
			
			<image :src="userImg" style="width: 100%;height: 600rpx;position: absolute;z-index: -1;" mode="aspectFill"></image>
			<view class="yinying"></view>
			<!-- 头像、昵称、签名 -->
			<view style="height: 70rpx;width: 100%;"></view>
			<view style="width: 100%;height: 100rpx; display: flex;flex-direction: row;margin-bottom: auto;"  >
			   <view style="margin-right: auto;margin-left: 5%;" >
			   		 <image src="../../static/compete/go_out.svg" style="width: 50rpx;z-index: 1000;height: 50rpx;margin-left: 10rpx;margin-bottom: 20rpx;" @click="go_out"></image>
			   </view>	
			  <view style="margin-right: 5%;">
				<!-- <image style="width: 50rpx;height: 50rpx;z-index: 1000;" src="../../static/my/setting_icon2.svg" mode="" @click="to_setting"></image> -->
			  </view>
				
			</view>
			<view class="user-profile" style="margin-left: 20rpx;margin-bottom: 30rpx;z-index: 1000;" >
			  <view style="margin-right: auto;">
			    <view class="small-view" style="font-weight: bold;font-size: 40rpx;color: white;width: 300rpx;margin-left: 5%;">
			      <text>{{userName}}</text>
				 
			    </view>
			    <view class="small-view" style="font-size: 20rpx;margin-top: 30rpx;color: white;margin-left: 10rpx;width: 390rpx;">
			      <image src="../../static/temp_pic/boy.png" style="width: 30rpx;height: 30rpx;margin-right: 10rpx;"></image>
				  {{description}}
			    </view>
			  </view>
			  <view  class="flex " >
			    <view style="margin-left: 20rpx;padding-right: 20rpx;" class="flex flex-column ">
			  					   <text class="flex justify-center " style="font-size: 35rpx;font-weight: 550;color:white;">{{articleNum}}</text>
			  					   <text class="flex justify-center" style="color:white;">帖子</text>
			    </view>
			    <view style="margin-left: 20rpx;padding-right: 20rpx;" class="flex flex-column ">
			    				   <text class="flex justify-center " style="font-size: 35rpx;font-weight: 550;color:white;">{{followNum}}</text>
			    				   <text class="flex justify-center" style="color:white ;">关注</text>
			    </view>
			    <view style="margin-left: 20rpx;padding-right: 20rpx;" class="flex flex-column ">
			    				   <text class="flex justify-center " style="font-size: 35rpx;font-weight: 550;color:white;">{{fansNum}}</text>
			    				   <text class="flex justify-center" style="color:white ;">粉丝</text>
			    </view>
			    
			  </view>
			  
			</view>
			<!-- 关注、粉丝、场次及设置图标 -->
			
		</view>
		
		   
		  
		   <!-- 他的帖子、收藏 -->
		   <view    >
			   <view style="width: 100%;height: 550rpx;z-index: -3;"></view>
			   <view style="padding-left: 2%;border-top-right-radius: 30rpx;border-top-left-radius: 30rpx; background-color: white;display: flex; flex-direction: row;align-items: center;">
				   <scroll-view
					 scroll-x
					 :scroll-into-view="scrollInto"
					 scroll-with-animation
					 class="scroll-row  border-light-secondary"
					 style="height: 100rpx;"
				   >
					 <view
					   v-for="(item, index) in tabBars"
					   :key="index"
					   class="scroll-row-item px-1 py-2 font-md item_biaoqian"
					   :id="'tab' + index"
					   :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
					   :style="tabIndex === index ? '' : 'color:black'"
					   @click="changeTab(index)" style="color:#4095E5;font-size: medium;"
					 >
					   {{ item.classname }}
					 </view>
					</scroll-view>
				   <view  style="margin-right: 20rpx;" >
					   <image :animation="animationData" src="../../static/my/refresh.png" style="width: 50rpx;height: 50rpx;"   @click="refresh"></image>
				   </view>
			   </view>
			   
			   <!-- 帖子显示区域 -->
			   <swiper
			         :duration="150"
			         :current="tabIndex"
			         @change="onChangeTab"
			         :style="{height: `${windowHeight}rpx`}"
					 disable-touch="true"
			       >
				   
				   
				   
			         <swiper-item v-for="(item, index) in articleList" :key="index" ref="swiperItems" style="background-color: white;">
			           <view v-if="canRead_3==false&&index==0" class="flex justify-center align-center" style="font-size: 30rpx;opacity: 0.5;">
							ta的帖子被隐藏咯~
			           </view>
					   <view v-if="canRead_4==false&&index==1" class="flex justify-center align-center" style="font-size: 30rpx;opacity: 0.5;">
					   							ta的收藏被隐藏咯~
					   </view>
					   <scroll-view v-if="can_Yslip==true"  style="height: 95%;" @scrolltoupper="toupper"
			   		 @scrolltolower="loadmore(index)"
			   		  
			   		  
			   		      >
			   		  <!-- <view class="refresh-text" v-if="showRefresh">{{ refreshText }}</view> -->
			             <template v-if="item.list.length > 0">
			   		  
			               <!-- 列表 -->
			               <block v-for="(item2, index2) in item.list" :key="index2">
			                 <!-- 列表样式 -->	
			   			  <!-- 学习区和闲聊区帖子列表 -->
			   	
			   			  <view style="border-top: 1rpx solid #EFEFEF;margin-bottom: 10rpx;padding-top: 20rpx;">
			   				<view class="post-container" >
			   					<view style="background-color: white;border-radius: 5%;" :key="item2.articleId"  ref="card">
			   						<view class="post-header">
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
			   							<view class="post-images" @click.stop="to_bigImage">
			   								<!-- 单张图片 -->
			   								<view style="width: 75%;">
			   									<image :src="item2.cover"
			   										mode="widthFix" class="single-image"
			   										@tap="previewImage(item2.articleImg)">
			   									</image>
			   								</view>
			   								<!-- 两张或三图片 -->
			   								
			   							</view>
			   					</view>
			   				</view>
			   				
			   				
			   			</view>
			   			<view class="post-footer">
			   			  <view class="post-footer-info">
			   				  <view style="width: 500rpx">
			   				  	<!-- 头像昵称 -->
			   				  	<view class="post-footer-info-item" style="display: flex;margin-right: auto;">
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
			   			  <!-- 训练区帖子列表 -->
			   			  
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
					   <scroll-view v-else scroll-y="true" style="height: 95%;"
					    @scrolltolower="loadmore(index)" @scrolltoupper="toupper"
					     
					     
					         >
					     <!-- <view class="refresh-text" v-if="showRefresh">{{ refreshText }}</view> -->
					        <template v-if="item.list.length > 0">
					     
					          <!-- 列表 -->
					          <block v-for="(item2, index2) in item.list" :key="index2">
					            <!-- 列表样式 -->	
					   	  <!-- 学习区和闲聊区帖子列表 -->
					   			   	
					   	  <view style="border-top: 1rpx solid #EFEFEF;margin-bottom: 10rpx;padding-top: 20rpx;">
					   		<view class="post-container" >
					   			<view style="background-color: white;border-radius: 5%;" :key="item2.articleId"  ref="card">
					   				<view class="post-header">
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
					   					<view class="post-images" @click.stop="to_bigImage">
					   						<!-- 单张图片 -->
					   						<view style="width: 75%;">
					   							<image :src="item2.cover"
					   								mode="widthFix" class="single-image"
					   								@tap="previewImage(item2.articleImg)">
					   							</image>
					   						</view>
					   						<!-- 两张或三图片 -->
					   						
					   					</view>
					   			</view>
					   		</view>
					   		
					   		
					   	</view>
					   	<view class="post-footer">
					   	  <view class="post-footer-info">
					   		  <view style="width: 500rpx">
					   		  	<!-- 头像昵称 -->
					   		  	<view class="post-footer-info-item" style="display: flex;margin-right: auto;">
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
					   	  <!-- 训练区帖子列表 -->
					   	  
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
		   <view  style="position: fixed;width: 100%;height: 7%;background-color: white;bottom: 0;border-top:1rpx #EFEFEF solid;">
			   <view style="width: 100%; height: 100%; display: flex; justify-content: center;align-items: flex-end; z-index: 1000;">
			    <!-- <view class="guanzhu_view" style="display: flex; margin-right: 30rpx; width: 140rpx;" @click="followHe">
			       {{follow}}
			     </view>
			     <view class="guanzhu_view" style="display: flex; width: 140rpx;" @click="to_chat">
			       私聊
			     </view> -->
				 <view @click="followHe" style="display: flex;justify-content: center;align-items: center;color: white;font-size: 30rpx; background-color: #5BA5DC;width: 200rpx;height: 100rpx;border-top-left-radius: 50rpx;border-bottom-left-radius: 50rpx;">
					 {{follow}}
				 </view>
				 <view @click="to_chat" style="display: flex;justify-content: center;align-items: center;color: white;font-size: 30rpx;background-color: #4095E5;width: 400rpx;height: 100rpx;border-top-right-radius: 50rpx;border-bottom-right-radius: 50rpx;">
					 <image src="../../static/temp_pic/chat.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx;"></image>
					 <text>私聊</text>
				 </view>
			   </view>
		   </view>
	</view>
</template>

<script>
	import loadMore from '@/components/common/load-more.vue';
export default {
  components: {

    loadMore,

  },
  data(){
	  return{
		  //悬浮按钮属性
		  pattern: {
		  	icon:'arrow-down',
		  	color: '#4095E5',
		  	backgroundColor: '#4095E5',
		  	iconColor: '#fff'
		  },
		  horizontal:"right",
		  //隐私可见
		  canRead_1:true,
		  canRead_2:true,
		  canRead_3:true,
		  canRead_4:true,
		  
		  // 用户信息
		follow:"关注",	
		  level_i:2,
		  level: '入门一阶',
		  loading:false,
		  showLargeImage: false, // 控制是否显示大图
		  largeImageUrl: '',
		  maxContentLength:100, //帖子内容默认显示长度
		  expandedMap: [], // 用于存储每个帖子内容的展开状态
		  userId: null,
		  userImg: null,
		  userName: null,
		  sex: null,
		  area: null,
		  description: null,
		  articleNum: null,
		  followNum: null,
		  fansNum: null,
		  can_Yslip:true,
		  animationData:{},
		  angle:0,
		  scrollInto: "",
		  scrollInto: "",
		  // 列表高度
		  scrollH: 650,
		  tabIndex: 0,
		  tabBars: [
			
		    { id: 0, classname: 'ta的帖子' },
		    { id: 1, classname: 'ta的收藏' },
		    // 在这里添加其他 TabBar 的选项
		  ],
		  hisId:0,
		  scrollTop:0,
		  videoSrc:"",
		  isVideo:false,
		  // 帖子信息列表
		   articleList: [
			    // 我的帖子数据示例
		        {
		          category_id: 1,
		          loadmore: "点击右上角小圆刷新",
		          list: [],
		          page: 1,
		          firstLoad: true
		        },
				// 我的收藏数据示例
				{
				  category_id: 2,
				  loadmore: "点击右上角小圆刷新",
				  list: [],
				  page: 1,
				  firstLoad: true
				},
				],
		base_info: [{
				title: "所在城市",
				content: "广东省 中山市"
			},
			{
				title: "报考类型",
				content: "公考"
			},
			{
				title: "报考城市",
				content: "广东省 中山市"
			},
			{
				title: "面试形式",
				content: "无领导"
			},
			
			{
				title: "面试经验",
				content: "2次"
			}
		],
		skill_info: [{
				title: "打法倾向",
				labels: []
			},
			{
				title: "擅长",
				labels: []
			},
			{
				title: "弱点",
				labels: []
			}
		],
	  }
  },
  onPageScroll(e) {
  	let _this = this
  	//获取当前页面滚动高度
  	console.log("haha");
  	console.log(e.scrollTop);
  	this.scrollTop = e.scrollTop
  	if (e.scrollTop > 140) {
  		_this.can_Yslip = false
  		
  	} else if(e.scrollTop<140) {
  		_this.can_Yslip = true
  		}
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
  
  onShow() {
  	this.isXiahua=false
  },
  onLoad(option) {
	  this.hisId = option.userId
	  const heId = option.userId
	  //const heId = 1
	   this.$H.post("/user/he",{"userId":heId}).then(res=>{
				console.log("加载个人资料");
	  		  console.log(res)
	  		  if(res.data.data.follow==1){
	  			  this.follow = "已关注"
	  		  }
	  		  this.userId = res.data.data.userId
	  		  this.userName = res.data.data.userName
	  		  this.userImg = res.data.data.userImg
	  		  this.sex = res.data.data.sex
	  		  this.area = res.data.data.area
	  		  this.description = res.data.data.description
	  		  this.followNum = res.data.data.followNum
	  		  this.fansNum = res.data.data.fansNum
	  		  this.articleNum = res.data.data.articleNum
	   })
	   
	   this.$H.post("/user/heArticle",{"page":this.articleList[0].page,"userId":heId}).then(res=>{
	  			  console.log("这是我的帖子")
				  console.log(res.data);
				  if(res.data.data=="你已被加入黑名单"){
					  uni.showToast({
					  	title:"您已被拉黑",
						icon:"error"
					  },1000)
					  setTimeout(()=>{
						   uni.navigateBack()
					  },2000)
					 return
				  }
				  else if(res.data.data=="不允许查看"){
				  	this.canRead_3=false
				  }else{
					this.articleList[0].list = res.data.data
					}
	   })
	   
	   this.$H.post("/user/heSaveArticle",{"page":this.articleList[1].page,"userId":heId}).then(res=>{
	  			console.log("这是我的收藏")
				console.log(res.data);
				if(res.data.data=="不允许查看"){
					this.canRead_4=false
				}else{
					this.articleList[1].list = res.data.data
				}
	  			
	   })
		
	   this.$H.post("/user/getHeInterviewInfo.do", {
	   	"userId": heId
	   }).then(res => {
	   let data= res.data.data
	   console.log("这是个人资料")
		console.log(heId);
	   	console.log(res)
		if(data=="不允许查看"){
			this.canRead_1=false
		}else{
			
			this.base_info[0].content = data.applicationRegion
			this.base_info[1].content = data.applicationType
			this.base_info[2].content = data.currentRegion
			this.base_info[3].content = data.interviewFormat
			this.base_info[4].content = data.interviewExperience
			
		}
	   })
	   
	   this.$H.post("/user/getHeInterviewTag.do", {
	   	"userId": heId
	   }).then(res => {
			console.log("这是面试定位")
	   		console.log(heId);
			console.log(res);
			let data= res.data.data
	   		if(data=="不允许查看"){
	   			this.canRead_2=false
	   		}else{
	   			this.skill_info[0].labels= data.badTag
				this.skill_info[1].labels= data.goodTag
				this.skill_info[2].labels= data.likeTag	
	   		}
	   })
	  console.log("页数"+this.articleList[0].page)
  },
  methods :{
	  refresh(){
	  		  var animation = uni.createAnimation({
	  			  duration:1000,
	  			  timingFunction:'linear'
	  		  })
	  		  this.angle+=360
	  		  this.animationData = animation
	  		  animation.rotate(this.angle).step()
	  		  console.log("动起来");
	  		  this.animationData = animation.export()
			  let heId = this.hisId
	  		  this.$H.post("/user/he",{"userId":heId}).then(res=>{
	  		  		  console.log(res)
	  		  		  if(res.data.data.follow==1){
	  		  			  this.follow = "已关注"
	  		  		  }
	  		  		  this.userId = res.data.data.userId
	  		  		  this.userName = res.data.data.userName
	  		  		  this.userImg = res.data.data.userImg
	  		  		  this.sex = res.data.data.sex
	  		  		  this.area = res.data.data.area
	  		  		  this.description = res.data.data.description
	  		  		  this.followNum = res.data.data.followNum
	  		  		  this.fansNum = res.data.data.fansNum
	  		  		  this.articleNum = res.data.data.articleNum
	  		   })
	  		   
	  		   this.$H.post("/user/heArticle",{"page":this.articleList[0].page,"userId":heId}).then(res=>{
	  		  			  console.log(res.data);
	  		  			  this.articleList[0].list = res.data.data
	  		   })
	  		   
	  		   this.$H.post("/user/heSaveArticle",{"page":this.articleList[1].page,"userId":heId}).then(res=>{
	  		  			console.log(res.data);
	  		  			this.articleList[1].list = res.data.data
	  		   })
	  		  
	  		  console.log("页数"+this.articleList[0].page)
	  },
	  followHe(){
		  console.log("asdf")
	  		  var bodyData = {
	  			  "followUserId":this.userId
	  		  }
	  		  if(this.follow=="关注"){
	  			  console.log(bodyData)
	  			  this.$H.post('/user/follow.do',bodyData)
	  			  	  			   .then(response => {
	  								   console.log("asdad")
	  			  	  				this.follow = "已关注"
	  			  })
	  		  }
	  		  else{
	  			  this.$H.post('/user/cancle_follow.do',bodyData)
	  							   .then(response => {
	  								   console.log(response)
	  								this.follow = "关注"
	  			  })
	  		  }
	  },
	  toupper:function(e){
	  	console.log("到顶部啦")
	  	console.log(e);
	  	this.can_Yslip=true
	  	
	  },
	  handleIconClick(iconNumber,index,index2) {
	  		  if(index2<0){
	  			  return;
	  		  }
	  		  // item = this.newsList[index]
			  console.log("进入点击")
			  console.log(index)
			  console.log(index2)
			  console.log(iconNumber)
	  		  var item = this.articleList[index].list[index2]
			  console.log(item)
				 var bodyData = {
					"articleId":item.articleId,
				 }
	  		      switch (iconNumber) {
	  		        case 1:
	  					// 收藏/取消收藏
	  					if(item.save==0){
	  						this.$H.post('/article/save.do',bodyData)
	  						   .then(response => {  
								   console.log(response)
	  						   })
	  						   this.articleList[index].list[index2].saveNum++
	  							this.articleList[index].list[index2].save=1
	  					}
	  					else{
	  						this.$H.post('/article/cancle_save.do',bodyData)
	  						   .then(response => {  
	  						   })
	  						   this.articleList[index].list[index2].saveNum--
	  							   this.articleList[index].list[index2].save=0
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
	  						   this.articleList[index].list[index2].likeNum++
	  							   this.articleList[index].list[index2].like =1
	  					}
	  					else{
	  						this.$H.post('/article/cancle_like.do',bodyData)
	  						   .then(response => {  
	  						   })
	  						   this.articleList[index].list[index2].likeNum--
	  							this.articleList[index].list[index2].like=0
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
	  		
	  rpxTopx(px){
	  	let deviceWidth = wx.getSystemInfoSync().windowWidth
	  	let rpx = ( 750 / deviceWidth ) * Number(px)
	  	return Math.floor(rpx)
	  },
	  adjustModalSize(event) {
	         // 图片加载完成后调整模态框大小
	  console.log("自适应")
	         const imageInfo = event.detail;
	         this.modalStyle = `width: ${imageInfo.width}px; height: ${imageInfo.height}px;`;
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
					  }else if(userId==this.hisId){
						  console.log("不用跳转");
					  }
					  else{
					  	uni.navigateTo({
					  	  url: `../his_page/his_page?userId=${userId}`
					  	});
					  }
			})
			
			
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
		  refreshData(index){
					console.log(index)
		  			  let item = this.articleList[index];
		  			  if(item.category_id==1){
		  			  this.$H.post("/user/myArticle",{"page":1}).then(res=>{
		  			  		  console.log(res)
		  			  			  this.articleList[0].list =[]
									console.log("刷新完成1")
									console.log(this.articleList[0].list)
								   this.articleList[0].list=res.data.data
								   console.log("刷新完成")
								  console.log(this.articleList[0].list)
		  			  })
		  			  	
		  			  }
		  			  else if(item.category_id==2){
		  			  	this.$H.post("/user/saveArticle",{"page":1}).then(res=>{
		  			  			  console.log(res)
		  			  				  this.articleList[1].list = res.data.data
		  			  	})
		  			    
		  			  }
		  		  },
	  tolist(str1){

		  if(str1==="[]"||str1==null)
		  {
			  
	
			  return []
		  }
		  var urlListString = str1.replace(/\[|\]| /g, '');
		  // 使用逗号拆分字符串为数组
		  var urlList = urlListString.split(',');

		  return urlList;
	  },
	  getContentToShow(item2, index) {
	     if (this.expandedMap[index] || item2.content.length <= this.maxContentLength) {
	       return item2.content;
	     } else {
	       return item2.content.slice(0, this.maxContentLength) + '...';
	     }
	   },
	  	
	  shouldShowExpandButton(item2) {

	      return item2.length > this.maxContentLength;
	  },
	  getExpandButtonLabel(item2,index2) {
	      return this.expandedMap[index2] ? ' 收起' : ' 展开';
	  },
	  toggleExpand(item2, index) {
	    this.$set(this.expandedMap, index, !this.expandedMap[index]);
	  },
	  showAnimationAndNavigate(id,type) {
	  		
	      uni.navigateTo({
	        url: `../pai_show_topic/pai_show_topic?articleId=${id}&type=${type}`
	      });
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
	  to_bianji(){
		  uni.navigateTo({
		  	url:"/pages/head_bianji/head_bianji"
		  })
	  },
	  to_setting(){
		uni.navigateTo({
			url:"/pages/user_setting/user_setting"
		})
	  },
	  to_chat(){
	  		  this.$H.post("/message/to_chat.do",{"targetUserId": this.userId}).then(res=>{
				  console.log(res);
	  			  if(res.data.code == 200) {
	  				  uni.navigateTo({
	  				  	url:`../user_chat/user_chat?targetUserId=${this.userId}&targetUserName=${this.userName}&targetUserImg=${this.userImg}&sessionId=${res.data.data.sessionId}&type=${res.data.data.type}`
	  				  })
	  			  }
	  		  })
	  },
	loadmore(index) {
		console.log("进入加载")
	    // 拿到当前列表
		console.log(index)
	    let item = this.articleList[index];
	    // 判断是否处于可加载状态（上拉加载更多）
	    
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
	    }
	  
	    console.log("进入加载")
	    console.log(item)
	    console.log("进入加载")
	    	// 请求成功时更新dataItems
		if(item.category_id==1){
			this.$H.post('/user/heArticle',bodyData)
			   .then(response => {
				   console.log(response.data.data)
				this.articleList[0].list = [...this.articleList[0].list,...response.data.data]
				if(response.data.data.length<10)
						item.loadmore = "—— 已经到底了 ——"
		   })
		  // if(this.articleList[0].list.length<response.data.data.learnArticle.total)
		  // 		item.loadmore = "上拉加载更多"
		}
		else if(item.category_id==2){
			this.$H.post('/user/heSaveArticle',bodyData)
						   .then(response => {
				this.articleList[1].list = [...this.articleList[1].list,...response.data.data]
				if(response.data.data.length<10)
						item.loadmore = "—— 已经到底了 ——"
			})
		  
		}

	   
	  },
	  previewImage(url) {
	  	console.log(url);
	  	this.videoSrc = url
	  	this.isVideo = true
	  },
	  small_video(){
	  	this.videoSrc = null
	  	this.isVideo = false
	  },
	  to_bigImage(){
	  	console.log("图片变大");
	  },
	  go_out(){
		  uni.navigateBack()
	  },
	  xuanfu(){
	  		  if(this.pattern.icon=="arrow-down"){
	  			  uni.pageScrollTo({
	  			  	scrollTop:340,
	  				duration:50
	  			  })
	  			  
	  		  }else{
	  			  uni.pageScrollTo({
	  			  	scrollTop:0,
	  			  	duration:50
	  			  })
	  			  
	  		  }
	  }
  }
};
</script>


<style>
.yinying{
	width: 100%;
	height: 600rpx;
	position: absolute;
	background-image: linear-gradient(to top, black 0%, white 100%);
	opacity: 0.3;
	z-index: -1;
}

/* 背景颜色渐变 */
.bg {
	width: 100%;
	height: 550rpx;
	position: absolute;
	
	display: flex;
	flex-direction: column;
}
/* 设置用户个人主页容器样式 */
.user-profile {
  display: flex;
}
.user-profile1 {
  display: flex;
  align-items: stretch; /* 子元素纵向填充容器 */
}

/* 设置左边的容器样式 */
.left-column {
  flex: 0 0 70%; /* 宽度占70%，不可伸缩，不可收缩 */
  display: flex;
  flex-direction: column; /* 竖向排列 */
  align-items: stretch; /* 子元素纵向填充容器 */
   margin-top: 3%;
}

/* 设置左边两个小view的样式 */
.small-view {
  /* flex: 1; /* 均分父容器高度 */ 
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200rpx;
  margin-left: 10%;
  height: 40rpx;
}

/* 设置右边的容器样式 */
.right-column {
  flex: 0 0 30%; /* 宽度占30%，不可伸缩，不可收缩 */
  margin-top: 3%;
}

/* 设置右边图片的样式 */
.right-column img {
  width: 170rpx;
  height: 170rpx;
  height: auto;
  display: block; /* 确保图片占据整个右侧容器 */
  border-radius: 50%;
}

/* 设置左边的用户信息容器样式 */
.user-info {
  flex: 0 0 80%; /* 宽度占70%，不可伸缩，不可收缩 */
  display: flex;
  flex-direction: column; /* 竖向排列 */
}

/* 设置左边用户信息中每个小项的样式 */
.user-info-item {
  flex: 1; /* 均分父容器宽度 */
  margin: 5px;
  padding: 10rpx;
  text-align: center;
  font-size: small;
  font-weight: bold;
}

/* 设置右边的用户图标容器样式 */
.user-icon {
  
  padding-top: 20rpx;
  padding-left: 120rpx;
  
  width: 30rpx;
  height: 30rpx;
}

/* 设置用户图标样式 */
.user-icon img {
	padding-left: 50rpx;
  max-width: 100%;
  max-height: 100%;
}

/* 设置用户个人主页容器样式 */
.user-profile1 {
  display: flex;
  align-items: stretch; /* 子元素纵向填充容器 */
}

/* 设置左边的用户信息容器样式 */
.left-column1 {
  flex: 0 0 70%; /* 宽度占70%，不可伸缩，不可收缩 */
  display: flex;
}

/* 设置左边用户信息中每个小项的样式 */
.user-info-item {
  margin: 5px;
  padding: 10px;
  text-align: center;
}

/* 设置右边的用户图标容器样式 */
.right-column1 {
  flex: 0 0 30%; /* 宽度占30%，不可伸缩，不可收缩 */
  margin: 5px;
  padding: 10px;
  text-align: center;
}

/* 设置用户图标样式 */
.user-icon img {
  max-width: 100%;
  max-height: 100%;
}

.guanzhu_view{
	display: flex;
			background-color: #4095E5;
			border-radius: 40rpx;
			width: 130rpx;
			height: 70rpx;
			color: white; 
			font-size: 30rpx;
			flex-direction: row;
			justify-content: center;
			align-items: center;
}
.post-container{
	display: block;
	align-self: center;
	padding-top: 1%;
	width: 100%;
	margin: 0 auto; /* 添加水平居中对齐 */
	
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

.content_container_small {
    width: 400rpx;
    height: 200rpx;
    padding-left: 20rpx;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
}
.content_container_big {
    width: 600rpx;
    height: 200rpx;
    padding-left: 20rpx;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
}

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

.enlarge {
  transform: scale(1.1); /* 放大效果 */
}
.bg{
	
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
	margin-left: 20rpx;
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
.info_container {
		width: 99%;
		display: flex;
		flex-direction: column;

		height: 800rpx;
	}

	.info_view {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx;
	}

	.info_row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px 0;
	}

	.edit-button {
		background-color: #4095E5;
		font-size: medium;
		color: #fff;
		padding: 5px 10px;
		border: none;
		border-radius: 50rpx;
		height: 30px;
		display: flex;
		/* 将按钮内部内容变为弹性盒子 */
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */

	}

	.mnjl_view {
		width: 90%;
		height: auto;
		 
		
		border-radius: 10rpx;
		margin-top: 2%;
		display: flex;
		flex-direction: column;
	}
	.item_biaoqian{
		width: auto;
		margin-left: 10rpx;
	}
	.date_view {
		width: 70%;
		height: 60rpx;
		display: flex;
		justify-content: flex-end;
		
	}

	.date_text {
		font-size: 28rpx;
		opacity: 0.7;
		padding-left: 12rpx;
		padding-top: 12rpx;
		padding-bottom: 12rpx;
		display: flex;
		color: grey;
		align-items: center;
		border-radius: 20rpx
	}

	
movable-view {display: flex;align-items: center;justify-content: center;width: 100%;height:100%;}
movable-area {height: 100%;width: 100%;position:fixed;overflow: hidden;}
movable-view image{width:100%;}
</style>
