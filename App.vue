<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "common/uni.css";
	@import "common/icon.css";
	@import "common/animate.css";
	/* 自定义样式库 */
	@import "common/common.css";
	@import "common/free.css";
	@import "common/icon.css";
	.uni-radio-input-checked{
				background-color: #4095E5!important;
				border-color: #4095E5!important;
				background-clip: content-box!important;
				padding: 6rpx!important;
				box-sizing: border-box;
			}
	.uni-radio-input-checked::before{
			display: none!important;
	}
</style>
