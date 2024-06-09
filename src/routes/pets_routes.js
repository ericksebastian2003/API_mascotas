import { Router } from "express";
import {
    registerPetsController,
    getAllPetsController,
    getPetByIdController,
    updatePetsController,
    deletePetsController
} from '../controllers/pets_controller.js'

const routerPets = Router();

routerPets.get('/pets', getAllPetsController);

routerPets.get('/pets/:id', getPetByIdController);

routerPets.post('/pets', registerPetsController);

routerPets.put('/pets/:id', updatePetsController);

routerPets.delete('/pets/:id', deletePetsController);

export default routerPets;