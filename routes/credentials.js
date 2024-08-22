const express = require('express');

const { createClient } = require('@supabase/supabase-js');
const { activityTrace } = require('../services/log');
const { logActions } = require('../catalog/matrix');

const router = express.Router();
router.use(express.json());

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Configuración de Supabase
console.log('process.env.SUPABASE_URL..............', process.env.SUPABASE_URL)
console.log('process.env.SUPABASE_KEY..............', process.env.SUPABASE_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Endpoint para registrar usuarios
router.post('/getToken', async (req, res) => {
    try {
        console.log('req.body..............', req.body)
        const { email, password } = req.body;
        console.log('email..............', email)
        console.log('password..............', password)
        // const { data, error } = await supabase.auth.signUp({ email, password });
        const { data: users, error } = await supabase
            .from('super_users')
            .select("*")
            .like('email', email)
            .eq('password', password)
            .single()
        console.log('users..............', users)
        console.log('error..............', error)

        if (error) throw error
        if (!users) return res.status(401).json({
            error: 'Correo electrónico no encontrado o la contraseña no es válida'
        })

        console.log('users..............', users)

        // Generar el token JWT si la autenticación es exitosa
        const secretKey = crypto.randomBytes(32).toString('hex');
        console.log('secretKey..............', secretKey)
        const token = users ? await jwt.sign({ userId: users.id }, secretKey, { expiresIn: '1h' }) : null
        console.log('token..............', token)

        if (token && secretKey) {
            const { data, error } = await supabase
                .from('super_users')
                .update({ token: token, secret: secretKey })
                .eq('email', email)
                .select()
            console.log('data..............', data)
            console.log('error..............', error)
        }

        res.status(201).json({
            message: 'Se generó token exitosamente',
            users,
            token
        });

        // (old, val, auth, error, act, fnc, resp)
        await activityTrace(null, users, email, error, logActions[0].code, 'post(/token)', token)
    } catch (error) {
        console.error('Error al generar token:', error.message);
        await activityTrace(null, null, req.body.email, error, logActions[0].code, 'post(/token)', null)
        res.status(404).json({
            error: 'Error al generar token ' + error.message
        });
    }
});


module.exports = router;
