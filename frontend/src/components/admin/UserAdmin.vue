<template>
    <div class="admin-user">
        <b-form-input id="type-text" type="text" v-model="search" placeholder="Buscar o nome ou CPF" class="my-2"></b-form-input>
          <b-table hover striped stacked="md" :items="resutaldoBusca" :fields="fields" class="table-responsive-md">
            <template slot="cell(actions)" slot-scope="data" class="acoes"> 
                <a href @click.prevent="update(data.item)">
                    <b-button variant="warning" class="mr-1">
                        <i class="fa fa-pencil" ></i>
                    </b-button>                      
                </a>                
                <b-button variant="danger" class="mr-1 mt-1" @click="loadUser(data.item)" v-b-modal.modal-3>
                    <i class="fa fa-trash"></i>
                </b-button>
                <b-button variant="outline-danger"  class="my-1" @click="loadUser(data.item)" v-b-modal.modal-changeUser v-if="getTypeUser.tipoUsuario == 'admin'" >
                    <i class="fa fa-id-badge"></i>
                </b-button>
            </template>
        </b-table>
        <div>
        <b-modal  id="modal-3"  title = "Deletar de Cadastro" @ok="remove">
            <p>Você tem certeza que quer deletar este cadastro?</p>
            <p>Nome: {{user.nome}}</p>
            <p>CPF: {{user.cpf}}</p>
        </b-modal>
        <b-modal  id="modal-changeUser"  title = "Deletar de Cadastro" @ok="changeTypeUser">
            <p>Você tem certeza que quer alterar este usuário?</p>
            <p>Nome: {{user.nome}}</p>
            <p>CPF: {{user.cpf}}</p>
            <b-form-select v-model="typeUser" :options="options" size="sm" class="mt-3"></b-form-select>
        </b-modal>
         <b-pagination size="md" v-model="page" 
            :total-rows="count" :per-page="limit"/>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/config/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function(){
        return{
            mode: 'save',
            search:'', 
            user:{},
            users: [],
            typeUser: {},
            bodyTypeUser: {},
            page: 1,
            count: 0,
            limit: 0,
            getTypeUser:{},
            fields: [
                { key: 'id', label:'Código', sortable: true},
                { key: 'nome', label:'Nome', sortable: true},
                { key:'mae', label: 'Mãe'},
                { key:'dataNasc', label:'Data de Nascimento'},
                { key:'tipoDocumento', label: 'Tipo de Documento'},
                { key:'documento', label: 'Documento'},
                { key: 'cpf', label: 'CPF'},
                { key:'bairro', label: 'Bairro'},
                { key: 'actions', label: 'Ações'}
            ],
            options:[
                { value: null, text: 'Por favor, escolhe uma opção.' },
                { value: 'admin', text: 'Administrador' },
                { value: 'prof', text: 'Professor' },
                { value: 'secre', text: 'Secretário' },
                { value: 'user', text: 'Usuário' }
            ]
        }
    },
    methods: {
        async loadUsers(){
        const json = localStorage.getItem(userKey)
        const userData = JSON.parse(json)
        await this.$store.commit('setUser', userData)
        const url = `${baseApiUrl}/users?page=${this.page}`
            axios.get(url).then(res=>{
                this.users = res.data.data
                this.limit = res.data.limit
                this.count = res.data.count
            })
        },
         loadUser(user){
            this.user = {...user}
        },
        remove(){
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            document.location.reload(true)
        },
        update(user){
            this.user = { ...user } 
            this.$router.push({
                path: `/user/${this.user.id}`
            })
        },
        changeTypeUser(){
            const url = `${baseApiUrl}/changeTypeUser`
            const id = this.getTypeUser.id
            this.bodyTypeUser = {
                "id": id,
                "tipoUsuario": this.typeUser,
                "cpf": this.user.cpf
            }
            axios.put(url, this.bodyTypeUser)
                .then(res=> {
                    this.$toasted.success(res.data)
                })
                .catch(showError)
        },
        async userType(){            
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
            this.getTypeUser = userData
        }
    },
    watch:{
        page(){
            this.loadUsers()
        }
    },
    mounted(){
        this.loadUsers()
        this.userType()
    }, 
    computed:{
        resutaldoBusca: function(){
           if(this.search== '' || this.search == ' '){
               return this.users
           }else{
               return this.users.filter(user=> user.cpf.match(this.search) || user.nome.match(this.search))
           }
        }
    }
}
</script>

<style>
    .acoes a{
        text-decoration: none;
        color: #000;
    }
    .admin-user{
        font-size:1rem;
    }
</style>