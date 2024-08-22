const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// let { carsCatalog } = require('../catalog/cars');

// Configuración de Supabase
console.log('process.env.SUPABASE_URL..............', process.env.SUPABASE_URL)
console.log('process.env.SUPABASE_KEY..............', process.env.SUPABASE_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GET /models
router.get('/', async (req, res) => {
    try {
        let { greater, lower } = req.query;
        
        const { data: cars, error } = await supabase
            .from('cars')
            .select("*")
        console.log('cars..............', cars)
        console.log('error..............', error)

        if (greater || lower) {
            let filteredModels = cars;

            greater = parseFloat(greater);
            lower = parseFloat(lower);
    
            if (!isNaN(greater)) filteredModels = filteredModels.filter(model => model.average_price > greater);
            if (!isNaN(lower)) filteredModels = filteredModels.filter(model => model.average_price < lower);

            res.status(filteredModels ? 200 : 400).json({
                message: filteredModels ? 'Se trae información de modelos exitosamente' : 'Error al traer información',
                payload: filteredModels
            });
        } else {
            res.status(cars ? 200 : 400).json({
                message: cars ? 'Se trae información de modelos exitosamente' : 'Error al traer información',
                payload: cars
            });
        }
    } catch (error) {
        console.error('Error al traer models:', error.message);
        res.status(404).json({
            error: 'Error al traer models ' + error.message
        });
    }
});

// PUT /models/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id --------------------', id)

        console.log('req.body --------------------', req.body)
        const { average_price } = req.body;
        console.log('average_price ---------------', average_price)

        let data = null
        let code = null
        let mess = ''

        if (id && average_price) {
            if (average_price <= 100000) {
                data = null
                code = 400
                mess = 'Error, el precio debe ser mayor a 100K'
            } else {
                const { data: upPrice, errPrice } = await supabase
                    .from('cars')
                    .update({ average_price: parseInt(average_price) })
                    .eq('id', id)
                    .select('id, average_price, name, brand_name')
                console.log('upPrice..............', upPrice)
                console.log('errPrice..............', errPrice)

                data = upPrice
                code = 201
                mess = 'Se actualizó precio correctamente'
            }
        } else {
            data = ''
            code = 400
            mess = 'Error, falta ingresar uno o más parámetros: id, average_price'
        }

        res.status(code).json({
            message: mess,
            payload: data
        });
    } catch (error) {
        console.error('Error al actualizar precio:', error);
        res.status(404).json({
            error: 'Error al actualizar precio ' + error
        });
    }
});

module.exports = router;
