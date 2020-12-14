<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block"> {{ user.nome }}</span>
            <div class="user-dropdown-img">
                <Gravatar :cpf="user.cpf" alt="User" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin" v-if="user.tipoUsuario == 'admin'">
                <i class="fa fa-cogs" ></i>Administrador
            </router-link>
            <router-link to="/admin" v-if="user.tipoUsuario == 'secre'">
                <i class="fa fa-cogs" ></i>Administrador
            </router-link>
            <router-link to="/admin" v-if="user.tipoUsuario == 'prof'">
                <i class="fa fa-cogs" ></i>Administrador
            </router-link>
            <a href @click="logout"><i class="fa fa-sign-out"></i>Sair</a>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
import { userKey } from '@/config/global'

export default {
    name: 'UserDropdown',
    data: function(){
        return {
            stateUser: false
        }
    },
    components: { Gravatar },
    computed: mapState(['user']),
    methods:{
        logout(){
            this.$router.push({ path: '/auth' })
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
        }
    },
}
</script>

<style>
     .user-dropdown{
        position: relative;
        height: 100%;
    }
    .user-button{
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img{
        margin: 0px 10px;
    }

    .user-dropdown-img > img{
        max-height: 37px;
        border-radius: 50px;
    }

    .user-dropdown-content{
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index:1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content{
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a{
        text-decoration: none;
        color: #000;
        padding: 10px;
        margin-right:5px;
    }

    .user-dropdown-content a:hover{
        text-decoration: none;
        color: #000;
        background-color: #ededed;
    }
</style>