<template>
  <header class="header">
    <!-- 左侧 Logo 和标题 -->
    <div class="left-section">
      <img src="@/assets/pics/logo.png" alt="Logo" class="logo">
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
    }
  }
}
</script>

<style scoped>
/* 顶部导航栏 */
.header {
  width: 100vw; /* 占满整个视口宽度 */
  height: 70px; /* 固定高度 */
  background-color: #f8f8f8; /* 浅灰色背景 */
  display: flex;
  justify-content: space-between; /* 左右布局 */
  align-items: center;
  padding: 0 2rem;
  position: fixed; /* 固定定位 */
  top: 0; /* 位于页面顶部 */
  left: 0; /* 靠左对齐 */
  z-index: 1000; /* 确保导航栏位于其他内容之上 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 添加柔和的阴影 */
  border-bottom: 1px solid #e0e0e0; /* 添加底部边框 */
}

/* 左侧 logo 和标题 */
.left-section {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.title {
  color: #333; /* 深色字体 */
  font-size: 2rem; /* 字体大小 */
  font-weight: 600;
  font-family: 'Helvetica Neue', sans-serif; /* 苹果常用字体 */
}

/* 右侧按钮区域 */
.right-section {
  display: flex;
  gap: 1rem;
  justify-content: flex-end; /* 确保按钮区对齐右边 */
  align-items: center;
  margin-right: 70px;
}

/* 圆形按钮样式 */
.circle-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 圆形按钮 */
  background-color: #ffffff; /* 白色背景 */
  border: 1px solid #dcdcdc; /* 淡灰色边框 */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease; /* 动效 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保图片不会溢出按钮 */
  padding: 0; /* 移除额外的内边距 */
  flex-shrink: 0; /* 防止按钮缩小 */
}

/* 图片样式 */
.circle-btn img {
  width: 80%;
  height: 80%;
  object-fit: contain; /* 图片保持比例 */
}

/* 按钮悬停效果 */
.circle-btn:hover {
  background-color: #f5f5f5; /* 悬停时背景变浅 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 悬停时显示阴影 */
  transform: translateY(-2px); /* 稍微上移效果 */
}

/* 响应式调整：小屏幕下的按钮大小 */
@media (max-width: 768px) {
  .title {
    font-size: 1.6rem; /* 减小标题字体大小 */
  }
  .circle-btn {
    width: 45px;
    height: 45px;
  }
  .circle-btn img {
    width: 70%;
    height: 70%;
  }
}
</style>
