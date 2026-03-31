export async function decodificarToken(token){
    try {
        if (!token || typeof token !== 'string') {
            throw new Error('Token invalido');
        }

        const parts = token.split('.');
        if (parts.length < 2) {
            throw new Error('Token invalido');
        }

        const base64Url = parts[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const padded = base64Url.padEnd(
            base64Url.length + ((4 - (base64Url.length % 4)) % 4),
            '='
        );

        const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));

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