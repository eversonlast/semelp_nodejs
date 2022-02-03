<template>
    <div class="content">
        <router-view></router-view>
        <div class="lgpd" v-if="state === 'A'">
            <p class="my-1">
                Este site usa dados pessoais para fornecer o serviço
            </p>
            <b-button variant="primary" @click="mudancaState()" class="mx-2 my-1">Aceito</b-button>
            <b-button variant="danger" class="my-1">Não Aceito </b-button>
        </div>
    </div>
</template>

<script>
export default {
   name: 'Content', 
   data: function(){
       return{
           state: 'A'
       }
   },
   methods:{
       verificarState(){
           if(localStorage.getItem('state') === null){
               this.state = 'A'
           }else{
               localStorage.setItem('state', 'I')
                this.state = 'I'
           }
       },
        mudancaState(){
            this.state = 'I'
            localStorage.setItem('state', this.state)
        }
   },
   mounted(){
       this.verificarState()
   }
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: #ddf3db;
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    .lgpd{
        width: 80%;
        background-color: #41a848;
        margin-right: 0px;
        margin-left: -1.15%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
        position: fixed;
        top: 90%;
    }
    .lgpd p{
        margin-left: 10px;
        color: white;
    }

    @media only screen and (max-width: 600px){
        .lgpd{
            width: 80%;
            background-color: #41a848;
            margin-right: 0px;
            margin-left: -1.15%;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99;
            position: fixed;
            top: 80%;
        }
    }
</style>