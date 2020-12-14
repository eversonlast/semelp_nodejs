<template>
<div>
    <b-form>
        <div class="login-card card">
            <input type="hidden" class="turmaId" v-model="turma.id">
            <div class="card-header">
                Dados de Informação da Turma 
            </div>
            <div class="card-body informacao">
                <div class="form-row">
                    <div class="form-group col-md-12 mt-1">
                        <label for="diasTurma">Dias da Turma</label>
                        <b-form-select v-model="turma.dias" :options="diasDaTurma"
                        v-b-popover.hover.top="'Escolha uma opção.'"></b-form-select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 mt-1">
                        <label for="horarios">Horário da Turma</label>
                        <div>
                            <b-form-select  class="form-group col-md-4" id="periodo" v-on:change="escolherHorario" v-model="controle.value" :options="optionHorarios" 
                            v-b-popover.hover.top="'Escolha uma opção.'"></b-form-select>
                            <b-form-select v-model="turma.horarios" :options="horarios" id="horarios" name="horarios" class="form-group col-md-7 mx-md-1" v-if="statusDigite==false"
                            v-b-popover.hover.top="'Escolha uma opção.'"></b-form-select>
                            <input type="text" id="horarios" name="horarios" 
                            class="form-control col-md-12" v-model="turma.horarios" v-else
                            v-b-popover.hover.top="'Digite uma opção, com formato 00hs00min'">
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="teacherResponsability">Professor Responsável pela Turma</label>
                        <b-form-select id="idProfessorResponsability"                        
                         :options="teacherResponsable"  v-model="turma.idProfessorResponsability"></b-form-select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="idSportCenter">Centro Esportivo da Turma</label>
                        <b-form-select id="idSportCenter" v-model="turma.idSportCenter" :options="sportCenter" v-on:change="loadModalitiesBySportCenter"></b-form-select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="Modality">Modalidade</label>
                        <b-form-select id="idModalidade" v-model="turma.idModality" :options="modalities"></b-form-select>
                    </div>
                </div>
                 <div class="form-row">
                    <div class="form-group col-md-6 mt-1">
                        <label for="faixaEtaria">Faixa Etária</label>
                        <div>
                            <input type="text" id="faixaEtaria" name="faixaEtaria" 
                            class="form-control" v-model="turma.faixaEtaria" >
                        </div>
                    </div>
                    <div class="form-group col-md-6 mt-1">
                        <label for="faixaEtaria">Máximo de Faltas por Mês que a Turma permite</label>
                        <div>
                            <input type="text" id="faixaEtaria" name="faixaEtaria" 
                            class="form-control " v-model="turma.maximoFaltasMes" >
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body button">
                <b-button variant="primary" class="mr-2" v-on:click="loadControle" v-b-modal.modalRegisterClass v-if="controleButton">Salvar</b-button>
                 <b-button variant="primary" class="mr-2" v-on:click="loadControle" v-b-modal.modalRegisterClass v-else>Atualizar</b-button>
                <b-button variant="outline-danger" class="mr-2" @click="buttonReset">Cancelar</b-button>
            </div>
            <div>
                <b-modal id="modalRegisterClass" title="Confirmação de Dados" @ok="saveClasses">
                    Dias da Turma: {{turma.dias}} <br>
                    Horário: {{turma.horarios}}<br>
                    Professor Responsável:  {{turma.idProfessorResponsability}} - {{nomeProfessor}} <br>
                    Centro Esportivo: {{turma.idSportCenter}} - {{nomeCentroEsportivo}} <br>
                    Modalidade: {{turma.idModalidade }} - {{nomeModalidade}}        
                </b-modal>
            </div>
        </div>
    </b-form>
</div>
</template>

<script>
import diasTurma from './dados/diasTurma.json'
import periodo from './dados/periodo.json'
import horariosManha from './dados/horariosManha.json'
import horariosTarde from './dados/horariosTarde.json'
import horariosNoite from './dados/horariosNoite.json'
import { userKey, baseApiUrl, showError} from '@/config/global'
import axios from 'axios'

