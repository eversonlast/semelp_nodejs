<template>
    <aside class="menu" v-show="isMenuVisible">
       <div>
           <MenuAdmin v-if="user.tipoUsuario == 'admin'"/>
           <MenuSecre v-if="user.tipoUsuario == 'secre'"/>
           <MenuUser v-if="user.tipoUsuario == 'user'"/>
        </div>
    </aside>
    
</template>

<script>
import { mapState } from 'vuex'

import MenuAdmin from './componentMenu/MenuAdmin'
import MenuUser from './componentMenu/MenuUser'
import MenuSecre from './componentMenu/MenuSecre'

export default {
    name: 'Menu',
    components: { MenuAdmin, MenuUser, MenuSecre },
    computed: mapState(['isMenuVisible', 'user']),
    addItem(){
     this.expanded =!this.expanded
    }

}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #092479, #7060ba);

        -webkit-box-shadow: 3px 0px 3px 2px rgba(57, 63, 72, 0.3);
        -moz-box-shadow: 3px 0px 3px 2px rgba(57, 63, 72, 0.3);
        box-shadow: 3px 0px 3px 2px rgba(57, 63, 72, 0.2);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        z-index: 5;
    }
    
</style>