<template>    
       <div>
            <Tree :data="items" ref='tree'/>
        </div> 
</template>

<script>
import Tree from 'liquor-tree'

export default {
    name: 'MenuSecre',
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
                    {text: 'Listar Modalidades'}
                ]},
                {text: 'Centro Esportivo', children:[
                    {text: 'Listar Centros Esportivos'}
                ]},
                {text: 'Turma', children:[
                    {text: 'Cadastrar Turmas'},
                    {text: 'Listar Turmas'}
                ]},
                {text: 'Matrículas', children:[
                    {text: 'Fazer Matrícula'},
                    {text: 'Lista de Matrículas Ativas'},
                    {text: 'Lista de Matrículas Desativadas'}
                ]},
                {text: 'Lista de Espera', children:[
                    {text: 'Colocar na Lista de Espera'},
                    {text: 'Verificar Lista por turma'}
                ]},
                {text: 'Exame Médico', children:[
                    {text: 'Cadastrar Exame Médico'},
                    {text: 'Gerenciar Exame Médico Desativados'},
                    {text: 'Gerenciar Exame Médico Ativos'}
                ]}
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
            if(node.text == 'Listar Modalidades') this.$router.push({
                path: '/modality'
            })
            if(node.text == 'Listar Centros Esportivos') this.$router.push({
                path:'/sportCenter'
            })
            if(node.text == 'Cadastrar Turmas') this.$router.push({
                path: '/registerClass'
            })
            if(node.text == 'Listar Turmas') this.$router.push({
                path: '/managerClass'
            })
            if(node.text == 'Fazer Matrícula') this.$router.push({
                path:'/registerUserClass'
            })
            if(node.text == 'Lista de Matrículas Ativas') this.$router.push({
                path: '/managerClassUsersActive'
            })
            if(node.text == 'Lista de Matrículas Desativadas') this.$router.push({
                path: '/managerClassUsersDesactive'
            })
            if(node.text == 'Colocar na Lista de Espera') this.$router.push({
                path: '/waitingLists'
            })
            if(node.text == 'Cadastrar Exame Médico') this.$router.push({
                path: '/medicalExam'
            })
            if(node.text == 'Gerenciar Exame Médico Desativados') this.$router.push({
                path: '/managerMedicalExam'
            })
            if(node.text == 'Gerenciar Exame Médico Ativos') this.$router.push({
                path: '/medicalExamActive'
            })
            if(node.text == 'Verificar Lista por turma') this.$router.push({
                path:'/listaEspera'
            })
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