<template>
  <div class="side-nav">
    <h2 class="table-title">你的AI助手</h2> <!-- 添加表格标题 -->
    <div class="table-container"> <!-- 添加一个容器来控制滚动 -->
      <table>
        <tbody>
          <tr v-for="(item, index) in questions" :key="index">
            <td>{{ item.question }}</td>
            <td>{{ item.answer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        { question: '问题一', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题二', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题三', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题四', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题五', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题六', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题七', answer: 'xxxxxxxxxxxxxx' },
        { question: '问题八', answer: 'xxxxxxxxxxxxxx' }
      ]
    };
  }
};
</script>

<style scoped>
.table-title {
  font-size: 1.6rem; /* 增大标题字体 */
  margin-bottom: 1rem; /* 标题和表格的间距 */
  font-weight: bold;
  text-align: center;
  color: #333; /* 设置标题字体颜色 */
}

.side-nav {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 320px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px; /* 圆角 */
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 15px;
  height: 380px; /* 提高高度 */
  overflow: hidden;
}

.table-container {
  max-height: 250px; /* 控制滚动区域的最大高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fafafa; /* 更柔和的背景颜色 */
}

th,
td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #007BFF;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>
