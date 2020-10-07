<template>
    <div class="home">
        <PageTitle  icon="fa fa-home" main="Dashboard" sub="Painel de Controle" v-if="user.tipoUsuario == 'admin'"/>
        <PageTitle  icon="fa fa-home" main="Dashboard" sub="Painel de Controle" v-if="user.tipoUsuario == 'secre'"/>
        <PageTitle  icon="fa fa-home" main="Dashboard" sub="Painel de Controle" v-if="user.tipoUsuario == 'prof'"/>
        <PageTitle  icon="fa fa-home" main="Sistema da Semelp" sub="Painel de Controle" v-if="user.tipoUsuario == 'user'"/>
        <div class="stats">
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Modalidades" :value="stat.modalities" icon="icofont-volleyball-alt" color="#3bc480" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Modalidades" :value="stat.modalities" icon="icofont-volleyball-alt" color="#3bc480" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" v-if="user.tipoUsuario == 'prof'" />
            <Stat title="Modalidades" :value="stat.modalities" icon="icofont-volleyball-alt" color="#3bc480" v-if="user.tipoUsuario == 'prof'" />
            <HomeUser v-if="user.tipoUsuario==='user'"/>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import { baseApiUrl, userKey } from '@/config/global'
import axios from 'axios'
import HomeUser from './HomeUser'

export default {
    name: 'Home',
    components: { PageTitle, Stat, HomeUser },
    data: function(){
        return{
            stat: {},
            user:{}
        }
    },
    methods: {        
        async getStats(){
            const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
            axios.get(`${baseApiUrl}/stats`)
                .then(res => this.stat = res.data)
            this.user = userData
        }
    },
    mounted(){
        this.getStats()
    }
}
</script>

<style>
    .stats{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;  
    }
</style>