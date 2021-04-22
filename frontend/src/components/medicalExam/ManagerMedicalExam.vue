<template>
<div>
    <PageTitle main="Lista de Exame Médico Desativados" sub="Gerenciar Exame Médico" icon="icofont-medical-sign" />
    <div class="base">
        <b-form-input type="text" id="medicalExam" class="my-2" v-model="search"
        placeholder="Por favor, digite o nome ou data do Exame." 
        v-b-popover.hover.top="'Por favor, digite o nome ou data do Exame.'"></b-form-input>
        <b-table striped :fields="fields" :items="resultadoPesquisaUser" hover class='my-2' :per-page="perPage" :current-page="page">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant='warning' class="my-1 ml-1" @click="updateButton(data.item)"
                v-b-popover.hover.top="'Update'">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant='success' class="ml-1" v-b-popover.hover.top="'Ativar o atestado'" @click="activeMedicalExam(data.item)">
                    <i class="fa fa-check-circle"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" aria-controls="medicalExam"
        :total-rows="medicalExams.count" :per-page="perPage" id="pagination-Exam"/>
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
            perPage: 10,
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
                        this.medicalExams = res.data
                    })
                    .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        updateButton(medicalExam){
            this.$router.push({
                path: `/medicalExam/${medicalExam.id}`
            })
        },
        async activeMedicalExam(medicalExam){
            this.loadUser()
            const url = `${baseApiUrl}/medicalExam/${medicalExam.id}`
            await axios.put(url)
                        .then(()=>{
                            this.$toasted.success('Ativado com sucesso!')
                            this.loadMedicalExam()
                        })
                        .catch(showError)
        }
    },
    mounted(){
        this.loadMedicalExam()
    },
    watch(){
        this.medicalExams
    },
    computed:{
        resultadoPesquisaUser(){
            if(this.search == '' || this.search == ' '){
                return this.medicalExams.data
            }else{
                return this.medicalExams.data
                .filter(medicalExam=>{                    
                    return  medicalExam.NomeAluno.toUpperCase().match(this.search.toUpperCase())||
                       medicalExam.examMonth.toUpperCase().match(this.search.toUpperCase())
                })
                
            }
        }
    }
}
</script>

<style>

</style>