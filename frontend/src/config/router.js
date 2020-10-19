import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '../components/auth/Auth'
import UserById from '@/components/template/UserById'
import Signup from '../components/auth/component/Signup'
import ForgotPasswordAuth from '../components/auth/component/ForgotPasswordAuth'
import Modality from '../components/modalities/Modality'
import ModalityById from '../components/modalities/ModalityById'
import SportCenterById from '../components/modalities/SportCenterById'
import SportCenter from '../components/modalities/SportCenter'
import RegisterSportCenter from '../components/modalities/RegisterSportCenter'

import { userKey, baseApiUrl } from './global'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: {requiresAdmin: true}
},{
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'userById',
    path: '/user/:id',
    component: UserById
},{
    name: 'signup',
    path: '/signup',
    component: Signup
},{
    name:'forgotPasswordAuth',
    path:'/forgotPasswordAuth/:id',
    component: ForgotPasswordAuth
},{
    name:'modality',
    path: '/modality',
    component: Modality
},{
    name: 'modalityById',
    path:'/modality/:id',
    component: ModalityById
},{
    name: 'sportCenterById',
    path:'/sportCenter/:id',
    component: SportCenterById
},{
    name:'sportCenter',
    path: '/sportCenter',
    component: SportCenter
},{
    name: 'registerSportCenter',
    path: '/registerSportCenter',
    component: RegisterSportCenter
}]

const router = new VueRouter({
    mode:'history',
    routes
}) 

router.beforeEach(async(to, from, next)=>{
    const json = localStorage.getItem(userKey)

    if(userKey && to.path ==='/auth'){
        next({ path:'/'})
    }

    if(!userKey && to.path !== '/auth'){
        next({path:'/auth'})
    }

    if(to.matched.some(record=> record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        const tipoUser = await axios.post(`${baseApiUrl}/validateUser`, user)

        const tipoUsuario = tipoUser.data === 'admin' | tipoUser.data ==='secre' | tipoUser.data === 'prof'

        user && tipoUsuario ? next() : next({ path: '/ '})
    }else{
        next()
    }
})

export default router