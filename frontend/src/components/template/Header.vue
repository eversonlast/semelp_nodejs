<template>
    <header class="header">
         <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to='/' v-if="!hideUserDropdown">
                <i class="icofont-runner-alt-1 mr-2 text-danger"></i>
                    <span class="font-weight-light mr-1 text-danger">{{title}} </span>
                    <span class="font-weight-bold font-italic text-success">{{subTitle}}</span>
                <i class="icofont-swimmer ml-2 text-success"></i>
            </router-link>
            <router-link to='/auth' v-else>
                <i class="icofont-runner-alt-1 mr-2 text-danger"></i>
                    <span class="font-weight-light mr-1 text-danger">{{title}} </span>
                    <span class="font-weight-bold font-italic text-success">{{subTitle}}</span>
                <i class="icofont-swimmer ml-2 text-success"></i>
            </router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        subTitle: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-right"
        },
        
    },
    methods:{
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
     
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right, #41a848, #aedcb1);

        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        z-index:10;
    }
    .title {
        font-weight: 100;
        font-size: 1.9rem;
        flex-grow: 1;
        text-align: center;
    }
     .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover{
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
    }
</style>