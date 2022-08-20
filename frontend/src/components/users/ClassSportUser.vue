<template>
  <div>
    <PageTitle main="Modalidades para Escolha" icon="icofont-baseball"/>
    <div class="container-fluid">
        <div class="row mt-5">
            <div v-for="sportCenter in sportCenter" :key="sportCenter.id" class="col-12 col-lg-6 cart mt-4">
                <div class="row d-flex justify-content-center">
                    <span>{{sportCenter.nomeModalidade +" - "+sportCenter.dias+' - '+sportCenter.horarios}}</span>
                </div>
                <div class="row d-flex justify-content-center mt-2">
                    <i class="icofont-swimmer"></i>
                </div>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userKey, baseApiUrl, showError } from '../../config/global';
import PageTitle from '../template/PageTitle'
export default {
    name: 'ClassSportuser',
    components: {PageTitle},
    data: function(){
        return{
            sportCenter: {},
            idade: 0
        }
    },
    methods: {
        async loadUser(){
            const json = localStorage.getItem(userKey)
            this.idade = localStorage.getItem('idade')
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
            this.user = userData
        },
        async loadSportClass(){
            this.loadUser();
            const url = `${baseApiUrl}/classSport/${this.$route.params.id}`
            await axios.get(url)
                .then(res=>{
                    this.sportCenter = res.data.data.filter(classBySport=>{
                        if(this.idade > 60 ){
                            return classBySport.faixaEtaria.includes('60');
                        }else{
                            let valorMinino = classBySport.faixaEtaria.toUpperCase().substring(0, classBySport.faixaEtaria.toUpperCase().indexOf("À"));
                            let valorMaximo = classBySport.faixaEtaria.toUpperCase().substring(classBySport.faixaEtaria.toUpperCase().indexOf("À") + 1, classBySport.faixaEtaria.toUpperCase().indexOf("A"));
                            return parseInt(this.idade) >= parseInt(valorMinino) && parseInt(this.idade) <= parseInt(valorMaximo);
                        }  
                    })
                })
                .catch(showError)
        }
    },
    mounted(){
        this.loadSportClass();
    }
}
</script>
<style>

</style>