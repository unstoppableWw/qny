<template>
  <view class="page">
	  <uni-nav-bar  :fixed="true"   status-bar     leftWidth="200rpx" rightWidth="200rpx"
	  			 title="明细"  background-color="white" :border="false">
	  	<template v-slot:left>
	  		 <uni-icons  type="left" size="24" style="margin-left: 20rpx;" @click="goBack" />
	  	    
	  	</template>
	  	
	  </uni-nav-bar>
    <!-- 上面的view -->
    

    <!-- 下面的view -->
    <view class="content">
      <!-- 遍历生成多个小view -->
      <view v-for="(item, index) in itemList" :key="index" class="item">
        <!-- 左边的图片，宽占20% -->
        <view style="width: 25%;padding-right: 20rpx;">
          <image style="width: 150rpx;height: 100rpx;margin-left: 26rpx;border-radius: 10rpx;margin-top:12rpx" mode="aspectFill" :src="item.imageSrc" />
        </view>

        <!-- 右边的文字描述，上面是商品名称，下面是小日期，右端是价格 -->
        <view style="width: 50%;">
          <p class="product-name">{{ item.productName }}</p>
          <p class="small-date">{{ item.date }}</p>
        </view>
		<view style="width: 25%">
			<p class="price">-{{ item.price.toFixed(2) }}</p>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          imageSrc: "../../static/tom.jpg",
          productName: "连续包月",
          date: "2023-09-08",
          price: 19,
        },
        {
          imageSrc: "../../static/tom.jpg",
          productName: "白金会员",
          date: "2023-09-09",
          price: 145,
        },
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "连续包月",
		  date: "2023-09-08",
		  price: 19,
		},
		{
		  imageSrc: "../../static/tom.jpg",
		  productName: "白金会员",
		  date: "2023-09-09",
		  price: 145,
		}
        // 添加更多的商品信息
      ],
    };
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 10%;
  display: flex;
  align-items: center;
  padding: 20rpx;
}

/* 样式修改：水平和垂直居中对齐 */
.title {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  height: 90%;
  overflow-y: scroll; /* 如果内容超出可视区域，启用滚动条 */
}

.item {
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #ccc; */
}

.product-name {
  font-weight: bold;
  margin-left: 12rpx;
}

.small-date {
  font-size: 12px;
  color: #888;
  margin-left: 12rpx;
}

.price {
	margin-right: 3%;
  font-weight: bold;
  text-align: center;
  font-size: medium;
}
</style>
