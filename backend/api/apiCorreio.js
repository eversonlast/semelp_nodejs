module.exports = app =>{
    
    const consultar = async (req, res)=>{
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://viacep.com.br/ws/${req.query.cep}/json`);
        xhr.onreadystatechange = () =>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    res.send(JSON.parse(xhr.responseText))
                }
            }
        };
        xhr.send();
    }
    return {consultar}
}