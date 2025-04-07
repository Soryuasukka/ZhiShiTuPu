<template>
  <div id="app">
    <NavBar />
    <div class="main-container">
      <div class="content-container">
        <div class="content">
          <div class="course-info">
            <div class="course-image-container">
              <img :src="courseImage" alt="Course Image" class="course-image" />
            </div>
            <div class="course-details-container">
              <div class="course-details-content">
                <h1 class="course-title">概率论与数理统计</h1>
                <div class="course-details">
                  <div class="detail-group">
                  </div>
                  <div class="detail-group">
                    <div class="detail"><strong>开课老师:</strong> 赵静</div>
                    <div class="detail"><strong>课程性质:</strong> 学科必修</div>
                  </div>
                  <div class="detail-group">
                    <div class="detail"><strong>先修课程:</strong> 数学分析</div>
                    <div class="detail"><strong>学时/学分:</strong>  54/3</div>
                  </div>
                </div>
                <div class="learning-advices">
                  <span>1. 夯实数学基础：确保先修课程中的数学知识扎实，特别是微积分和线性代数，这对理解概率论和数理统计中的概念和计算非常重要。<br>2. 系统学习基本概念：注重理解每个章节的基本概念和原理，确保对随机事件、概率、一维和多维随机变量、参数估计和假设检验等基础知识有全面了解。<br>3. 多做习题：通过大量习题练习巩固所学知识，尤其是涉及概率计算、随机变量分布、参数估计和假设检验等内容的题目。<br>4. 积极参与课堂讨论：通过课堂讨论和提问，深化对课程内容的理解，与同学和老师交流学习经验和难点问题。<br>5. 理论结合实际：尝试将所学理论知识应用于实际问题的解决，通过案例分析和项目实践来验证和巩固所学知识。<br>6. 参考多种教材：除了推荐教材外，广泛阅读其他相关书籍和文献，拓展知识面，增强理解深度。<br>7. 定期复习总结：每周复习课程内容，整理笔记和习题答案，形成系统的知识框架，为考试做好充分准备。<br>8. 注重应用：了解概率论与数理统计在社会、经济、生产中的应用实例，增强对理论知识的兴趣和理解。</span>
                </div>
              </div>
            </div>
          </div>
          <div class="course-outline">
            <h2>课程大纲内容</h2>
            <ol>
              <li>《概率论与数理统计》课程是一门研究随机现象及其统计规律性的基础课程。主要内容包括随机事件与概率、一维和多维随机变量、参数估计和假设检验等。课程旨在培养学生利用数学思想设计解决实际应用问题的能力，为后续需要概率论等数学知识的课程打下基础，并为从事算法等相关工作和研究的学生储备数学知识和锻炼数学思维。</li>
            </ol>
          </div>
        </div>
      </div>
      <SideBar />
    </div>

    <!-- InnerDagre 合并后的部分 -->
    <div class="GraphVisualization">
      <div id="mynetwork"></div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import { ref, onMounted } from 'vue';
import vis from 'vis-network/standalone/umd/vis-network.min.js';

export default {
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      courseImage: require('@/assets/STAT0031121004.png'),
    };
  },
  setup() {
    const network = ref(null);

    // 网络数据
    const nodes = [
      { id: 1, label: 'Node 1', url: 'https://www.example.com/page1' },
      { id: 2, label: 'Node 2', url: 'https://www.example.com/page2' },
      { id: 3, label: 'Node 3', url: 'https://www.example.com/page3' },
    ];

    const edges = [
      { from: 1, to: 2, arrows: 'to' },
      { from: 2, to: 3, arrows: 'to' },
    ];

    // 初始化网络图
    onMounted(() => {
      const container = document.getElementById('mynetwork');
      const data = { nodes, edges };
      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
        },
        edges: {
          width: 2,
        },
        height: '100%',
        width: '100%',
      };
      network.value = new vis.Network(container, data, options);

      // 添加点击事件
      network.value.on('click', function (event) {
        const { nodes: clickedNodes } = event;
        if (clickedNodes.length > 0) {
          const nodeId = clickedNodes[0];
          // 获取被点击节点的信息
          const node = nodes.find(n => n.id === nodeId);
          if (node && node.url) {
            // 使用 URL 跳转
            window.location.href = node.url;
          }
        }
      });
    });

    return { network };
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}

.main-container {
  display: flex;
  padding-top: 60px;
  justify-content: center;
}

.content-container {
  width: 60%;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 15%;
}

.content {
  display: flex;
  flex-direction: column;
}

.course-info {
  display: flex;
  margin-bottom: 20px;
}

.course-image-container {
  width: 40%;
  margin-right: 20px;
}

.course-image {
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.course-details-container {
  width: 60%;
  display: flex;
  align-items: center;
}

.course-details-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.course-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: -20px;
}

.course-details {
  margin-bottom: 15px;
}

.detail-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.detail {
  flex: 1;
}

.detail + .detail {
  margin-left: 40px;
}

.course-outline {
  margin-top: 20px;
  text-align: left;
}

/* InnerDagre 样式 */
.GraphVisualization {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid #007bff;
  padding: 0;
  box-sizing: border-box;
}

#mynetwork {
  width: 100%;
  height: 100%;
}
</style>
