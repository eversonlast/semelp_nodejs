<template>
   <b-form>
        <div class="login-card card">
            <input id="userId" type="hidden" v-model="sportCenter.id">
             <div class="card-header">
                        Dados de Identificação do Centro Esportivo 
            </div>                  
                <div class="card-body identificacao">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="nome">Nome do Centro Esportivo</label>
                            <input type="text" id="nome" name="nome"
                                class="form-control"
                                placeholder="Por Favor, Digite o nome do Centro Esportivo "
                                v-model="sportCenter.nome">
                        </div> 
                    </div>
            </div> 
        </div>
   </b-form>
</template>

<script>
export default {
    name: 'RegisterSportCenter',
    data: function(){
        return{
            sportCenter: {},
        }
    }
}
</script>

<style>

</style>