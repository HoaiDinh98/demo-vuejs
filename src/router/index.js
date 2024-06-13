import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProductListView from '../views/ProductListView.vue';
import XuatXuView from '../views/XuatXuView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductListView,
  },
  {
    path: '/xuatxus',
    name: 'XuatXuList',
    component: XuatXuView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
