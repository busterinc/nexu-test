# 🚀 Ejercicio de Codificación Backend de Nexu

## 🎯 Objetivo

Es un pequeño desafío de codificación que te permita mostrar tus habilidades mientras te da una idea de algunos de los problemas que podrías encontrar en Nexu. Sabemos que estás ocupado con la vida, así que esperamos que puedas dedicar alrededor de 2 horas a resolver este ejercicio. No esperamos que termines en 2 horas, así que no te preocupes si no lo logras. Envía lo que tengas junto con algunas notas sobre tus pensamientos y cómo procederías si tuvieras más tiempo. ¡Lo más importante es que te diviertas! 😄

## 📜 Descripción General

¡Acabas de ser contratado para unirte al genial equipo de ingeniería en Nexu! La primera tarea en tu backlog de sprint es construir una aplicación backend para un frontend ya existente. El frontend necesita las siguientes rutas:

### 🛠️ Rutas

- `GET /brands` - Lista todas las marcas.
- `GET /brands/:id/models` - Lista todos los modelos de la marca especificada.
- `POST /brands` - Permite agregar nuevas marcas.
- `POST /brands/:id/models` - Permite agregar nuevos modelos a una marca.
- `PUT /models/:id` - Permite editar el precio promedio de un modelo.
- `GET /models?greater=&lower=` - Lista todos los modelos según parámetros de precio.

### 🔧 Endpoints

#### `GET /brands`

Lista todas las marcas.

**Respuesta:**
```json
[
  {"id": 1, "nombre": "Acura", "average_price": 702109},
  {"id": 2, "nombre": "Audi", "average_price": 630759},
  {"id": 3, "nombre": "Bentley", "average_price": 3342575},
  {"id": 4, "nombre": "BMW", "average_price": 858702},
  {"id": 5, "nombre": "Buick", "average_price": 290371},
  "..."
]



⚙️ Instalación y Ejecución
    1. Clona el repositorio
    bash
    Copiar código
    git clone <URL_DEL_REPOSITORIO>
    cd <DIRECTORIO_DEL_PROYECTO>
    2. Instala las dependencias
    bash
    Copiar código
    npm install
    3. Ejecuta el proyecto en desarrollo
    bash
    Copiar código
    npm run dev
    4. Ejecuta el proyecto en producción
    bash
    Copiar código
    npm start





📦 Dependencias
    El proyecto utiliza las siguientes dependencias:

    supabase
    cors
    dotenv
    express
    jsonwebtoken