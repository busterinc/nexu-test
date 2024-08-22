
const errorCatalog = [
    { code: 'ERR001', message: 'Error de autenticación: Credenciales inválidas.' },
    { code: 'ERR002', message: 'Error de autorización: Acceso denegado.' },
    { code: 'ERR003', message: 'Error interno del servidor: No se pudo completar la operación.' },
    { code: 'ERR004', message: 'Error no se pudo actualizar modelo.' },
    { code: 'ERR005', message: 'La marca no existe, es necesario dar de alta la marca.' },
    { code: 'ERR006', message: 'El modelo de auto que desea registrar ya existe.' }
];

const logActions = [
    { code: 'ACT001', message: 'GENERA NUEVO TOKEN' },
    { code: 'ACT002', message: 'REGISTRO NUEVO USUARIO' },
    { code: 'ACT003', message: 'CARGA NUEVO VEHÍCULO' },
    { code: 'ACT004', message: 'ACTUALIZA VEHÍCULO' },
    { code: 'ACT005', message: 'ELIMINA VEHÍCULO' },
    { code: 'ACT006', message: 'INICIO SESIÓN' }
]

module.exports = { errorCatalog, logActions };