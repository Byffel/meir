import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Local from '../views/Local.vue';
import RemoteGame from '../views/RemoteGame.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/local',
    name: 'Local',
    component: Local
  },
  {
    path: '/lobby',
    name: 'RemoteGame',
    component: RemoteGame
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
