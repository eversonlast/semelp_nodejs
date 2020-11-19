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
                        <b-form-select v-model="turma.dias" :options="diasDaTurma"></b-form-select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 mt-1">
                        <label for="horarios">Horário da Turma</label>
                        <div>
                            <b-form-select  class="form-group col-md-4" id="periodo" v-on:change="escolherHorario" v-model="controle.value" :options="optionHorarios" ></b-form-select>
                            <b-form-select v-model="turma.horarios" :options="horarios" id="horarios" name="horarios" class="form-group col-md-7 mx-md-1" v-if="statusDigite==false"></b-form-select>
                            <input type="text" id="horarios" name="horarios" 
                            class="form-control col-md-12" v-model="turma.horarios" v-else>
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
                    <div class="form-group col-md-12 mt-1">
                        <label for="faixaEtaria">Faixa Etária</label>
                        <div>
                            <input type="text" id="faixaEtaria" name="faixaEtaria" 
                            class="form-control col-md-12" v-model="turma.faixaEtaria">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body button">
                <b-button variant="primary" class="mr-2" @click="loadControle" v-b-modal.modalRegisterClass>Salvar</b-button>
                <b-button variant="outline-danger" class="mr-2">Cancelar</b-button>
            </div>
            <div>
                <b-modal id="modalRegisterClass" title="Confirmação de Dados">
                    Dias da Turma: {{turma.dias}} <br>
                    Horário: {{turma.horarios}}<br>
                    Professor Responsável:  {{teste.nameResponsable}}
                    
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
            teste: {}
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
           this.teste.nameResponsable = selectNomeResponsavel.options[selectNomeResponsavel.selectedIndex].text
            
        }
    },
    mounted(){
        this.loadDaysClass()
        this.loadPeriodo()
        this.loadResponsability()
        this.loadSportCenter()
    }
}
</script>

<style>


</style>