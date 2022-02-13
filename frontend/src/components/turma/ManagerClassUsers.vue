<template>
  <div>
      <PageTitle main="Lista de Usuários Desativados" icon="icofont-gears"/>
      <div class="base">
          <div class="row">
              <div class="col-md-10 mx-1">
                <b-form-input type="text" id="usuarioDaTurma" class="my-2" v-model="searchNome"
                placeholder="Por favor, digite o nome do Usuário."
                v-b-popover.hover.top="'Por favor, digite o nome do Usuário.'"
                @keydown.enter.prevent="findByNameClassUserDesactive()"></b-form-input>
              </div>
              <div class="col-md-1 my-2">
                  <b-button variant="primary" @click="findByNameClassUserDesactive()"
                  v-b-popover.hover.top="'Por favor, Clique para realizar a Pesquisa.'">Pesquisar</b-button>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                    <b-table striped :fields="fields" :items="usersWithClass" hover class="my-2" responsive>
                        <template slot="cell(actions)" slot-scope="data" :current-page="page" :per-page="perPage">
                            <b-button variant="success" v-b-popover.hover.top="'Ativar Usuário'" @click="activeClassUser(data.item)">
                                <i class="icofont-check"></i>
                            </b-button>
                        </template>
                    </b-table>
                    <b-pagination size="md" v-model="page"
                    :total-rows="countUsers" :per-page="perPage"/>
              </div>
          </div>
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
            perPage: 10,
            user: {},
            page: 1,
            search: '',
            searchNome: '',
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'nomeAluno', label:'Nome do Aluno', sortable: true},
                {key: 'dias', label: 'Dias da Aula'},
                {key: 'horarios', label: 'Horário da Aula'},
                {key:'nomeModalidade', label: 'Modalidade'},
                {key: 'centroEsportivo', label: 'Centro Esportivo'},
                {key: 'departamento', label: 'Departamento'},
                {key: 'maximoFaltasMes', label:'Máximo de Faltas no Mês'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods:{
        async loadUsersWithClasses(){
            const url = `${baseApiUrl}/classUserDesactive?page=${this.page}`
            this.loadUser()
            await axios.get(url)
                .then(res=>{
                    this.usersWithClass = res.data.data 
                    this.countUsers = res.data.count
                    
                })
                .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async activeClassUser(user){
            const url = `${baseApiUrl}/classUserDesactive/${user.id}`
            await axios.put(url)
                    .then(()=>{
                        this.$toasted.success('O aluno está ativado')    
                        user = {}
                    })
                    .catch(showError)
            this.loadUsersWithClasses()
        },
        async findByNameClassUserDesactive(){
            this.loadUser();
            const url = `${baseApiUrl}/classByNameDesactive?nome=${this.searchNome}`
            await axios.get(url)
                .then(res=>{
                    this.usersWithClass = res.data
                    this.countUsers = 10
                    this.perPage = 100
                })
        }
    },
    mounted(){
        this.loadUsersWithClasses()
    },
watch:{
    page(){
        this.loadUsersWithClasses()
    }
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