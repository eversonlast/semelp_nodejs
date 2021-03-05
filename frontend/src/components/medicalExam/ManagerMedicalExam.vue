<template>
<div>
    <PageTitle main="Lista de Exame Médico" sub="Gerenciar Exame Médico" icon="icofont-medical-sign" />
    <div class="base">
        <b-form-input type="text" id="medicalExam" class="my-2" 
        placeholder="Por favor, digite o nome ou CPF do aluno."
        v-b-popover.hover.top="'Por favor, digite o nome ou CPF.'"></b-form-input>
        <b-table striped hover :fields="fields" class='my-2' :items="medicalExams">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant='warning' class="my-1 ml-1" 
                v-b-popover.hover.top="'Update'">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant='success' class="ml-1" v-b-popover.hover.top="'Ativar o atestado'">
                    <i class="fa fa-check-circle"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</div>
  
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios'
import { baseApiUrl, userKey, showError } from '@/config/global'
export default {
    name: "ManagerMedicalExam",
    components: {PageTitle},
    data: function(){
        return{
            medicalExams: [],
            limit: 0,
            count: 0, 
            page: 1,
            search: '',
            fields:[
                {key: 'id', label:'Código', sortable: true},
                {key: 'validadeExam', label: 'Validade do Exame', sortable: true},
                {key: 'examMonth', label: 'Mês do Exame', sortable: true},
                {key: 'activeExam', label: 'Atestado Ativado'},
                {key: 'NomeAluno', label: 'Nome do Aluno', sortable: true},
                {key: 'idUser', label: 'Código do Usuário'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods:{
        async loadMedicalExam(){
            this.loadUser()
            const url = `${baseApiUrl}/medicalExam`
            await axios.get(url)
                    .then(res=>{
                        this.medicalExams = res.data.data
                        this.limit = res.data.limit
                        this.count = res.data.count
                    })
                    .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        }
    },
    mounted(){
        this.loadMedicalExam()
    }
}
</script>

<style>

</style>