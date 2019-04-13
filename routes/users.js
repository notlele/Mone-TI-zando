var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.send('respond with a resource');
});

try{
if(!cnpj)
  return res.status(400).send({message: 'Cadastre seu CNPJ agora!'});

} catch {
  return res.status(400).send({error});
}

module.exports = router;
