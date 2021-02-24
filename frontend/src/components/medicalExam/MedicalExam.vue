<template>
<div>
    <PageTitle main="Atestado Médico" icon="icofont-medical-sign"/>
    <b-form>
        <div class="login-card card">
            <input type="hidden" id="medcialExam" v-model="medicalExam.id" />
            <div class="card-header">
                Dados para Cadstramento de Exames Médicos
            </div>
            <div class="card-body cadastro">
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <input type="text" class="form-control"
                        placeholder="Por favor, Digite aqui o nome do usuário."
                        v-b-popover.hover.top="'Por favor, Digite o nome do usuário.'"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="userLists">Lista de Usuário</label>
                        <b-form-select id="userLists"
                        v-b-popover.hover.top="'Por favor, Escolha um usuário.'"
                        :select-size="4"></b-form-select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="dtMonth">Data do Exame Médico</label>
                        <b-form-datepicker id="dtMonth" locale="pt-BR" startDate="01/01/2020"
                        placeholder="Por favor, escolha uma data de exame." v-b-popover.hover.top="'Escolha uma data.'"
                        :options="usuario"></b-form-datepicker>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <b-button class="Anexar" variant="success" v-b-popover.hover.top="'Clique para anexar.'">Anexar Atestado</b-button>
                    </div>
                </div>
            </div>
            <div class="card-body button">
                <b-button variant="primary" class="mr-2" v-b-popover.hover.top="'Clique para salvar.'">Salvar</b-button>
                <b-button variant="outline-danger" v-b-popover.hover.top="'Clique para cancelar.'">Cancelar</b-button>
            </div>
        </div>
    </b-form>
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import {baseApiUrl, showError, userKey} from '@/config/global'
import axios from 'axios'
export default {
    name: "MedicalExam",
    components: {PageTitle},
    data: function(){
        return {
            medicalExam: {},
            usuario: []
        }
    },
    methods:{
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)    
        },
        async loadUsuario(){
            this.loadUser()
            const url = `${baseApiUrl}/users`
            await axios.get(url)
                    .then(res=>this.usuario = res.data.data.map(option=>{
                        return {value: option.id, text: (option.nome).toUpperCase()}
                    }))
                    .catch(showError)

        }
    },
    mounted(){
        this.loadUsuario()
    }

}
</script>

<style>

</style>