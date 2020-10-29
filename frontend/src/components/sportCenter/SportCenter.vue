<template>
    <div class='all-sportsCenters'>
        <PageTitle main="Centros Esportivos" sub="Modalidade" icon="icofont-building-alt"/>
        <ul>
            <li v-for="sportCenter in sportsCenters" :key="sportCenter.id">
                <SportsCentersItem :sportCenter="sportCenter"/>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/config/global'
import PageTitle from '../template/PageTitle'
import SportsCentersItem from './SportsCentersItem'
export default {
    name: 'SportCenter',
    components: {PageTitle, SportsCentersItem},
    data: function(){
        return{
            sportsCenters: {}
        }
    },
    methods: {
        async loadKey(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        loadSportsCenters(){
            this.loadKey()
            const url = `${baseApiUrl}/sportCenter`
            axios.get(url).then(res=> this.sportsCenters = res.data.data)
        }
    },
    mounted(){
        this.loadSportsCenters()
    }
}
</script>

<style>
.all-sportsCenters ul{
        list-style-type: none;
        padding: 0px;
        display:flex;
        margin:20px;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>