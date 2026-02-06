export async function decodificarToken(token){
    try {
        let payload = JSON.parse(atob(token))
        
        return {
            "Mensaje":"Token decodificado",
            "Estado":true,
            "Resultado":payload,
        } 
    
    } catch (error) {
        return {
            "Mensaje":"Fallo al decodificar el token",
            "Estado":false,
            "Error":error
        } 
    }
}