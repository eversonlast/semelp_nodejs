<template>
  <div>
      <PageTitle main="Lista de Usuários Ativos" icon="icofont-gears" />
      <div class="base">
          <b-form-input type="text" id="usuarioDaTurma" class="my-2" v-model="search"
          placeholder="Por favor, digite o nome do Usuário, Modalidade ou Centro Esportivo"
          v-b-popover.hover.top="'Por favor, digite o nome do Usuário, Modalidade ou Centro Esportivo'"></b-form-input>
          <b-table striped :fields="fields" :items="resultadoUserAllClassActive" hover class="my-2">
              <template slot="cell(actions)" slot-scope="data">
                  <b-button variant="danger" v-b-popover.hover.top="'Desativar o aluno'" @click="updateUserActive(data.item)">
                      <i class="icofont-close"></i>
                  </b-button>
              </template>
          </b-table>
          <b-pagination size="md" v-model="page" 
          :total-rows="countUsers" :per-page="limitUsers" />
      </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios'
import {baseApiUrl, showError, userKey} from '@/config/global'

export default {
    name: 'ManagerClassUsersActive',
    components: {PageTitle},
    data: function(){
        return{
            usersWithClassActive: {},
            countUsers: 0,
            limitUsers: 0,
            page: 1,
            user: {},
            search: '',
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'nomeAluno', label: 'Nome do Aluno', sortable: true},
                {key: 'dias', label: 'Dias'},
                {key: 'horarios', label: 'Horários'},
                {key: 'nomeModalidade', label: 'Modalidade'},
                {key: 'centroEsportivo', label: 'Centro Esportivo'},
                {key: 'departamento', label: 'Departamento'},
                {key: 'maximoFaltasMes', label: 'Máximo de Faltas por Mês'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods:{
        async loadUserAllClassActive(){
            const url = `${baseApiUrl}/classUserActive`
            this.loadUser()
            await axios.get(url)
                .then(res=>{
                    this.usersWithClassActive = res.data.data
                    this.countUsers = res.data.count
                    this.limitUsers = res.data.limit
                })
                .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async updateUserActive(userActive){
            const url = `${baseApiUrl}/classUserByActive/${userActive.id}`
            await axios.put(url)
                    .then(()=>{
                        this.$toasted.success(('O aluno está desativado'))
                        userActive = {}
                    })
                    .catch(showError)
        this.loadUserAllClassActive()
        }
    },
    mounted(){
        this.loadUserAllClassActive()
    },
    computed:{
        resultadoUserAllClassActive(){
            if(this.search=='' || this.search == ' '){
                return this.usersWithClassActive
            }else{
                return this.usersWithClassActive.filter(userWithClass=>{
                    return userWithClass.nomeAluno.toUpperCase().match(this.search.toUpperCase()) ||
                        userWithClass.nomeModalidade.toUpperCase().match(this.search.toUpperCase()) ||
                        userWithClass.centroEsportivo.toUpperCase().match(this.search.toUpperCase()) 
                })
            }
        }
    }
}
</script>

<style>

</style>