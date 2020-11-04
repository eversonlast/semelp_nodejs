<template>
  <div>
      <PageTitle :main="modality.nomeModalidade"  sub="Gerenciar Modalidade" icon="icofont-architecture-alt"/>
      <div class="button-modality my-2">
          <b-button variant="warning" @click="editButton">Editar</b-button>
          <b-button variant="danger" class="ml-2" v-b-modal.DeleteModality>Deletar</b-button>
      </div>
      <RegisterModality  v-if="state"/> 
      <div>
          <b-modal id="DeleteModality" title="Deletar a Modalidade" @ok="deletedModality">
              Tem Certeza que quer Deletar? <br>
              A modalidade {{modality.nomeModalidade}}
          </b-modal>
      </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import RegisterModality from './RegisterModalities'
import axios from 'axios'
import {baseApiUrl, userKey, showError } from '@/config/global'
export default {
    name: 'ManagerModality',
    components: {PageTitle, RegisterModality},
    data: function(){
        return{
            state: false,
            modality: {},
            idModality: this.$route.params.id
        }
    },
    methods:{
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
        },
        async loadModality(){
            this.loadUser()
                const url = `${baseApiUrl}/modality/${this.idModality}`
                await axios.get(url)
                    .then(res=>{
                        this.modality = res.data
            })
        },
        editButton(){
            this.state =!this.state
        },
        async deletedModality(){
            this.loadUser()
            const url = `${baseApiUrl}/modality/${this.idModality}`
            await axios.delete(url)
                .then(()=>{
                    this.$toasted.error('Deletado com sucesso!')
                    this.$router.push({
                        name: 'modalityList'
                    })
                })
                .catch(showError)
        }
    },
    mounted(){
        this.loadModality()
    }
}
</script>

<style>

</style>