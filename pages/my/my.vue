<template>
	<view id="app">
		<view v-if="canSlip"
			style="width: 100%;height: 100%;z-index: 1;position: fixed;background-color: red;opacity: 0.5;"></view>
		<!-- <image src="../../static/tom.jpg" style="width:100%;height: 500rpx;position: absolute;filter: blur(50px);" ></image> -->
		<view class="bg">
			<!-- <uni-fab ref="fab" :pattern="pattern" :horizontal="horizontal" :vertical="veritcal" @fabClick="xuanfu"
				style="z-index: 999;"></uni-fab> -->
			<image :src="userImg" style="width: 100%;height: 600rpx;position: absolute;z-index: -1;" mode="aspectFill">
			</image>
			<view class="yinying"></view>
			<!-- 头像、昵称、签名 -->
			<view style="height: 100rpx;width: 100%;"></view>
			<view style="width: 100%;height: 100rpx; display: flex;flex-direction: row;margin-bottom: auto;">
				<view style="margin-right: auto;margin-left: 5%;">
					<image src="../../static/my/change_icon_5.png"
						style="width: 50rpx;z-index: 10;height: 50rpx;margin-left: 10rpx;margin-bottom: 20rpx;"
						@click="to_bianji"></image>
				</view>
				<view style="margin-right: 5%;">
					<image style="width: 50rpx;height: 50rpx;z-index: 10;" src="../../static/my/setting_icon.svg"
						mode="" @click="to_setting"></image>
				</view>

			</view>
			<view class="user-profile" style="margin-left: 20rpx;margin-bottom: 30rpx;z-index: 10;">
				<view style="margin-right: auto;">
					<view class="small-view"
						style="font-weight: bold;font-size: 40rpx;color: white;width: 300rpx;margin-left: 5%;">
						<text>{{userName}}</text>

					</view>
					<view class="small-view"
						style="font-size: 20rpx;margin-top: 30rpx;color: white;margin-left: 10rpx;width: 390rpx;">
						<image src="../../static/temp_pic/boy.png"
							style="width: 30rpx;height: 30rpx;margin-right: 10rpx;"></image>
						{{description}}
					</view>
				</view>
				<view class="flex ">
					<view style="margin-left: 20rpx;padding-right: 20rpx;" class="flex flex-column ">
						<text class="flex justify-center "
							style="font-size: 35rpx;font-weight: 550;color:white;">{{articleNum}}</text>
						<text class="flex justify-center" style="color:white;">帖子</text>
					</view>
					<view style="margin-left: 20rpx;padding-right: 20rpx;" class="flex flex-column "
						@click="to_guanzhu">
						<text class="flex justify-center "
							style="font-size: 35rpx;font-weight: 550;color:white;">{{followNum}}</text>
						<text class="flex justify-center" style="color:white ;">关注</text>
					</view>
					<view style="margin-left: 20rpx;padding-right: 20rpx;" class="flex flex-column " @click="to_fensi">
						<text class="flex justify-center "
							style="font-size: 35rpx;font-weight: 550;color:white;">{{fansNum}}</text>
						<text class="flex justify-center" style="color:white ;">粉丝</text>
					</view>

				</view>

			</view>
			<!-- 关注、粉丝、场次及设置图标 -->

		</view>



		<!-- 下面区域 -->
		<view style="overflow: hidden;">
			<view style="width: 100%;height: 550rpx;z-index: -3;"></view>
			<view
				style="padding-left: 2%;border-top-right-radius: 30rpx;border-top-left-radius: 30rpx; background-color: white ; display: flex; flex-direction: row;align-items: center;">
				<scroll-view scroll-x :scroll-into-view="scrollInto" scroll-with-animation
					class="scroll-row  border-light-secondary" style="height: 100rpx;">
					<view style="min-height: calc(100vh + 1rpx);">
						<view v-for="(item, index) in tabBars" :key="index" class="scroll-row-item px-1 py-2 font-md item_biaoqian" 
							:id="'tab' + index" :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
							:style="tabIndex === index ? '' : 'color:black'" @click="changeTab(index)"
							style="color:#4095E5;font-size: medium;">
							{{ item.classname }}
						</view>
					</view>

				</scroll-view>
				<view style="margin-right: 20rpx;">
					<image :animation="animationData" src="../../static/my/refresh.png"
						style="width: 50rpx;height: 50rpx;" @click="refresh"></image>
				</view>
			</view>

			<!-- 帖子显示区域 -->
			<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="{height: `${windowHeight}rpx`}"
				disable-touch="true">
				
				<!-- 我的帖子和收藏区域 -->
				<swiper-item v-for="(item, index) in articleList" :key="index" ref="swiperItems"
					style="background-color: white;overflow: hidden;">
					<scroll-view v-if="can_Yslip==true"  style="height: 1500rpx;" @scrolltolower="loadmore(index)"  @scrolltoupper="toupper"
						show-scrollbar="false">
						
						<view style="min-height: calc(100vh + 1rpx);z-index: 99">
							<template v-if="item.list.length == 0">
								<view class="flex justify-center align-center"
									style="width: 100%;height: 200rpx;color:lightgrey;">
									这里空空如也~
								</view>
							</template>
							<!-- <view class="refresh-text" v-if="showRefresh">{{ refreshText }}</view> -->
							<template v-if="item.list.length > 0">
					
								<!-- 列表 -->
								<block v-for="(item2, index2) in item.list" :key="index2">
									<!-- 列表样式 -->
									<!-- 学习区和闲聊区帖子列表 -->
					
									<view
										style="border-top: 1rpx solid #EFEFEF;margin-bottom: 10rpx;padding-top: 20rpx;">
										<view v-if="item2.roomId!=null" class="post-container">
											<view style="background-color: white;border-radius: 5%;">
												<!-- 上半部分 -->
												<view class="post-header" style="height: 380rpx;"
													@click="showAnimationAndNavigate(item2.articleId,3)">
													<!-- 左边：帖子标题 -->
													<view
														style="width: 70%; display: flex; flex-direction: column;margin-left: 10rpx;">
														<view class="post-title" style="margin-left: 20rpx;">
															{{ item2.roomName }}
														</view>
					
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																开始时间</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{getTime(item2.startTime)}}</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																最大人数</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{item2.maxNumber}}人场</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																针对地区</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{item2.area}}</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																组员水平</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{item2.preference}}</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">
																房间信息</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view
																style="font-size: 23rpx;word-wrap: break-word;color: grey;"
																maxlength="15">
																<text>{{item2.content}}</text>
															</view>
														</view>
													</view>
													<!-- 右边：帖子图片 -->
													<view
														style="background-color: #4095E5;color:white;font-weight:bold;width: 130rpx;height: 90rpx;border-radius: 5%;display: flex; justify-content: center; align-items: center;">
														{{item2.roomType}}无领导
													</view>
												</view>
												<!-- 下半部分 -->
												<!-- 下半部分 -->
												<view class="post-footer">
													<view class="post-footer-info">
														<view style="width: 40%">
															<!-- 头像昵称 -->
															<view class="post-footer-info-item"
																style="display: flex;margin-right: auto;">
																<image :src="item2.userImg"
																	style="width: 75rpx; height: 75rpx;border-radius: 50%;"
																	@click="toHis(item2.userId)"></image>
																<view>
																	<view
																		style="font-size: 25rpx;color: black;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																		{{item2.userName}}
																	</view>
																	<view
																		style="font-size: 20rpx;color: lightgrey;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																		黄金会员</view>
																</view>
					
															</view>
														</view>
														<view
															style="width: 60%;display: flex;justify-content: flex-end;">
															<!-- 收藏数 -->
															<view class="post-footer-info-item">
																<image v-if="item2.save==0"
																	src="../../static/temp_pic/shoucang1.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(1,index,index2)"></image>
																<image v-else src="../../static/temp_pic/shoucang3.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(1,index,index2)"></image>
																<view
																	style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																	{{item2.saveNum}}
																</view>
															</view>
															<!-- 点赞数 -->
															<view class="post-footer-info-item">
																<image v-if="item2.like==0"
																	src="../../static/temp_pic/dianzan1.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(2,index,index2)"></image>
																<image v-else src="../../static/temp_pic/dianzan3.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(2,index,index2)"></image>
																<view
																	style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																	{{item2.likeNum}}
																</view>
															</view>
															<!-- 评论数 -->
															<view class="post-footer-info-item">
																<image src="../../static/temp_pic/pinglun.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="showAnimationAndNavigate(item2.articleId,0)">
																</image>
																<view
																	style="font-size: 21rpx;color: lightgray;width: 20rpx;margin-left: 2rpx;">
																	{{item2.viewNum}}
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view v-if="item2.roomId==null" class="post-container">
											<view style="background-color: white;border-radius: 5%;"
												:key="item2.articleId" ref="card">
												<view class="post-header">
													<view style="width: 100%;height: auto;" class="flex-column"
														@click="showAnimationAndNavigate(item2.articleId,0)">
					
														<view
															style="display: flex;flex-direction: row;margin-left: 30rpx;">
															<view class="post-title" style="margin-right: auto;">
																{{ item2.title }}
															</view>
															<view
																style="font-size: 25rpx;color: gray;width: 150rpx;display: flex;justify-content: center;">
																{{timeAgo(item2.createTime)}}
															</view>
														</view>
														<view class="content_container"
															style="margin-left: 30rpx;font-size: 30rpx;">
															<text>
																{{ getContentToShow(item2,index2) }}
																<!-- click.stop-阻断向父容器的传递，防止点击展开或者收起会进入详情页面 -->
																<span v-if="shouldShowExpandButton(item2)"
																	class="expand-button"
																	@click.stop="toggleExpand(item2,index2)">
																	{{ getExpandButtonLabel(item2,index2) }}
																</span>
															</text>
					
														</view>
														<view class="post-images" @click.stop="to_bigImage">
															<!-- 单张图片 -->
															<view
																v-if="tolist(item2.articleImg).length==1&&item2.articleImg!=''"
																style="width: 75%;">
																<image :src="tolist(item2.articleImg)[0]"
																	mode="widthFix" class="single-image"
																	@tap="previewImage(tolist(item2.articleImg),0)">
																</image>
															</view>
															<!-- 两张或三图片 -->
															<view v-if="tolist(item2.articleImg).length>1"
																style="width: 100%;">
																<view class="image-grid">
																	<image
																		v-for="(imageUrl, index) in tolist(item2.articleImg)"
																		:src="imageUrl" :key="index" mode="aspectFill"
																		:class="{'two-images': tolist(item2.articleImg).length === 2, 'grid-image': tolist(item2.articleImg).length === 3}"
																		@tap="previewImage(tolist(item2.articleImg),index)" />
																</view>
															</view>
														</view>
													</view>
												</view>
					
					
											</view>
											<view class="post-footer">
												<view class="post-footer-info">
													<view style="width: 500rpx">
														<!-- 头像昵称 -->
														<view class="post-footer-info-item"
															style="display: flex;margin-right: auto;">
															<image :src="item2.userImg"
																style="width: 85rpx; height: 85rpx;border-radius: 50%;"
																@click="toHis(item2.userId)"></image>
															<view>
																<view
																	style="font-size: 25rpx;color: black;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																	{{item2.userName}}
																</view>
																<view
																	style="font-size: 20rpx;color: lightgrey;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																	黄金会员</view>
															</view>
					
														</view>
													</view>
													<view style="width: 60%;display: flex;justify-content: flex-end;">
														<!-- 收藏数 -->
														<view class="post-footer-info-item">
															<image v-if="item2.save==0"
																src="../../static/temp_pic/shoucang1.png"
																style="width: 42rpx; height: 42rpx;background-color: white;"
																@click="handleIconClick(1,index,index2)"></image>
															<image v-else src="../../static/temp_pic/shoucang3.png"
																style="width: 42rpx; height: 42rpx;background-color: white;"
																@click="handleIconClick(1,index,index2)"></image>
															<view
																style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																{{item2.saveNum}}
															</view>
														</view>
														<!-- 点赞数 -->
														<view class="post-footer-info-item">
															<image v-if="item2.like==0"
																src="../../static/temp_pic/dianzan1.png"
																style="width: 45rpx; height: 45rpx;background-color: white;"
																@click="handleIconClick(2,index,index2)"></image>
															<image v-else src="../../static/temp_pic/dianzan3.png"
																style="width: 45rpx; height: 45rpx;background-color: white;"
																@click="handleIconClick(2,index,index2)"></image>
															<view
																style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																{{item2.likeNum}}
															</view>
														</view>
														<!-- 评论数 -->
														<view class="post-footer-info-item">
															<image src="../../static/temp_pic/pinglun.png"
																style="width: 42rpx; height: 42rpx;background-color: white;"
																@click="showAnimationAndNavigate(item2.articleId,0)">
															</image>
															<view
																style="font-size: 21rpx;color: lightgray;width: 40rpx;margin-left: 2rpx;">
																{{item2.viewNum}}
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
					
					
									</view>
									<!-- 训练区帖子列表 -->
					
									<!-- 全局分割线 -->
									<!-- <view class="viewider"></view> -->
								</block>
								<!-- 上拉加载 -->
								<load-more :loadmore="item.loadmore" ></load-more>
								<view style="width: 100%;height: 60rpx;"></view>
							</template>
						</view>
					
					
						<!-- 加载中
					     <!-- ... 省略加载中部分 ... -->
						<!-- 无数据 -->
						<!-- ... 省略无数据部分 ... -->
					</scroll-view>
					<scroll-view v-else scroll-y="true" style="height: 1500rpx;" @scrolltolower="loadmore(index)"  @scrolltoupper="toupper"
						show-scrollbar="false">
						
						<view style="min-height: calc(100vh + 1rpx);z-index: 99">
							<template v-if="item.list.length == 0">
								<view class="flex justify-center align-center"
									style="width: 100%;height: 200rpx;color:lightgrey;">
									这里空空如也~
								</view>
							</template>
							<!-- <view class="refresh-text" v-if="showRefresh">{{ refreshText }}</view> -->
							<template v-if="item.list.length > 0">

								<!-- 列表 -->
								<block v-for="(item2, index2) in item.list" :key="index2">
									<!-- 列表样式 -->
									<!-- 学习区和闲聊区帖子列表 -->

									<view
										style="border-top: 1rpx solid #EFEFEF;margin-bottom: 10rpx;padding-top: 20rpx;">
										<view v-if="item2.roomId!=null" class="post-container">
											<view style="background-color: white;border-radius: 5%;">
												<!-- 上半部分 -->
												<view class="post-header" style="height: 380rpx;"
													@click="showAnimationAndNavigate(item2.articleId,3)">
													<!-- 左边：帖子标题 -->
													<view
														style="width: 70%; display: flex; flex-direction: column;margin-left: 10rpx;">
														<view class="post-title" style="margin-left: 20rpx;">
															{{ item2.roomName }}
														</view>

														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																开始时间</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{getTime(item2.startTime)}}</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																最大人数</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{item2.maxNumber}}人场</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																针对地区</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{item2.area}}</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;font-weight: 550;margin-left: 30rpx;font-size: 30rpx;">
																组员水平</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view>{{item2.preference}}</view>
														</view>
														<view class="popup_shuru">
															<view
																style="margin-right:40rpx;margin-left:30rpx;font-weight: 550;font-size: 30rpx;">
																房间信息</view>
															<view
																style="width: 5rpx;height: 40rpx;background-color: #4095E5;margin-right: 40rpx;">
															</view>
															<view
																style="font-size: 23rpx;word-wrap: break-word;color: grey;"
																maxlength="15">
																<text>{{item2.content}}</text>
															</view>
														</view>
													</view>
													<!-- 右边：帖子图片 -->
													<view
														style="background-color: #4095E5;color:white;font-weight:bold;width: 130rpx;height: 90rpx;border-radius: 5%;display: flex; justify-content: center; align-items: center;">
														{{item2.roomType}}无领导
													</view>
												</view>
												<!-- 下半部分 -->
												<!-- 下半部分 -->
												<view class="post-footer">
													<view class="post-footer-info">
														<view style="width: 40%">
															<!-- 头像昵称 -->
															<view class="post-footer-info-item"
																style="display: flex;margin-right: auto;">
																<image :src="item2.userImg"
																	style="width: 75rpx; height: 75rpx;border-radius: 50%;"
																	@click="toHis(item2.userId)"></image>
																<view>
																	<view
																		style="font-size: 25rpx;color: black;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																		{{item2.userName}}
																	</view>
																	<view
																		style="font-size: 20rpx;color: lightgrey;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																		黄金会员</view>
																</view>

															</view>
														</view>
														<view
															style="width: 60%;display: flex;justify-content: flex-end;">
															<!-- 收藏数 -->
															<view class="post-footer-info-item">
																<image v-if="item2.save==0"
																	src="../../static/temp_pic/shoucang1.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(1,index,index2)"></image>
																<image v-else src="../../static/temp_pic/shoucang3.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(1,index,index2)"></image>
																<view
																	style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																	{{item2.saveNum}}
																</view>
															</view>
															<!-- 点赞数 -->
															<view class="post-footer-info-item">
																<image v-if="item2.like==0"
																	src="../../static/temp_pic/dianzan1.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(2,index,index2)"></image>
																<image v-else src="../../static/temp_pic/dianzan3.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="handleIconClick(2,index,index2)"></image>
																<view
																	style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																	{{item2.likeNum}}
																</view>
															</view>
															<!-- 评论数 -->
															<view class="post-footer-info-item">
																<image src="../../static/temp_pic/pinglun.png"
																	style="width: 45rpx; height: 45rpx;background-color: white;"
																	@click="showAnimationAndNavigate(item2.articleId,0)">
																</image>
																<view
																	style="font-size: 21rpx;color: lightgray;width: 20rpx;margin-left: 2rpx;">
																	{{item2.viewNum}}
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view v-if="item2.roomId==null" class="post-container">
											<view style="background-color: white;border-radius: 5%;"
												:key="item2.articleId" ref="card">
												<view class="post-header">
													<view style="width: 100%;height: auto;" class="flex-column"
														@click="showAnimationAndNavigate(item2.articleId,0)">

														<view
															style="display: flex;flex-direction: row;margin-left: 30rpx;">
															<view class="post-title" style="margin-right: auto;">
																{{ item2.title }}
															</view>
															<view
																style="font-size: 25rpx;color: gray;width: 150rpx;display: flex;justify-content: center;">
																{{timeAgo(item2.createTime)}}
															</view>
														</view>
														<view class="content_container"
															style="margin-left: 30rpx;font-size: 30rpx;">
															<text>
																{{ getContentToShow(item2,index2) }}
																<!-- click.stop-阻断向父容器的传递，防止点击展开或者收起会进入详情页面 -->
																<span v-if="shouldShowExpandButton(item2)"
																	class="expand-button"
																	@click.stop="toggleExpand(item2,index2)">
																	{{ getExpandButtonLabel(item2,index2) }}
																</span>
															</text>

														</view>
														<view class="post-images" @click.stop="to_bigImage">
															<!-- 单张图片 -->
															<view
																v-if="tolist(item2.articleImg).length==1&&item2.articleImg!=''"
																style="width: 75%;">
																<image :src="tolist(item2.articleImg)[0]"
																	mode="widthFix" class="single-image"
																	@tap="previewImage(tolist(item2.articleImg),0)">
																</image>
															</view>
															<!-- 两张或三图片 -->
															<view v-if="tolist(item2.articleImg).length>1"
																style="width: 100%;">
																<view class="image-grid">
																	<image
																		v-for="(imageUrl, index) in tolist(item2.articleImg)"
																		:src="imageUrl" :key="index" mode="aspectFill"
																		:class="{'two-images': tolist(item2.articleImg).length === 2, 'grid-image': tolist(item2.articleImg).length === 3}"
																		@tap="previewImage(tolist(item2.articleImg),index)" />
																</view>
															</view>
														</view>
													</view>
												</view>


											</view>
											<view class="post-footer">
												<view class="post-footer-info">
													<view style="width: 500rpx">
														<!-- 头像昵称 -->
														<view class="post-footer-info-item"
															style="display: flex;margin-right: auto;">
															<image :src="item2.userImg"
																style="width: 85rpx; height: 85rpx;border-radius: 50%;"
																@click="toHis(item2.userId)"></image>
															<view>
																<view
																	style="font-size: 25rpx;color: black;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																	{{item2.userName}}
																</view>
																<view
																	style="font-size: 20rpx;color: lightgrey;margin-left: 10rpx;white-space: nowrap;display: flex;align-items: flex-start;">
																	黄金会员</view>
															</view>

														</view>
													</view>
													<view style="width: 60%;display: flex;justify-content: flex-end;">
														<!-- 收藏数 -->
														<view class="post-footer-info-item">
															<image v-if="item2.save==0"
																src="../../static/temp_pic/shoucang1.png"
																style="width: 42rpx; height: 42rpx;background-color: white;"
																@click="handleIconClick(1,index,index2)"></image>
															<image v-else src="../../static/temp_pic/shoucang3.png"
																style="width: 42rpx; height: 42rpx;background-color: white;"
																@click="handleIconClick(1,index,index2)"></image>
															<view
																style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																{{item2.saveNum}}
															</view>
														</view>
														<!-- 点赞数 -->
														<view class="post-footer-info-item">
															<image v-if="item2.like==0"
																src="../../static/temp_pic/dianzan1.png"
																style="width: 45rpx; height: 45rpx;background-color: white;"
																@click="handleIconClick(2,index,index2)"></image>
															<image v-else src="../../static/temp_pic/dianzan3.png"
																style="width: 45rpx; height: 45rpx;background-color: white;"
																@click="handleIconClick(2,index,index2)"></image>
															<view
																style="font-size: 21rpx;color: lightgray;width: 60rpx;margin-left: 2rpx;">
																{{item2.likeNum}}
															</view>
														</view>
														<!-- 评论数 -->
														<view class="post-footer-info-item">
															<image src="../../static/temp_pic/pinglun.png"
																style="width: 42rpx; height: 42rpx;background-color: white;"
																@click="showAnimationAndNavigate(item2.articleId,0)">
															</image>
															<view
																style="font-size: 21rpx;color: lightgray;width: 40rpx;margin-left: 2rpx;">
																{{item2.viewNum}}
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>


									</view>
									
								</block>
								<!-- 上拉加载 -->
								<load-more :loadmore="item.loadmore"></load-more>
								<view style="width: 100%;height: 60rpx;"></view>
							</template>
							
						</view>


						<!-- 加载中
			             <!-- ... 省略加载中部分 ... -->
						<!-- 无数据 -->
						<!-- ... 省略无数据部分 ... -->
					</scroll-view>
				</swiper-item>
				<!-- 模拟记录 -->
				
			</swiper>
		</view>

	</view>
