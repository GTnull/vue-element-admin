<template>
  <div class="div_1">
    <!-- <img src="@/assets/背景.png"> -->
    <!-- <div class="div_1"><img src="@/assets/背景.png"></div> -->
    <div class="div_2">
      <!-- <div class="div_logo"><img src="@/assets/log.png"></div>
      <div class="div_name">上海信息技术学校</div>
      <div class="div_name2">专业建设与发展评估</div>
      <div class="div_name3">Welcome to Shanghai Information Technology College</div> -->
      <div class="div_ui"><img src="@/assets/ui.png"></div>
      <el-input class="blurred-input" />
      <!-- <div><el-input>abc</el-input></div> -->
    </div>

    <!-- <div class="div_3"> abc</div> -->
  </div>

</template>

<script>

export default {
  name: '',

  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {

  }
}
</script>

<style lang="scss">
.div_1 {
  background-image: url("../../assets/背景.png");
  background-size: cover; /* 图像大小适应容器 */
  background-position: center; /* 图像在容器中的位置 */
  background-repeat: no-repeat; /* 禁止图像平铺 */
  display: inline-block;
  width: 1920px;
  height: 1080px;
}
.div_2 {
  margin-left: 86px;
  margin-bottom: 61px;
  margin-top: 106px;
  margin-right: 182px;
  width: 1652px;
  height: 913px;
}

// .div_1 {
//   background-image: url('../../assets/背景.png');
//   background-size: cover; /* 图像大小适应容器 */
//   background-position: center; /* 图像在容器中的位置 */
//   background-repeat: no-repeat; /* 禁止图像平铺 */
//   width: 100%;
//   height: 100%;
//   // width: 1920px;
//   // height: 1080px;
//   // background: linear-gradient(360deg, #0B4F96 0%, rgba(27,83,140,0.6) 72%, rgba(11,79,150,0) 100%);
//   // border-radius: 0px 0px 0px 0px;
//   // opacity: 1;
// }
// .div_2 {
//   z-index: 1;
//   margin-left: 86px;
//   margin-bottom: 61px;
//   margin-top: 106px;
//   margin-right: 182px;
//   width: 1652px;
//   height: 913px;
//   background-color: red;
// }
.div_logo {
  width:68.17px;
  height: 260px;
}
.div_name {

  width: 772px;
height: 126px;
font-size: 80px;
font-family: Alibaba PuHuiTi 2.0-65 Medium, Alibaba PuHuiTi 20;
font-weight: normal;
color: #FFFFFF;
line-height: 105px;
letter-spacing: 9px;
text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
-webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
}
.div_name2 {
  width: 870px;
height: 126px;
font-size: 80px;
font-family: Alibaba PuHuiTi 2.0-65 Medium, Alibaba PuHuiTi 20;
font-weight: normal;
color: #FFFFFF;
line-height: 105px;
letter-spacing: 9px;
text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
-webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
}
.div_name3 {
  width: 959px;
height: 180px;
font-size: 48px;
font-family: Alibaba PuHuiTi 2.0-55 Regular, Alibaba PuHuiTi 20;
font-weight: normal;
color: #FFFFFF;
line-height: 90px;
text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
-webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
}
.div_ui {
  width: 460px;
height: 490px;
box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.15);
border-radius: 18px 18px 18px 18px;
opacity: 1;
}
.div_5 {
  width: 772px;
height: 126px;
font-size: 90px;
font-family: Alibaba PuHuiTi 2.0-65 Medium, Alibaba PuHuiTi 20;
font-weight: normal;
color: #FFFFFF;
line-height: 105px;
letter-spacing: 9px;
text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.div_6 {
  width: 460px;
height: 490px;
background: #FFFFFF;
box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.15);
border-radius: 18px 18px 18px 18px;
opacity: 1;
}

.blurred-input {
  width: 300px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0); /* 完全透明 */
  // background: rgba(255, 255, 255, 0.8); /* 设置输入框背景颜色，增强虚化效果 */
  border: none;
  border-radius: 5px;
  // filter: blur(5px); /* 添加模糊效果，值可以根据需要调整 */
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果，以增强虚化效果 */
  // transition: background 0.3s, filter 0.3s; /* 添加过渡效果，以平滑变化 */
}

.blurred-input:focus {
  background: rgba(255, 255, 255, 1); /* 输入框获取焦点时，取消虚化 */
  filter: blur(0);
}

</style>

