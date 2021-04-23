<template>
  <div>
      <PageTitle main="Lista de Espera" sub="Nome da Modalidade" icon="icofont-sand-clock"/>
      <b-form>
          <div class="login-card card">
              <div class="card-header">
                  Dados Para Lista de Espera 
              </div>
              <div class="card-body">
                  <div class="form-row">
                      <div class="form-group col-md-12 mt-1">
                          <label for="usuario">Escolha uma usuário</label>
                          <input type="text" class="form-control mb-1" id="user" v-model="searchUser"
                          placeholder="Por favor, Digite o nome do Usuário" 
                          v-b-popover.hover.top="'Digite o Usuário'" />
                          <b-form-select :select-size="4" class="mb-1" id="usuario"
                          :options="resultUser" v-model="waitingLists.idUser"
                          v-b-popover.hover.top="'Escolha o Nome o Usuário'" v-on:change="selectUser"></b-form-select>
                          <b-button variant="primary"
                          v-b-popover.hover.top="'Alterar Dados do Usuário'"
                          @click="buttonEditar">Editar Usuário</b-button>
                      </div>
                      <div class="form-group col-md-12 mt-1">
                          <label for="turma">Escolha uma Modalidade</label>
                          <input type="text" class="form-control mb-1" id="turma" v-model="searchClass"
                          placeholder="Por favor, Digite a modalidade"
                          v-b-popover.hover.top="'Digite a modalidade'"/>
                          <b-form-select :select-size="4" class="mb-1" id="turmaUsuario"
                          :options="resultClass" v-model="waitingLists.idClass"
                          v-b-popover.hover.top="'Escolha uma Modalidade'"></b-form-select>
                      </div>
                      <div class="form-group col-md-12 mt-1 divButton">
                          <b-button variant="primary" v-if="true" @click="selectedTurma" v-b-modal.ModalRegisterWaitList
                          v-b-popover.hover.top="'Clique para salvar os Dados'">Salvar</b-button>
                          <b-button variant="success" v-else
                          v-b-popover.hover.top="'Clique para Atualizar os Dados'">Atualizar</b-button>
                          <b-button variant="outline-danger" class='ml-1' @click="btnCancel"
                          v-b-popover.hover.top="'Clique para limpar os Dados'" >Cancelar</b-button>
                      </div>
                      <div>
                          <b-modal id="ModalRegisterWaitList" title="Confirmação de Dados da Lista de Espera" 
                          @ok="saveWaitingLists">
                          Id do Usuário: {{waitingLists.idUser}} <br>
                          Dados do Usuário: {{nomeUsuario}} <br>
                          Id da Turma: {{waitingLists.idClass}}<br>
                          Dados da Modalidade: {{nomeModalidade}}  
                          </b-modal>
                      </div>
                  </div>
              </div>
          </div>
      </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import {userKey, baseApiUrl, showError} from '@/config/global'
import PageTitle from '../template/PageTitle'
export default {
    name: 'WaitingLists',
    components: {PageTitle},
    data: function(){
        return {
            waitingLists: {},
            users: [],
            classes: [],
            searchUser: '',
            searchClass: '',
            idadeDoUsuario: 0,
            nomeUsuario: '',
            nomeModalidade: ''

        }
    },
    methods:{
        async loadUserPerClass(){
            this.loadUser()
            const url = `${baseApiUrl}/users`
            await axios.get(url)
                    .then(res=>this.users=res.data.data
                    .map(option=>{
                        return {value:option.id, text:(`${option.nome} | ${option.dataNasc} - CPF ${option.cpf}`).toUpperCase()}
                    }))
                    .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async loadClassUsers(){
            this.loadUser()
            const url = `${baseApiUrl}/class`
            await axios.get(url)
                    .then(res=> this.classes = res.data.data.filter(turma=>{
                        return turma.faixaEtaria.substring(0, turma.faixaEtaria.toUpperCase().indexOf('À')) < this.idadeDoUsuario && 
                        turma.faixaEtaria.toUpperCase().substring(turma.faixaEtaria.toUpperCase().indexOf("À")+2, turma.faixaEtaria.toUpperCase().indexOf('A')-1) > this.idadeDoUsuario 
                    })
                    .map(option=>{
                        return {value: option.id, text:(`${option.nomeModalidade} - ${option.dias} - ${option.horarios} 
                        | ${option.faixaEtaria} - ${option.centroEsportivo}`).toUpperCase()}
                    }))
        },
        buttonEditar(){
            if(this.waitingLists.idUser == undefined){
                alert("Por favor, escolhe um usuário")
            }else{
                this.$router.push({
                    path:`user/${this.waitingLists.idUser}`
                })
            }
        },
        async selectUser(){
            var select = document.getElementById('usuario')
            var option = select.children[select.selectedIndex]
            var textoUsuario = option.textContent
            this.nomeUsuario = textoUsuario
            var dataNasc = textoUsuario.substring(textoUsuario.indexOf("|")+1, textoUsuario.indexOf('-')-1)
            var arr = dataNasc.split('/')
            var dataFormatada = new Date(arr[2], arr[1] - 1, arr[0])
            var data = new Date()
            this.idadeDoUsuario = Math.floor(Math.ceil(Math.abs(dataFormatada.getTime() - data.getTime()) / (1000 * 3600 * 24)) / 365.25)
            await this.loadClassUsers()
        },
        async saveWaitingLists(){
            this.loadUser()
            const id = this.$route.params.id ? `/${this.$route.params.id}` : ''
            const url = `${baseApiUrl}/waitingList${id}`
            const method = this.$route.params.id ? 'put' : 'post'
            await axios[method](url, this.waitingLists)
                .then(()=>{
                    this.$toasted.success('Cadastrado com sucesso')
                    this.waitingLists = {}
                })
                .catch(showError)
        },
        selectedTurma(){
            var selectClass = document.getElementById('turmaUsuario')
            this.nomeModalidade = selectClass.options[selectClass.selectedIndex].text
        },
        btnCancel(){
            this.waitingLists = {}
            this.classes = []
            this.searchUser =''
            this.idadeDoUsuario = 0
            this.nomeUsuario = ''
            this.nomeModalidade = ''
            this.$router.push({
                name: 'home'
            })
        }
    },
    mounted(){
        this.loadUserPerClass()
    },
    computed:{
        resultUser(){
            if(this.searchUser== '' || this.searchUser==' '){
                return this.users
            }else{
                return this.users.filter(user=>{
                    return user.text.match(this.searchUser.toUpperCase())
                })
            }
        },
        resultClass(){
            if(this.searchClass == '' || this.searchClass == ''){
                return this.classes
            }else{
                return this.classes.filter(turma=>{
                    return turma.text.match(this.searchClass.toUpperCase())
                })
            }
        }
    }

}
</script>

<style>

</style>