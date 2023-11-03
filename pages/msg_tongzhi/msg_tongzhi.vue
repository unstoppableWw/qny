<template>
	<view class="flex flex-column align-center" style=" height: 100%;width: 100%;position: absolute;">
		
		
		<view class="msg_sixin" >
			
			<view class="flex align-center justify-center" style="margin-top: 30rpx;">
				
				<scroll-view scroll-y="true" style="height: 900rpx;width: 100%;" >
					<view v-for="(item,index) in tongzhi" :key="index">
						<view class="flex align-center p-2  border-light-secondary animated fast fadeIn" hover-class="bg-light" >
							<image src="../../static/msg/msg_yuantongzhi.png"
							style="height: 100rpx;width: 100rpx;"
							class="rounded-circle mr-2 bg-secondary"></image>
							
							<view class="flex flex-column flex-1">
								<view class="flex align-center justify-between">
									<text style="font-size: 30rpx; font-weight: 550;">{{item.topic}}</text>
									<text class="font-sm text-secondary" style="color: #D5D5D5;">
									{{item.createTime}}</text>
								</view>
								<view class="flex align-center justify-between">
									<text class="text-secondary text-ellipsis" 
									style="max-width: 500rpx; font-size: 20rpx;color: #D5D5D5;">{{item.content}}</text>
									
								</view>
							</view>
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
				tongzhi:null,
			}
		},
		onLoad(){
			this.$H.post("/notice/detail").then(res=>{
				let data = res.data
				console.log("data:");
				console.log(data);
				this.tongzhi =data.data
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	@import '../../common/msg.css';
</style>
