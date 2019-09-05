import Axios from 'axios';
import axios from '../../../public/js/app';

export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;

        if (requiresAuth && !currentUser) {
            next('/login');
        } else if (to.path == '/login' && currentUser) {
            next('/')
        } else {
            next()
        }
    })

    //redirect if user is not authenticated
    Axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('logout');
            router.push('/login');
        }

        return Promise.reject(error);
    });


    //default header auth for the axios, it is loaded each time axios is called
    axios.defaults.headers.common["Authorization"] - `Bearer ${store.getters.currentUser.token}`

}
