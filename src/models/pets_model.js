import bcrypt from 'bcrypt';
const petsModel = {
    async getAllPets() {
        const response = await fetch('http://localhost:4000/pets');
        const data = await response.json();
        return data;
    },

    async getPetById(id) {
        const response = await fetch(`http://localhost:4000/pets/${id}`);
        if (!response.ok) {
            return { error: 'No se encontró la mascota' }
        }
        const data = await response.json();
        return data;
    },

    async registerPets(newPet) {
        const url = 'http://localhost:4000/pets';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newPet),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return {
            message: 'Mascota registrada con éxito',
            pet: data
        };
    },

    async updatePets(id, updatedPet) {
        const url = `http://localhost:4000/pets/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            return { error: 'No se encontró la mascota' };
        } else {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(updatedPet),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return {
                message: 'Mascota actualizada con éxito',
                pet: data
            };
        }

    },

    async deletePets(id) {
        const url = `http://localhost:4000/pets/${id}`;
        const response = await fetch(url)
        if (!response.ok) {
            return { error: 'No se encontró la mascota' };
        } else {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            await response.json();
            return {
                message: 'Mascota eliminada con éxito'
            };
        }
    },
    async loginUser(username,password){
        //Punto1
        const response = await fetch(`http://localhost:4000/pets`)
        const users = await response.json()
       
        const user = users.find(user =>user.username === username)
        if(!user){
            return {error:"El usuario o contraseña es incorrecto"}
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(user&&passwordMatch){
            return user
        }
        else{
            return  {error:"El usuario o contraseña es incorrecto"}
        }

    },
    async registerUsers(newUser){
        //Punto1
        const url='http://localhost:4000/pets'
        const petition = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await petition.json()

        return data
    }
}

export default petsModel;