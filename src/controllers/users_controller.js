import { createTokenPet } from '../middlewares/auth.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import usersModel from '../models/users_model.js';
import petsModel from '../models/pets_model.js';


// Controlador para registrar usuarios
const registerUsersController = async (req, res) => {
  const { password, ...otherDataUser } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    id: uuidv4(),
    password: hashedPassword,
    ...otherDataUser
  };
  try {
    const user = await usersModel.registerUserModel(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// Controlador para iniciar sesión de usuarios
const loginUsersController = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await usersModel.getUserByUsername(username);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: "El usuario o la contraseña son incorrectos" });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "El usuario o la contraseña son incorrectos" });
    }

    // Si las verificaciones son exitosas, generar el token y devolver la respuesta
    const tokenPet = createTokenPet(user);
    delete user.password;
    const pets = await petsModel.getAllPets();
    res.status(200).json({ user, pets, tokenPet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export {
  loginUsersController,
  registerUsersController
};