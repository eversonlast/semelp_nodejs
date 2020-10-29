<template>
    <div class="sport-center-item">
        <router-link :to="{name: 'sportCenterById', params: {id: sportCenter.id}}">
            <div class="sport-center-item-info">
                <h2>{{sportCenter.nome}}</h2>
                <p>{{sportCenter.telefone}}</p>
            </div>
        </router-link>

    </div>
  
</template>

<script>
export default {
    name: 'SportCentersItem',
    props: ['sportCenter']
}
</script>

<style>

    .sport-center-item{
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 2px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .sport-center-item a{
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #000;
        padding:10px;
    }

    .sport-center-item-info{
        display: flex;
        align-items: stretch;
        flex-direction: column;
    }

    .sport-center-item-info h2{
        font-size: 1.7rem;
    }

</style>