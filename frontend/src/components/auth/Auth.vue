<template>
    <Login v-if="state === 'L'"/>
    <Signup v-else-if="state === 'S'"/>
    <ForgotPassword v-else-if="state === 'F'"/>
</template>

<script>
import Login from './component/Login'
import Signup from './component/Signup'
import ForgotPassword from './component/ForgotPassword'

export default {
    name:'Auth',
    components: {Login, Signup, ForgotPassword },
    data: function(){
        return{
            state: 'L'
        }
    }
}
</script>

<style>

</style>