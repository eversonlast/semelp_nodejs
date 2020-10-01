<template>
 <div>
     <PageTitle icon="fa fa-refresh" main="Atualizar Cadastro" sub="Painel de Controle"/>
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
                                placeholder="Ex.:000.000.000-00"
                                v-model="user.cpf"
                                maxlength="12" 
                                readonly>
                                   
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
                                v-model="user.email">
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
                                <DatePicker :language="ptBR" v-model="user.dataNasc" :value="user.dataNasc" format="dd/MM/yyyy" :bootstrap-styling="true"/>
                                <!-- <b-form-datepicker id="dataNasc" locale="pt-BR" startDate='01/01/1990'
                                v-model="user.dataNasc" class="mb-2"
                                placeholder="Informe a data de Nascimento"
                                :date-format-options="{year: 'numeric', day:'numeric',month:'numeric' }"></b-form-datepicker>                         -->
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
                                    >
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-9">
                                <label for="nome_rua">Nome da Rua</label>
                                <input type="text" id="nome_rua" name="nome_rua"
                                    class="form-control "
                                    placeholder="Por favor Digite o nome da Rua."
                                    v-model="user.nomeLogradouro">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="numero">Numero da Casa</label>
                                <input type="text" id="numero" name="numero"
                                    class="form-control"
                                    placeholder="Digite o número da casa"
                                    v-model="user.numeroCasa">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="bairro">Bairro</label>
                                <input type="text" id="bairro" name="bairro"
                                    class="form-control "
                                    placeholder="Por favor Digite o nome do Bairro."
                                    v-model="user.bairro">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="cidade">Cidade</label>
                                <input type="text" id="cidade" name="cidade"
                                    class="form-control"
                                    placeholder="Digite a Cidade."
                                    v-model="user.cidade">
                            </div>
                            <div class="form-group col-md-4">                                
                                <label for="senha">Estado(endereço)</label>
                                <b-form-select v-model="user.estadoEndereco" :options="estados"></b-form-select>                        
                            </div>
                        </div>
                    </div>       <div class="card-header">
                        Dados para Comunicação
                    </div>
                    <div class="card-body identificacao">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="user.typePhone" :options="typeTel"></b-form-select>  
                            </div>
                            <div class="form-group col-md-3">
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="user.ddd" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="numero">Numero</label>
                                <input type="text" id="numero" name="numero"
                                    class="form-control"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="user.numeroTelefone">
                            </div>
                            <div class="form-group col-md-2 botoes">
                                <b-button variant="secondary" v-if="stateTelephone1 === false" @click="addTelephone1">+</b-button>
                                <b-button variant="secondary" v-if="stateTelephone1" @click="addTelephone1">-</b-button>                            
                            </div>

                        </div>
                        <div class="form-row" v-if="stateTelephone1 || user.ddd1">
                            <div class="form-group col-md-3" v-if="user.ddd1">
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="user.typePhone1" :options="typeTel"></b-form-select>  
                            </div>
                            <div class="form-group col-md-3" v-else>
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="telephone.typePhone" :options="typeTel"></b-form-select>  
                            </div>
                            <div class="form-group col-md-3" v-if="user.ddd1">
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="user.ddd1" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-3" v-else>
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="telephone.ddd" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-4" v-if="user.ddd1">
                                <label for="numero">Numero</label>
                                <input type="text" id="numero" name="numero"
                                    class="form-control"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="user.numeroTelefone1">
                            </div>
                            <div class="form-group col-md-4" v-else>
                                <label for="numero">Numero</label>
                                <input type="text" id="numero" name="numero"
                                    class="form-control"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="telephone.numeroTelefone">
                            </div>
                            <input type="hidden" id="idTelephone" v-model="telephone.id">
                            <div class="form-group col-md-2 botoes">
                                <b-button variant="secondary" v-if="stateTelephone2 === false" @click="addTelephone2">+</b-button>
                                <b-button variant="secondary" v-if="stateTelephone2" @click="addTelephone2">-</b-button>
                                <b-button variant="danger ml-1"  v-b-modal.modal-1 v-if="user.ddd1"><i class="fa fa-trash"></i></b-button>
                                <b-button variant="success ml-1"  v-b-modal.modal-2 v-else><i class="fa fa-check"></i></b-button>
                            </div>
                            <div>
                                <b-modal id="modal-1" title="Confirmação de deletar o telephone" @ok="deletedTelephone(user.idTel1)">
                                    Tem certeza que quer deletar o telephone: {{user.numeroTelefone1}}
                                </b-modal>
                            </div>
                            <div>
                                <b-modal id="modal-2" title="Confirmação de inserção de telephone" @ok="updateUser">
                                    Tem certeza que quer adicionar o telephone: {{telephone.numeroTelefone}}
                                </b-modal>
                            </div>
                        </div>
                        <div class="form-row" v-if="stateTelephone2 & stateTelephone1 || user.ddd2 ">
                            <div class="form-group col-md-3" v-if="user.ddd2">
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="user.typePhone2" :options="typeTel"></b-form-select>
                            </div>
                            <div class="form-group col-md-3" v-esle>
                                <label for="tipo">Tipo de telefone</label>
                                <b-form-select v-model="telephone.typePhone" :options="typeTel"></b-form-select>
                            </div>
                            <div class="form-group col-md-3" v-if="ddd2">
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="user.ddd2" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-3" v-else>
                                <label for="ddd">DDD</label>
                                <b-form-select v-model="telephone.ddd" :options="ddd"></b-form-select>
                            </div>
                            <div class="form-group col-md-4" v-if="user.ddd2">
                                <label for="numero">Numero</label>
                                <input type="text" id="numero" name="numero"
                                    class="form-control"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="user.numeroTelefone2">
                            </div>
                            <div class="form-group col-md-4" v-else>
                                <label for="numero">Numero</label>
                                <input type="text" id="numero" name="numero"
                                    class="form-control"
                                    placeholder="Digite um número de Telefone."
                                    required="required" v-model="telephone.numeroTelefone">
                            </div>
                             <div class="form-group col-md-2 botoes">
                                <b-button variant="danger ml-1" v-if="user.ddd2" v-b-modal.modal-4><i class="fa fa-trash"></i></b-button>
                                <b-button variant="success ml-1"  v-else v-b-modal.modal-2><i class="fa fa-check"></i></b-button>
                            </div>
                            <div>
                                <b-modal id="modal-4" title="Confirmação de deletar o telephone" @ok="deletedTelephone(user.idTel2)">
                                    Tem certeza que quer deletar o telephone: {{user.numeroTelefone}}
                                </b-modal>
                                 <div>
                                <b-modal id="modal-2" title="Confirmação de inserção de telephone" @ok="updateUser">
                                    Tem certeza que quer adicionar o telephone: {{telephone.numeroTelefone}}
                                </b-modal>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body button">                    
                        <b-button variant="primary" class="mr-2" @click="checkform" v-b-modal.modal-3>Salvar</b-button>
                        <b-button variant="outline-danger" class="ml-2" @click="reset">Cancelar</b-button>                  
                    </div>
                    <div>
                        <b-modal  id = "modal-3"  title = "Alteração de Cadastro" @ok="updateUser" v-if="verification" isVisible>
                            <p>Você tem certeza que fazer a Alteração!</p>
                        </b-modal>
                    </div>
        </div>
       
    </b-form>
 </div>                
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/config/global'
import PageTitle from './PageTitle'
import axios from 'axios'
import typeDocument from '../auth/component/json/typeDocument.json'
import typeTelephone from '../auth/component/json/typeTelephone.json'
import ddd from '../auth/component/json/ddd.json'
import selectEstado from '../auth/component/json/selectEstados.json'
import DatePicker from 'vuejs-datepicker'
// eslint-disable-next-line no-unused-vars
import { ptBR} from 'vuejs-datepicker/dist/locale'

