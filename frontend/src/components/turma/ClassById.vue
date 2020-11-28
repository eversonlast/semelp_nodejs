<template>
<div>
    <PageTitle :main="turma.nomeModalidade" divisorMain="-" :dias="turma.dias" :horarios="turma.horarios" divisorTurma="às" :idade="turma.faixaEtaria" divisor="-" :responsability="turma.nomeProfessor" :sub="turma.centroEsportivo" icon="icofont-users"/>
    <RegisterClass />
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import RegisterClass from './RegisterClass'
import axios from 'axios'
import { baseApiUrl, userKey, showError } from '@/config/global'

export default {
    name: 'ClassById',
    components: {PageTitle, RegisterClass},
    data: function(){
        return {
            turma: {}
        }
    }, 
    methods: {
        async loadClass(){
            this.loadUser()
            const url = `${baseApiUrl}/class/${this.$route.params.id}`
            await axios.get(url)
                        .then(res=>this.turma = res.data)
                        .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
    },
    mounted(){
        this.loadClass()
    }


}
</script>

<style>

</style>