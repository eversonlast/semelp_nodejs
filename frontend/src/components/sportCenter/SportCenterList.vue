<template>
    <div class="all-sportsCentersList">
        <PageTitle main="Gerenciar Centros Esportivos" sub="" icon="icofont-architecture-alt"/>
        <div class="button-sportsCenters">
            <b-button variant="primary" @click="registerSportCenter">+ Incluir</b-button>
        </div>
        <ul>
            <li v-for="sportCenter in sportsCenters" :key="sportCenter.id">
                <SportCenterListItem :sportCenter="sportCenter"/>
            </li>
        </ul>
    </div>
  
</template>

<script>
import { baseApiUrl, userKey } from '@/config/global'
import axios from 'axios'
import SportCenterListItem from './SportCenterListItem'
import PageTitle from '../template/PageTitle'

export default {
    name: 'SportCenterList',
    components: {SportCenterListItem, PageTitle},
    data: function(){
        return{
            sportsCenters: {},
            limit: 0,
            count: 0,
            page: 1
        }
    },
    methods:{
        async loadSportsCenters(){
            this.loadUserKey()
            const url = `${baseApiUrl}/sportCenter?page=${this.apge}`
            await axios.get(url).then(res=> {
                this.sportsCenters = res.data.data
                this.limit = res.data.limit
                this.count = res.data.count
                })
        },
        async loadUserKey(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData) 
        },
        registerSportCenter(){
            this.$router.push({
                name: 'registerSportCenter'
            })
        }
    },
    mounted(){
        this.loadSportsCenters()
    }

}
</script>

<style>
.all-sportsCentersList ul{
        list-style-type: none;
        padding: 0px;
        margin-left:20px;
        margin-top: 20px;
        margin-bottom:0px;
}
.button-sportsCenters{
    margin-left: 20px;
}
.sport-center-item-button{
    margin-left:20px;
    margin-top: 0px;
    margin-bottom: 10px;
    display: flex;
}


</style>