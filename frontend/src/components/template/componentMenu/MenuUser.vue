<template>
    <div>
        <Tree :data="items" ref='tree' />
    </div>
</template>

<script>
import Tree from 'liquor-tree'
import { userKey } from '@/config/global'

export default {
    name:'MenuUser',
    components: { Tree },
    data: function(){
        return{
            user: {},
            expanded: false,
            items: [
                {text: 'Usuário', children:[
                    {text: 'Atualizar Cadastro'},
                    {text: 'Trocar Senha'}
                ]},
                {text: 'Fazer Matrícula'}
            ]
        }
    },
    methods:{
       onNodeSelected(node){
            if(node.text=='Atualizar Cadastro'){
                if(this.$mq ==='xs' || this.$mq === 'sm'){
                    this.$store.commit('toggleMenu', false)
                }      
                this.$router.push({
                    path: `/user/${this.user}`
                })
            }

            if(node.text == 'Trocar Senha'){ 
                  
                if(this.$mq ==='xs' || this.$mq === 'sm'){
                    this.$store.commit('toggleMenu', false)
            }             
                this.$router.push({
                    path:`/forgotPasswordAuth/${this.user}`                           
                })
            }
            if(node.text == 'Fazer Matrícula'){
                if(this.$mq === 'xs' || this.$mq === 'sm'){
                    this.$store.commit('toggleMenu', false)
                }
                this.$router.push({
                    path:'/registerUserClass'
                })
            }
        },
        async getUser(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            await this.$store.commit('setUser', userData)
            this.user = userData.id
        },
        
    },
    mounted(){
        this.getUser()
        this.$refs.tree.$on('node:selected', this.onNodeSelected)
    }
}
</script>

<style>

</style>