import { createRouter, createWebHashHistory } from 'vue-router'
import TicketList from '../views/TicketList.vue'
import TicketCreate from '../views/TicketCreate.vue'
import TicketDetail from '../views/TicketDetail.vue'
import ChatDiagnosis from '../views/ChatDiagnosis.vue'

import Login from '../views/Login.vue'
import AdminLogin from '../views/AdminLogin.vue'

const routes = [
    { path: '/login', component: Login },
    { path: '/admin/login', component: AdminLogin },
    { path: '/list', component: TicketList },
    { path: '/', component: ChatDiagnosis },
    { path: '/create', component: TicketCreate },
    { path: '/detail/:id', component: TicketDetail },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/admin/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userInfo');

    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
})

export default router