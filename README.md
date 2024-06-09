# API de Gestión de Mascotas

Esta API permite a los usuarios gestionar información sobre mascotas. Proporciona funcionalidades para registrar nuevas mascotas y obtener información sobre una mascota específica por su ID.

## Endpoints

- `GET /pet/:id`: Este endpoint permite a los usuarios obtener información sobre una mascota específica por su ID. Si la mascota no se encuentra, se devuelve un código de estado HTTP 404. Si la mascota se encuentra, se devuelve un código de estado HTTP 200 junto con la información de la mascota.

- `POST /pets`: Este endpoint permite a los usuarios registrar nuevas mascotas. Los usuarios pueden enviar un solo objeto de mascota o un array de objetos de mascotas en el cuerpo de la solicitud. Cada objeto de mascota debe contener información sobre el nombre, tipo, raza, edad, peso, estado de vacunación, estado de esterilización y descripción de la mascota. Cada mascota registrada se asigna un ID único.

Esta API utiliza el modelo `petsModel` para interactuar con la base de datos de mascotas. Los errores durante el procesamiento de las solicitudes se manejan y se devuelven con un código de estado HTTP 500 junto con un mensaje de error.

Por favor, consulta la documentación de cada endpoint para obtener más detalles sobre cómo usar esta API.