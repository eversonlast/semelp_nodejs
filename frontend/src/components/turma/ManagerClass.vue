<template>
<div>
    <PageTitle main="Lista de Turma" sub="Gerenciar Turmas" icon="icofont-users"/>
    <div class='base'>
    <b-form-input type="text" id="turma" class="my-2" v-model="search" 
    placeholder="Por favor, digite a turma..."
    v-b-popover.hover.top="'Por favor, digite a turma.'"></b-form-input>
    <b-table striped hover :fields="fields"  :items="resultadoPesquisa" class="my-2"
    :per-page="perPage" :current-page="page" id="mytable">
        <template slot="cell(actions)" slot-scope="data" >
            <b-button variant="warning" @click="updateButton(data.item)" v-if="user.tipoUsuario == 'admin'" class="update-button my-1 ml-1"
            v-b-popover.hover.top="'Update'">
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="outline-danger" @click="loadClass(data.item)" class="ml-1"
            v-b-popover.hover.top="'Delete'" v-if="user.tipoUsuario == 'admin'"
            v-b-modal.remove>
                <i class="fa fa-trash "></i>
            </b-button>
            <b-button variant="success" @click="loadTurma(data.item)" class="ml-1"
            v-b-popover.hover.top="'Ver Turma'"
            >
                <i class="icofont-eye"></i>                
            </b-button>
        </template>
    </b-table>
    <b-pagination size="md" v-model="page" aria-controls="turma"
        :total-rows="turmas.count" :per-page="perPage" id="paginationManagerClass"/>
    <b-modal id="remove" title="Deletar de Cadastro" @ok="remove">
        <p>Você tem certeza que quer Deletar?</p>
        <p>{{turma.nomeModalidade}}</p>
        <p>{{turma.dias}} - {{turma.horarios}}</p>
        <p>{{turma.centroEsportivo}}</p>
    </b-modal>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { userKey, baseApiUrl } from '@/config/global'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ManagerClass',
    components: {PageTitle},
    data: function(){
        return{
            turmas: [],
            user: {},
            turma:{},
            limit: 0,
            perPage: 10,
            page: 1,
            fields:[
                {key: 'id', label: 'Código', sortable:true},
                {key: 'dias', label: 'Dias'},
                {key: 'horarios', label:'Horário'},
                {key: 'faixaEtaria', label: 'Faixa Etária'},
                {key: 'nomeProfessor', label: 'Nome do Professor'},
                {key: 'centroEsportivo', label: 'Centro Esportivo'},
                {key: 'nomeModalidade', label: 'Modalidade'},
                {key: 'maximoFaltasMes', label: 'Máximo de Faltas por Mês'},
                {key: 'numerosDeAlunos', label: 'Número de Alunos por Turma'},
                {key: 'actions', label: 'Ações'}
            ],
            search: ''
        }
    },
    methods: {
        async loadClasses(){
            this.loadUser()
            const url = `${baseApiUrl}/class?page=${this.page}`
            await axios.get(url)
                .then(res=>{
                    this.turmas = res.data.data
                    this.limit = res.data.limit
                    this.count = res.data.count
                })
        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
            this.user = userData
        },
        loadClass(turma){
            this.turma = {...turma}
        },
        updateButton(turma){
            this.turma = {...turma}
            this.$router.push({
                path: `/class/${turma.id}`
            })
        },
        async remove(){
            await axios.delete(`${baseApiUrl}/class/${this.turma.id}`)
                        .then(()=>{
                            this.$toasted.success('Deletado com sucesso')
                        })
            this.loadClasses()
            
        },
        loadTurma(turma){
            const nome = turma.nomeModalidade
            const local = turma.centroEsportivo
            const dias = turma.dias
            const horarios = turma.horarios
            this.$router.push({
                path: `/classByUsers/${turma.id}?nomeModalidade=${nome}&local=${local}&dias=${dias}&horarios=${horarios}`
            })
        }
    },
    mounted(){
        this.loadClasses()
        this.loadUser()
    },
    watch:{
        turmas(n,a){
            n = a
        }
    },
    computed:{
        resultadoPesquisa(){
            if(this.search == '' || this.search==' '){
                return this.turmas
            }else{
                return this.turmas.filter(turma=>{
                   return   turma.nomeModalidade.toUpperCase().match(this.search.toUpperCase()) ||
                            turma.nomeProfessor.toUpperCase().match(this.search.toUpperCase())  ||
                            turma.centroEsportivo.toUpperCase().match(this.search.toUpperCase()) ||
                            turma.dias.match(this.search) ||
                            turma.horarios.match(this.search) ||
                            turma.faixaEtaria.match(this.search)
                })
            }
        }
    }
}
</script>

<style>
    .listaTurma ul{
        list-style: none;
    }

    .base{
        background-color: white;
    }
</style>