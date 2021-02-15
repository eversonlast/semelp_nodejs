<template>
    <b-form>
        <div class="login-card card">
            <input id="userId" type="hidden" v-model="modality.id">
             <div class="card-header">
                 Cadastro de Modalidade
            </div>                  
                <div class="card-body identificacao">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="nome">Nome da Modalidade </label>
                            <input type="text" id="nomeModalidade" name="nomeModalidade"
                                class="form-control"
                                placeholder="Por Favor, Digite o nome da Modalidade"
                                v-model="modality.nomeModalidade">
                        </div> 
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="departamento">Departamento</label>
                            <b-form-select id="setor" :options="departamento" v-model="modality.departamento"></b-form-select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="responsavelModalidade">Responsável Pela modalidade</label>
                            <b-form-select id="responsavelModalidade" :options="responsabilityModality" v-model="modality.idResponsabilityModality"></b-form-select>
                        </div> 
                    </div>
                    <div class="form-row" v-if="!(modality.departamento== 'lazer')">
                        <div class="form-group col-md-12">
                            <label for="precisaAtestado">Necessita de Atestado</label>
                            <b-form-select id="responsavelModalidade" :options="needAttestation" v-model="modality.needAttestation"
                            ></b-form-select>
                        </div> 
                    </div>
                </div> 
            <div class="card-body button">
                <b-button variant="primary" class="mr-2" v-b-modal.modalRegisterModality v-if="stateButton == 't'">Salvar</b-button> 
                <b-button variant="primary" class="mr-2" v-b-modal.modalRegisterModality v-else>Alterar</b-button> 
                <b-button variant="outline-danger" class="ml-2" @click="resetModality">Cancelar</b-button>
            </div>
            <div>
                <b-modal id="modalRegisterModality" title="Confirmação de Dados" @ok="saveModality">
                    <p class="my-0">
                        Vocẽ tem certeza que quer salvar a Modalidade?<br>
                        Nome da Modalidade: {{modality.nomeModalidade}}<br>
                        Departamento: {{modality.departamento}}<br>
                        Id do Responsável: {{modality.idResponsabilityModality}}<br>
                        Precisa de Atestado: {{modality.needAttestation}}
                    </p>
                </b-modal>
            </div>
        </div>
   </b-form>
</template>

<script>
import {baseApiUrl, userKey, showError} from '@//config/global'
import axios from 'axios'

export default {
    name: 'RegisterModalities',
    
    data: function(){
        return{
            modality: {},
            departamento:[
                {text: "Lazer", value: "lazer"},
                {text: "Lazer - Jogos de Mesa", value:"lazerJogosMesa"},
                {text: "Esporte", value: "esporte"}
            ],
            stateButton: 't',
            responsabilityModality: [],
            needAttestation:[
                {text: "Sim", value: true},
                {text: "Não", value: false}
            ]
        }
    },
    methods:{
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },

        async getResponsabilitiesModality(){
            this.loadUser()
            const url = `${baseApiUrl}/responsabilityModality`
            await axios.get(url)
                .then(res=>{
                    this.responsabilityModality = res.data.map(responsability=>{
                        return {value: responsability.id, text: responsability.nome}
                    })
                })
        },
        async saveModality(){
            this.loadUser()
            const method = this.$route.params.id ? 'put' : 'post'
            const id = this.$route.params.id ? `/${this.$route.params.id}` : ''
            const url = `${baseApiUrl}/modality${id}`
            await axios[method](url, this.modality)
                .then(()=>{
                    this.$toasted.success('Salvo com sucesso!')
                    if(method == 'put'){
                        this.$router.push({
                            name: 'modalityList'
                        })
                    }else{
                        this.modality = {}
                    }
                })
                .catch(showError)
        },
        resetModality(){
            this.modality = {}
            this.$router.push({
                name: 'home'
            })
        },
        async loadModality(){
            if(this.$route.params.id){
                this.loadUser()
                this.stateButton = 'f'
                const url = `${baseApiUrl}/modality/${this.$route.params.id}`
                await axios.get(url)
                    .then(res=>{
                        this.modality = res.data
                    })
            }
        }

    },
    mounted(){
        this.getResponsabilitiesModality()
        this.loadModality()
    }
}
</script>

<style>

</style>