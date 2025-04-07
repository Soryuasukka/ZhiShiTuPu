<template>
  <header class="header">
    <!-- 左侧 Logo 和标题 -->
    <div class="left-section">
      <img src="@/assets/pics/altall.png" alt="Logo" class="logo">
      <h1 class="title">智能导学</h1>
    </div>

    <!-- 右侧 5 个带图片的圆形按钮 -->
    <div class="right-section">
      <button class="circle-btn">
        <img src="@/assets/pics/search.png" alt="Icon 1">
      </button>
      <button class="circle-btn">
        <img src="@/assets/pics/translate.png" alt="Icon 2" style="width: 33px; height: 33px; object-fit: cover;">
      </button>
      <button class="circle-btn" @click="goToHome">
        <img src="@/assets/pics/homepage.png" alt="Icon 3" style="width: 33px; height: 33px; object-fit: cover;">
      </button>
      <button class="circle-btn">
        <img src="@/assets/pics/lightness.png" alt="Icon 4" style="width: 33px; height: 33px; object-fit: cover;">
      </button>
      <button class="circle-btn">
        <img src="@/assets/pics/dog.jpg" alt="Icon 5" style="width: 50px; height: 50px; object-fit: cover;">
      </button>
      <button class="circle-btn">
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      valid: null // 定义 valid 为任意类型（可以是 null、true、false 等）
    };
  },
  methods: {

    goToHome() {
      if (this.valid) {
          // 直接跳转到课程页面，无需进行实际的登录验证
          this.$router.push({ name: 'mydagre' });
        } else {
          console.log('error submit!!');
          return false;
        }
      // window.location.href = '/mydagre'; // 跳转到网站根目录
    }
  }
}
</script>

<style scoped>
.header {
  width: 100vw; /* 占满整个视口宽度 */
  height: 10vh; /* 占页面高度的 13% */
  background-color: #9ECCAB;
  display: flex;
  justify-content: space-between; /* 左右布局 */
  align-items: center;
  padding: 0 2rem;
  position: fixed; /* 固定定位 */
  top: 0; /* 位于页面顶部 */
  left: 0; /* 靠左对齐 */
  z-index: 1000; /* 确保导航栏位于其他内容之上 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影以提高视觉效果 */
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 1rem;
}

.title {
  color: black; /* 字体颜色变为黑色 */
  font-size: 2.6rem; /* 字体大小 */
  letter-spacing: 0.2rem;
  font-family: 'ZCOOL QingKe HuangYou' /* 修改字体 */
}

.right-section {
  display: flex;
  gap: 1rem;
}

.circle-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 圆形按钮 */
  background-color: #9ECCAB;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保图片不会溢出按钮 */
  padding: 0; /* 移除额外的内边距 */
}

.circle-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片适应按钮大小 */
}

.circle-btn:hover {
  background-color: lightgray;
}
</style>

