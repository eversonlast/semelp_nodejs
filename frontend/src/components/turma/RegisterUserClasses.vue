<template>
    <div>
        <PageTitle main="Matrícula de Alunos" sub="Por favor, escolha um aluno e uma turma." icon="icofont-win-trophy"/>
        <b-form>
            <div class="login-card card">
                <input type="hidden" class="userClassID" v-model="userClass.id">
                <div class="card-header">
                    Dados para Matrícula
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md-12 mt-1" v-if="this.user.tipoUsuario == 'user'">
                            <label for="turma">Escolha o Centro Esportivo</label>
                            <input type="text" v-model="searchSportCenter" class="form-control mb-1 maiscula" 
                            id="turma" placeholder="Digite um Centro Esportivo" v-b-popover.hover.top="'Digite um Centro Esportivo'"/>
                            <b-form-select v-on:change="clicarSportCenter"
                            :options="resultSportCenter" :select-size="4" id="CE"
                            v-b-popover.hover.top="'Escolha uma opção de Centro Esportivo'"></b-form-select>
                        </div>                        
                        <div class="form-group col-md-12 mt-1">
                            <label for="turma">Escolha a turma</label>
                            <input type="text" v-model="search" class="form-control mb-1 maiscula" 
                            id="turma" placeholder="Digite uma turma" v-b-popover.hover.top="'Digite uma turma'"/>
                            <b-form-select v-model="userClass.idClass" 
                            :options="resultClass" :select-size="4" id="teste"
                            v-on:change="clicar" v-b-popover.hover.top="'Escolha uma opção de turma'">></b-form-select>
                        </div>
                        <div class="form-group col-md-12 mt-1">
                            <div v-if="this.user.tipoUsuario == 'admin'">                                
                                <label for="user">Escolha um Usuário</label>
                                <input type="text" class="form-control mb-1 maiscula" v-model="searchUser"
                                v-b-popover.hover.top="'Digite o nome do usuário'" placeholder="Digite o nome de uma usuário"/>
                                <b-form-select v-model="userClass.idUser"
                                :options="resultUser" :select-size="4"
                                v-b-popover.hover.top="'Escolha uma opção de usuário'" id='userInput'></b-form-select>
                                <b-form-checkbox class="mt-2" id="checkbox-1"
                                v-model="userClass.activeClass">Ativar o aluno</b-form-checkbox>
                                <div>Estado da matrícula do Aluno: <span :class="corDaLetra">{{userClass.activeClass == true ? "Ativo" : "Desativo"}}</span></div>
                                <!--<input type="text" hiden v-model="userClass.idUser" v-if="this.user.tipoUsuario == 'user'"/>-->
                            </div>
                        </div>
                        <div class="form-group col-md-12 mt-1 divButton" >
                            <b-button variant="primary" class="buttonSalvar mx-1"
                            v-b-popover.hover.top="'Clique para matricular o usuário na turma'"
                            v-if="controleButtonSaveUpdate" @click="loadControle" 
                            v-b-modal.modalRegisterClassUser>Matricular</b-button>
                            <b-button variant="success" class="buttonSalvar mx-1"
                            v-b-popover.hover.top="'Clique para modificar ou atualizar o aluno'"
                            v-else @click="loadControle" 
                            v-b-modal.modalRegisterClassUser>Atualizar a Matrícula</b-button>
                            <b-button variant="outline-danger" class="buttonCancelar"
                            v-b-popover.hover.top="'Clique para Cancelar a Matrícula'" @click='cancelButton'>Cancelar</b-button>
                        </div>
                        <div>
                            <b-modal id="modalRegisterClassUser" title="Confirmação de Matrícula" @ok="registerClassUser">
                                Turma: {{userClass.idClass}} - {{selectTurma}}<br>
                                Aluno: {{userClass.idUser}} - {{selectUser}} 
                            </b-modal>
                        </div>
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios' 
import { userKey, baseApiUrl, showError} from '@/config/global'
export default {
    name: 'RegisterUserClasses',
    components: {PageTitle},
    data: function(){
        return {
            userClass: {},
            turmas: [],
            users: [],
            searchUser: '',
            search: '',
            anoMinino: 0,
            anoMaximo: 0,
            selectTurma: '',
            selectUser: '',
            controleButtonSaveUpdate: this.$route.params.id ? false : true,
            user: {},
            valorMaximoIdade: 0,
            valorMinimoIdade: 0,
            sportCenter: [],
            searchSportCenter: '',
            selectSportCenter: ''
        }
    },
    methods: {
        async loadUserSelect(){
            this.loadUser()
            const url = `${baseApiUrl}/users`
            await axios.get(url)
                .then(res=>{
                    this.users = res.data.data.filter(user=>{                        
                            return user.dataNasc.substring(6) > this.anoMinino && user.dataNasc.substring(6) < this.anoMaximo                        
                    })
                    .map(option=>{
                        return {value: option.id, text: (option.nome).toUpperCase()}
                    })
                })
                .catch(showError)
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
            this.user = userData
        },
        async loadClass(){
            this.loadUser()
            const url = `${baseApiUrl}/class`
            await axios.get(url)
                .then(res=>{
                    this.turmas = res.data.data
                    .filter(res=>{
                        if(this.user.tipoUsuario == 'user'){
                            return res
                        }else{
                            return res
                        }
                    })
                    .map(option=>{
                        return {value: option.id, text: (`${option.nomeModalidade} - ${option.dias} - ${option.horarios} -  ${option.centroEsportivo} | ${option.faixaEtaria}`).toUpperCase()}
                    })
                })
        },
        clicar(){
            var select = document.getElementById('teste')
            var option = select.children[select.selectedIndex]
            var texto = option.textContent
            var valor = ''
            var valorMaximo = 0
            var data = new Date()

            if(texto.toLowerCase() == 'acima de 60 anos' || texto.toLowerCase() == 'idoso'){
                valorMaximo = 60
                this.anoMinimo = data.getFullYear() - valorMaximo
                this.anoMaximo = 1900
                this.valorMinimoIdade = 60
            }else{
                valor = texto.substring(texto.indexOf("|") + 1)
                var valorMinino = valor.substring(0, valor.indexOf("À"))
                valorMaximo = valor.substring(valor.indexOf("À") + 1, valor.indexOf("A"))
                this.valorMaximoIdade = valorMaximo
                this.valorMinimoIdade = valorMinino
                this.anoMinino = data.getFullYear() - valorMaximo
                this.anoMaximo = data.getFullYear() - valorMinino
            }
            if(this.user.tipoUsuario == 'admin'){
                this.loadUserSelect()                
            }
        },
        async registerClassUser(){
            const url = `${baseApiUrl}/classUser`
            this.loadUser()
            const methods = this.$route.params.id ? 'put' : 'post'
            await axios[methods](url, this.userClass)
                    .then(()=>{
                        this.$toasted.success('O usuário matriculado com sucesso')
                        this.userClass = {}
                    })
                    .catch(showError)
        }, 
        loadControle(){
            var select = document.getElementById('teste')
            this.selectTurma = select.options[select.selectedIndex].text
            if(this.user.tipoUsuario == 'admin'){
                select = document.getElementById('userInput')
                this.selectUser = select.options[select.selectedIndex].text
            }else{
                this.selectUser = this.user.nome 
            }
        },
        cancelButton(){
            this.userClass = {}
            this.selectUser = ''
            this.selectTurma = ''
        },
        async loadSportCenter(){
            this.loadUser()
            const url = `${baseApiUrl}/sportCenter`
            await axios.get(url)
                    .then(res=>{this.sportCenter = res.data.data
                                    .map(option=>{
                                        return {value: option.id, text: (`${option.nome}`).toUpperCase()}})
                                    })
                   .catch(showError)
        },
       async clicarSportCenter(){
            var select = document.getElementById('CE')
           // this.turmas = []
            this.userClass.idUser = this.user.id
            this.selectSportCenter = select.options[select.selectedIndex].value
            const url = `${baseApiUrl}/sportCenterModality/${this.selectSportCenter}`
            this.loadUser()
            await axios.get(url)
                    .then(res=>{
                        this.turmas = res.data.data
                            .filter(option=>{
                                if(option.faixaEtaria == "Acima de 60 anos"){
                                    return option.faixaEtaria.substring(option.faixaEtaria.indexOf('de')+1, option.faixaEtaria.indexOf('anos')) < this.user.idade
                                }else{
                                    return option.faixaEtaria.substring(0, option.faixaEtaria.indexOf('À')) < this.user.idade &&
                                            option.faixaEtaria.substring(option.faixaEtaria.indexOf("À")+2, option.faixaEtaria.indexOf("ANOS"))                                    
                                }
                            })
                            .map(option=>{
                                return{value: option.classUser, text: (`${option.nomeModalidade} - ${option.dias} - ${option.horarios} | ${option.faixaEtaria}`).toUpperCase()}
                            })
                    })

        }
    },
   async mounted(){
        await this.loadUser()
        if(this.user.tipoUsuario == 'user'){
            this.loadSportCenter()
        }else{
            this.loadClass()        
        }
    },
    computed: {
        resultClass(){
            if(this.searchClass == '' || this.searchClass == ' '){
                return this.turmas
            }else{
               return this.turmas.filter(turma=>{
                   return   turma.text.match(this.search.toUpperCase())
                        
                })
               
            }
        },
        resultSportCenter(){
            if(this.searchSportCenter == '' || this.searchSportCenter == ' '){
                return this.sportCenter
            }else{
                return this.sportCenter.filter(sportCenter=>{
                    return sportCenter.text.match(this.searchSportCenter.toUpperCase())
                })
            }
        },
        resultUser(){
            if(this.searchUser == '' || this.searchUser == ' '){
                return this.users
            }else{
                return this.users.filter(user=>{
                    return user.text.match(this.searchUser.toUpperCase())
                })
            }
        },
        corDaLetra(){
            return this.userClass.activeClass == true ? 'verde' : 'vermelho'
        }
    }

}
</script>

<style>

.divButton{
    display: flex;
    justify-content: center;
    align-items: center;
}

.verde{
    color: green;
}

.vermelho{
    color: red;
}
</style>