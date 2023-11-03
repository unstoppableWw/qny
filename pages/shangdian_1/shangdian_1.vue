<template>
	<view class="page">
		<view
			style="position: absolute;width: 100%;height: 40%;z-index: -1;background-image: url('../../static/common/background_4.png');background-size: cover;">
		</view>
		<view style="width: 100%;height: 75rpx;"></view>
		<view class="title-view">
			<view class="left" @click="goBack()">
				<!-- 返回图标 -->
				 <uni-icons  type="left" size="24" style="margin-left: 20rpx;"  />
			</view>
			<view class="center" style="color: black;">
				<!-- 标题文字 -->
				会员中心
			</view>
			<view class="right" style="color: black;" @click="to_mingxi">
				明细
			</view>
		</view>
		<view class="top-view">
			<view class="card-loop">
				<transition-group>
					<view v-for="(item, idx) in loopModules" :key="idx" class="loop-item" :style="item.style"
						@click="handleLoop(idx)">
						<view class="card_show" @touchmove="move" @touchstart="start" 
							:style="{ backgroundImage: 'url(' + baseData[idx].cover + ')' ,backgroundSize: 'cover'}">
							
						</view>

						<transition name="fade" enter-active-class="animate__animated animate__fadeInUp"
							leave-active-class="animate__animated animate__fadeOutDown">
						</transition>

					</view>
				</transition-group>
			</view>
			<view class="image_text" v-if="show_time">
				<p style="font-size: 40rpx;font-weight: bold;margin-right: 5rpx;">{{rest_days}} </p>
				<p style="font-size:small"> 天</p>
				<p style="width: 20rpx;"></p>
				<p style="font-size: small;font-weight: bold">{{dead_date}}</p>
				<p style="font-size:small">到期</p>
			</view>
		</view>
		<view class="middle-view">
			<view class="card_middle">
				<view class="top-view1" style="color: #AE7000;">
					会员权益
				</view>
				<view class="bottom-view1">
					<view class="bottom-row" v-for="(row, rowIndex) in rightsType[`rights${loopCenterIdx}`]"
						:key="rowIndex">
						<view class="bottom-item" v-for="(item, itemIndex) in row" :key="itemIndex">
							<text class="text" style="color: #AE7000;">{{ item }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-view">
			<view class="bottom-row1" v-for="(row, rowIndex) in cardTypes[`card_typelist${loopCenterIdx}`]"
				:key="rowIndex">
				<view class="bottom-item1" v-for="(item, itemIndex) in row" :key="item.id"
					@click="handleItemClick(item.id)">
					<view class="item-label">{{ item.label }}</view>
					<view class="item-cost">￥<text style="font-size: 35rpx;">{{ item.cost }}</text></view>
				</view>
			</view>
			<view class="lianxubaoyue" @click="pay('lianxubaoyue')">
				<view class="lianxu-container">
					<view class="lianxu-left">
						<view class="lianxu-item"
							style="border: solid 1rpx #a78e44;margin-top: 3%;border-radius: 20rpx;width: 30%; text-align: center;vertical-align: middle;">
							首月优惠</view>
						<view class="lianxu-item" style="font-weight: bold;font-size: 32rpx;">连续包月￥<text
								style="font-size: 40rpx;color:orangered;">9</text></view>
						<view class="lianxu-item" style="font-weight: bold;">次月起19元/月·自动续期可随时取消</view>
					</view>
					<view class="lianxu-right">
						<view class="center-text">立即开通</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		setInterval,
		clearInterval
	} from 'timers';
	const findIdxById = (arr, id) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === id) {
				return i;
			}
		}
		return -1;
	};

	export default {
		name: 'MyPage',
		data() {
			return {
				loopInterval: null, // 用于存储轮播计时器
				intervalDuration: 5000, // 设置轮播时间间隔，单位为毫秒
				// 轮播数据
				baseData: [{
						cover: '../../static/card_show/tiyanka.png',
					},
					{
						cover: '../../static/card_show/jinbangtiming.png',
					},
					{
						cover: '../../static/card_show/yuyuelongmen.png',
					},
					{
						cover: '../../static/card_show/zhuangyuanjidi.png',
					},
					// {
					// 	cover: '../../static/card_show/tiyanka.png',
					// },
				],
				startData: {
					clientX: '',
					clientY: '',
				},
				moveX: 0,
				touch: {},
				canslip:true,
				show_time:true,
				// 当前展示项
				loopCenterIdx: 2,
				
				// 轮播样式模板，用来循环赋值给 容器
				loopModules: [{
						loopIdx: 0,
						style: {
							'z-index': 7,
							transform: `scale(${1.3})`,
							left: 'calc(100% / 4 * 0.3)',
							height: '32rpx',
							opacity: 0.8,
						},
					},
					{
						loopIdx: 1,
						style: {
							'z-index': 8,
							transform: `scale(${1.4})`,
							left: 'calc(100% / 4 * 0.5)',
							height: '32rpx',
							opacity: 0.9,
						},
					},
					{
						loopIdx: 2,
						style: {
							transform: `scale(${1.5})`,
							'z-index': 9,
							left: 'calc(100% / 4 * 0.8)',
							opacity: 1,
							'box-shadow': '0 0 5px #ccc',
							height: '32rpx',
						},
					},
					{
						loopIdx: 3,
						style: {
							transform: `scale(${1.4})`,
							'z-index': 8,
							left: 'calc(100% / 4 * 1.2)',
							opacity: 0.9,
							height: '32rpx',
						},
					},
					// {
					// 	loopIdx: 4,
					// 	style: {
					// 		'z-index': 7,
					// 		transform: `scale(${0.5})`,
					// 		left: 'calc(100% / 5 * 3.2)',
					// 		height: '32rpx',
					// 		opacity: 0.8,
					// 	},
					// },
				],

				is_huiyuan: false,
				card_type: 2,
				card_describe: '平台赠送体验福利，可享受诸多优惠',
				rest_days: 18,
				dead_date: '2023-8-16',
				rightsType: {
					rights2: [
						[" 鱼跃推送", "鱼跃次数"],
						["鱼跃优先等级", "鱼跃免排队"],
						["鱼跃主动权", "鱼跃优先权"],
						["鱼跃无需等候", "鱼跃专属权益"],
						// Add more rows as needed
					],
					rights1: [
						["金榜推送", "金榜次数"],
						["金榜优先等级", "金榜免排队"],
						["金榜主动权", "金榜优先权"],
						["无需等候", "专属权益"],
						// Add more rows as needed
					],
					rights3: [
						["状元牛逼", "状元次数"],
						["状元优先", "状元免排队"],
						["状元主动权", "状元优先权"],
						["状元无需等候", "状元专属权益"],
						// Add more rows as needed
					],
					rights0: [
						["体验下就算了", "给钱"],
						["体验吧", "没啥特权"],
						// Add more rows as needed
					],
				}, 
				cardTypes: {
					card_typelist3: [
						[{
							id: 1,
							label: "购买年卡",
							cost: 428
						}, {
							id: 2,
							label: "购买季卡",
							cost: 160
						}],
						[{
							id: 3,
							label: "购买月卡",
							cost: 45
						}, {
							id: 4,
							label: "赠送年卡给好友",
							cost: 428
						}],
					],
					card_typelist2: [
						[{
							id: 1,
							label: "购买年卡",
							cost: 328
						}, {
							id: 2,
							label: "购买季卡",
							cost: 98
						}],
						[{
							id: 3,
							label: "购买月卡",
							cost: 35
						}, {
							id: 4,
							label: "赠送年卡给好友",
							cost: 328
						}],
					],
					card_typelist1: [
						[{
							id: 1,
							label: "购买年卡",
							cost: 228
						}, {
							id: 2,
							label: "购买季卡",
							cost: 60
						}],
						[{
							id: 3,
							label: "购买月卡",
							cost: 30
						}, {
							id: 4,
							label: "赠送年卡给好友",
							cost: 228
						}],
					],
					card_typelist0: [
						[{
							id: 1,
							label: "免费体验",
							cost: '-'
						}, {
							id: 2,
							label: "免费体验",
							cost: '-'
						}],
						[{
							id: 3,
							label: "免费体验",
							cost: '-'
						}, {
							id: 4,
							label: "免费体验",
							cost: '-'
						}],
					],
				}
			}
		},
		mounted() {
			// 初始化轮播
			this.initLoop();
			console.log('centerIdx = ', this.loopCenterIdx);
			// 启动轮播计时器
			this.startLoop();
			//监测滑动
			this.loopCenterIdx=this.card_type
			
		},
		watch:{
			loopCenterIdx(newVal,oldVal){
				console.log(newVal);
				console.log(this.card_type);
				if(newVal==this.card_type){
					setTimeout(()=>{
						this.show_time=true
					},500)
				}else{
					this.show_time=false
				}
			}
		},
		methods: {
			// 触摸touch事件
			start(e){  //@touchstart 触摸开始
				
				this.startData.clientX = e.changedTouches[0].clientX;   //手指按下时的X坐标         
				this.startData.clientY = e.changedTouches[0].clientY;   //手指按下时的Y坐标
			},
			
			//监听滑动
			move(event) {  //@touchmove触摸移动
					if(this.canslip==false){
						return 
					}
					this.canslip=false
					setTimeout(()=>{
						this.canslip=true
					},1000)
					let touch = event.touches[0];  //滑动过程中，手指滑动的坐标信息 返回的是Objcet对象
					this.touch = touch;
					if(touch.clientX < this.startData.clientX) {  //向左移动
					console.log("向左移动");
						this.handleNext()
					}
					if(touch.clientX > this.startData.clientX) {  //向右移动
					console.log("向右移动");
						this.handleLast()
					}
					
				},
			// 启动轮播计时器
			startLoop() {
				// this.loopInterval = setInterval(() => {
				// 	this.handleNext();
				// }, this.intervalDuration);
			},

			// 停止轮播计时器
			stopLoop() {
				// clearInterval(this.loopInterval);
			},

			// 初始化轮播
			initLoop() {
				this.loopModules = this.loopModules.map((item, idx) => {
					item.desc = this.baseData[idx];
					return item;
				});
				console.log(this.loopModules);
			},

			// 下一张
			handleNext() {
				this.loopCenterIdx = this.loopCenterIdx + 1 > 3 ? 0 : this.loopCenterIdx + 1;
				this.loopModules = this.loopModules.map((item, idx) => {
					item.desc = this.baseData[idx];
					return item;
				});
				this.loopModules.unshift(this.loopModules.pop());
			},

			// 上一张
			handleLast() {
				this.loopCenterIdx = this.loopCenterIdx - 1 < 0 ? 3 : this.loopCenterIdx - 1;

				this.loopModules = this.loopModules.map((item, idx) => {
					item.desc = this.baseData[idx];
					return item;
				});
				this.loopModules.push(this.loopModules.shift());
			},

			// 点击容器
			handleLoop(checkId) {
				console.log('checkId = ', checkId, ', loopCenterIdx = ', this.loopCenterIdx);
				// 当前项
				if (checkId === this.loopCenterIdx) {
					return;
				}

				if (checkId > this.loopCenterIdx) {
					if (this.loopCenterIdx === 0 && checkId === 3) {
						return this.handleLast(checkId);
					} else {
						return this.handleNext(checkId);
					}
				}

				if (checkId < this.loopCenterIdx) {
					if (checkId === 0 && this.loopCenterIdx === 3) {
						return this.handleNext(checkId);
					} else {
						return this.handleLast(checkId);
					}
				}

			},
			


			goBack() {
				// 处理返回逻辑
			},
			handleItemClick(itemId) {
				// 根据 itemId 处理支付函数传递的不同参数
				switch (itemId) {
					case 1:
						this.pay("购买年卡");
						break;
					case 2:
						this.pay("购买季卡");
						break;
					case 3:
						this.pay("购买月卡");
						break;
					case 4:
						this.pay("赠送年卡给好友");
						break;
					default:
						// 默认处理
						break;
				}
			},
			pay(itemLabel) {
				console.log(itemLabel)
			},
			goBack() {
				uni.navigateBack()
			},
			to_mingxi() {
				uni.navigateTo({
					url: '/pages/member_detail/member_detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100vh;
		/* 设置高度为视口高度 */
		width: 100%;
		/* 设置宽度为100% */
		//background-image: url("../../static/common/background.png");
		background-size: cover;
		display: flex;
		/* 使用flex布局 */
		flex-direction: column;
		/* 垂直排列子元素 */
	}

	.title-view {
		height: 5%;
		/* 设置高度为600rpx */
		width: 100%;
		/* 设置宽度为100% */
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.left {
		width: 20%;
		height: 70rpx;
	}

	.center {
		font-size: 30rpx;
		width: 60%;
		text-align: center;
		color: white;
	}

	.right {
		width: 20%;
		text-align: right;
		margin-right: 20rpx;
		color: #908B8B;
	}

	.top-view {
		height: 25%;
		width: 100%;
		/* 设置宽度为100% */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.middle-view {
		margin-top: 2%;
		height: 35%;
		width: 100%;
		/* 设置宽度为100% */
	}

	.bottom-view {
		height: 40%;
		width: 100%;
		/* 设置宽度为100% */
		// background-color: #50616d;
		margin-top: 3%;
		overflow: scroll;
		//background-color: #1F253D;
		//background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
		box-shadow: -5rpx 5rpx 10rpx -4rpx red;
	}



	.card_show {
		box-shadow: -2rpx 2rpx 6rpx -2rpx black;
		border-radius: 20rpx;
		width: 380rpx;
		height: 220rpx;

	}


	.card_middle {
		width: 86%;
		height: 100%;
		//border: solid 4rpx white;
		margin-left: 7%;
		border-radius: 20rpx;
		//background-image: linear-gradient(to top, #2e4e7e 0%, #4095E5 100%);
		//box-shadow: -5rpx 5rpx 10rpx -4rpx black;
	}

	.item {
		width: 90%;
		/* 适当设置宽度 */
		height: 30%;
		padding: 10rpx;
		/* 添加内边距 */
		text-align: left;
		/* 文字居中对齐 */
		flex-grow: 1;
		display: flex;
		align-items: center;
		/* 垂直方向上居中对齐 */
	}

	.text-inline {
		font-size: 30rpx;
		margin-right: 10px;
		/* 调整文字之间的间距 */
		color: #f0f0f4;
		font-weight: bold;
	}

	.top-view1 {
		width: 86%;
		height: 15%;
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: bold;
		color: #f0f0f4;
		margin-left: 5%;
		border-bottom: solid 1rpx #f0f0f4;
	}

	.top-left {
		width: 30%;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		background-color: #eee;
		display: flex;
		align-items: center;
		padding: 10px;
	}

	.top-right {
		width: 65%;
		/* 100% - 30% */
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: #ccc;
	}

	.bottom-view1 {
		height: 80%;
		width: 86%;
		display: flex;
		flex-direction: column;
		margin-left: 7%;
		overflow: scroll;

	}

	.bottom-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.bottom-row1 {
		width: 86%;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		margin-left: 7%;
		//box-shadow: -5rpx 5rpx 10rpx -4rpx black;
	}

	.bottom-item {
		width: 50%;
		//font-weight: bold;
		display: flex;
		align-items: center;
		padding: 15rpx;
		margin: 0 10rpx;
		/* 添加左右外边距，控制 view 之间的距离 */
	}

	.text {
		margin: 0;
		padding: 0;
		text-align: left;
		vertical-align: middle;
		font-size: 30rpx;
		color: #f0f0f4;
	}

	.bottom-item1 {
		width: 45%;
		height: 120rpx;
		border-radius: 20rpx;
		//background-color: #f0f0f4;
		//background-image: linear-gradient(to top, #2e4e7e 0%, #4095E5 100%);
		//background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
		display: flex;
		flex-direction: column;
		/* 垂直排列子元素 */
		align-items: flex-start;
		/* 左对齐 */
		margin: 0 10rpx;
		/* 添加左右外边距，控制 view 之间的距离 */
		overflow: hidden;
		/* 隐藏超出内容 */
		cursor: pointer;
		/* 添加鼠标指针样式 */
		border: solid 1rpx #AE7004;
		box-shadow: -2rpx 2rpx 6rpx -2rpx black;
	}

	.item-label {
		font-size: 30rpx;
		//font-weight: bold;
		color: #AE7000;
		margin-left: 5%;
		margin-top: 2%;
	}

	.item-cost {
		font-size: 27rpx;
		color: #AE7000;
		margin-left: 5%;
		//font-weight: bold;
	}

	.lianxubaoyue {
		width: 86%;
		margin-left: 7%;
		border: solid 1rpx white;
		border-radius: 20rpx;
		margin-top: 20rpx;
		display: flex;
		background-color: gold;
		justify-content: space-between;
		background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
		// box-shadow: -2rpx 2rpx 6rpx -2rpx black;
	}

	.lianxu-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.lianxu-left {
		width: 70%;
		display: flex;
		flex-direction: column;
	}

	.lianxu-item {
		font-size: 26rpx;
		color: #ae7000;
		margin-bottom: 20rpx;
		margin-left: 5%;
	}

	.lianxu-right {
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}

	.center-text {
		font-size: 24rpx;
		font-weight: bold;
		text-align: center;
		vertical-align: middle;
		line-height: 100%;
		color: #ae7000;
		background-color: #f0f0f4;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.card-loop {
		margin-top: 3%;
		width: 100%;
		height: 300rpx;
		position: relative;

		.loop-item {
			width: calc(100% / 5);
			float: left;
			box-sizing: border-box;
			position: absolute;
			transition: all ease-out 0.5s;
			transform-origin: 50% 50%;

			img {
				width: 100%;
				height: 100%;
			}

			div {
				background: #fff;
				padding-bottom: 5px;
			}

			p.title {
				padding: 3px;
				color: #333;
				font-weight: bolder;
				transform: scale(0.9);
			}

			p.content {
				font-size: 6px;
				color: #999;
				overflow: hidden;
				display: -webkit-box; //将元素设为盒子伸缩模型显示
				-webkit-box-orient: vertical; //伸缩方向设为垂直方向
				-webkit-line-clamp: 2; //超出2行隐藏，并显示省略号
				transform: scale(0.9);
			}

			p.tool {
				text-align: center;
				transform: scale(0.7);
			}
		}
	}

	.image_text {
		height: 60rpx;
		width: 300rpx;
		position: fixed;
		z-index: 20;
		top: 25%;
		left: 20%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/* 垂直居中 */
	}
</style>