export default {
    name: "RegisterClass",
    data: function(){
        return{
            turma: {},
            diasDaTurma: [],
            statusDigite: false,
            optionHorarios: [],
            horarios: [],
            controle: {},
            teacherResponsable: [],
            sportCenter: [],
            modalities: [],
            nomeProfessor: '',
            nomeCentroEsportivo: '',
            nomeModalidade: '',
            controleButton: true
        }
    },
    methods: {
        loadDaysClass(){
            this.diasDaTurma = diasTurma.map(option=>{
                return {value: option.value, text: option.value}
            })
        },
        loadPeriodo(){
            this.optionHorarios = periodo.map(option=>{
                return {value: option.value, text: option.text}
            })
        },
        escolherHorario(){
            if(this.controle.value == 'manha'){
                this.statusDigite = false
                this.horarios = horariosManha.map(option=>{
                    return{ value: option.value, text: option.value}
                })
            }else if(this.controle.value == 'tarde'){
                this.statusDigite = false
                this.horarios = horariosTarde.map(option=>{
                    return { value: option.value, text: option.value}
                })
            }else if(this.controle.value == 'noite'){
                this.statusDigite =  false
                this.horarios = horariosNoite.map(option=>{
                    return{ value: option.value, text: option.value}
                })
            }else if(this.controle.value == 'digite'){
                this.statusDigite = true;
            }
        },
        async loadResponsability(){
            this.loadUser()
            const url = `${baseApiUrl}/responsabilityModality`
            await axios.get(url)
                        .then(res=>{
                            this.teacherResponsable = res.data.map(option=>{
                                return { value: option.id, text: option.nome}
                            })
                        })
                        .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async loadSportCenter(){
            this.loadUser()
            const url = `${baseApiUrl}/sportCenter`
            await axios.get(url)
                        .then(res=>{
                            this.sportCenter = res.data.data.map(option=>{
                                return { value: option.id, text: option.nome}
                            })
                        })
        },
        async loadModalitiesBySportCenter(){
            this.loadUser()
            var select = document.getElementById('idSportCenter')
            var id = select.options[select.selectedIndex].value
            const url =`${baseApiUrl}/sportCenterModality/${id}`
            await axios.get(url)
                        .then(res=>{
                            this.modalities = res.data.data.map(option=>{
                                return {value: option.idModalidade, text: option.nomeModalidade}
                            })
                        })
        },
        loadControle(){
           var selectNomeResponsavel = document.getElementById('idProfessorResponsability')
           this.nomeProfessor = selectNomeResponsavel.options[selectNomeResponsavel.selectedIndex].text
           var selectCentroEsportivo = document.getElementById('idSportCenter')
           this.nomeCentroEsportivo = selectCentroEsportivo.options[selectCentroEsportivo.selectedIndex].text
           var selectModalidade = document.getElementById('idModalidade')
           this.nomeModalidade = selectModalidade.options[selectModalidade.selectedIndex].text
        },
        async saveClasses(){
            const id = this.$route.params.id ? `/${this.$route.params.id}` : ''
            const url = `${baseApiUrl}/class${id}`
            const method = this.$route.params.id ? 'put' : 'post'
            await axios[method](url, this.turma)
                        .then(()=>{
                            this.$toasted.success('Cadastrado com sucesso')
                            this.turma = {}
                        })
                        .catch(showError)
        },
        buttonReset(){
            this.turma = {}
            this.loadDaysClass()
            this.loadPeriodo()
            this.loadResponsability()
            this.loadSportCenter()
            this.modalities = []
            this.$router.push({
                name: 'home'
            })
        },
        async loadClass(){
            if(this.$route.params.id){
                this.loadUser()
                this.controleButton = false
                const url = `${baseApiUrl}/class/${this.$route.params.id}`
                await axios.get(url)
                        .then(res=> this.turma = res.data)
                        .catch(showError)
            }else{
                return
            }
        }
    },
    mounted(){
        this.loadDaysClass()
        this.loadPeriodo()
        this.loadResponsability()
        this.loadSportCenter()
        this.loadClass()
    }
}
</script>

<style>


</style>