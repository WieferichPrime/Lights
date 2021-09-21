import { createRouter, createWebHistory } from 'vue-router'

import Lights from "../components/Lights/Lights";
import Main from "../components/Main/Main";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/:color',
        component: Lights
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (!from.params.color && to.params.color == sessionStorage.getItem('lastColor') && sessionStorage.getItem('run')) {
        sessionStorage.setItem('reload', 'true');
    } else sessionStorage.setItem('reload', 'false');
    sessionStorage.setItem('lastColor', to.params.color);
    next();
})

export default router
