import { createRouter, createWebHashHistory } from 'vue-router';
import DevicesHome from '../pages/DevicesHome.vue';

const routes = [
    {
        path: '/',
        name: 'Devices',
        component: DevicesHome,
    },
    {
        path: '/events',
        name: 'Events',
        component: () => import('../pages/Events.vue'),
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../pages/Settings.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
