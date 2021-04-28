<template>
<div>
    <PageTitle main="Atestado Médico" icon="icofont-medical-sign"/>
    <b-form>
        <div class="login-card card">
            <input type="hidden" id="medcialExam" v-model="medicalExam.id" />
            <div class="card-header">
                Dados para Cadastramento de Exames Médicos
            </div>
            <div class="card-body cadastro">
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <input type="text" class="form-control"
                        placeholder="Por favor, Digite aqui o nome do usuário."
                        v-b-popover.hover.top="'Por favor, Digite o nome do usuário.'"
                        v-model="searchUser"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="userLists">Lista de Usuário</label>
                        <b-form-select id="userLists"
                        v-b-popover.hover.top="'Por favor, Escolha um usuário.'"
                        :select-size="4" :options="resultUser" v-model="medicalExam.idUser" 
                        v-on:change="loadSelectUser"></b-form-select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="dtMonth">Data do Exame Médico</label>
                        <b-form-datepicker id="dtMonth" locale="pt-BR" startDate="01/01/2020"
                        placeholder="Por favor, escolha uma data de exame." v-b-popover.hover.top="'Escolha uma data.'"
                        v-model="medicalExam.examMonth" ></b-form-datepicker>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="pathMedicalExam">Anexar Exame Médico</label>
                        <br>
                        <input type="file"  @change="onChange" name="file" id="file" ref="files">
                        <div id="preview">
                            <img v-if="item.imageUrl" :src="item.imageUrl" width="250" height="200"/>
                        </div>

                    </div>
                </div>
            </div>
            <div class="card-body button">
                <b-button variant="primary" class="mr-2" v-b-popover.hover.top="'Clique para salvar.'"
                v-b-modal.modalRegisterMedicalExam v-on:click="validateExam">Salvar</b-button>
                <b-button variant="outline-danger" v-b-popover.hover.top="'Clique para cancelar.'">Cancelar</b-button>
            </div>
            <div>
                <b-modal id="modalRegisterMedicalExam" title="Verificação de Dados." @ok="saveMedicalExam"> 
                    Usuário= {{medicalExam.idUser}} - {{nameUser}}<br>
                    Data do exame = {{medicalExam.examMonth}} <br>
                    Data da Validade = {{showDataValidate}}
                </b-modal>
            </div>
        </div>
    </b-form>
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import {baseApiUrl, showError, userKey} from '@/config/global'
import axios from 'axios'

export default {

    name: "MedicalExam",
    components: {PageTitle},
    data: function(){
        return {
            medicalExam: {},
            usuario: [],
            searchUser: '',
            showDataValidate: '',
            nameUser: '',
            item:{
                image: null,
                imageUrl: null                
            },
            inputFile: ''
        }
    },
    methods:{
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)    
        },
        async loadUsuario(){
            this.loadUser()
            const url = `${baseApiUrl}/users`
            await axios.get(url)
                    .then(res=>this.usuario = res.data.data.map(option=>{
                        return {value: option.id, text: (`${option.nome} - ${option.cpf}`).toUpperCase()}
                    }))
                    .catch(showError)
        },
        async saveMedicalExam(){
            this.loadUser()
            const id = this.$route.params.id ? `/${this.$route.params.id}` : ' '
            const url = `${baseApiUrl}/medicalExam${id}`
            await this.sendFile()
           // if(id){
               // await axios.get(url)
               //     .then(res=>{
               //         this.medicalExam = res.data
              //      })
                 //   .catch(showError)
      //      }
                const methods = this.$route.params.id ? 'put' : 'post' 
                await axios[methods](url, this.medicalExam)
                        .then(()=>{
                            this.$toasted.success('Cadastrado com sucesso.')
                            this.medicalExam = {}
                            this.item.image= null
                            this.item.imageUrl = null
                        })
                        .catch(showError)
        },
        validateExam(){
            const dataValidade = (this.medicalExam.examMonth).split("-")
            this.showDataValidate = new Date(parseInt(dataValidade[0])+1, parseInt(dataValidade[1]), parseInt(dataValidade[2]))
            this.showDataValidate = `${this.showDataValidate.getDate()}/${this.showDataValidate.getMonth()}/${this.showDataValidate.getFullYear()} `
           // this.medicalExam.validadeExam = this.showDataValidate
           // console.log(new Date(this.medicalExam.validadeExam))
        },
        loadSelectUser(){
            var selectNameUser = document.getElementById('userLists')
            this.nameUser = selectNameUser.options[selectNameUser.selectedIndex].text
        },
        async onChange(e){
            const file = e.target.files[0]
            this.image = file
            this.item.imageUrl = URL.createObjectURL(file)
            this.inputFile = e.target
            
        },
        async sendFile(){
            this.loadUser()
            const formData = new FormData()
            var selectIdUser = document.getElementById('userLists')
            var test = selectIdUser.options[selectIdUser.selectedIndex].value
            var dataAtual = new Date()
            var dia = dataAtual.getDate()
            var mes = dataAtual.getMonth()
            var ano = dataAtual.getFullYear()
            var nome = `${test}-${dia}-${mes}-${ano}.jpg`
            formData.append(this.inputFile.name, this.inputFile.files[0], `${nome}`)
            const estaUrl = `${baseApiUrl}/upload`
            await axios.post(estaUrl, formData,{
               headers:{
                   "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
               }
           })
           .then(()=> {
               this.$toasted.success("Arquivo enviado com sucesso")
               this.medicalExam.pathMedicalExam = `/${ano}/upload/atestado/${nome}`
               })
            .catch(showError)
        },
        
    },
    mounted(){
        this.loadUsuario()
    },
    computed:{
        resultUser(){
            if(this.searchUser == '' || this.searchUser== ' '){
                return this.usuario
            }else{
                return this.usuario.filter(user=>{
                    return user.text.match(this.searchUser.toUpperCase())
                })
            }
        }
    }

}
</script>

<style>

</style>