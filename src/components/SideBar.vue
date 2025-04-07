n<template>
  <div class="side-nav">
    <h2 class="table-title">精选问题</h2> <!-- 添加表格标题 -->
    <div class="table-container"> <!-- 添加一个容器来控制滚动 -->
      <table>
        <tbody>
          <tr>
            <td>问题一</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题二</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题三</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题四</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题五</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题六</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题七</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
          <tr>
            <td>问题八</td>
            <td>xxxxxxxxxxxxxx</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-title {
  font-size: 1.5rem; /* 标题字体大小 */
  margin-bottom: 1rem; /* 标题和表格的间距 */
  font-weight: bold;
  text-align: center;
}

.side-nav {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 300px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px; /* 圆角 */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  height: 350px; /* 确保侧边导航栏有固定高度 */
  overflow: hidden; /* 防止内容溢出 */
}

.table-container {
  max-height: 250px; /* 设置最大高度以控制滚动 */
  overflow-y: auto; /* 允许垂直滚动 */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #deeee7; /* 表格背景颜色 */
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #007BFF;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>
