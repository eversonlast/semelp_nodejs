<template>
  <div>
        <PageTitle main="Carregar o foto do perfil." sub="Esta foto será usada para identificação do aluno" icon="fa fa-camera"/>
        <b-form>
            <div class="login-card card">
                <div class="card-header">
                    Upload da Foto para o perfil
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="pathMedicalExam">Anexar foto no perfil</label>
                            <br>
                            <input type="file"  @change="onChange" name="file" id="file" ref="files">
                            <div id="preview">
                                <img v-if="item.imageUrl" :src="item.imageUrl" width="250" height="200"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="card-body buttonUpload">
                    <b-button variant="success" class="mr-2" v-b-popover.hover.top="'Clique para enviar a foto'"
                    @click="sendPhoto">Enviar</b-button>
                    <b-button variant="outline-danger" class="mx-2" v-b-popover.hover.top="'Clique para cancelar'">Cancelar</b-button>
                </div>
            </div>
        </b-form>

  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { mapState} from 'vuex'
import {baseApiUrl, userKey, showError} from '@/config/global'
import axios from 'axios'
export default {
    name: "UploadPhoto", 
    components: {PageTitle},
    data: function(){
        return{
            item:{
                image: null,
                imageUrl: null
            },
            inputFile: '',
            userPhoto: {}
        }
    },
    computed: mapState(['user']),
    methods:{
        async onChange(e){
            const file = e.target.files[0]
            this.image = file
            this.item.imageUrl = URL.createObjectURL(file)
            this.inputFile = e.target
        },
        async sendPhoto(){
            this.loadUser()
            const form = new FormData()
            const idByFile = `${this.user.id}.jpg`

            form.append(this.inputFile.name, this.inputFile.files[0], `${idByFile}`)
            const url = `${baseApiUrl}/uploadPhoto`
            await axios.post(url, form,{
                headers: {
                     "Content-Type": `multipart/form-data; boundary=${form._boundary}`
                }
            })
            .then(()=>{
                this.$toasted.success("Arquivo enviado com sucesso.")
            })
            .catch(showError)
            
            const id = this.user.id
            const urlUser = `${baseApiUrl}/usersPhoto/${id}`
            this.userPhoto.pathPhoto = `/img/fotosUsers/${idByFile}`
            await axios.put(urlUser, this.userPhoto)
                        .then(()=>{
                            this.userPhoto = {}
                            this.item.imagem = null
                            this.item.imageUrl = null
                        })
                        .catch(showError)

        },
        async loadUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)    
        },
    }

}
</script>

<style>
    .buttonUpload{
        display: flex;
        flex: 1;
        justify-content: center;
    }
</style>