export function decodificar_tokens(token){
    try {

        console.log(token)
        let partes_token = token.split("."); 
        let payload_base64 = partes_token[1]
        

        let payload = JSON.parse(atob(payload_base64))
        
        return {
            "Mensaje":"JWT decodificado",
            "Resultado":payload,
            "Estado":true,
            "Error":null
        } 
    
    } catch (error) {
        return {
            "Mensaje":"Fallo al decodificar JWT",
            "Resultado":null,
            "Estado":false,
            "Error":error
        } 
    }
}