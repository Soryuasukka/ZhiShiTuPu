<template>
  <div class="side-nav">
    <h2 class="table-title">你的AI助手</h2> <!-- 添加表格标题 -->
    <div class="table-container"> <!-- 添加一个容器来控制滚动 -->
      <table>
        <tbody>
          <tr v-for="(item, index) in conversationHistory" :key="index">
            <td><strong>{{ item.user }}</strong></td>
            <td>{{ item.modelResponse }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="input-container">
      <input 
        v-model="userInput" 
        @keyup.enter="sendMessage" 
        type="text" 
        placeholder="输入你的问题..." 
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '', // 用户输入的内容
      conversationHistory: [] // 存储对话历史
    };
  },
  methods: {
    // 发送消息到模型
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = this.userInput;
      this.userInput = ''; // 清空输入框

      // 添加用户输入到对话历史
      this.conversationHistory.push({ user: userMessage, modelResponse: '加载中...' });

      try {
        // 调用大模型的 API
        const response = await axios.post(
          'https://ark.cn-beijing.volces.com/api/v3/chat/completions', // API URL
          {
            model: 'doubao-1.5-pro-32k-250115', // 模型名称
            messages: [
              { role: 'system', content: '你是一个专业的学业生涯规划指导师，你精通各种课程以及先修后修课程。你只负责回答这些相关问题。每次回答不超过100字。' },
              { role: 'user', content: userMessage }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer cb94406e-32fe-41a3-b362-1e0f1afe937a` // 替换为你的实际 API Key
            }
          }
        );

        // 获取模型的响应
        const modelResponse = response.data.choices[0].message.content; // 根据返回结构获取消息内容

        // 更新对话历史
        this.conversationHistory[this.conversationHistory.length - 1].modelResponse = modelResponse;
      } catch (error) {
        console.error("API 请求失败：", error);
        this.conversationHistory[this.conversationHistory.length - 1].modelResponse = "对不起，发生了错误，请稍后再试。";
      }
    }
  }
};
</script>

<style scoped>
.table-title {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.side-nav {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 320px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 15px;
  height: 380px;
  overflow: hidden;
}

.table-container {
  max-height: 250px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fafafa;
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

.input-container {
  display: flex;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 15px;
  margin-left: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
