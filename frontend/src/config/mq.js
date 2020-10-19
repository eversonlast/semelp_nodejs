import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq,{
    breakpoints:{
        xs: 576,
        sm: 788,
        md: 960,
        lg: 1140,
        xls: Infinity
    }
})
