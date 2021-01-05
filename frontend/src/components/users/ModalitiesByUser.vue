<template>
<div>
    <PageTitle main="Gerenciamento das Matrículas" 
    icon="icofont-architecture-alt"/>
    <ul class="listModalities">
        <li v-for="modalityUser in modalities" :key="modalityUser.id">
            <ItemUser :modality="modalityUser"/>
        </li>
    </ul>
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import {userKey, baseApiUrl, showError} from '@/config/global'
import axios from 'axios'
import ItemUser from './ItemUser'
export default {
    name: 'ModalitiesByUser',
    components: {PageTitle, ItemUser},
    data: function(){
        return {
            modalities: {}
        }
    },
    methods: {
        async loadModalities(){
            const url = `${baseApiUrl}/userClass/${this.$route.params.id}`
            this.loadUser()
            await axios.get(url)
                    .then(res=>this.modalities = res.data)
                    .catch(showError)

        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
    },
    mounted(){
        this.loadModalities()
    }
}
</script>

<style>
    .listModalities{
        list-style-type: none;
        padding: 0px;
        margin-left:20px;
        margin-top: 20px;
        margin-bottom:0px
    }
</style>