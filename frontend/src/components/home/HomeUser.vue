<template>
    <div class="container-fluid">
        <h2>Bem Vindo ao Sistema </h2>
        <div class="container-fluid">
            <div class="row mt-5" >
                <div v-for="sportCenter in sportCenter" :key="sportCenter.id" class="col-12 col-lg-6 cart mt-4">
                    <router-link :to="'/classCenterUser/'+sportCenter.id">
                        <div class="row d-flex justify-content-center">
                            <span>{{sportCenter.nome}}</span> 
                        </div> 
                        <div class="row d-flex justify-content-center mt-2">
                            <i class="fa fa-building-o"></i>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, userKey, showError } from '../../config/global';
export default {
    name: 'HomeUser',
    data: function(){
        return{
            sportCenter: {},
            count: 0,
            limit: 0
        }
        
    },
    methods:{
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData) 
        },
        async loadSportCenter(){
            this.loadUser();
            const url = `${baseApiUrl}/sportCenter`;
            await axios.get(url)
                .then(res=>{
                    this.sportCenter = res.data.data
                    this.count = res.data.count
                    this.limit = res.data.limit
                })
                .catch(showError)
        }
    },
    mounted(){
        this.loadSportCenter()
    }
}


</script>

<style>
.cart{
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.cart span{
    font-size: 30px;
    color: #2E423B;
}

.cart i{
    font-size: 100px;
}

.cart a{
    text-decoration: none;
    color: #2E423B
}

.cart a:hover{
    color: #000
}
</style>