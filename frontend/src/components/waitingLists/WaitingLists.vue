<template>
  <div>
      <PageTitle main="Lista de Espera" sub="Nome da Modalidade" icon="icofont-sand-clock"/>
  </div>
</template>

<script>
import axios from 'axios'
import {userKey, baseApiUrl, showError} from '@/config/global'
import PageTitle from '../template/PageTitle'
export default {
    name: 'WaitingLists',
    components: {PageTitle},
    data: function(){
        return {
            waitingLists: {},
            users: {},
            classesUsers: {},
        }
    },
    methods:{
        async loadUserPerClass(){
            this.loadUser()
            const url = `${baseApiUrl}/users`
            await axios.get(url)
                    .then(res=>this.users=res.data.data)
                    .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async loadClassUers(){
            this.loadUser()
            const url = `${baseApiUrl}/classUser`
            await axios.get(url)
                    .then(res=> this.classesUsers = res.data.data)
        }
    },
    mount(){
        this.loadUserPerClass()
        this.loadClassUsers()
    }

}
</script>

<style>

</style>