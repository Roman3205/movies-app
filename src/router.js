import { createRouter, createWebHistory } from "vue-router";
import MainPage from './views/MainPage.vue'
import MoviePage from './views/MoviePage.vue'
import NotFoundPage from './views/NotFoundPage.vue'

export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            name: 'main',
            component: MainPage
        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: MoviePage
        },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
})