import jwt from 'jsonwebtoken';


// Método para crear y firmar el token
const createTokenPet = (userInfo) => {
    try {
        return jwt.sign(userInfo, 'pets_key', { expiresIn: '1h' });
    } catch (error) {
        throw new Error("Error al generar el token");
    }
}

const verifyTokenPets = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: "No Token" });
    }
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'pets_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: err.message });
        }
        
        // Autorizar el acceso
        req.user = decoded;
        next();

    });
};

export {
    createTokenPet,
    verifyTokenPets
};

