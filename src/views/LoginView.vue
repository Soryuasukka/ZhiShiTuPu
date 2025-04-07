<template>
  <div class="login-container">
    <!-- 左侧部分 -->
    <div class="login-image">
      <div class="image-container">
        <img :src="require('@/assets/img.png')" alt="Login Image" class="login-img">
      </div>
    </div>

    <!-- 右侧部分 -->
    <div class="login-form-container">
      <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRules" label-width="0px" class="demo-ruleForm form-content">
        <el-form-item prop="username" style="width: 300px;">
          账号：<el-input v-model="loginRuleForm.username" placeholder="请输入您的账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" style="width: 300px;">
          密码：<el-input v-model="loginRuleForm.password" type="password" placeholder="请输入您的密码"
                    @keyup.enter="login"></el-input>
        </el-form-item>
        <el-checkbox v-model="rememberMe" style="margin-bottom: 15px;text-align: left;display: block;margin-top: 25px;">我同意「XX用户使用协议」</el-checkbox>
        <el-button type="primary" style="width: 300px; display: block;" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loading: false,
      rememberMe: false,
      loginRuleForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login() {
      if (!this.rememberMe) {
        this.$message({
          message: '请先同意【XX用户使用协议】',
          type: "warning"
        });
        return;
      }
      this.$refs.loginRules.validate(valid => {
        if (valid) {
          // 直接跳转到课程页面，无需进行实际的登录验证
          this.$router.push({ name: 'Home' });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gotoRegister() {
      this.$router.push({ name: 'nav-bar' }); // 导航到导航栏页面
    },
    forgotPassword() {
      // 导航到密码恢复页面
    },
    gotoHome() {
      this.$router.push({ name: 'home' }); // 导航到主页
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 200vh;
}

.login-image {
  flex: 1;
  background-color: #f0f2f5; /* Background color for the image placeholder */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 使图片覆盖整个容器 */
}

.login-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0 50px;
}

.form-content {
  margin-left: 0px;
}

.el-input {
  width: 100%;
}

.el-link {
  font-size: 14px;
  color: #409EFF;
}
</style>