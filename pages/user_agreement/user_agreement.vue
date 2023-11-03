<template>
  <view class="user-agreement flex justify-center align-center">
    
    <view class="scrollable-content">
		<h2>用户协议</h2>
      <section v-for="(section, index) in sections" :key="index" class="section">
        <h3>{{ section.title }}</h3>
        <ul>
          <li v-for="(item, itemIndex) in section.items" :key="itemIndex">{{ item }}</li>
        </ul>
      </section>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: '第一条 适用范围',
          items: [
            '在您登录本应用帐号时，您根据本应用要求提供的个人信息补充；',
            '在您使用本应用的信息服务时，本应用将能够对您手机存储、电话、通讯录、日历等权限进行获取和应用；',
            '您了解并同意，以下信息不适用本用户使用协议和隐私政策：',
            '您在使用本应用平台提供的搜索服务时输入的关键字信息；',
            '本应用收集到的您在本应用发布的有关信息数据；',
            '违反法律规定或违反本应用规则行为及本应用已对您采取的措施。'
          ]
        },
        {
          title: '第二条 信息使用',
          items: [
            '本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可；',
            '第三方和本应用（含本应用关联公司）为您提供的信息服务，在该服务结束后，其将被禁止访问包括其以前能够访问的所有信息和资料；',
            '本应用亦不允许任何第三方收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议，并保留追究其法律责任的权利。'
          ]
        },
        {
          title: '第三条 信息披露',
          items: [
            '在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：',
            '经您事先同意，向第三方披露；',
            '根据法律的有关规定，向第三方或者行政、司法机构披露；',
            '如您出现违反中国有关法律、法规或者本应用协议或相关规则的情况，需要向第三方披露。'
          ]
        },
        {
          title: '第四条 信息存储',
          items: [
            '本应用收集的有关您的信息和资料将保存在天领教育服务器的本应用上。'
          ]
        },
        {
          title: '第五条 Cookie的使用',
          items: [
            '在您未拒绝接受Cookies的情况下，本应用会在您的终端上设定或取用Cookies，以便您能登录或使用依赖于Cookies的本应用平台服务或功能。本应用使用Cookies可为您提供更加周到的信息化服务。',
            '您有权选择接受或拒绝接受Cookies。但如果您选择拒绝接受Cookies，则您可能无法登录或使用依赖于Cookies的本应用服务。',
            '通过本应用所设Cookies所取得的有关信息，将适用本协议。'
          ]
        },
        {
          title: '第六条 信息安全',
          items: [
            '本应用的帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。',
            '请您妥善保护自己的个人信息。如您发现自己的个人信息泄露，尤其是本应用用户名及密码发生泄露，请您立即联络天领教育信息中心，以便本应用采取相应措施。'
          ]
        },
        {
          title: '第七条 本协议的更改',
          items: [
            '天领教育保留随时修改本用户使用协议和隐私政策的权利。如作出更改，将通过App升级后首次登录时以弹窗的形式告知。'
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.user-agreement {

  position: absolute;
  width: 95%;
  height: 100%;
  font-family: Arial, sans-serif;
  
  margin-left: 20rpx;
  
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.scrollable-content {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.section {
  margin-bottom: 30px;
}

h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 5px;
}
</style>
