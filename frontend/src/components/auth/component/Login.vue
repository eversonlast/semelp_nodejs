<template>
    <!-- <div class="login-content">        
        <div class="card-header">
            <i class="icofont-runner-alt-1 mr-2 text-danger"></i>
            <span class="font-weight-light mr-1 text-danger">LOGIN </span>
            <span class="font-weight-bold font-italic text-success">SEMELP</span>
            <i class="icofont-swimmer ml-2 text-success"></i>
        </div>
        <div class="card-body">
            <input type="text" v-model="user.cpf" name="cpf" placeholder="CPF">
            <input type="password" v-model="user.password" name="password" placeholder="Senha">    
        </div>    
    </div> -->
    <div class="auth-content">
        <div class="auth-modal">
            <div class="auth-title" >
                <span>
                    <i class="icofont-runner-alt-1 mr-2 text-danger"></i>
                    <span class="font-weight-light mr-1 text-danger">LOGIN </span>
                    <span class="font-weight-bold font-italic text-success">SEMELP</span>
                    <i class="icofont-swimmer ml-2 text-success"></i>

                </span>
                
            </div>
            <hr>
            <div class="div-spinner" v-show="showLoad">
                <b-spinner variant="primary" label="Text Centered" class="spinner"></b-spinner>
            </div>
            
            <input v-model="user.cpf" type="text" name="cpf" placeholder="Por favor, digite o CPF.">
            <input v-model="user.password" type="password" name="password" placeholder="Senha" v-on:keyup.enter="signin">
           
            <div class="div-botao">
              <!--

                  <b-button variant="primary" class="button mr-2" @click="signin">Entrar</b-button>
              --> 
                <button class="button mr-2" @click="signin">Entrar</button>
                <b-button variant="outline-info ml-2" @click="forgotPassword">Esqueci à Senha</b-button>
            </div>
            <div class="footer-link" >
                <a href @click.prevent="changeView">
                    <span >Não tem Cadastro? Registre-se aqui!</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { baseApiUrl, showError, userKey} from '@/config/global'

export default {
    name: 'Login',
    data: function(){
        return{
            user:{},
            showLoad: false
        }
    },
    methods:{
        async signin(){
            try{
                this.showLoad=true
                await axios.post(`${baseApiUrl}/signin`, this.user)
                    .then(res=>{
                        this.$store.commit('setUser', res.data)
                        localStorage.setItem(userKey, JSON.stringify(res.data))
                        localStorage.setItem('tipoUsuario', res.data.tipoUsuario)
                        this.$router.push({name: 'home'})
                    })
                    .catch(showError)
            }catch(msg){
                this.$toasted.erro('Erro ao fazer Login')
            }finally{
                this.showLoad = false
            }
        },
        changeView(){
            this.$parent.state = 'S'
        },
        forgotPassword(){
            this.$parent.state = 'F'
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .auth-modal{
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, .1);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.4rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 5px;        
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }
  

    .auth-modal a{
        margin-top: 35px;
    }
    .auth-modal hr{
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, .75),
            rgba(120, 120, 120, 0)
        );
    }
    .footer-link{
        padding: 10px;
        margin-top: 10px;
    }

    .div-botao{
        display: flex;
    }
    .div-spinner{
        background-color:rgb(120, 120, 120, 0.3);
        width: 350px;
        height: 337px;        
        position:absolute;
        margin-top: -35px;

    }
    .spinner{
        text-align: center;
        justify-items: center;
        margin-top:45%;
        margin-left: 45%;
    }

    .button{
        border: none;
        background-color: #31A839;
        color: #FFF;
        padding: 6px 10px;
        transition: 1s;
    }

    .button:hover{
        background-color: #47F553;
    }
</style>