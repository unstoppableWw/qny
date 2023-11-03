<template>
  <view class="feedback-page">
   
    <view class="section">
      <view class="section-title">反馈类型</view>
      <!-- Feedback type selection -->
    </view>

    <view class="section">
      <view class="button-group">
          <button
            class="custom-button"
            :class="{ active: selectedButtonType === 'Bug问题' }"
            @click="selectButtonType('Bug问题')"
          >
            Bug问题
          </button>
          <button
            class="custom-button"
            :class="{ active: selectedButtonType === '体验反馈' }"
            @click="selectButtonType('体验反馈')"
          >
            体验反馈
          </button>
          <button
            class="custom-button"
            :class="{ active: selectedButtonType === '其他意见' }"
            @click="selectButtonType('其他意见')"
          >
            其他意见
          </button>
        </view>
    </view>

    <view class="section">
      <textarea class="text-area" v-model="feedbackText" placeholder="请输入您的反馈内容~"></textarea>
    </view>

      <view class="section">
        <view class="add-image" style="display: flex; align-items: center;">
          <view class="image-text">
            添加图片 ({{ uploadedImages.length }}/3)
          </view>
          <view class="image-container" style="margin-left: 2%;">
            <view class="image-center">
				
              <image
                v-if="uploadedImages.length < 3"
                style="width: 50rpx; height: 50rpx;"
                class="image-preview"
                src="../../static/head/photo.png"
                @click="openFileInput()"
              />
            </view>
          </view>
        </view>
      </view>


	<view style="display: flex;justify-content: flex-start;">
		<view v-if="uploadedImages.length > 0">
		    <view class="image-container" v-for="(image, index) in uploadedImages" :key="image">
				<image :src="image"  :mode="mode"></image>
				
		        <!-- 删除按钮 -->
		        <span class="delete-btn" @click="removeImage(index)">×</span>
		    </view>
		</view>	
	</view>
	<view style="margin-top: 100rpx;">
		<button class="chushi_denglu" style="color: white; font-size: 30rpx;margin-top: 5%;" @click="submitFeedback" :loading="loading" >{{this.loading ? '提交中...':'提交'}}</button>
	</view>
    </view>
  
</template>

<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index.js'
export default {
  name: 'FeedbackPage',
  data() {
    return {
      uploadedImages: [],
      feedbackText: '',
	  selectedButtonType: 'Bug问题', // Add this line
	  loading:false,
	  mode:'aspectFill'
    };
  },
  methods: {
	selectButtonType(type) {
	    this.selectedButtonType = type;
	},
    submitFeedback() {
        const feedbackType = this.selectedButtonType; // 所选单选按钮的内容
		const feedbackText = this.feedbackText; // 输入的文字
        const uploadedImages = this.uploadedImages; // 所选择的图片
		
		if (!feedbackText.trim()) {
		    alert("请输入反馈内容");
		    return;
		}
		
		if (uploadedImages.length === 0) {
		    alert("请上传至少一张图片");
		    return;
		}
        // 显示确认对话框
        const confirmSubmission = confirm("确定要提交反馈吗？");
        if (confirmSubmission) {
			// 执行提交逻辑,上传至服务器？
            console.log("Feedback Type:", feedbackType);
            console.log("Feedback Text:", feedbackText);
            console.log("Uploaded Images:", uploadedImages);
			
            // 清空输入和选择
            this.selectedButtonType = "Bug问题";
            this.feedbackText = "";
            this.uploadedImages = [];
			
			alert("提交成功！谢谢您的反馈~我们会做得更好")
        } else {
            console.log("取消提交");
        }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        this.uploadedImages.push({ url: imageUrl, file });
      }
    },
    deleteImage(index) {
      this.uploadedImages.splice(index, 1);
    },
	// 上传照片
	// 修改 openFileInput 方法
	openFileInput() {
		uni.chooseImage({
			count: 3 - this.uploadedImages.length,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: res => {
			  const tempFilePaths = res.tempFilePaths;
			  for (let i = 0; i < tempFilePaths.length; i++) {
				  const imageUrl = tempFilePaths[i];
				  pathToBase64(imageUrl)
					.then(base64 => {
						 console.log(base64)
						 this.uploadedImages.push(base64);		 
					})
					.catch(error => {
								 console.error(error)
					})
			        }
			 //  const arrayBuffer = new Uint8Array(res.tempFilePaths[0]); //先将本地图片路径转换成array类型 
			 // const base64Img = uni.arrayBufferToBase64(arrayBuffer);  //再转换成base64类型
			  
			 
			},
			fail: err => {
			  console.error('选择图片失败', err);
			}
		  });
	//   uni.chooseImage({
	//     count: 3 - this.uploadedImages.length, // 最多可选择的图片数量
	//     success: (res) => {
	//       const tempFilePaths = res.tempFilePaths;
	
	//       for (let i = 0; i < tempFilePaths.length; i++) {
	//         const imageUrl = tempFilePaths[i];
	//         this.uploadedImages.push(imageUrl);
	//       }
	//     },
	// 		fail: (error) => {
	// 			console.error('选择图片失败:', error);
	// 		}
	// 		});
		},

		// 点击删除按钮时移除图片
		removeImage(index) {
		    this.uploadedImages.splice(index, 1);
		},
    
  },
};
</script>

<style>
.image-center {
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	  height: 100%;
	}

.feedback-page {
  
  padding: 40rpx;
  background-color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: solid lightgray 1rpx;
}

.icon {
  flex: 0 0 auto;
  margin-right: 10px;
}

.icon img {
  width: 30px;
  height: 30px;
}

.title {
  flex: 1;
  font-size: 18px;
  text-align: center;
}

.submit {
  flex: 0 0 auto;
  font-size: 16px;
  color: #007bff;
  cursor: pointer;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.text-area {
  width: 96%;
  height: 220rpx;
  font-size: 30rpx;
  border-radius: 10rpx;
  background-color: ghostwhite;
  padding: 20rpx;
}

.add-image {
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}

.image-preview img {
  border: 1px solid #ccc;
  padding: 3px;
}

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-evenly;
}

.custom-button {
  padding: 6px 12px; /* Adjust padding for smaller button size */
  border: 1px solid #4095E5;
  background-color: white;
  color: #4095E5;
  cursor: pointer;
  font-size: 30rpx; /* Adjust font size for smaller button text */
}

.custom-button.active {
  background-color: #4095E5;
  color: white;
}

.image-container {
	  position: relative;
	  display: inline-block;
	  margin-right: 10rpx; /* 添加右边间隙 */
	}

.image-container image{
	border-radius: 10rpx;
	
	width: 160rpx;
	height: 160rpx;
}

.delete-btn {
	position: absolute;
	
	display: flex;
	justify-content: center;
	align-items: center;
	top: 2rpx;
	  right: 2rpx;
	  cursor: pointer;
	  background-color: #4095E5;
	  color: white;
	  padding: 12rpx;
	  height: 12rpx;
	  width: 12rpx;
	  font-size: 20rpx;
	  border-radius: 10%;
	}
.chushi_denglu{
	display: flex;
	background-color: #4095E5;
	border-radius: 40rpx;
	width: 600rpx;
	height: 110rpx;
	
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	
}
</style>