export default {
    name: 'UserById',
    components: { PageTitle, DatePicker },
    data: function(){
        return {
            user: {},
            telephone: {},
            options: [],
            stateTelephone1: false,
            stateTelephone2: false,
            typeTel: [], 
            ddd:[], 
            estados: [],
            verification: true,
            // eslint-disable-next-line no-undef
            ptBR: ptBR
        }
    },
    methods:{
    async getUser(){
        const json = localStorage.getItem(userKey)
        const userData = JSON.parse(json)
        await this.$store.commit('setUser', userData)
        const url = `${baseApiUrl}/users/${this.user.id}`
        axios(url).then(res=> this.user = res.data)
    },
    async updateUser(){
        const urlPhone = `${baseApiUrl}/telephone`
        if(!this.user.ddd1 && this.stateTelephone1){
            this.telephone.idUserTelephone = this.user.id
            await axios.post(urlPhone, this.telephone)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            document.location.reload(true)
            this.telephone = {}
        }
        if(!this.user.ddd2 && this.stateTelephone2){
            this.telephone.idUserTelephone = this.user.id
            await axios.post(urlPhone, this.telephone)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            document.location.reload(true)
            this.telephone = {}
        }
        const id = this.user.id
        const url = `${baseApiUrl}/users/${id}`
        await axios.put(url, this.user)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.user
            })
            .catch(showError)
    },
    checkform: function(){
        
        if(!this.user.tipoDocumento){
            alert("Por favor, escolha uma opção do tipo de documento!")
            return this.verification = false
        }
        if(!this.user.documento){
            alert("Por favor, digite o documento!")
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
    deletedTelephone(phone){
        const id = phone
        const url = `${baseApiUrl}/telephone/${id}`
        axios.delete(url).then(()=>{
            this.$toasted.global.defaultSuccess()
            if(this.user.ddd2){
                this.stateTelephone2 = !this.stateTelephone2
            }else if(this.user.ddd1 && !this.user.ddd2){
                this.stateTelephone1 = !this.stateTelephone1
            }            
        })
        .catch(showError)
        document.location.reload(true)
        this.telephone = {}

    },
    addTelephone1(){
        this.stateTelephone1 = !this.stateTelephone1
    },
    addTelephone2(){
        this.stateTelephone2 = !this.stateTelephone2
    },
    checkPhone(){
        if(this.user.ddd1){
            this.stateTelephone1 = !this.stateTelephone1
        }
    },
    loadTypeDocument(){
        this.options = typeDocument.map(option=>{
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
    loadEstados(){
        this.estados = selectEstado.map(option=>{
            return { value: option.value, text: option.text}
        })
    }, 
    reset(){
        this.user
        this.$router.push({
            name: 'home'
        })
    }     
    
    },
    mounted(){
        this.user.id = this.$route.params.id
        this.loadTypeDocument()
        this.loadTipoTel()
        this.loadDDD()
        this.loadEstados()
        this.getUser()
        this.checkPhone()
    }
    
}
</script>

<style>

</style>