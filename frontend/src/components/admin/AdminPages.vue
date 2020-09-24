<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro & Cia"/> 
        <div class="admin-pages-tabs">
        <b-card no-body>     
            <UserAdmin />            
        </b-card>
        </div>       
    </div>

</template>

<script>

import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin }
}
</script>

<style>

</style>