<template>
  <div class="all-modality-sportsCenters">
  <PageTitle :main="sportCenter.nome" :sub="sportCenter.telefone" icon="icofont-building-alt"/>
    <ul>
        <li v-for="modality in modalities" :key="modality.idModalidade">
            <ModalityItem :modality="modality"/>
        </li>
    </ul>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { baseApiUrl, userKey } from '@/config/global'
import axios from 'axios'
import ModalityItem from './ModalityItem'

export default {
    name: 'SportCenterById',
    components: { PageTitle, ModalityItem },
    data: function(){
        return{
            sportCenter: {},
            modalities: {},
            id: this.$route.params.id
        }
    },
    methods:{
        async loadModalities(){
            this.loadUser()
            const url = `${baseApiUrl}/sportCenterModality/${this.id}`
            await axios.get(url).then(res => this.modalities = res.data.data)
    
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async loadSportCenter(){
            this.loadUser()
            const url = `${baseApiUrl}/sportCenter/${this.id}`
            await axios.get(url).then(res=> this.sportCenter = res.data)
        }
    },
    mounted(){
        this.loadModalities()
        this.loadSportCenter()
    }

}
</script>

<style>
 .all-modality-sportsCenters ul{
        list-style-type: none;
        padding: 0px;
        display:flex;
        margin:20px;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>