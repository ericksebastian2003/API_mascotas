import petsModel from '../models/pets_model.js';
import { v4 as uuidv4 } from 'uuid';


// Controlador para obtener todas las mascotas
const getAllPetsController = async (req, res) => {
  try {
    const pets = await petsModel.getAllPets();
    res.status(200).json(pets);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Controlador para obtener una mascota por ID
const getPetByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await petsModel.getPetById(id);
    console.log(pet);
    const status = pet.error ? 404 : 200;
    res.status(status).json(pet);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Controlador para registrar mascotas
const registerPetsController = async (req, res) => {
  try {
    let pets = [];
    if (Array.isArray(req.body)) {
      pets = req.body.map(pet => ({
        id: uuidv4(),
        ...pet
      }));
    } else {
      pets.push({
        id: uuidv4(),
        ...req.body
      });
    }
    const registeredPets = await Promise.all(pets.map(pet => petsModel.registerPets(pet)));
    res.status(200).json(registeredPets);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Controlador para actualizar mascotas
const updatePetsController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = req.body;
    const pet = await petsModel.updatePets(id, updatedPet);
    const status = pet.error ? 404 : 200;
    res.status(status).json(pet);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Controlador para eliminar mascotas
const deletePetsController = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await petsModel.deletePets(id);
    const status = pet.error ? 404 : 200;
    res.status(status).json(pet);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export {
  registerPetsController,
  getAllPetsController,
  getPetByIdController,
  updatePetsController,
  deletePetsController,

};