</template>

<script>
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {

			loadMore,

		},
		data() {
			return {
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
						labels: ["强势流", "温婉派"]
					},
					{
						title: "擅长",
						labels: ["强势流", "引领流"]
					},
					{
						title: "弱点",
						labels: ["语言表达", "不够自信"]
					}
				],
				//悬浮按钮属性
				pattern: {
					icon: 'arrow-down',
					color: '#4095E5',
					backgroundColor: '#4095E5',
					iconColor: '#fff'
				},
				horizontal: "right",
				// 用户信息
				level: '入门一阶',
				level_i: 2,
				loading: false,
				showLargeImage: false, // 控制是否显示大图
				largeImageUrl: '',
				maxContentLength: 100, //帖子内容默认显示长度
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
				animationData: {},
				angle: 0,
				scrollInto: "",
				selfInform_isshow: "已隐藏",
				selflocate_isshow: "已隐藏",
				// 列表高度
				scrollH: 650,
				tabIndex: 0,
				can_Yslip:true,
				tabBars: [
					{
						id: 0,
						classname: '帖子'
					},
					{
						id: 1,
						classname: '收藏'
					},
					

					// 在这里添加其他 TabBar 的选项
				],
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
				monijilu: [],
				//能否活动
				canSlip: false,
				scrollTop: 0,
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
				_this.pattern.icon = "arrow-up"
			} else if(e.scrollTop<140) {
				_this.can_Yslip = true
				this.pattern.icon = "arrow-down"
			}
		},
		computed: {
			windowHeight() {
				return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
			},
			// 键盘弹起来的高度+发送框高度
			inputHeight() {
				return this.bottomHeight
			}
		},

		onLoad() {
			this.$H.post("/user/my").then(res => {

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
			console.log("页数" + this.articleList[0].page)
			this.$H.post("/user/myArticle", {
				"page": this.articleList[0].page
			}).then(res => {
				console.log("dada")
				console.log(res)
				this.articleList[0].list = res.data.data
				console.log(this.articleList[0].list)
			})

			this.$H.post("/user/saveArticle", {
				"page": this.articleList[1].page
			}).then(res => {
				console.log("sa")
				console.log(res)
				this.articleList[1].list = res.data.data
			})

			this.$H.post("/user/get_interview.do", {
				"user_id": this.userId
			}).then(res => {
				console.log("sadddssd")
				console.log(res)
				this.base_info = res.data.data.base_info;
				this.skill_info = res.data.data.skill_info;


			})
			this.$H.post("/room/train_list").then(res => {
				console.log("获得模拟对练资料")
				console.log(res)
				let data = res.data.data
				
					
				for(let i = 0;i < data.length;i++){
					this.monijilu.push({
						"id":data[i].roomId,
						"type":data[i].type,
						"title":data[i].bookName,
						"people_num":data[i].realNumber,
						"date":data[i].startTime
					})
					
				}
				console.log(this.monijilu);
				//this.moni_list = res.data.data
			})
			
		},
		methods: {
			//编辑资料
			edit() {

			},
			refresh() {
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'linear'
				})
				this.angle += 360
				this.animationData = animation
				animation.rotate(this.angle).step()
				console.log("动起来");
				this.animationData = animation.export()


				this.$H.post("/user/my").then(res => {
					console.log("aaaaaaaaaaaaaaaaa");
					console.log(res);
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
				console.log("页数" + this.articleList[0].page)
				this.$H.post("/user/myArticle", {
					"page": 1
				}).then(res => {
					console.log("dada")
					console.log(res)
					this.articleList[0].list = res.data.data
					console.log(this.articleList[0].list)
				})

				this.$H.post("/user/saveArticle", {
					"page": 1
				}).then(res => {
					console.log("46")
					console.log(res)
					this.articleList[1].list = res.data.data
				})
				
				this.$H.post("/room/train_list").then(res => {
					console.log("获得模拟对练资料")
					console.log(res)
					let data = res.data.data
					
					this.monijilu = []
					for(let i = 0;i < data.length;i++){
						this.monijilu.push({
							"id":data[i].roomId,
							"type":data[i].type,
							"title":data[i].bookName,
							"people_num":data[i].realNumber,
							"date":data[i].startTime
						})
						
					}
					console.log(this.monijilu);
					//this.moni_list = res.data.data
				})
			},
			handleIconClick(iconNumber, index, index2) {
				if (index2 < 0) {
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
					"articleId": item.articleId,
				}
				switch (iconNumber) {
					case 1:
						// 收藏/取消收藏
						if (item.save == 0) {
							this.$H.post('/article/save.do', bodyData)
								.then(response => {
									console.log(response)
								})
							this.articleList[index].list[index2].saveNum++
							this.articleList[index].list[index2].save = 1
						} else {
							this.$H.post('/article/cancle_save.do', bodyData)
								.then(response => {})
							this.articleList[index].list[index2].saveNum--
							this.articleList[index].list[index2].save = 0
						}

						// 处理第一个图标的点击事件
						// 执行你想要的功能逻辑
						break;
					case 2:
						// 点赞/取消点赞
						if (item.like == 0) {
							this.$H.post('/article/like.do', bodyData)
								.then(response => {})
							this.articleList[index].list[index2].likeNum++
							this.articleList[index].list[index2].like = 1
						} else {
							this.$H.post('/article/cancle_like.do', bodyData)
								.then(response => {})
							this.articleList[index].list[index2].likeNum--
							this.articleList[index].list[index2].like = 0
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

			rpxTopx(px) {
				let deviceWidth = wx.getSystemInfoSync().windowWidth
				let rpx = (750 / deviceWidth) * Number(px)
				return Math.floor(rpx)
			},
			adjustModalSize(event) {
				// 图片加载完成后调整模态框大小
				console.log("自适应")
				const imageInfo = event.detail;
				this.modalStyle = `width: ${imageInfo.width}px; height: ${imageInfo.height}px;`;
			},
			//跳转到他的页面
			toHis(userId) {
				//看看是不是自己的页面


				if (userId != this.userId) {


					uni.navigateTo({
						url: `../his_page/his_page?userId=${userId}`
					});
				}



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
			onRefresh(index) {
				console.log('Refreshing...');
				// 模拟异步请求
				if (!this.loading) {
					this.loading = true; //下拉加载，先让其变true再变false才能关闭
					//关闭加载状态 (转动的圈)，需要一点延时才能关闭
					setTimeout(e => {
						this.loading = false;
					}, 1000)
				}
				// this.scrollHeight=105
				this.refreshData(index)
			},
			refreshData(index) {
				console.log(index)
				let item = this.articleList[index];
				if (item.category_id == 1) {
					this.$H.post("/user/myArticle", {
						"page": 1
					}).then(res => {
						console.log(res)
						this.articleList[0].list = []
						console.log("刷新完成1")
						console.log(this.articleList[0].list)
						this.articleList[0].list = res.data.data
						console.log("刷新完成")
						console.log(this.articleList[0].list)
					})

				} else if (item.category_id == 2) {
					this.$H.post("/user/saveArticle", {
						"page": 1
					}).then(res => {
						console.log(res)
						this.articleList[1].list = res.data.data
					})

				}
			},
			tolist(str1) {

				if (str1 === "[]" || str1 == null) {


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
			getExpandButtonLabel(item2, index2) {
				return this.expandedMap[index2] ? ' 收起' : ' 展开';
			},
			toggleExpand(item2, index) {
				this.$set(this.expandedMap, index, !this.expandedMap[index]);
			},
			showAnimationAndNavigate(id, type) {

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
					const month = targetDate.getMonth() + 1; // 月份从 0 开始，需要加 1
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
			to_bianji() {
				uni.navigateTo({
					url: "/pages/head_bianji/head_bianji"
				})
			},
			to_bianji2() {
				uni.navigateTo({
					url: "/pages/head_bianji2/head_bianji2"
				})
			},
			to_setting() {
				uni.navigateTo({
					url: "/pages/user_setting/user_setting"
				})
			},
			gotoMnjl(item) {
				console.log("hhhh");
				console.log(item);
				if(item.type=="无领导"){
					uni.navigateTo({
						url:`/pages/result_analyze/wulingdao_result_analyze?roomId=${item.id}&first_come=false`
					})
				}else if(item.type=="结构化"){
					uni.navigateTo({
						url:`/pages/result_analyze/jiegouhua_result_analyze?roomId=${item.id}&first_come=false`
					})
				}
				
			},
			toupper:function(e){
				console.log("到顶部啦")
				console.log(e);
				this.can_Yslip=true
				
			},
			loadmore(index) {
				// 把悬浮按钮转换为向上
				this.pattern.icon = "arrow-up"
				// 拿到当前列表

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
					"page": item.page,
				}


				// 请求成功时更新dataItems
				if (item.category_id == 1) {
					this.$H.post('/user/myArticle', bodyData)
						.then(response => {
							this.articleList[0].list = [...this.articleList[0].list, ...response.data.data]

							console.log("加载更多")
							if (response.data.data.length < 10)
								item.loadmore = "—— 已经到底了 ——"
						})

				} else if (item.category_id == 2) {
					this.$H.post('/user/saveArticle', bodyData)
						.then(response => {
							this.articleList[1].list = [...this.articleList[1].list, ...response.data.data]

							if (response.data.data.length < 10)
								item.loadmore = "—— 已经到底了 ——"
						})

				}


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
			to_guanzhu() {
				// 打开关注页面
				uni.navigateTo({
					url: '../msg_guanzhu/msg_guanzhu',
				})
			},
			to_fensi() {
				uni.navigateTo({
					url: '../msg_fensi/msg_fensi',
				})
			},
			to_bigImage() {
				console.log("图片变大");
			},
			xuanfu() {
				if (this.pattern.icon == "arrow-down") {
					uni.pageScrollTo({
						scrollTop: 270,
						duration: 50
					})

				} else {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 50
					})

				}
			}
		}
	};
</script>


<style>
	.yinying {
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
		align-items: stretch;
		/* 子元素纵向填充容器 */
	}

	/* 设置左边的容器样式 */
	.left-column {
		flex: 0 0 70%;
		/* 宽度占70%，不可伸缩，不可收缩 */
		display: flex;
		flex-direction: column;
		/* 竖向排列 */
		align-items: stretch;
		/* 子元素纵向填充容器 */
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
		flex: 0 0 30%;
		/* 宽度占30%，不可伸缩，不可收缩 */
		margin-top: 3%;
	}

	/* 设置右边图片的样式 */
	.right-column img {
		width: 170rpx;
		height: 170rpx;
		height: auto;
		display: block;
		/* 确保图片占据整个右侧容器 */
		border-radius: 50%;
	}

	/* 设置左边的用户信息容器样式 */
	.user-info {
		flex: 0 0 80%;
		/* 宽度占70%，不可伸缩，不可收缩 */
		display: flex;
		flex-direction: column;
		/* 竖向排列 */
	}

	/* 设置左边用户信息中每个小项的样式 */
	.user-info-item {
		flex: 1;
		/* 均分父容器宽度 */
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
		align-items: stretch;
		/* 子元素纵向填充容器 */
	}

	/* 设置左边的用户信息容器样式 */
	.left-column1 {
		flex: 0 0 70%;
		/* 宽度占70%，不可伸缩，不可收缩 */
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
		flex: 0 0 30%;
		/* 宽度占30%，不可伸缩，不可收缩 */
		margin: 5px;
		padding: 10px;
		text-align: center;
	}

	/* 设置用户图标样式 */
	.user-icon img {
		max-width: 100%;
		max-height: 100%;
	}

	.guanzhu_view {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		flex-direction: row;
		border: solid 1rpx;
		border-radius: 5%;
		font-size: medium;
		color: black;
		background-color: cornflowerblue;
		margin-left: 8%;
	}

	.post-container {
		display: block;
		align-self: center;
		padding-top: 1%;
		width: 100%;
		margin: 0 auto;
		/* 添加水平居中对齐 */

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

	/* 添加动态效果的 CSS 定义 */

	.enlarge {
		transform: scale(1.1);
		/* 放大效果 */
	}

	.bg {}

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

	.post-container {
		display: block;
		align-self: center;
		padding-top: 1%;
		width: 100%;
		margin: 0 auto;
		/* 添加水平居中对齐 */

	}

	.post-header {
		display: flex;
		/* 设置为flex布局 */
		justify-content: space-between;
		/* 将标题和图片在同一行并排显示 */
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
	.item_biaoqian{
		width: 70rpx;
	}
	.post-title {
		font-size: 35rpx;
		font-weight: bold;
		color: black;
		width: 60%;
		padding-left: 20rpx;
		word-wrap: break-word;
		/* 允许单词在容器宽度超过时自动换行 */
		white-space: normal;
		/* 让文本超出容器宽度时自动换行 */
		text-align: justify;
		/* 设置文字两端对齐 */
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
		width: 80%;
		/* Set the maximum width to 80% of the page width */
		margin: 0;
		/* Center the swiper-container on the page */

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

	.info_describe {
		font-size: 30rpx;
		margin-left: 20rpx;
	}

	.content_container {
		width: 80%;
		height: auto;
		padding-left: 20rpx;
		overflow: hidden;
		word-wrap: break-word;
		/* 允许单词在容器宽度超过时自动换行 */
		white-space: normal;
		/* 让文本超出容器宽度时自动换行 */
		text-overflow: ellipsis;
		/* 文本超出时省略号 */
		text-align: justify;
		/* 设置文字两端对齐 */
	}

	.text {
		width: 100%;
	}

	.expand-button {
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

	.refresh_img {
		width: 50rpx;
		height: 50rpx;

	}

	.refresh_img:hover {
		animation: jello;

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