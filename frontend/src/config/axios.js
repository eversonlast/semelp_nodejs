import axios from 'axios'

const success = res => res
const error = err => {
    if(401 === err.response.status){
        window.locale = '/'
    }else{
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)