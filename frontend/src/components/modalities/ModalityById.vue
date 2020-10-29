<template>
    <div class="all-sportsCenters-Modality">
       <PageTitle :main="modality.nomeModalidade" :sub="modality.departamento" :responsability="user.nome" divisor="-"/>
       <b-button variant="primary" class="mb-3" @click="stateSelectButtonInclude">+ Incluir Modalidade no Centro Eportivo</b-button>
       <b-button variant="danger" class="mb-3 ml-2" @click="stateSelectButtonDelete">- Deletar Centro Esportivo da Modalidade</b-button>
       <b-form-select id="sportsCenters" :options="sportsCentersSelect" v-model="sportCenterModality.idSportCenter"
       v-if="stateSelect"  ></b-form-select>
       <b-form-select id="sportsCentersDelete" :options="definedSportCenterDeleted" v-model="sportCenterModality.idSportCenter"
       v-if="stateDelete"  ></b-form-select>
       <b-button variant="success" v-if="stateSelect" class="my-2" v-b-modal.modalSportCenterModality>Inserir</b-button>
       <b-button variant="outline-danger" v-if="stateDelete" class="my-2" @click="deleteSportCenterModality">Deletar</b-button>
       <div>
           <b-modal id="modalSportCenterModality" title="Incluir Centro Esportivo?" @ok="saveSportCenterModality">
               Você tem certeza que quer incluir a modalidade {{modality.nomeModalidade}} no Centro Esportivo?
           </b-modal>
       </div>
       <ul>
           <li v-for="sportCenter in sportsCenters" :key="sportCenter.id">
                <SportsCentersItemNoLink :sportCenter="sportCenter"/>
           </li>
       </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey, showError } from '@/config/global'
import PageTitle from '../template/PageTitle'
import SportsCentersItemNoLink from '../sportCenter/SportsCentersItemNoLink'
export default {
    name: 'ModalityById',
    components: {PageTitle, SportsCentersItemNoLink},
    data: function(){
        return{
            user:{},
            modality: {},
            id: this.$route.params.id,
            sportsCenters: [],
            sportsCentersSelect: [],
            stateSelect: false,
            sportCenterModality: {},
            stateDelete:false,
            sportsCentersDeleted: [],
            definedSportCenterDeleted: []
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
        },
        async loadSportsCenters(){
            this.loadKey()
            const url = `${baseApiUrl}/sportCenter`
            
            await axios.get(url)
                .then(res=>{
                    this.sportsCentersSelect = res.data.data
                    .map(sportCenter=>{
                        return { value:sportCenter.id, text:sportCenter.nome}                            
                    })
                })
            for(var spt in this.sportsCenters){
                for(var spts=0 ;this.sportsCentersSelect.length > spts; spts++){
                    if(this.sportsCentersSelect[spts].value === this.sportsCenters[spt].id){
                        this.sportsCentersSelect.splice([spts], 1)                      
                    }
                }
            }
        },
        async loadSportsCentersDelete(){
            this.definedSportCenterDeleted = []
            this.loadKey()
            const url = `${baseApiUrl}/sportCenter`
            await axios.get(url)
                .then(res=>{
                    this.sportsCentersDeleted = res.data.data.map(sportCenterDelete=>{
                        return{ value: sportCenterDelete.id, text: sportCenterDelete.nome}
                    })
                })
            
            for(var spt in this.sportsCenters){
                for(var spts=0; this.sportsCentersDeleted.length > spts; spts++){
                    if(this.sportsCentersDeleted[spts].value === this.sportsCenters[spt].id){
                        this.definedSportCenterDeleted.push(this.sportsCentersDeleted[spts])
                    }
                }
            }
        },
        stateSelectButtonInclude(){
            this.loadSportsCenters() 
            this.stateSelect = !this.stateSelect
            if(this.stateDelete){
                this.stateDelete = !this.stateDelete
            }
        },
        saveSportCenterModality(){
            this.loadKey()
            const save = { "idModality": this.$route.params.id, "idSportCenter": this.sportCenterModality.idSportCenter}
            const url = `${baseApiUrl}/modalitySportCenter`
            axios.post(url, save)
                .then(()=>{
                    this.$toasted.success('Salvo com Sucesso')
                    this.sportCenterModality = {}
                })
                .catch(showError)
                this.loadsportCenter()     
                this.stateSelectButtonInclude() 
        },
        async deleteSportCenterModality(){
            this.loadKey()
            const del = {"idModality": this.id, "idSportCenter": this.sportCenterModality.idSportCenter}
            const url = `${baseApiUrl}/modalitySportCenter`
            await axios.delete(url, {data: del})
                .then(()=>{
                    this.$toasted.success('Deletado com Sucesso')
                    this.sportCenterModality = {}
                })
                .catch(showError)
                this.loadsportCenter()
                this.loadSportsCentersDelete()
        },
        stateSelectButtonDelete(){
            // this.loadSportsCentersDelete()
            this.stateDelete = !this.stateDelete
            if(this.stateSelect){
                this.stateSelect = !this.stateSelect
            }
            if(this.definedSportCenterDeleted.length == 0){
                this.loadSportsCentersDelete()                   
            }
        }
    },
    mounted(){
        this.loadModality()
        this.loadsportCenter()
    },
    watch:{
        sportsCenters(newValue){
            this.sportsCenters =newValue
        },
        sportsCentersSelect(newValue){
            this.sportsCentersSelect = newValue
        },
        definedSportCenterDeleted(newValue){
            this.definedSportCenterDeleted = newValue
        }
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