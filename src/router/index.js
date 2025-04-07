import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import CourseOutline from '../components/CourseOutline.vue';
import myDagre from '../components/myDagre.vue'; // 根据实际路径导入 mydagre 组件
import LsSb from '../components/LsSb.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  {
    path: '/',
    name: 'Home',
    component: HomeView
  },

  {
    path: '/course',
    name: 'course',
    component: CourseOutline
  },

  {
    path: '/mydagre', // 新的路由路径
    name: 'mydagre',
    component: myDagre // 指向 mydagre 组件
  },
  
    {
      path: '/LsSb',
      name: 'LsSb',
      component: LsSb
    }

  
  
];

const router = createRouter({
  history: createWebHistory(), // 使用 Web History 模式
  routes
});

export default router;
