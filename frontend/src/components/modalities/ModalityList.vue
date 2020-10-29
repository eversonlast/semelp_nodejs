<template>
  <div class="all-modalities">
        <PageTitle main="Gerenciar Modalidades" sub="" icon="icofont-architecture-alt"/>
        <div class="button-moodalites">
            <b-button variant="primary" @click="registerModality">+ Incluir</b-button>
        </div>
        <ul>
            <li v-for="modality in modalities" :key="modality.id">
                <ModalityItem :modality="modality"/>
            </li>
        </ul>
    </div>
</template>

<script>
import ModalityItem from './ModalityItem'
import PageTitle from '../template/PageTitle'

import axios from 'axios'
import {baseApiUrl, userKey, showError } from '@/config/global'
export default {
    name: 'ModalityList',
    components: {PageTitle, ModalityItem},
    data: function(){
        return {
            modalities: {},
            stateRegister: false,
            count: 0, 
            limit: 0,
            page: 1
        }
    }, 
    methods: {
        async loadUserKey(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData) 
        },

        async loadModalities(){
            this.loadUserKey()

            const url = `${baseApiUrl}/modality?page=${this.page}`
            await axios.get(url)
                .then(res=>{
                    this.modalities = res.data.data
                    this.limit = res.data.limit
                    this.count = res.data.count
                })
                .catch(showError)
        },
        registerModality(){
            this.$route.push({
                name: 'registerModality'
            })
        }
    },
    mounted(){
        this.loadModalities()
    }

}
</script>

<style>

</style>