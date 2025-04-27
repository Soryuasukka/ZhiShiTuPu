<template>
  <div class="side-nav">
    <h2 class="table-title">你的AI助手</h2>
    <div class="table-container">
      <div v-for="(item, index) in conversationHistory" :key="index" class="conversation-item">
        <div class="user-message">
          <strong>{{ item.user }}</strong>
        </div>
        <div class="model-response">
          <p>{{ item.modelResponse }}</p>
        </div>
      </div>
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
      userInput: '',
      conversationHistory: []
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = this.userInput;
      this.userInput = '';

      this.conversationHistory.push({ user: userMessage, modelResponse: '加载中...' });

      try {
        const response = await axios.post(
          'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
          {
            model: 'doubao-1.5-pro-32k-250115',
            messages: [
              { role: 'system', content: '你是一个专业的学业生涯规划指导师，回答与课程相关问题。' },
              { role: 'user', content: userMessage }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer cb94406e-32fe-41a3-b362-1e0f1afe937a`
            }
          }
        );

        const modelResponse = response.data.choices[0].message.content;

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
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
}

.side-nav {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 280px;
  background-color: #f7f7f8;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-right: 15px;
  height: auto;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.table-container {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.conversation-item {
  margin-bottom: 20px;
}

.user-message {
  font-weight: bold;
  color: #007bff;
  font-size: 1rem;
  margin-bottom: 5px;
}

.model-response {
  font-size: 0.95rem;
  color: #333;
  padding-left: 20px;
  border-left: 3px solid #007bff;
  background-color: #f4f7fb;
  padding: 8px;
  border-radius: 10px;
}

.input-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  margin-top: 15px;
}

input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #f4f4f5;
  transition: background-color 0.3s;
  margin-bottom: 10px; /* 给输入框和按钮之间添加间隔 */
}


input:focus {
  background-color: #e1e1e1;
  outline: none;
}

button {
  padding: 12px 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  width: 100%; /* 按钮宽度设置为100%，填满父容器 */
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #00448a;
}

</style>
