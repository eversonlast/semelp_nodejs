<template>    
       <div>
            <Tree :data="items" ref='tree'/>
        </div> 
</template>

<script>
import Tree from 'liquor-tree'

export default {
    name: 'MenuAdmin',
    components: { Tree },
    data: function(){
        return{
            expanded: false,
            items:[
                {text: 'Usuários', children:[
                    {text: 'Lista de Usuários'},
                    {text: 'Cadastro de Usuários'}
                ]},
                {text: 'Modalidades', children:[
                    {text: 'Por Centro Esportivo'},
                    {text: 'Por Modalidade'},
                    {text: 'Cadastrar Modalidade'},
                    {text: 'Gerenciar Modalidade'}
                ]},
                {text: 'Centro Esportivo', children:[
                    {text: 'Cadastrar Centro Esportivo'},
                    {text: 'Gerenciar Centros Esportivos'}
                ]},
                {text: 'Turma', children:[
                    {text: 'Cadastrar Turma'},
                    {text: 'Lista de Turma'}
                ]},
                {text: 'Fazer Matrícula'},
                {text: 'Lista de Espera'}
            ]
        }
    },
    methods:{
        onNodeSelected(node){
            if(node.text=='Lista de Usuários')this.$router.push({
                path: '/admin'
            })

            if(node.text == 'Cadastro de Usuários'){                
                this.$router.push({
                    path:'/signup'                           
                })
            }

            if(node.text=='Por Modalidade'){
                this.$router.push({
                    name: 'modality'
                })
            }

            if(node.text == 'Por Centro Esportivo'){
                this.$router.push({
                    name: 'sportCenter'
                })
            }

            if(node.text == 'Cadastrar Centro Esportivo'){
                this.$router.push({
                    name: 'registerSportCenter'
                })
            }

            if(node.text == 'Gerenciar Centros Esportivos'){
                this.$router.push({
                    name: 'sportCenterList'
                })
            }

            if(node.text == 'Cadastrar Modalidade'){
                this.$router.push({
                    name: 'modalityRegister'
                })
            }

            if(node.text == 'Gerenciar Modalidade'){
                this.$router.push({
                    name: 'modalityList'
                })
            }

            if(node.text == 'Cadastrar Turma'){
                this.$router.push({
                    name: 'registerClass'
                })
            }

            if(node.text == 'Lista de Turma'){
                this.$router.push({
                    name: 'managerClass'
                })
            }

            if(node.text == 'Fazer Matrícula'){
                this.$router.push({
                    name: 'registerUserClass'
                })
            }
            if(node.text == 'Lista de Espera'){
                this.$router.push({
                    name: 'waitingLists'
                })
            }
            
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelected)
    }

}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #092479, #7060ba);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        z-index: 5;
    }
    
    .menu a,
    .menu a:hover{
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child{
        filter: brightness(2);
    }
</style>