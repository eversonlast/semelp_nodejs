<template>
<div>
    <PageTitle main="Lista de Exame Médico" sub="Gerenciar Exame Médico" icon="icofont-medical-sign" />
    <div class="base">
        <b-form-input type="text" id="medicalExam" class="my-2" 
        placeholder="Por favor, digite o nome ou CPF do aluno."
        v-b-popover.hover.top="'Por favor, digite o nome ou CPF.'"></b-form-input>
    </div>
</div>
  
</template>

<script>
import PageTitle from '../template/PageTitle'
export default {
    name: "ManagerMedicalExam",
    components: {PageTitle},
    data: function(){
        return{
            medicalExams: [],
            limit: 0,
            count: 0, 
            page: 1,
            fields:[
                {key: 'id', label:'Código', sortable: true},
                
            ]
        }
    }


}
</script>

<style>

</style>