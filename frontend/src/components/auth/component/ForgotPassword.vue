<template>
    <b-form>
        <div class="body">
            <div class="forgot-content">
                <div class="forgot-header">
                    <span>
                        <i class="icofont-runner-alt-1 mr-2 text-danger"></i>
                        <span class="font-weight-bold mr-1 text-danger">Por Favor,  </span>
                        <span class="font-weight-bold font-italic text-success">Digite o CPF</span>
                        <i class="icofont-swimmer ml-2 text-success"></i>
                    </span>
                </div>    
                <hr>              
                <div class="card-body identificacao-forgot" >
                        <div class="form-row" v-if="tela === 'G'">
                            <div class="form-group col-md-6">
                                <label for="cpf">CPF</label>
                                <input type="text" id="cpf" name="cpf"
                                    class="form-control"
                                    placeholder="Digite somente número, Ex.:999999999"
                                    v-model="user.cpf"
                                    maxlength="12" >
                                        
                            </div>  
                        </div> 
                        <div class="form-row" v-if="tela === 'C'">
                            <div class="form-group col-md-6">
                                <label for="cpf">Código</label>
                                <input type="text" id="cpf" name="cpf"
                                    class="form-control"
                                    placeholder="Digite o código que recebeu pelo email."
                                    v-model="user.token" >
                                        
                            </div>  
                        </div> 
                        <div class="form-row" v-if="tela === 'C'">
                            <div class="form-group col-md-6">
                                <label for="senha">Nova Senha</label>
                                <input type="password" id="senha" name="senha"
                                    class="form-control"
                                    placeholder="Digite a nova senha."
                                    v-model="user.password" >
                                        
                            </div>  
                        </div> 
                        <div class="form-row" v-if="tela === 'C'">
                            <div class="form-group col-md-6">
                                <label for="confirmarSenha">Confirmar Senha</label>
                                <input type="password" id="confirmarSenha" name="confirmarSemnha"
                                    class="form-control"
                                    placeholder="Confirmação da Senha."
                                    v-model="user.confirmPassword" >
                                        
                            </div>  
                        </div> 
                </div> 
            <div class="forgot-button">
                <b-button class="button mr-2" variant="primary" @click="forgotPassword" v-b-modal.modal-forgotPassword v-if="tela === 'G'">Gerar Código</b-button>
                <b-button class="button mr-2" variant="primary" @click="resetPassword" v-if="tela === 'C'">Enviar</b-button>
                <b-button class="button" variant="outline-danger" @click="reset" v-if="tela === 'G'">Cancelar</b-button>
                <b-button class="button" variant="outline-danger" @click="voltarTela" v-if="tela === 'C'">Voltar</b-button>
            </div>
            <div v-if="tela === 'G'">
                <b-button class="button mx-2 mt-2" variant="info" @click="token">Já tenho o Código</b-button>
            </div>
            <div>
                <b-modal id="modal-forgotPassword" title="Envio de Email" @ok="limparUser" >
                    <p v-if="verification">
                        Foi enviado um email para: {{user}}
                    </p>
                    <p v-else> {{user}}</p>
                </b-modal>
            </div>
            </div>  
        </div>
    </b-form>
</template>

<script>
import { baseApiUrl, showError } from '@/config/global'
import axios from 'axios'
export default {
    name: 'ForgotPassword',
    data: function(){
        return{
            user: {}, 
            verification: true,
            tela: "G",
        }
    },
    methods:{
        reset(){
            this.user = {}
            this.$parent.state = 'L'
        },
        forgotPassword(){
            const url = `${baseApiUrl}/forgotPassword`
            axios.post(url, this.user)
                .then(res=> {
                    this.verification = true
                    this.user = res.data
                })
                .catch(error=>{
                    this.verification = false
                    this.user = error.response.data
                })
        },
        resetPassword(){
            const url = `${baseApiUrl}/resetPassword`
            axios.put(url, this.user)
                .then(res=>{
                    this.$toasted.success(res.data)
                    this.user = {}
                })
                .catch(showError)
            
        },
        limparUser(){
            this.user = {}
        },
        token(){
            this.tela = 'C'
        },
        voltarTela(){
            this.tela = 'G'
        }

    }
}
</script>

<style>

.body{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.forgot-content{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
    background-color: #FFF;
}

.identificacao-forgot{
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.identificacao-forgot input{
    width: 300px;
    border: 1px solid #BBB;
    margin-bottom: 15px;
    outline: none;

}

.forgot-header{
    display: flex;
    width: 400px;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 1.2rem;
}

.forgot-button{
    display: flex;
    margin-top: 0px;
}

.forgot-content hr{
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, .75),
        rgba(120, 120, 120, 0)
    );
}

</style>