import bcrypt from 'bcrypt';

const usersModel = {
    async registerUserModel(newUser) {
        try {
            const url = 'http://localhost:4000/users';
            const petition = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await petition.json();
            return data;
        } catch (error) {
            throw new Error("Error al registrar usuario en la base de datos");
        }
    },

    async loginUserModel(username, password) {
        try {
            const response = await fetch(`http://localhost:4000/users`);
            const users = await response.json();
            
            const user = users.find(user => user.username === username);
            if (!user) {
                return null; 
            }
         
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al iniciar sesión");
        }
    },
    async getUserByUsername(username) {
        const response = await fetch(`http://localhost:4000/users`);
        const users = await response.json();
        return users.find(user => user.username === username);
    }
};

export default usersModel;
