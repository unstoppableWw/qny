<template>
	<!-- 音频播放器组件 -->
	<view v-if='url' class='audio'>
		<view style="width: 100%">
			<slider block-size="6" block-color="black" @change='changeAudio' :activeColor='activeColor' :min='0'
				:max='duration.toFixed(0)' :value='currentTime.toFixed(0)' :step='0.1'></slider>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="width: 20%;display: flex;justify-content: center;">
				{{ elapsedTime }}
			</view>
			<view style="width: 60%;"></view>
			<view style="width: 20%;display: flex;align-items:center;justify-content: center;">
				-{{ remainingTime }}
			</view>
		</view>
		<view
			style="width: 100%;display: flex;align-items:center;justify-content: center;flex-direction: row;margin-top: 6%;">
			<image @click="seekBackward" src='../../static/temp_pic/backward-15.png'
				style="margin-right: 5%;width: 56rpx;height: 56rpx;">
			</image>
			<image :src='startPic' class='icon' v-show='!status' @click='start(audioId)'></image>
			<image :src='endPic' class='icon' v-show='status' @click='start(audioId)'></image>
			<image @click="seekForward" src='../../static/temp_pic/forward-15.png'
				style="margin-left: 5%;width: 58rpx;height: 56rpx;">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				context: null,
				currentTime: 0,
				duration: 100,
				status: false
			}
		},
		props: {
			url: String,
			activeColor: {
				type: String,
				default: '#464547' //进度条颜色
			},
			startPic: String,
			endPic: String,
			audioId: [String, Number]
		},
		
		
		created() {
			this.context = uni.createInnerAudioContext();
			
		},
		watch: {
			url:function(newValue, oldValue) {
				this.context.src = newValue;
				this.context.src = this.url;
				this.onTimeUpdate();
				this.onCanplay();
				this.onEnded();
				uni.$on('stop', (id) => {
					if (id && id != this.audioId) {
						this.context.stop();
						this.status = false;
					} else if (!id) {
						this.context.stop();
						this.status = false;
					}
				})
			}
			
		},
		computed: {
			elapsedTime() {
				return this.getTime(Math.round(this.currentTime));
			},
			remainingTime() {
				const remaining = this.duration - this.currentTime;
				return this.getTime(Math.round(remaining));
			}
		},
		methods: {
			start(id) { //点击播放
				let audioId = id;
				if (this.status) {
					this.context.pause();
					this.status = !this.status;
				} else {
					uni.$emit('stop', id)
					this.context.play()
					this.status = !this.status;
				}
			},
			onCanplay() { //进入可播放状态
				this.context.onCanplay(() => {
					this.context.duration;
					setTimeout(() => {
						this.duration = this.context.duration;
					}, 1000)
				})
			},
			onTimeUpdate() { //音频播放进度
				this.context.onTimeUpdate(() => {
					if (!Number.isFinite(this.context.duration)) {
						this.duration = this.context.currentTime + 10;
						this.currentTime = this.context.currentTime;
					} else {
						this.duration = this.context.duration;
						this.currentTime = this.context.currentTime;
					}
				})
			},
			onEnded() { //播放结束
				this.context.onEnded(() => {
					this.status = false;
					this.currentTime = 0;
				})
			},
			changeAudio(e) {
				let paused = this.context.paused;
				this.context.pause();
				this.context.seek(e.detail.value)
				if (!paused) {
					this.context.play();
				}
			},
			getTime(time) {
				let m = parseInt(time / 60);
				let s = time % 60;
				return this.towNum(m) + ':' + this.towNum(s);
			},
			towNum(num) {
				if (num >= 10) {
					return num;
				} else {
					return '0' + num;
				}
			},
			jumpToTime(timeInSeconds) {
				this.context.seek(timeInSeconds);
			},
			yinpingTime(){
				return this.currentTime
			},
			seekBackward() {
				// 快退 15 秒
				this.jumpToTime(this.currentTime - 15);
			},
			seekForward() {
				// 快进 15 秒
				this.jumpToTime(this.currentTime + 15);
			},
		}
	}
</script>

<style>
	.audio {
		background: #FCFCFC;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		/* border: 1rpx solid lightgray;
		border-radius: 20rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin-left: 5%;
		justify-content: between;
		height: auto;
	}

	.icon {
		width: 60rpx;
		height: 60rpx;
	}
</style>