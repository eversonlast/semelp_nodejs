<template>
    <b-form>
        <div class="login-card card">
             <div class="card-header">
                    Trocar Senha
            </div>                  
            <div class="card-body identificacao">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="passwrod">Nova Senha</label>
                        <input type="password" id="password" name="password"
                            class="form-control"
                            placeholder="Digite a nova senha."
                            v-model="usuario.password"
                            v-on:keyup="mudarInput"
                            @blur="goOutInput">
                    </div> 
                    <div class="form-group col-md-5">
                        <label for="confirmPassword">Confirmar Senha</label>
                        <input type="password" id="confirmPassword" name="confirmPassword"
                            class="form-control"
                            placeholder="Digite a confirmação da senha." 
                            v-model="usuario.confirmPassword"
                            v-on:keyup="verificafionPassword"
                            @blur="goOutInputConfirmPassword">
                    </div>
                    <div class="form-group col-md-1">
                        <div class="icone">
                            <i class="fa fa-check iconeYes" v-if="confirmPassword==='t'"></i>
                            <i class="fa fa-times-circle iconeNot" v-if="confirmPassword==='f'"></i>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="card-body buttonForgotUser">
                <b-button variant="primary" class=mr-2 @click="changePassword" :disabled="disableButton">Alterar Senha</b-button>
                <b-button variant="outline-danger" class="ml-2" @click="buttonCancel" >Cancel</b-button>
            </div>
            </div>
    </b-form>
    
</template>

<script>
import { baseApiUrl, showError, userKey} from '@/config/global'
import axios from 'axios'
export default {
    name: 'ForgotPasswordAuth',
    data: function(){
        return {
            usuario:{},
            confirmPassword: 'n',
            disableButton: true
        }
    },
    methods: {
        async changePassword(){        
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)  
            const id = this.$route.params.id
            const url = `${baseApiUrl}/resetPassword/${id}`
            axios.put(url, this.usuario)
                .then(()=> {
                    this.$toasted.success('Senha alterada com sucesso')
                    this.usuario= {}
                })
                .catch(showError)

        },
        buttonCancel(){
            this.user = {}
            this.$router.push({
               name:'home'
            })
            
        },
        mudarInput(){
            var senha = document.getElementById('password').value
            if(senha.length < 4){
                document.getElementById("password").style.borderColor = "red"
                this.disableButton = true
            }else{
                document.getElementById("password").style.borderColor = "rgba(126, 239, 104, 0.8)"
                this.disableButton = false
            }
        },
        goOutInput(){
            var senha = document.getElementById('password').value
            if(senha.length < 4){
                this.$toasted.error('A senha tem que ter no mínimo de 4 caracteres.')
                this.disableButton = true
            }
        },
        goOutInputConfirmPassword(){
            var senha1 = document.getElementById('password').value
            var senha2 = document.getElementById('confirmPassword').value
            if(senha1 !== senha2){
                this.$toasted.error('As senhas não conferem')
            }
        },
        verificafionPassword(){
            // eslint-disable-next-line no-unused-vars
            var senha1 = document.getElementById('password').value
            // eslint-disable-next-line no-unused-vars
            var senha2 = document.getElementById('confirmPassword').value

            if(senha1 == senha2){
                document.getElementById('confirmPassword').style.borderColor = 'rgba(126, 239, 104, 0.8)'
                document.getElementById('password').style.borderColor = 'rgba(126, 239, 104, 0.8)'
                this.confirmPassword = 't'
                this.disableButton = false
            }else{
                document.getElementById("confirmPassword").style.borderColor = "red"
                document.getElementById("password").style.borderColor = "red"
                this.confirmPassword = 'f'
            }
            if(senha1.length == 0){
                this.confirmPassword = 'n'
                this.disableButton = true
            }
        }
    }
}
</script>

<style>
    .buttonForgotUser{
        display: flex;
        justify-content: center;
    }
</style>