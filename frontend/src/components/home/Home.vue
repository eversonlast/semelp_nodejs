<template>
    <div class="home">
        <PageTitle  icon="fa fa-home" main="Dashboard" sub="Painel de Controle" v-if="user.tipoUsuario == 'admin'"/>
        <PageTitle  icon="fa fa-home" main="Dashboard" sub="Painel de Controle" v-if="user.tipoUsuario == 'secre'"/>
        <PageTitle  icon="fa fa-home" main="Dashboard" sub="Painel de Controle" v-if="user.tipoUsuario == 'prof'"/>
        <PageTitle  icon="fa fa-home" main="Sistema da Semelp" sub="Painel de Controle" v-if="user.tipoUsuario == 'user'"/>
        <div class="stats">
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Modalidades" :value="stat.modalities" icon="icofont-volleyball-alt" color="#3bc480" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Turmas" :value="stat.classes" icon="icofont-group-students" color="#52057B" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Alunos Matrículados" :value="stat.classesUsers" icon="icofont-address-book" color="#FF8C00" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Lista de Espera" :value="stat.waitingList" icon="icofont-sand-clock" color="#8B0000" v-if="user.tipoUsuario == 'admin'" />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Modalidades" :value="stat.modalities" icon="icofont-volleyball-alt" color="#3bc480" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Turmas" :value="stat.classes" icon="icofont-group-students" color="#52057B" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Alunos Matrículados" :value="stat.classesUsers" icon="icofont-address-book" color="#FF8C00" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Lista de Espera" :value="stat.waitingList" icon="icofont-sand-clock" color="#8B0000" v-if="user.tipoUsuario == 'secre'" />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" v-if="user.tipoUsuario == 'prof'" />
            <Stat title="Modalidades" :value="stat.modalities" icon="icofont-volleyball-alt" color="#3bc480" v-if="user.tipoUsuario == 'prof'" />
            <Stat title="Turmas" :value="stat.classes" icon="icofont-group-students" color="#52057B" v-if="user.tipoUsuario == 'prof'" />
            <Stat title="Alunos Matrículados" :value="stat.classesUsers" icon="icofont-address-book" color="#FF8C00" v-if="user.tipoUsuario == 'prof'" />
            <Stat title="Lista de Espera" :value="stat.waitingList" icon="icofont-sand-clock" color="#8B0000" v-if="user.tipoUsuario == 'prof'" />
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
            if(userData){
                await axios.get(`${baseApiUrl}/stats`)
                    .then(res => this.stat = res.data)
                this.user = userData                
            }
        },
        menuVisible(){
               if(this.$mq ==='xs' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)
            }      
        }
    },
    mounted(){
        this.getStats()
        this.menuVisible()
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