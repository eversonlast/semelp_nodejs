<template>
  <div>
      <PageTitle main="Lista da Turma" icon="icofont-gears"/>
      <div class="base">
          <b-form-input type="text" id="usuarioDaTurma" class="my-2" v-model="search"
          placeholder="Por favor, digite o nome do Usuário, Modalidade ou Centro Esportivo."
          v-b-popover.hover.top="'Por favor, digite o nome do Usuário, Modalidade ou Centro Esportivo.'"></b-form-input>
          <b-table striped :fields="fields" :items="resultadoPesquisaUserWithClass" hover class="my-2">
              <template slot="cell(actions)" slot-scope="data">
                <b-button variant="success" v-b-popover.hover.top="'Ativar Usuário'">
                    <i class="icofont-check"></i>
                </b-button>
              </template>
          </b-table>
        <b-pagination size="md" v-model="page"
        :total-rows="countUsers" :per-page="limitUsers"/>
      </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import {baseApiUrl, showError, userKey} from '@/config/global'
import axios from 'axios'
export default {
    name: 'ManagerClassUsers',
    components: {PageTitle},
    data: function(){
        return{
            usersWithClass: [],
            countUsers: 0, 
            limitUsers: 0,
            page: 1, 
            search: '',
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'nomeAluno', label:'Nome do Aluno', sortable: true},
                {key: 'dias', label: 'Dias da Aula'},
                {key: 'horarios', label: 'Horário da Aula'},
                {key:'nomeModalidade', label: 'Modalidade'},
                {key: 'centroEsportivo', label: 'Centro Esportivo'},
                {key: 'quantidadesDeFalta', label: 'Quantidade de Falta'},
                {key: 'activeClass', label: 'Usuário Ativo'},
                {key: 'departamento', label: 'Departamento'},
                {key: 'maximoFaltaMes', label:'Máximo de Faltas no Mês'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods:{
        async loadUsersWithClasses(){
            const url = `${baseApiUrl}/classUser?page=${this.page}`
            this.loadUser()
            await axios.get(url)
                .then(res=>{
                    this.usersWithClass = res.data.data 
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
    },
    mounted(){
        this.loadUsersWithClasses()
    },
    computed:{
        resultadoPesquisaUserWithClass(){
            if(this.search=='' || this.search== ' '){
                return this.usersWithClass
            }else{
                return this.usersWithClass.filter(userWithClass=>{
                    return userWithClass.nomeAluno.toUpperCase().match(this.search.toUpperCase()) ||
                            userWithClass.centroEsportivo.toUpperCase().match(this.search.toUpperCase()) ||
                            userWithClass.nomeModalidade.toUpperCase().match(this.search.toUpperCase())

                })
            }
        }
    }
}
</script>

<style>

</style>