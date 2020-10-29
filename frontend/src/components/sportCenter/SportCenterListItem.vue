<template>
  <div class="sport-center-list-item">
      <router-link :to="{name:'managerSportCenter', params: {id: sportCenter.id}}">
            <div class="sport-center-list-item-info">
                <h2>{{sportCenter.nome}}</h2>
                <p> Rua: {{sportCenter.nomeLogradouro}} - Numero: {{sportCenter.numero}}<br> 
                Bairro: {{sportCenter.bairro}} - CEP: {{sportCenter.cep}}<br>
                Telefone: {{sportCenter.telefone}} | {{sportCenter.telefone1}} | {{sportCenter.telefone2}}<br></p>
            </div>
      </router-link>
    </div>
  
</template>

<script>
export default {
    name:'SportCenterListItem',
    props:['sportCenter'],
    
}
</script>

<style>
 .sport-center-list-item{
        border-radius: 8px;
        margin-bottom: 10px;
        margin-right: 30px;
        background-color: #fff;
        padding: 2px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .sport-center-list-item a{
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #000;
        padding:10px;
    }

    .sport-center-list-item-info{
        display: flex;
        align-items: stretch;
        flex-direction: column;
    }

    .sport-center-list-item-info h2{
        font-size: 1.7rem;
    }
    
</style>