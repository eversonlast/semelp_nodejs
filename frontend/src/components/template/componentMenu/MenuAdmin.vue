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