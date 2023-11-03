<template>
	<view>
		<uni-popup ref="tishi_2" type="message" >
			<uni-popup-message :type="tishiType" :message="tishiText" :duration="tishiTime"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tishiType:"success",
				tishiText:"你好",
				tishiTime:2000,
			}
		},
		methods: {
			open(){
				this.$refs.tishi_2.open()
			}
		}
	}
</script>

<style>

</style>
