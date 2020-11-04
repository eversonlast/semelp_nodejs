<template>
  <div>
      <PageTitle :main="sportCenter.nome" sub="Gerenciar Centro Esportivo" icon="icofont-architecture-alt"/>
      <div class="sportCenter-button my-2">
          <b-button variant="warning" class="mr-2" @click="editButton">Editar</b-button>
          <b-button variant="danger" v-b-modal.modalDelete>Deletar</b-button>
      </div>
      <RegisterSportCenter v-if="state"/>
      <div>
          <b-modal id="modalDelete" title="Deletar Centro Esportivo" @ok="deletedSportCenter">
              Tem certeza que quer Deletar? <br>
              {{sportCenter.nome}}
          </b-modal>
      </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey, showError } from '@/config/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import RegisterSportCenter from './RegisterSportCenter'

export default {
    name: 'ManagerSportCenter',
    components:{PageTitle, RegisterSportCenter},
    data: function(){
        return{
            idSportParams: this.$route.params.id,
            sportCenter: {},
            state: false
        }
    },
    methods:{
        deletedSportCenter(){
            this.loadUserKey()
            const url = `${baseApiUrl}/sportCenter/${this.idSportParams}`
            axios.delete(url)
                .then(()=> { 
                    this.$toasted.success('Deletado com sucesso')
                    this.$router.push({name: 'sportCenterList'})
                    })
                .catch(showError)
        },
        async loadUserKey(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData) 
        },
        async loadSportCenter(){
            this.loadUserKey()
            const url = `${baseApiUrl}/sportCenter/${this.idSportParams}`
            await axios.get(url)
                .then(res=> this.sportCenter = res.data)
        },
        editButton(){
            this.state = !this.state
        }
    },
    mounted(){
        this.loadSportCenter()
    }
}
</script>

<style>

</style>