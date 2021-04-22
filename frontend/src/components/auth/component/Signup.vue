<template>    
    <b-form>
        <div class="login-card card">
            <input id="userId" type="hidden" v-model="user.id">
             <div class="card-header">
                        Dados de Identificação
            </div>                  
                <div class="card-body identificacao">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="cpf">CPF</label>
                            <input type="text" id="cpf" name="cpf"
                                class="form-control"
                                placeholder="Digite somente número, Ex.:999999999"
                                v-model="user.cpf"
                                maxlength="12" >
                        </div>   
                                                 
                        <div class="form-group col-md-2">
                            <label for="senha">Tipo de Documento</label>
                            <b-form-select v-model="user.tipoDocumento" :options="options"></b-form-select>
                        </div>      
                            
                        <div class="form-group col-md-4">
                            <label for="senha">RG</label>
                            <input type="text" id="rg" name="rg"
                                class="form-control"
                                placeholder="Digite a rg.." v-model="user.documento">
                        </div>
                    </div>
            </div>   
             <div class="card-header">
                        Dados de Segurança
            </div>                  
                <div class="card-body identificacao">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="cpf">Senha</label>
                            <input type="password" id="password" name="password"
                                class="form-control"
                                placeholder="Por favor, digite a senha " minlength="4"
                                v-model="user.password"
                                v-on:keyup="mudarInput"
                                @blur="goOutInput">
                                   
                        </div>    
                        <div class="form-group col-md-5">
                            <label for="senha">Confirmação de Senha</label>
                            <input type="password" id="confirmPassword" name="confirmPassword"
                                class="form-control"
                                placeholder="Digite a confirmação da senha"
                                v-model="user.confirmPassword" v-on:keyup="verificationPassword"
                                @blur="goOutInputConfirmPassword">
                        </div>
                        <div class="form-group col-md-1">
                            <div class="icone">
                                <i class="fa fa-check iconeYes" v-if="confirmPassword === 't'"></i>
                                <i class="fa fa-times-circle iconeNot" v-if="confirmPassword==='f'"></i>
                            </div>
                        </div>
                    </div>
            </div>   
                    <div class="card-header">
                        Dados Pessoais
                    </div>
                    <div class="card-body pessoais">
                        <div class="form-group">
                            <label for="cpf">Nome</label>
                            <input type="text" id="nome" name="nopme"
                                class="form-control "
                                placeholder="Digito o nome do usuário"
                                v-model="user.nome">
                         </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="mae">Mãe</label>
                                <input type="text" id="mae" name="mae"
                                    class="form-control "
                                    placeholder="Digite  o nome da mãe"
                                    v-model="user.mae">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="pai">Pai</label>
                                <input type="text" id="pai" name="pai"
                                    class="form-control"
                                    placeholder="Digite o nome do pai"
                                    v-model="user.pai">
                            </div>
                        </div>                        
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email"
                                class="form-control"
                                placeholder="Ex.: exemplo@exemplo.com"
                                v-model="user.email"
                                @blur="validationEmail">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="naturalidade">Cidade de Nascimento</label>
                                <input type="text" id="naturalidade" name="naturalidade"
                                    class="form-control "
                                    placeholder="Digite a sua cidade de nascimento" 
                                    v-model="user.naturalidade">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="senha">Estado</label>
                                <b-form-select v-model="user.estado" :options="estados"></b-form-select>
                            </div>
                         <div class="form-group col-md-4">
                                <label for="data_nasc">Data de Nascimento</label>    
                                <!-- <b-form-input v-model="user.dataNasc" type="date" id="text-date" placeholder="Enter your name"></b-form-input> -->
                                <!-- <DatePicker :language="ptBR" v-model="user.dataNasc" format="dd/MM/yyyy" :bootstrap-styling="true"/> -->
                                <b-form-datepicker id="dataNasc" locale="pt-BR" startDate='01/01/1990'
                                v-model="user.dataNasc" class="mb-2"
                                placeholder="Informe a data de Nascimento"
                                :date-format-options="{year: 'numeric', day:'numeric',month:'numeric' }" show-decade-nav></b-form-datepicker>
                        </div>
                        </div> 
                        <div class="form-group">
                            <label for="escola_trabalho">Escola ou Trabalho</label>
                            <input type="text" id="escola_trabalho" name="escola_trabalho"
                                class="form-control"
                                placeholder="Ex.: Digite por favor a escola ou local do trabalho."
                                v-model="user.escolaTrabalho">
                        </div>    
                        
                    </div>
                    <div class="card-header">
                        Dados para Endereço
                    </div>
                    <div class="card-body identificacao">
                        <div class="form-row">
                            <div class="form-group col-md-4 ml-0">
                                <label for="cep">CEP</label>
                                <input type="text" id="cep" name="cep"
                                    class="form-control "
                                    placeholder="Por favor Digite o nome da Rua."
                                    v-model="user.cep"
                                    @blur="buscarCep(user.cep)"
                                    >
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-9">
                                <label for="nome_rua">Nome da Rua</label>
                                <input type="text" id="nome_rua" name="nome_rua"
                                    class="form-control "
                                    placeholder="Por favor Digite o nome da Rua."
                                    v-model="cep.logradouro"
                                    :readonly="stateAddress" @blur="buscarCep(user.cep)">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="numeroCasa">Numero da Casa</label>
                                <input type="text" id="numeroCasa" name="numeroCasa"
                                    class="form-control"
                                    placeholder="Digite o número da casa"
                                    v-model="user.numeroCasa" @blur="buscarCep(user.cep)">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="bairro">Bairro</label>
                                <input type="text" id="cep" name="cep"
                                    class="form-control "
                                    placeholder="Por favor Digite o nome do Bairro."
                                    v-model="cep.bairro" :readonly="stateAddress"
                                    @blur="buscarCep(user.cep)"
                                    >
                            </div>
                            <div class="form-group col-md-4">
                                <label for="cidade">Cidade</label>
                                <input type="text" id="cidade" name="cidade"
                                    class="form-control"
                                    placeholder="Digite a Cidade."
                                    v-model="cep.localidade" :readonly="stateAddress" @blur="buscarCep(user.cep)">
                            </div>
                            <div class="form-group col-md-4">                                
                                <label for="senha">Estado(endereço)</label>
                                <b-form-select v-model="cep.uf" :options="estados" 
                                readonly @change="buscarCep(user.cep)" ></b-form-select>                        
                            </div>
                        </div>
                    </div>
                    <div class="card-header">
                        Dados para Comunicação
                    </div>
                    <div class="card-body identificacao">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="user.typePhone"  :options="typeTel" ></b-form-select>  
                            </div>
                            <div class="form-group col-md-3">
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="user.ddd" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="numeroTelefon">Numero</label>
                                <input type="text" id="numeroTelefone" name="numeroTelefone" formControlName="sGPTypeDeliveryId"
                                    class="form-control" pattern="[0-9]+$"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="user.numeroTelefone">
                            </div>
                            <div class="form-group col-md-1 botoes">
                                <b-button variant="secondary" v-if="stateTelephone1 === false" @click="addTelephone1">+</b-button>
                                <b-button variant="secondary" v-if="stateTelephone1" @click="addTelephone1">-</b-button>
                            </div>
                        </div>
                        <div class="form-row" v-if="stateTelephone1">
                            <div class="form-group col-md-4">
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="user.typePhone1" :options="typeTel"></b-form-select>  
                            </div>
                            <div class="form-group col-md-3">
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="user.ddd1" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="numeroTelefone1">Numero</label>
                                <input type="text" id="numeroTelefone1" name="numeroTelefone1" formControlName="sGPTypeDeliveryId"
                                    class="form-control" pattern="[0-9]+$"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="user.numeroTelefone1">
                            </div>
                            <div class="form-group col-md-1 botoes">
                                <b-button variant="secondary" v-if="stateTelephone2 === false" @click="addTelephone2">+</b-button>
                                <b-button variant="secondary" v-if="stateTelephone2" @click="addTelephone2">-</b-button>
                            </div>
                        </div>
                        <div class="form-row" v-if="stateTelephone2 & stateTelephone1">
                            <div class="form-group col-md-4">
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="user.typePhone2" :options="typeTel"></b-form-select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="user.ddd2" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="numeroTelefone2">Numero</label>
                                <input type="text" id="numeroTelefone2" name="numeroTelefone2" formControlName="sGPTypeDeliveryId"
                                    class="form-control" pattern="[0-9]+$"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="user.numeroTelefone2">
                            </div>
                        </div>
                    </div>
                    <div class="card-body button">                    
                        <b-button variant="primary" class="mr-2" @click="checkform" v-b-modal.modal-1>Salvar</b-button>
                        <b-button variant="outline-danger" class="ml-2" @click="reset">Cancelar</b-button>                  
                    </div>
                    <div>
                        <b-modal  id = "modal-1"  title = "Confirmação de Cadastro" @ok="signup" v-if="verification === true" isVisible> 
                            <p  class="my-0" >CPF: {{user.cpf}} - 
                                Tipo Documento: {{user.tipoDocumento}} - 
                                Documento: {{user.documento}}</p >
                            <p class="my-0">
                                Nome: {{user.nome}} - 
                                Mãe: {{user.mae}} 
                                </p> 
                            <p class="my-0">
                                Pai: {{user.pai}}
                            </p>
                            <p class="my-0">
                                E-mail: {{user.email}}
                            </p>
                            <p class="my-0">
                                Data de Nascimento: {{user.dataNasc}} - 
                                Naturalidade: {{user.naturalidade}} - 
                                 
                            </p>
                            <p class="my-0">
                                Estado de nascimento: {{user.estado}} -
                                Escola ou trabalho: {{user.escolaTrabalho}}
                            </p>
                            <p class="my-0">
                                Nome da Rua: {{user.nomeLogradouro}} - 
                                Numero da Casa: {{user.numeroCasa}}
                            </p>
                            <p class="my-0">
                                Bairro: {{user.bairro}} - 
                                Cidade: {{user.cidade}} -
                                Estado: {{user.estadoEndereco}}
                            </p>
                            <p class="my-0">
                                Telefones:
                            </p>
                            <p class="my-0">
                                Tipo de Telefone: {{user.typePhone}} - 
                                DDD: {{user.ddd}}
                                Telefone: {{user.numeroTelefone}}
                            </p>
                            <p class="my-0" v-if="user.ddd1">
                                Tipo de Telefone: {{user.typePhone1}} - 
                                DDD: {{user.ddd1}}
                                Telefone: {{user.numeroTelefone1}}
                            </p>
                            <p class="my-0" v-if="user.ddd2">
                                Tipo de Telefone: {{user.typePhone2}}
                                DDD: {{user.ddd2}}
                                Telefone: {{user.numeroTelefone2}}
                            </p>
                        </b-modal >
                    </div>
                    
        </div>
    </b-form>
            
         
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError, userKey} from '@/config/global'
import selectEstado from './json/selectEstados.json'
import ddd from './json/ddd.json'
import typeTelephone from './json/typeTelephone.json'
import typeDocument from './json/typeDocument.json'

