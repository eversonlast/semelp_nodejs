<template>
  <div class="all-modality-sportsCenters">
  <PageTitle :main="sportCenter.nome" :sub="sportCenter.telefone" icon="icofont-building-alt"/>
  <b-button variant="primary" class="mb-3" @click="loadSelectInclude">+Incluir Modalidade</b-button>
  <b-button variant="danger" class="mb-3 ml-2" @click="loadSelectDelete">-Deletar Modalidade</b-button>
  <b-form-select id="modality" :options="AllSelectModality" v-if="stateInclude" v-model="modalitySportCenter.idModality"></b-form-select>
  <b-form-select id="modality" :options="definedSelectDelete" v-if="stateDelete" v-model="modalitySportCenter.idModality"></b-form-select>
  <b-button variant="success" class="my-2" v-if="stateInclude" @click="saveModalitySportCenter">Inserir</b-button>
  <b-button variant="outline-danger" class="my-2" v-if="stateDelete" @click="deleteModalitySportCenter">Deletar</b-button>
    <ul>
        <li v-for="modality in modalities" :key="modality.idModalidade">
            <ModalityItemNoLink :modality="modality"/>
        </li>
    </ul>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { baseApiUrl, userKey, showError } from '@/config/global'
import axios from 'axios'
import ModalityItemNoLink from '../modalities/ModalityItemNoLink'

export default {
    name: 'SportCenterById',
    components: { PageTitle, ModalityItemNoLink },
    data: function(){
        return{
            sportCenter: {},
            modalities: {},
            id: this.$route.params.id,
            AllSelectModality: [],
            stateInclude: false,
            stateDelete: false,
            AllSelectModalityDelete: [],
            definedSelectDelete: [],
            modalitySportCenter: {}
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
        },
        async loadAllSelectModalities(){
            this.loadUser()
            const url = `${baseApiUrl}/modality`
            await axios.get(url)
                .then(res=>{
                    this.AllSelectModality = res.data.data.map(modality=>{
                        return {value: modality.id, text: modality.nomeModalidade}
                    })
                })
            for(var mdt in this.modalities){
                    for(var Amdts in this.AllSelectModality){
                    if(this.AllSelectModality[Amdts].value === this.modalities[mdt].idModalidade){
                        this.AllSelectModality.splice([Amdts], 1)
                    }
                }
            }
        },
        async loadAllSelectModalitiesDelete(){
            this.definedSelectDelete = []
            this.loadUser()
            const url = `${baseApiUrl}/modality`
            await axios.get(url)
                .then(res=>{
                    this.AllSelectModalityDelete = res.data.data.map(modality=>{
                        return {value: modality.id, text: modality.nomeModalidade}
                    })
                })
            
            for(var mdt in this.modalities){
                for(var Dmdts in this.AllSelectModalityDelete){
                    if(this.AllSelectModalityDelete[Dmdts].value === this.modalities[mdt].idModalidade){
                        this.definedSelectDelete.push(this.AllSelectModalityDelete[Dmdts])
                    }
                }
            }
        },
        loadSelectInclude(){
            if(this.stateInclude === false){
                this.loadAllSelectModalities()
            }
            this.stateInclude = !this.stateInclude

            if(this.stateDelete){
                this.stateDelete = !this.stateDelete
            }
        },
        loadSelectDelete(){
            if(this.definedSelectDelete.length === 0){
                this.loadAllSelectModalitiesDelete()
            }

            this.stateDelete = !this.stateDelete

            if(this.stateInclude){
                this.stateInclude = !this.stateInclude
            }
        },
        async saveModalitySportCenter(){
            this.loadUser()
            const save = {idSportCenter: this.id, idModality: this.modalitySportCenter.idModality}
            const url = `${baseApiUrl}/modalitySportCenter`
            await axios.post(url, save)
                .then(()=>{
                    this.$toasted.success('Salvo com Sucesso!')
                    this.modalitySportCenter={}
                })
                .catch(showError)
            this.loadModalities()
            this.loadSelectInclude()
        },
        async deleteModalitySportCenter(){
            this.loadUser()
            var idModalidade = this.modalitySportCenter.idModality.toString()
            const del = {"idModality": idModalidade, "idSportCenter": this.id}
            const url = `${baseApiUrl}/modalitySportCenter`
            await axios.delete(url, {data: del})
                .then(()=>{
                    this.$toasted.success('Deletado com Sucesso!')
                    this.modalitySportCenter={}
                })
                .catch(showError)
            this.loadModalities()
            this.loadAllSelectModalitiesDelete()
        }
    },
    mounted(){
        this.loadModalities()
        this.loadSportCenter()
    },
    watch:{
       modalities(newValue){
           this.modalities = newValue
       },
       AllSelectModality(newValue){
           this.AllSelectModality = newValue
       },
       definedSelectDelete(newValue){
           this.definedSelectDelete = newValue
       }
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