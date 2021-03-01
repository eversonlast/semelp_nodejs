<template>
    <div class="page-title">
        <h1>
            <i v-if="icon" :class="icon"></i>
            {{ main }} {{idade}} {{divisorMain}} {{dias}} {{divisorTurma}} {{horarios}}
        </h1>
        <h2>
            {{ sub }} {{ divisor }}  {{ responsability }}
        </h2>
        <hr> 
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub', 'responsability', 'divisor', 'dias', 'horarios', 'divisorMain', 'divisorTurma', 'idade']
}
</script>

<style>
    .page-title h1{
        margin: 0px;
    }

    .page-title h2{
        color: #777777;
        margin-top: 5px;
        font-size: 1.3rem;
    }

</style>