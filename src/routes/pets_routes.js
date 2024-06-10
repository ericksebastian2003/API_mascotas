import { Router } from "express";
import {
    registerPetsController,
    getAllPetsController,
    getPetByIdController,
    updatePetsController,
    deletePetsController,

} from '../controllers/pets_controller.js'
import {verifyTokenPets} from '../middlewares/auth.js'

const routerPets = Router();



routerPets.get('/pets', getAllPetsController);

routerPets.get('/pets/:id', getPetByIdController);

routerPets.post('/pets', verifyTokenPets,registerPetsController);

routerPets.put('/pets/:id', verifyTokenPets,updatePetsController);

routerPets.delete('/pets/:id',verifyTokenPets,deletePetsController);

export default routerPets;