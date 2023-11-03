<template>
	<view id="#app" class="gradient-background">
		<!-- 自定义导航 -->
		<view style="height: 130rpx;width: 100%;"></view>
		<view style="height: 88rpx;z-index: 9999; padding-top: 90rpx;"
		class="flex align-center px-2 position-fixed left-0 top-0 right-0 bg-white">
			<view class="iconfont icon-sousuo position-absolute text-muted" 
			style="left: 60rpx;font-size: 25rpx; "></view>
			<input class="flex-1 rounded bg-light" style="padding: 15rpx 25rpx 15rpx 50rpx;border-radius: 20rpx; font-size: 25rpx;margin-left: 30rpx" type="text" v-model="searchText" @confirm="searchEvent"
			placeholder=" 搜索" 
			placeholder-style="color: #CCCCCC;"/>
			<text class="pl-2" @click="goBack" style="color: #4095E5;">取消</text>
		</view>
		<view style="height: 40rpx;"></view>
		
		
		<view v-if="searchList.length == 0">
			
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2" style="font-weight: 700;">搜索历史</view>
			<view class="flex flex-wrap " style="margin-left: 20rpx;">
				
				<view class=" font mx-2 my-1 px-2" style="font-size: 25rpx;"  
				v-for="(item,index) in list" :key="index"
				hover-class="bg-light"
				@click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</view>
		<view v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<template v-if="type ==='post'">
					<!-- 帖子 -->
					<common-list :item="item" :index="index"></common-list>
				</template>
				<template v-else-if="type === 'topic'">
					<!-- 话题 -->
					<topic-list :item="item" :index="index"></topic-list>
				</template>
				<template v-else>
					<!-- 用户 -->
					<user-list :item="item" :index="index"></user-list>
				</template>
			</block>
			
			<!-- 上拉加载 -->
			<load-more :loadmore="loadmore"></load-more>
		</view>
		
	</view>
</template>

<script>

	import commonList from '@/components/common/common-list.vue';
	import topicList from '@/components/news/topic-list.vue';
	import userList from '@/components/user-list/user-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components: {
			commonList,
			topicList,
			userList,
			loadMore
		},
		data() {
			return {
				searchText:"",
				list:[],
				// 搜索结果
				searchList:[],
				// 当前搜索类型
				type:"post",
				loadmore:"上拉加载更多",
				page:1
			}
		},
		// 监听导航输入
		onNavigationBarSearchInputChanged(e){
			this.searchText = e.text
		},
		// 监听点击导航搜索按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type){
				case 'post':
				pageTitle = '帖子'
				// 监听关注和顶踩操作
				uni.$on('updateFollowOrSupport',(e)=>{
					switch (e.type){
						case 'follow': // 关注
						this.follow(e.data.user_id)
							break;
						default:
							break;
					}
				})
					break;
				case 'topic':
				pageTitle = '话题'
					break;
				case 'user':
				pageTitle = '用户'
					break;
			}
			// 修改搜索占位
			
			// let currentWebview = this.$mp.page.$getAppWebview();
			// let tn = currentWebview.getStyle().titleNView; 
			// tn.searchInput.placeholder = '搜索'+pageTitle; 
			// currentWebview.setStyle({
			// 	titleNView: tn  
			// })
			
			// 取出搜索历史
			let list = uni.getStorageSync('historySeachText')
			if(list){
				this.list = JSON.parse(list)
			}
			
		},
		onUnload() {
			if(this.type === 'post'){
				uni.$off('updateFollowOrSupport',(e)=>{})
			}
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			if(this.searchText === ''){
				return uni.stopPullDownRefresh()
			}
			this.getData(true,()=>{
				// 关闭下拉刷新状态
				uni.stopPullDownRefresh()
			})
		},
		// 监听上拉加载
		onReachBottom() {
			if(this.loadmore !== '上拉加载更多'){
				return;
			}
			this.loadmore = "加载中..."
			this.getData(false)
		},
		methods: {
			//回到上一页
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			
			// 关注
			follow(user_id){
				// 找到当前作者的所有列表
				this.searchList.forEach((item)=>{
					if(item.user_id === user_id){
						item.isFollow = true
					}
				})
				uni.showToast({ title: '关注成功' })
			},
			// 顶踩操作
			doSupport(e){
				// 拿到当前的选项卡对应的list
				this.searchList.forEach(item=>{
					if(item.id === e.id){
						// 之前没有操作过
						if (item.support.type === '') {
							item.support[e.type+'_count']++
						} else if (item.support.type ==='support' && e.type === 'unsupport') {
							// 顶 - 1
							item.support.support_count--;
							// 踩 + 1
							item.support.unsupport_count++;
						} else if(item.support.type ==='unsupport' && e.type === 'support'){ 					// 之前踩了
							// 顶 + 1
							item.support.support_count++;
							// 踩 - 1
							item.support.unsupport_count--;
						}
						item.support.type = e.type
					}
				})
				let msg = e.type === 'support' ? '顶' : '踩'
				uni.showToast({ title: msg + '成功' });
			},
			// 点击搜索历史
			clickSearchHistory(text){
				console.log(text)
				this.searchText = text
				this.searchEvent()
			},
			// 搜索事件
			searchEvent(){
				
				// 收起键盘
				uni.hideKeyboard()
				// 加入搜索历史
				let index = this.list.findIndex(v => v===this.searchText)
				if(index !== -1){
					this.$U.__toFirst(this.list,index)
				} else {
					this.list.unshift(this.searchText)
				}
				uni.setStorageSync('historySeachText',JSON.stringify(this.list))
				// 请求搜索
				// this.getData()
				try{
					uni.navigateTo({
					  url: "/pages/news/search_list?keyword="+this.searchText,
					});
					console.log("das")
				}catch (error) {
					console.error("跳转出现错误:", error);
					// 在这里处理错误，比如显示一个提示框或者记录日志
				  }

			}
		}
	}
</script>

<style>
#app{
		
	}
.gradient-background {
  /* 使用linear-gradient设置渐变背景 */
  
  background-size: cover;
  height: 1300rpx;
}
</style>
