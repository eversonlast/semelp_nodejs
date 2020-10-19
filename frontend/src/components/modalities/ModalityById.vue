<template>
    <div class="all-sportsCenters-Modality">
       <PageTitle :main="modality.nomeModalidade" :sub="modality.departamento" :responsability="user.nome" divisor="-"/>
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
    name: 'ModalityById',
    components: {PageTitle, SportsCentersItem},
    data: function(){
        return{
            user:{},
            modality: {},
            id: this.$route.params.id,
            sportsCenters: {},
            // sportsCentersItems: {}
        }
    },
    methods:{
        async loadModality(){
            this.loadKey()
            const id = this.$route.params.id
            const url = `${baseApiUrl}/modality/${id}`
            await axios.get(url).then(res=> this.modality = res.data)
            const idUser = this.modality.idResponsabilityModality
            const urlUser = `${baseApiUrl}/users/${idUser}`
            await axios.get(urlUser).then(res=>this.user = res.data)
        },
        async loadKey(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)

        },
        async loadsportCenter(){
            this.loadKey()
            const url = `${baseApiUrl}/modalitySportCenter/${this.id}`
            await axios.get(url).then(res=>this.sportsCenters = res.data.data)
            // this.sportsCenters.forEach(element => {
            //     this.sportsCentersItems.element
            // });
           
        }
    },
    mounted(){
        this.loadModality()
        this.loadsportCenter()

    }
    
}
</script>

<style>
    .all-sportsCenters-Modality ul{
        list-style-type: none;
        padding: 0px;
        display:flex;
        margin:20px;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>