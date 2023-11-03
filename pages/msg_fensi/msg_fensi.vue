<template>
	<view class="flex flex-column align-center" style=" height: 100%;width: 100%;position: absolute;">
		
		
		<view class="msg_sixin" >
			
			<view class="flex align-center justify-center" style="margin-top: 30rpx;">
				
				<scroll-view scroll-y="true" style="height: 900rpx;width: 100%;" >
					<view v-for="(item,index) in user_list" :key="index">
						<view class="flex align-center p-2  border-light-secondary "  >
							<!-- 这里后期图片要改 -->
							<image :src="item.userImg"
							style="height: 100rpx;width: 100rpx;"
							class="rounded-circle mr-2 bg-secondary" @click="toHis(item.userId)"></image>
							
							<view class="flex flex-column flex-1">
								<view class="flex align-center justify-between">
									<text style="font-size: 30rpx; font-weight: 550;">{{item.userName}}</text>
									
								</view>
								<view class="flex align-center justify-between">
									<text class="text-secondary text-ellipsis" 
									style="max-width: 500rpx; font-size: 20rpx;color: #D5D5D5;">{{item.description}}</text>
									
								</view>
							</view>
							<image v-if="!is_guanzhu[index]" @click="guanzhu(item.userId,index,0)"  class="small_icon animation_1" style="width: 70rpx; height: 70rpx;  "  src="../../static/msg/msg_guanzhu_F.png"></image>
							<image v-else-if="is_guanzhu[index]" @click="guanzhu(item.userId,index,1)"  class="small_icon animation_1" style="width: 70rpx; height: 70rpx; opacity: 0.3; "  src="../../static/msg/msg_guanzhu_TT.png"></image>
						</view>
					</view>
					
					
				</scroll-view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				guanzhu_image:"../../static/msg/msg_guanzhu_T.png",
				user_list: null,
				is_guanzhu:[],
				guanzhu_index:0,
			}
		},
		onLoad(){
			
			this.$H.post("/user/fans").then(res=>{
				let data = res.data
				console.log("dataaaaa:");
				console.log(res);
				console.log(data);
				
				this.user_list = data.data
				for(let i=0;i<data.data.length;i++){
					if(data.data[i].isFollow==0){
						this.is_guanzhu[i]=false
					}
					else{
						this.is_guanzhu[i]=true
					}
				}
			})
		},
		methods: {
			guanzhu(hisId,index,type){
				this.guanzhu_index=index
			  console.log("关注");
			  console.log(hisId);
			  var bodyData = {
				  "followUserId":hisId
			  }
			  if(type==0){
				  console.log(bodyData)
				  this.$H.post('/user/follow.do',bodyData)
								   .then(response => {
									   console.log("实施关注")
									   this.$set(this.is_guanzhu,index,true)
									   uni.showToast({
									   	title:'关注成功',
										icon:'success',
										duration:2000
									   })
										// this.is_guanzhu[index] = true
										console.log(this.is_guanzhu);
				  })
			  }
			  else{
				  this.$H.post('/user/cancle_follow.do',bodyData)
								   .then(response => {
									   console.log("取消关注")
									    this.$set(this.is_guanzhu,index,false)
										// this.is_guanzhu[index] = false
										console.log(this.is_guanzhu);
										uni.showToast({
											title:'取消关注',
											icon:'success',
											duration:2000
										})
				  })
			  }
				
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
		}
	}
</script>

<style>
	@import '../../common/msg.css';
</style>
