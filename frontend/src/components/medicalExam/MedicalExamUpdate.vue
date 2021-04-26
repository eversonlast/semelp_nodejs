<template>
<div>
    <PageTitle main="Gerenciar Exame Médico" sub="Verificação dos dados do Exame" icon="icofont-medical-sign"/>
    <div class="base">
        <b-form>
            <div class="card-header">
                Dados de informação do Atestado
            </div>
            <div class="card-body">
                <div class="form-row">
                    <div class="form-group col-sm-6">
                        <label for="data-validade">Mês do Exame</label>
                        <b-input type="text" v-model="medicalExam.examMonth" readonly v-if="!editMedicalExam"/>                
                        <b-form-datepicker id="dtMonth" locale="pt-BR" startDate="01/01/2020"
                        placeholder="Por favor, escolha uma data de exame." v-b-popover.hover.top="'Escolha uma data.'"
                        v-model="medicalExam.examMonth" v-else></b-form-datepicker>           
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="data-validade">Data de Validade do Exame</label>
                        <b-input type="text" v-model="medicalExam.validadeExam" readonly v-if="!editMedicalExam" />   
                        <b-form-datepicker id="dtValidade" locale="pt-BR" startDate="01/01/2020"
                        placeholder="Por favor, escolha uma data de exame." v-b-popover.hover.top="'Escolha uma data.'"
                        v-model="medicalExam.validadeExam" v-else></b-form-datepicker>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <label for="name-aluno">Nome do Aluno</label>
                        <b-input type="text" v-model="medicalExam.NomeAluno" readonly />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <b-form-checkbox id="checkbox-1" v-model="medicalExam.activeExam" value="true">Situação do Atestado</b-form-checkbox>
                        <div>Estado: <strong>{{medicalExam.activeExam ? "Ativo" : "Desativado" }}</strong></div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <a :href="'http://localhost:8080'+medicalExam.caminho" target="_blank">
                            <img :src="medicalExam.caminho" width="250"  />
                        </a>
                    </div>
                </div>
            </div>
            <div class="card-body button">
                    <b-button variant="primary" class="mx-1" @click="btnAlterar">Alterar</b-button>
                    <b-button variant="outline-danger" @click="btnCancelar"
                    v-b-popover.hover.top="'Clique para cancelar!'"
                    >Cancelar</b-button>               
            </div>

        </b-form>
    </div>
</div>
  
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios'
import {baseApiUrl, userKey, showError} from '@/config/global'
export default {
    name:'MedicalExamUpdate',
    components: {PageTitle},
    data: function(){
        return {
            medicalExam: {},
            editMedicalExam: false
        }
    },
    methods:{
        async loadExamMedical(){
            this.loadUser()
            const url = `${baseApiUrl}/medicalExam/${this.$route.params.id}`
            await axios.get(url)
                        .then(res=> {
                            this.medicalExam = res.data[0]
                        })
                        .catch(showError)
        },
       async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)    
        },
        btnCancelar(){
            this.medicalExam = {}
            this.$router.push({
                path: '/managerMedicalExam'
            })

        },
        btnAlterar(){
            this.editMedicalExam = !this.editMedicalExam
        }
    },
    mounted(){
        this.loadExamMedical()
    }
}
</script>

<style>
.button{
    display:flex;
    justify-content: center;
}
</style>