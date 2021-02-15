<template>
   <b-form>
        <div class="login-card card">
            <input id="sportCenterId" type="hidden" v-model="sportCenter.id">
             <div class="card-header">
                        Dados de Identificação do Centro Esportivo 
            </div>                  
                <div class="card-body identificacao">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="nome">Nome do Centro Esportivo</label>
                            <input type="text" id="nome" name="nome"
                                class="form-control"
                                placeholder="Por Favor, Digite o nome do Centro Esportivo "
                                v-model="sportCenter.nome" 
                                v-b-popover.hover.top="'Por favor, Digite o o nome do Centro Esportivo'">
                        </div> 
                </div>
                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="nomeLogradouro">Nome do Logradouro</label>
                            <input type="text" id="nomeLogradouro" name="nomeLogradouro"
                                class="form-control"
                                placeholder="Por Favor, Digite o nome do Logradouro "
                                v-model="sportCenter.nomeLogradouro"
                                v-b-popover.hover.top="'Por favor, digite o nome do Logradouro.'">
                        </div> 
                        <div class="form-group col-md-4">
                            <label for="numero">Número </label>
                            <input type="text" id="numero" name="numero"
                                class="form-control"
                                placeholder="Número do Centro Esportivo "
                                v-model="sportCenter.numero"
                                v-b-popover.hover.top="'Por favor, digite somente número.'">
                        </div> 
                    </div>
                        <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="bairro">Bairro</label>
                            <input type="text" id="bairro" name="bairro"
                                class="form-control"
                                placeholder="Por Favor, Digite o bairro"
                                v-model="sportCenter.bairro"
                                v-b-popover.hover.top="'Por favor, digite o bairro.'">
                        </div> 
                        <div class="form-group col-md-4">
                            <label for="numero">CEP</label>
                            <input type="text" id="cep" name="cep"
                                class="form-control"
                                placeholder="CEP do Centro Esportivo "
                                v-model="sportCenter.cep"
                                v-b-popover.hover.top="'Por favor, digite somente número.'">
                        </div> 
                    </div>
            </div> 
            <div class="card-header">
                        Dados de Comunicação
            </div>                  
                <div class="card-body comunicacao">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="telefone">Telefone</label>
                            <input type="text" id="telefone" name="telefone"
                                class="form-control"
                                placeholder="Por Favor, Digite o telefone do Centro Esportivo "
                                v-model="sportCenter.telefone"
                                v-b-popover.hover.top="'Por favor, digite somente número.'">
                        </div>
                    </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="telefone1">Telefone</label>
                                <input type="text" id="telefone1" name="telefone1"
                                    class="form-control"
                                    placeholder="Por Favor, Digite o telefone do Centro Esportivo "
                                    v-model="sportCenter.telefone1"
                                    v-b-popover.hover.top="'Por favor, digite somente número.'">
                            </div> 
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="telefone2">Telefone</label>
                                <input type="text" id="telefone2" name="telefone2"
                                class="form-control"
                                placeholder="Por Favor, Digite o telefone do Centro Esportivo "
                                v-model="sportCenter.telefone2"
                                v-b-popover.hover.top="'Por favor, digite somente número.'">
                            </div>                 
                        </div>
                </div>
            <div class="card-body button">
                <b-button variant="primary" class="mr-2" v-b-modal.modalRegister v-if="stateButton == 't'"
                v-b-popover.hover.top="'Clique para Salvar.'">Salvar</b-button> 
                <b-button variant="primary" class="mr-2" v-b-modal.modalRegister v-else
                v-b-popover.hover.top="'Clique para Salvar.'">Alterar</b-button> 
                <b-button variant="outline-danger" class="ml-2" @click="resetSportCenter"
                v-b-popover.hover.top="'Clique para limpar os Dados.'">Cancelar</b-button>
            </div>
            <div>
                <b-modal id="modalRegister" title="Confirmação de Dados" @ok="saveSportCenter">
                    <p class="my-0">
                        Nome: {{sportCenter.nome}} <br>
                        Nome do Logradouro: {{sportCenter.nomeLogradouro}} 
                        Número: {{sportCenter.numero}} <br>
                        Bairro: {{sportCenter.bairro}} 
                        CEP: {{sportCenter.cep}} <br>
                        Telefone: {{sportCenter.telefone}} - {{sportCenter.telefone1}} - {{sportCenter.telefone2}}
                    </p>
                </b-modal>
            </div>
        </div>
   </b-form>
</template>

<script>

import { baseApiUrl, userKey, showError } from '@/config/global'
import axios from 'axios'
export default {
    name: 'RegisterSportCenter',
    data: function(){
        return{
            sportCenter: {},
            idSportCenter: this.$route.params.id,
            stateButton: 't'
        }
    },
    methods:{
        async saveSportCenter(){
            this.loadUser()
            const method = this.$route.params.id ? 'put' : 'post'
            const id = this.$route.params.id ? `/${this.$route.params.id}` : ''
            const url = `${baseApiUrl}/sportCenter${id}`
                await axios[method](url, this.sportCenter)
                    .then(()=>{
                        this.$toasted.success('Cadastrado Com Sucesso!')
                        this.sportCenter= {}
                    })
                    .catch(showError)
            
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)           
        },
        resetSportCenter(){
            this.sportCenter = {}
            this.$router.push({
                name: 'home'
            })
        },
        async loadSportCenter(){
            if(this.$route.params.id){
                this.loadUser()
                this.stateButton = 'f'
                const url = `${baseApiUrl}/sportCenter/${this.idSportCenter}`
                await axios.get(url)
                    .then(res=> this.sportCenter =res.data)
            }
        }
    },
    mounted(){
        this.loadSportCenter()
    }
}
</script>

<style>

</style>