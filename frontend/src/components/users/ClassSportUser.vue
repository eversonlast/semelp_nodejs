<template>
  <div>
    <PageTitle main="Modalidades para Escolha" icon="icofont-baseball"/>
    <div class="container-fluid">
        <div class="row mt-5">
            <div v-for="sportCenter in sportCenter" :key="sportCenter.id" class="col-12 col-lg-6 cart mt-4">
                <div class="col-12 col-6 ponteiro" v-on:click="pegarValor(sportCenter.id, sportCenter.nomeModalidade, sportCenter.dias, sportCenter.horarios)" v-b-modal.modalMatricula>
                    <div class="row d-flex justify-content-center" >
                        <span>{{sportCenter.nomeModalidade +" - "+sportCenter.dias+' - '+sportCenter.horarios}}</span>
                    </div>
                    <div class="row d-flex justify-content-center mt-2">
                        <i class="icofont-swimmer"></i>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <div>
        <b-modal id="modalMatricula" title="Confirmação de Matrícula" @ok="fazerMatricula" v-if="classModal">
            Modalidade: {{modalidadeChoose}} <br/>
            Dias: {{dias}} <br />
            Horarios: {{horarios}}
        </b-modal>
        <b-modal id="modalMatricula" title="Lista de Espera" v-if="classWait">
            A turma está cheia, com isso o seu nome irá para a Lista de Espera <br />
            Modalidade: {{modalidadeChoose}}<br/>
            Dias: {{dias}} <br />
            Horarios: {{horarios}}
        </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userKey, baseApiUrl, showError } from '../../config/global';
import PageTitle from '../template/PageTitle'
export default {
    name: 'ClassSportuser',
    components: {PageTitle},
    data: function(){
        return{
            sportCenter: {},
            modalidadeChoose: '',
            dias: '',
            horarios: '',
            idade: 0,
            idClass: 0,
            countUserClass: 0,
            numberClassUser: 0,
            registerClass: {},
            idUser: 0,
            classModal: true,
            classWait: true
        }
    },
    methods: {
        async loadUser(){
            const json = localStorage.getItem(userKey)
            this.idade = localStorage.getItem('idade')
            const userData = JSON.parse(json)
            this.idUser=userData.id;
            await this.$store.commit('setUser', userData)
            this.user = userData
        },
        async loadSportClass(){
            this.loadUser();
            const url = `${baseApiUrl}/classSport/${this.$route.params.id}`
            await axios.get(url)
                .then(res=>{
                    this.sportCenter = res.data.data.filter(classBySport=>{
                        if(this.idade > 60 ){
                            return classBySport.faixaEtaria.includes('60');
                        }else{
                            let valorMinino = classBySport.idadeMinima;
                            let valorMaximo = classBySport.idadeMaxima;
                            return parseInt(this.idade) >= parseInt(valorMinino) && parseInt(this.idade) <= parseInt(valorMaximo);
                        }  
                    })
                })
                .catch(showError)
        },
        async pegarValor(idClass, modalidade, dias, horarios){
            this.modalidadeChoose = modalidade
            this.dias = dias;
            this.horarios = horarios;
            this.idClass = idClass
            const urlCountUser = `${baseApiUrl}/countUser/${this.idClass}`;
            const numberClass = `${baseApiUrl}/numberClass/${this.idClass}`;
            await axios.get(urlCountUser)
                .then(res=>this.countUserClass = res.data)
                .catch(showError)
            
            await axios.get(numberClass)
                .then(res=>this.numberClassUser = res.data)
                .catch(showError)

            this.classModal =  this.countUserClass < this.numberClassUser ? true : false;
            this.classWait =  this.countUserClass >= this.numberClassUser ? true : false;
        },
        async fazerMatricula(){
            this.loadUser();
            const urlSave = `${baseApiUrl}/classUser`            
            const urlWaitingList = `${baseApiUrl}/waitingList`            
            
            this.registerClass.idClass = this.idClass;
            this.registerClass.idUser = this.idUser;

            // this.countUserClass >= this.numberClassUser
            if(this.countUserClass >= this.numberClassUser){
                await axios.post(urlWaitingList, this.registerClass)
                    .then(()=>{
                        this.$toasted.success('Não tem vaga nesta turma, o seu nome está na lista de espera!');
                        this.registerClass = {};
                    })
                    .catch(showError)
            }else{
                this.registerClass.activeClass = true;
                await axios.post(urlSave, this.registerClass)
                    .then(()=>{
                        this.$toasted.success('Matrículado com sucesso')
                        this.registerClass = {}
                    })
                    .catch(showError)
            }
        }
    },
    mounted(){
        this.loadSportClass();
    }
}
</script>
<style>
    .ponteiro{
        cursor: pointer;
    }
</style>