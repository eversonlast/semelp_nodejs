<template>
    <div class="modality-item">
        <router-link :to="{ name: 'modalityById', params: {id: modality.id}}">
            <div class="modality-item-image d-none d-sm-block">

            </div>
            <div class="modality-item-info">
                <h2>{{modality.nomeModalidade}}</h2>
                <p>Departamento: {{modality.departamento}}</p>
            </div>
        </router-link>

    </div>
</template>

<script>
export default {
    name: 'ModalityItem',
    props: ['modality']
}
</script>

<style>
    .modality-item{
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 2px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .modality-item a{
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #000;
    }

    .modality-item-info h2{
        font-size: 1.7rem;
    }

    .modality-item-info{
        display: flex;
        align-items: stretch;
        flex-direction: column;
    }


</style>