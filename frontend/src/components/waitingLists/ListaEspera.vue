<template>
  <div>
      <PageTitle main="Lista de Espera" sub="Por favor, escolha uma turma para verificar a Lista de Espera" icon="icofont-win-trophy"/>
      <b-form>
          <div class="login-card card">
              <div class="card-header">
                  Escolha uma Turma
              </div>
              <div class="card-body">
                  <div class="form-row">
                      <div class="form-group col-md-12 mt-1">
                          <label for="turma">Digite uma turma:</label>
                          <input type="text" class="form-control mb-1" v-model="searchTurma"
                          placeholder="Digite a turma que queria pesquisar" id="turma" 
                          v-b-popover.hover.top="'Digite uma Turma'"  @click="updateListaEspera(data.item)"/>
                      </div>
                      <div class="form-group col-md-12 mt-1">
                          <label for="turma">Escolha uma turma:</label>
                          <b-form-select :options="resultTurma" :select-size="3" v-model="idTurma"
                          v-b-popover.hover.top="'Escolha uma Turma'" v-on:change="loadListaEspera"></b-form-select>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="form-group col-md-12 mt-1">
                          <label for="turma">Digite o nome do Aluno:</label>
                          <input type="text" class="form-control mb-1" v-model="searchListEspera"
                          placeholder="Digite o nome do aluno que queria pesquisar..." id="turma" 
                          v-b-popover.hover.top="'Digite nome do Aluno'" />
                      </div>
                  </div>
                  <div class="form-row">
                      <b-table striped hover :fields="fields"
                        :items="resultListaEspera"
                       class="my-2"
                      id="tableEspera" >
                        <template slot="cell(actions)" slot-scope="data" :per-page="perPage" :current-page="page">
                            <b-button variant="warning" @click="updateListaEspera(data.item)" v-b-popover.hover.top="'Update'">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button variant="success" v-b-popover.hover.top="'Chamar para a matrícula'" class="ml-1"
                            v-b-modal.modalChamarAluno @click="tirarListaEspera(data.item)">
                                <i class="fa fa-check"></i>
                            </b-button>

                        </template>

                      </b-table>
                       <b-pagination size="md" v-model="page" aria-controls="turma"
                        :total-rows="resultListaEspera.length" :per-page="perPage" id="paginationManagerClass"/>
                    <div>
                        <b-modal id="modalChamarAluno" title="Confirmação de Matrícula" @ok="salveClassUser">
                            Código da Turma: {{userClass.idClass}}<br>
                            Aluno: {{userClass.nome}} - Código do Aluno: {{userClass.idUser}}
                        </b-modal>
                    </div>
                  </div>
              </div>
          </div>
      </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import PageTitle from '../template/PageTitle'
import {userKey, baseApiUrl, showError} from '@/config/global'
export default {
    name: 'ListaEspera',
    components: {PageTitle},
    data: function(){
        return {
            listaEspera: {},
            idTurma: '',
            turmas: {},
            searchTurma: '',
            searchListEspera: '',
            user: {},
            userClass: {}, 
            limit: 0,
            perPage: 10,
            countList: 0,
            page: 1,
            fields: [
                {key: 'idUser', label: 'Código do Aluno', sortable: true},
                {key: 'nome', label: 'Nome', sortable: true},
                {key: 'idClass', label: 'Código da Turma'},
                {key: 'dataNasc', label: 'Data de Nascimento'},
                {key: 'dataInscricao', label: 'Data Inscrição'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods:{
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async loadClasses(){
            this.loadUser()
            const url = `${baseApiUrl}/class?page=${this.page}`
            await axios.get(url)
                    .then(res=>{
                        this.turmas = res.data.data.map(option=>{
                            return {value:option.id, text: (`${option.nomeModalidade} - ${option.dias} - ${option.horarios} - ${option.faixaEtaria} - ${option.centroEsportivo}`).toUpperCase()}
                        })
                    })
                    .catch(showError)
        },
        async loadListaEspera(){
            this.loadUser()
            const url = `${baseApiUrl}/waitingList/${this.idTurma}`
            await axios.get(url)
                    .then(res=>{
                        this.listaEspera = res.data.data.map(user=>{
                            return {nome: user.nome, dataNasc: user.dataNasc.slice(0, 10).split("-").reverse().join("-"), dataInscricao: user.dataInscricao.slice(0, 10).split("-").reverse().join("-"), idClass: user.idClass, idUser: user.idUser}
                        })
                        this.countList = res.data.count

                    })
                    .catch(showError)
        },
        async updateListaEspera(user){
            this.user = {...user}
        },
        async tirarListaEspera(user){
            this.userClass = {...user}
        },

        async salveClassUser(){
            this.loadUser()
            const url = `${baseApiUrl}/classUser`
            const urlDel = `${baseApiUrl}/waitingListUser/${this.userClass.idUser}?idClass=${this.userClass.idClass}`
            this.userClass.activeClass = false;
            await axios.post(url, this.userClass)
                    .then(()=>{
                        this.$toasted.success('O usuário matriculado com sucesso')
                        this.userClass = {}
                    })
                    .catch(showError)
            await axios.delete(urlDel)
                    .then(()=>{
                        this.$toasted.success('Usuário retirado com sucesso da Lista de Espera!')
                    })
        }
    },
    mounted(){
        this.loadClasses()
    },
    computed:{
        resultTurma(){
            if(this.searchTurma == '' || this.searchTurma == ' '){
                return this.turmas
            }else{
                return this.turmas.filter(turma=>{
                    return turma.text.match(this.searchTurma.toUpperCase())
                })
            }
        },
        resultListaEspera(){
            if(this.searchListEspera == '' || this.searchListEspera == ' '){
                return this.listaEspera
            }else{
                this.listaEspera.filter(Lista=>{
                    Lista.nome.match(this.searchListEspera.toUpperCase())
                })
            }
        }
    }

}
</script>

<style>

</style>