<template>
<div>
    <PageTitle main="Atestado Médico" icon="icofont-medical-sign"/>
    <b-form>
        <div class="login-card card">
            <input type="hidden" id="medcialExam" v-model="medicalExam.id" />
            <div class="card-header">
                Dados para Cadstramento de Exames Médicos
            </div>
            <div class="card-body cadastro">
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <input type="text" class="form-control"
                        placeholder="Por favor, Digite aqui o nome do usuário."
                        />
                    </div>
                </div>
            </div>
        </div>
    </b-form>
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
export default {
    name: "MedicalExam",
    components: {PageTitle},
    data: function(){
        return {
            medicalExam: {}
        }
    }

}
</script>

<style>

</style>