const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');


const pool = new Pool({
  connectionString: keys.posgresqlURI,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/insertarpaciente', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});



router.get('/consultatotalpacientes', async (req, res) => {

  const { rows } = await pool.query('SELECT * FROM pacientes ORDER BY id DESC');
  res.json(rows);
});

router.get('/consultar-paciente/:id', async (req, res) => {
    const id  = req.params.id;
    const { rows }  = await pool.query(`SELECT * FROM pacientes WHERE id = ${id}`);
    //console.log(rows);
    res.json(rows);
}); 

router.delete('/eliminar-paciente/:id', async (req, res) => {
    const id  = req.params.id;
    await pool.query(`DELETE FROM pacientes WHERE id=${id}`);
    res.json({'mensaje': 'Paciente Eliminado'});
});

router.post('/actualizar-paciente', async (req, res) => {
    const { id, nombre, apellido, numid } = req.body;
    //console.log(req.body)
    await pool.query(
      `UPDATE pacientes SET nombre = '${nombre}', apellido = '${apellido}', numid = '${numid}' WHERE id = ${id}`
    );
    res.json({ 'mensaje': 'Paciente Actualizado' });
});
  