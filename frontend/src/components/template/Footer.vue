<template>
  <footer class="footer">
     <div class="endereco ">
         <span>
             R. Eng. Orlando Drumond Murgel, 419 - São Benedito, Pindamonhangaba -SP, 12410-310 -
              tel.: (12) 3648-2248 / 3643-2170
         </span>
     </div>
     <div class="spacer"></div>
     <div class="sobre">
      <i class="icofont-micro-chip mr-2 text-success"></i>
      <span>Copyright e Desenvolvido por 
          <strong>Everson</strong> 
          © 2019-2020</span>
       <i class="icofont-code ml-2 mr-3 text-primary"></i>
       </div>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: #526BA8;
        color: #fff;

        -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
        box-shadow: 0 -3px 10px 3px rgba(57, 63, 72, 0.2);

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;

    }
    .spacer{
        display: flex;
        flex:1;
    }
    .endereco{
        margin: 0px 0px 0px 10px;
        font-size: 0.8rem;
    }
    @media screen and (max-width: 600px){
        .endereco{
            font-size: 0.5rem;
        }

        .sobre{
            font-size: 0.5rem;
        }
    }
</style>