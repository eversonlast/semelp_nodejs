<template>
  <div>
      <Page-Title main="Lista de Exames Médicos Ativados" sub="Gerenciar Exame Médicos" icon="icofont-medical-sign" />
      <div class="base">
          <b-form-input type="text" id="medicalExam" class="my-2" 
          placeholder="Por favor, digite o nome ou a data de Exame" v-model="search"
          v-b-popover.hover.top="'Por favor, digite o nome ou a data de Exame'"/>
          <b-table striped hover :fields="fields" :items="resultSearchMedicalActive" :per-page="perPage" :current-page="page">
              <template slot="cell(actions)" slot-scope="data">
                  <b-button variant="warning" class="my-1 ml-1" @click="updateButton(data.item)" 
                  v-b-popover.hover.top="'Update'">
                    <i class="fa fa-pencil"></i>
                  </b-button>
                  <b-button variant="success" class="ml-1" @click="desactiveExam(data.item)" 
                  v-b-popover.hover.top="'Desativar Exame'">
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
import {baseApiUrl, showError, userKey} from '@/config/global'
export default {
    name: 'MedicalExamActive',
    components: {PageTitle},
    data: function(){
        return {
            medicalExams: [],
            perPage: 0,
            count: 0,
            page: 1,
            search: '',
            fields: [
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
            const url = `${baseApiUrl}/medicalExamActive`
            await axios.get(url)
                        .then(res=>{
                            this.medicalExams = res.data.data
                            this.count = res.data.count 
                            this.perPage = res.data.limit
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
    },
    computed:{
        resultSearchMedicalActive(){
            if(this.search == '' || this.search == ' '){
                return this.medicalExams
            }else{
                return this.medicalExams.filter(medicalExam=>{
                    return medicalExam.NomeAluno.toUpperCase().match(this.search.toUpperCase())||
                            medicalExam.examMonth.toUpperCase().match(this.search.toUpperCase())
                })
            }
        }
    }
}
</script>

<style>

</style>