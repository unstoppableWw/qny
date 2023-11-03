<template>
	<view style="width: 100%;display: flex;flex-direction: column;">
		<TL-audio ref="audioPlayer" startPic='../../static/temp_pic/play.png' endPic='../../static/temp_pic/stop.png'
			audioId='audio1' :url='path'></TL-audio>
		<button style="width: 300rpx;height: 100rpx;margin-top: 3%;display: flex;align-items: center;justify-content: center;background-color: #4095e5;" @click="jumpTest">跳转到12秒</button>
	</view>

</template>


<script>
	import TLAudio from '@/components/TL-audio/TL-audio.vue'
	export default {
		components: {
			TLAudio
		},
		data() {
			return {
				path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
			}
		},
		//暂停所有音频（一般用于页面切换时停止正在播放的音频）
		onUnload() { //普通页面在 onUnload 生命周期中执行
			uni.$emit('stop')
		},
		onHide() { //tabBar页面在onHide生命周期中执行
			uni.$emit('stop')
		},
		methods: {
			// 设置播放路径
			setAudioUrl(url) {
				this.path = url;
			},
			jumpTest(){
				this.$refs.audioPlayer.jumpToTime(12); //跳到12秒
			}
		}
	}
</script>

<style>
</style>