<template name="type-select">
	
		<view class="popup_select">
			<view :class="{popup_button_selected:hover1,popup_button_unselect:!hover1}"  @click="put_1" >
				无领导
			</view>
			<view :class="{popup_button_selected:hover2,popup_button_unselect:!hover2}" @click="put_2">
				结构化
			</view>
			<view :class="{popup_button_selected:hover3,popup_button_unselect:!hover3}" @click="put_3">
				半结构化
			</view>
			<view :class="{popup_button_selected:hover4,popup_button_unselect:!hover4}" @click="put_4">
				面谈
			</view>
		</view>
	
</template>

<script>
	export default {
		props:{
			
		},
		data(){
			return{
				choose_which:1,
				hover1:true,
				hover2:false,
				hover3:false,
				hover4:false,
				
			}
		},
		methods:{
			put_1(){
				this.hover1=true
				this.hover2=false
				this.hover3=false
				this.hover4=false
				this.choose_which=1
				this.$emit('child',this.choose_which)
			},
			put_2(){
				this.hover1=false
				this.hover2=true
				this.hover3=false
				this.hover4=false
				this.choose_which=2
				this.$emit('child',this.choose_which)
			},
			put_3(){
				this.hover1=false
				this.hover2=false
				this.hover3=true
				this.hover4=false
				this.choose_which=3
				this.$emit('child',this.choose_which)
			},
			put_4(){
				this.hover1=false
				this.hover2=false
				this.hover3=false
				this.hover4=true
				this.choose_which=4
				this.$emit('child',this.choose_which)
			}
		
		}
		
	}
</script>

<style>
.popup_select{
			display: flex;
			justify-content: space-evenly;
			height: 15%;
			width: 100%;
			
			align-items: center;
		}
.popup_button_selected{
			display: flex;
			background-color: #4095E5;
			border-radius: 10rpx;
			width: 145rpx;
			height: 75rpx;
			margin: 30rpx;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin: 10rpx;
			margin-right: 20rpx;
			color: white;
		}
.popup_button_unselect{
			display: flex;
			border-radius: 10rpx;
			width: 145rpx;
			height: 75rpx;
			margin: 30rpx;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin: 10rpx;
			margin-right: 20rpx;
			border: 0.5rpx solid black;
			
		}
</style>