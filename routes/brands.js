const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
console.log('process.env.SUPABASE_URL..............', process.env.SUPABASE_URL)
console.log('process.env.SUPABASE_KEY..............', process.env.SUPABASE_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const { errorCatalog } = require('../catalog/matrix');


// GET /brands
router.get('/', async (req, res) => {
    try {
        const { data: cars, error } = await supabase
            .from('cars')
            .select("*")
        console.log('cars..............', cars)
        console.log('error..............', error)

        const result = await cars.reduce((acc, car) => {
            if (!acc[car.brand_name]) {
                acc[car.brand_name] = { total: 0, count: 0 };
            }
            acc[car.brand_name].total += car.average_price;
            acc[car.brand_name].count += 1;
            return acc;
        }, {});

        let u = 1
        const averages = await Object.keys(result).map(brand => ({
            brand_name: brand,
            average_price: result[brand].total / result[brand].count,
            id: u++
        }));


        res.status(201).json({
            message: 'Se trae correctamente lista de BRANDS',
            payload: averages
        });
    } catch (error) {
        console.error('Error al consultar BRANDS ', error.message);
        res.status(400).json({
            error: 'Error al consultar BRANDS ' + error.message
        });
    }
});

// POST /brands
router.post('/', async (req, res) => {
    try {
        console.log('req.body..............', req.body)
        const { name } = req.body;
        console.log('name..............', name)

        let resp = ''
        let bad = ''
        let mess = '' 
        let code = 200

        if (name) {
            const { data: brand, err } = await supabase
                .from('brands')
                .select("*")
                .filter('name', 'ilike', `%${name.toLowerCase()}%`)
                .single()
            console.log('brand++++++++++++++++', brand)
            console.log('err++++++++++++++++++', err)

            if (err) throw err

            if (brand === null) {
                console.log('+++++++++ ENTRA INSERT +++++++++')

                const { data: lastId, errLastId } = await supabase
                    .from('brands')
                    .select("*")
                    .order('id', { ascending: false })
                    .limit(1)
                console.log('lastId++++++++++++++++', lastId)
                console.log('errLastId++++++++++++++++++', errLastId)

                if (lastId) {
                    const { data, error } = await supabase
                        .from('brands')
                        .insert([
                            { name: name.toUpperCase(), id: lastId[0].id + 1 },
                        ])
                        .select('id')
                    console.log('data ++++++++++++++++++++', data)
                    console.log('error ++++++++++++++++++', error)

                    if (error) throw error

                    resp = data
                    bad = error
                    mess = 'Se guarda correctamente nueva marca'
                    code = 201
                } else {
                    resp = null
                    mess = 'Error, no se pudo traer listado de marcas'
                    code = 400 
                }
            } else {
                resp = null
                mess = 'Error al guardar, marca existente'
                code = 400 
            }
        } else {
            mess = 'Ingrese el parámetro name'
            code = 201
            resp = null
        }

        res.status(code).json({
            message: mess,
            payload: resp ? resp : null
        });
    } catch (error) {
        console.error('Error al guardar marca ', error.message);
        res.status(400).json({
            error: 'Error al guardar marca ' + error.message
        });
    }

});

// GET /brands/:id/models
router.get('/:id/models', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id................', id)

        const { data: brand, err } = await supabase
            .from('brands')
            .select("*")
            .eq('id', id)
            .single()
        console.log('brand..............', brand)
        console.log('err..............', err)

        const { data: cars, error } = await supabase
            .from('cars')
            .select("*")
            .eq('brand_name', brand.name)
        console.log('cars..............', cars)
        console.log('error..............', error)

        res.status(201).json({
            message: 'Se trae correctamente lista de Modelos segun la marcas',
            payload: cars
        });
    } catch (error) {
        console.error('Error al consultar brands/:id/models ', error.message);
        res.status(400).json({
            error: 'Error al consultar brands/:id/models ' + error.message
        });
    }
});

// POST /brands/:id/models
router.post('/:id/models', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id**************************', id)

        console.log('req.body********************', req.body)
        const { name, average_price, brand_name } = req.body;
        console.log('name************************', name)
        console.log('average_price***************', average_price)
        console.log('brand_name******************', brand_name)

        let averagePrice = average_price ? average_price : 100000
        console.log('averagePrice******************', averagePrice)

        let mess = ''
        let code = null
        let resp = ''

        if (name && brand_name && id) {
            const { data: brand, err } = await supabase
                .from('brands')
                .select("*")
                .filter('name', 'ilike', `%${brand_name.toLowerCase()}%`)
                .single()
            console.log('brand *******************', brand)
            console.log('err *********************', err)

            if (brand) {
                const { data: cars, error: bad } = await supabase
                    .from('cars')
                    .select("*")
                    .like('name', name)
                    .eq('brand_name', brand_name)
                    .single()
                console.log('cars ********************', cars)
                console.log('bad *********************', bad)

                if (cars) {
                    mess = errorCatalog[5].message
                    code = 400
                    resp = null
                } else {
                    const { data: lastId, errLastId } = await supabase
                        .from('cars')
                        .select("*")
                        .order('id', { ascending: false })
                        .limit(1)
                    console.log('lastId ***************************', lastId)
                    console.log('errLastId ************************', errLastId)

                    if (lastId) {
                        const { data, error } = await supabase
                            .from('cars')
                            .insert([
                                {
                                    name: name,
                                    id: lastId[0].id + 1,
                                    average_price: averagePrice,
                                    brand_name, brand_name
                                },
                            ])
                            .select('id')
                        console.log('data **********************', data)
                        console.log('error *********************', error)

                        if (error) throw error

                        mess = 'Se insertó modelo exitosamente'
                        code = 201
                        resp = data
                    } else {
                        mess = 'Error al traer último ID'
                        code = 400
                        resp = null
                    }
                }
            } else {
                mess = errorCatalog[4].message
                code = 400
                resp = null
            }
        }  else {
            mess = 'Falta ingresar uno o más parametros: name, average_price, brand_name, id'
            code = 400
            resp = null
        }

        res.status(code).json({
            message: mess,
            payload: resp
        });
    } catch (error) {
        console.error('Error al registrar brands/:id/models ', error.message);
        res.status(400).json({
            error: 'Error al consultar brands/:id/models ' + error.message
        });
    }
});

module.exports = router;
