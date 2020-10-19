<template>
    <div class= "all-modalities">
        <PageTitle main="Por Modalidade" sub=" Configuração de Modalidade" icon="icofont-runner-alt-2"/>
        <ul>
            <li v-for="modality in modalities" :key="modality.id">
                <ModalityItem :modality="modality"/>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, userKey} from '@/config/global'
import PageTitle from '../template/PageTitle'
import ModalityItem from './ModalityItem'
export default {
    name: 'Modality',
    components: {PageTitle, ModalityItem},
    data: function(){
        return{
            modalities : {},
            modality: {}
        }
    },
    methods:{
        async getModality(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData) 
            const url = `${baseApiUrl}/modality`
            axios.get(url).then(res=> this.modalities = res.data.data)
        },

    },
    mounted(){
        this.getModality()
    }
}
</script>

<style>
    .all-modalities ul{
        list-style-type: none;
        padding: 0px;
        display:flex;
        margin:20px;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>