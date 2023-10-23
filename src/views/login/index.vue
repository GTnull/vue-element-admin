<template>
  <div class="div_1">
    <div class="div_2">
      <div class="div_ui"><img src="@/assets/ui.png"></div>
      <div class="div-login">
        <div class="div-login-input">
          <el-input
            v-model="loginForm.username"
            size="medium"
            class="username-password-input"
          />
          <el-input
            v-model="loginForm.password"
            class="username-password-input"
            show-password
            style="margin-top: 19px"
          />
        </div>
        <div class="div-login-button">
          <el-button type="primary" class="button-login">登录</el-button>
        </div>
      </div>
      <!-- <div><el-input>abc</el-input></div> -->
    </div>

    <!-- <div class="div_3"> abc</div> -->
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    const validateUsername = (rule, value, callback) => {
      // 检查用户是否正确
      const valid_map = [
        'admin',
        'editor',
        'user',
        'leader',
        'reviewer',
        'reporter'
      ]
      if (valid_map.indexOf(value.trim()) < 0) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
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
  methods: {}
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
.div_ui {
  position: absolute;
  width: 460px;
  height: 490px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);
  border-radius: 18px 18px 18px 18px;
  opacity: 1;
}
.div-login {
  position: absolute;
  margin-top: 189px;
  right: 182px;
  width: 460px;
  height: 490px;
}

.div-login-input {
  position: absolute;
  margin-top: 160px;
  margin-left: 75px;
}
.username-password-input {
  width: 350px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0); /* 完全透明 */
  // background: rgba(255, 255, 255, 0.8); /* 设置输入框背景颜色，增强虚化效果 */
  border: none;
  border-radius: 5px;
  // filter: blur(5px); /* 添加模糊效果，值可以根据需要调整 */
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果，以增强虚化效果 */
  // transition: background 0.3s, filter 0.3s; /* 添加过渡效果，以平滑变化 */
}
.div-login-button {
  position: absolute;
  margin-top: 313px;
  margin-left: 40px;
  margin-right: 40px;
  width: 380px;
  height: 60px;
}
.button-login {
  width: 100%;
  height: 100%;
  // 圆角
  border-radius: 8px 8px 8px 8px;
  // 从左到右渐变
  background: linear-gradient(to right, #0fadf1, #3466e4);
}
// 覆盖默认的边框
.el-input__inner {
  border: none;
  border-bottom: 1px solid #ccdee7;
}
</style>