import DatePicker from 'vuejs-datepicker'
// eslint-disable-next-line no-unused-vars
import { ptBR} from 'vuejs-datepicker/dist/locale'

export default {
    name: 'Signup',
    components: { DatePicker},
    data: function(){
        return {
            user: {},
            stateTelephone1: false,
            stateTelephone2: false,
            verification: true,
            options:[],
            estados:[],
            typeTel: [],
            ddd:[],
            confirmPassword: false, 
            cep: {},
            stateAddress: true,
            // eslint-disable-next-line no-undef
            ptBR: ptBR
        }
    },
    methods:{
        addTelephone1(){
            this.stateTelephone1 = !this.stateTelephone1
        },
        addTelephone2(){
            this.stateTelephone2 = !this.stateTelephone2
        },
    
        async signup(){
           await axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                })
                .catch(showError)
        }, 
        reset(){
            this.user={}
            this.$parent.state = 'L'
        },
        checkform: function(){
            if(!this.user.cpf){
                alert("O Campo de cpf está vazio")
                return this.verification = false
            }
              if(   this.user.cpf == "00000000000" || 
                    this.user.cpf == "11111111111" || 
                    this.user.cpf == "22222222222" || 
                    this.user.cpf == "33333333333" || 
                    this.user.cpf == "44444444444" || 
                    this.user.cpff == "55555555555" || 
                    this.user.cpf == "66666666666" || 
                    this.user.cpf == "77777777777" || 
                    this.user.cpf == "88888888888" || 
                    this.user.cpf == "99999999999"){
                alert("O campo CPF é inválido")
                return this.verification = false
            }
            if(!this.user.tipoDocumento){
                alert("Por favor, escolha uma opção do tipo de documento!")
                return this.verification = false
            }
            if(!this.user.documento){
                alert("Por favor, digite o documento!")
                return this.verification = false
            }
            if(!this.user.password){
                alert("Por favor, digite a senha!")
                return this.verification = false
            }
            if(!this.user.confirmPassword){
                alert("Por favor, digite a confirmação da senha")
                return this.verification = false
            }
            if(!this.user.nome){
                alert("Por favor, digite o nome!")
                return this.verification = false
            }
            if(!this.user.mae){
                alert("Por favor, digite o nome da mãe!")
                return this.verification = false
            }
            if(!this.user.email){
                alert("Por favor, digite um email!")
                return this.verification = false
            }

           

            return this.verification = true
        },
        mudarInput(){
            var senha = document.getElementById('password').value
            if(senha.length < 4){
                document.getElementById("password").style.borderColor = "red"
            }else{
                document.getElementById("password").style.borderColor = "rgba(126, 239, 104, 0.8)"
            }
        },
        goOutInput(){
            var senha = document.getElementById('password').value            
            if(senha.length < 4){
                this.$toasted.error('A senha tem que ter no mínimo 4 caracteres')
            }
            
        },
        goOutInputConfirmPassword(){
            var senha1 = document.getElementById('password').value
            var senha2 = document.getElementById('confirmPassword').value
            if(senha1 !== senha2){
                this.$toasted.error('As senhas não conferem')
            }
        },
        verificationPassword(){
            var senha1 = document.getElementById('password').value
            var senha2 = document.getElementById('confirmPassword').value
            if(senha1 == senha2){
                document.getElementById("confirmPassword").style.borderColor = "rgba(126, 239, 104, 0.8)"
                document.getElementById("password").style.borderColor = "rgba(126, 239, 104, 0.8)"
                return this.confirmPassword = 't'
            }else{
                document.getElementById("confirmPassword").style.borderColor = "red"
                document.getElementById("password").style.borderColor = "red"
                this.confirmPassword = 'f'
            }
            if(senha1.length == 0){
                return this.confirmPassword = 'n'
            }
        },
        validationEmail(){
            var usuario = document.getElementById('email').value
            usuario = usuario.substr(0, usuario.indexOf('@'))
           var dominio = document.getElementById('email').value
            dominio = dominio.substr(dominio.indexOf('@')+1, dominio.length)

            
            
           if ((usuario.length > 2) &&
                (dominio.length >=3) &&
                (usuario.search("@")==-1) &&
                (dominio.search("@")==-1) &&
                (usuario.search(" ")==-1) &&
                (dominio.search(" ")==-1) &&
                (dominio.search(".")!=-1) &&
                (dominio.indexOf(".") >=1)&&
                (dominio.lastIndexOf(".") < dominio.length - 1)) {
                document.getElementById('email').style.borderColor = "rgba(126, 239, 104, 0.8)"
            }else{
                document.getElementById("email").style.borderColor = "red"
                this.$toasted.error('Email inválido')
            }   
        },
       async buscarCep(cep){    
           this.loadUser()        
            await axios.get(`${baseApiUrl}/consultarCep?cep=${cep}`)
                .then(res => this.cep = res.data)

            
            if(this.cep.bairro){
                this.user.bairro = this.cep.bairro
            }else{
                this.stateAddress = false
                this.user.bairro = this.cep.bairro
            }

            if(this.cep.logradouro == ' '){
                this.stateAddress = false
                this.user.nomeLogradouro = this.cep.logradouro
            }else{
                this.user.nomeLogradouro = this.cep.logradouro
            }
            this.user.cidade = this.cep.localidade
            this.user.estadoEndereco = this.cep.uf
        },
        loadTypeDocument(){
            this.options = typeDocument.map(option=>{
                return { value: option.value, text: option.text}
            })
        },
        loadEstados(){
            this.estados = selectEstado.map(option=>{
                return { value: option.value, text: option.text}
            })
        },
        loadTipoTel(){
            this.typeTel = typeTelephone.map(option=>{
                return { value: option.value, text: option.text}
            })
        },
        loadDDD(){
            this.ddd = ddd.map(option=>{
                return { value: option.value, text: option.value}
            })
        },
         async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        }
    },
    mounted(){
        this.loadTypeDocument()
        this.loadEstados()
        this.loadTipoTel()
        this.loadDDD()
        this.stateAddress
    }
        
}
</script>

<style>
    .button{
        display:flex;
        align-self: center;
    }
    .botoes{
        align-self: flex-end;
    }
    .icone{
        display:flex;
        flex-wrap: wrap;
    }
    .icone i{
        position: absolute;
        left: 50%;
        top: 55%;        
        font-size: 1.4rem;
    }

    .iconeYes{
        color: green;
    }
    .iconeNot{
        color: red;
    }

    .password{
        border-color: red;
        background-color: rgba(0, 0, 0, 0.1);
    }
  
</style>