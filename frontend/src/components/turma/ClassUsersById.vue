<template>
<div>
    <PageTitle :main="nome" :sub="local" divisorMain="-" :dias="dias" divisorTurma="-" :horarios="horarios" icon="icofont-padding"/>
    <div class="base">
        <b-form-input type="text" placeholder="Digite o que deseja pesquisar..." id="pesquisaAluno"
        class="my-2" v-model="search"></b-form-input>
        <b-table striped hover :fields="fields" :items="resultadoPesquisa" class="my-2">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" class="my-1 ml-1"  v-b-popover.hover.top="'Editar'"> 
                    <i class="fa fa-pencil"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import PageTitle from '../template/PageTitle.vue'
import {userKey, baseApiUrl, showError} from '@/config/global'
export default {
    name: 'ClassUserById',
    components: { PageTitle },
    data: function(){
        return {
            classByUsers: [],
            limit: 0,
            count: 0,
            nome: this.$route.query.nomeModalidade,
            local: this.$route.query.local,
            dias: this.$route.query.dias,
            horarios: this.$route.query.horarios,
            search: '',
            fields: [
                {key:"idUser", label: "Código do Aluno", sortable: true},
                {key: 'nome', label: 'Nome do Aluno', sortable: true},
                {key: 'quantidadesDeFalta', label: 'Quantidades de Falta'},
                {key: 'activeClass', label: 'Situação do Aluno'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods:{
        async loadAllTurma(){
            this.loadUser()
            const id = this.$route.params.id
            const url = `${baseApiUrl}/classUser/${id}` 
            await axios.get(url)
                    .then(res=> {
                        for(var ativoOrDesativo in res.data.data){
                            if(res.data.data[ativoOrDesativo].activeClass){
                                res.data.data[ativoOrDesativo].activeClass = 'Ativo'
                            }else{
                                res.data.data[ativoOrDesativo].activeClass = 'Desativo'
                            }
                        }
                        this.classByUsers = res.data.data
                        this.limit = res.data.limit
                        this.count = res.data.count

                    })
                    .catch(showError)
                    
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        }
    },
    mounted(){
        this.loadAllTurma()
    },
    computed:{
        resultadoPesquisa(){
            if(this.search=='' || this.search == ' '){
                return this.classByUsers
            }else{
                return this.classByUsers.filter(classByUser=>{
                    return classByUser.nome.match(this.search)
                })
            }
        }
    }

}
</script>

<style>

</style>