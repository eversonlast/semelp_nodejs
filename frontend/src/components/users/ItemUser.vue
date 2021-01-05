<template>
     <div class="modalities-item">
            <div class="modalities-item-info">
                <h2>{{modality.nome}}</h2>
                <p>Nome da Modalidade: {{modality.NomeDaModalidade}}<br>
                    Local: {{modality.local}}<br>
                    Dias: {{modality.dias}}<br>
                    Horários: {{modality.horarios}}
                </p>
            </div>
    </div>
</template>

<script>
export default {
    name: 'ItemUser',
    props: ['modality']
}
</script>

<style>
    .modalities-item{
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 2px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .modalities-item-info{
        display: flex;
        align-items: stretch;
        flex-direction: column;
    }

    .modalities-item-info h2{
        font-size: 1.7rem;
    }

</style>