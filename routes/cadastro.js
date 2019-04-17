const express = require('express');
const router = express.Router();
const isNull = require('../script').isNull;
const Database = require('../Database');
const Cryptr = require('cryptr');
const config = require('../config');
const cryptr = new Cryptr(config.security.key);

router.post('/cadastrarFuncionario', (req, res, next) => {
	
	// após o body, são os nomes dos campos no formulário	
    let nome = req.body.full_name;
    let usuario = req.body.user;
    let senha = req.body.password;
    let email = req.body.email;
    let cpf = req.body.cpf;

    if (isNull(nome) || isNull(usuario) || isNull(senha)) {
        res.status(400).send({'mensagem': 'Nome, login e senha são obrigatórios'});
    }

	//tirar comentário caso desejar criptografar a senha
    senha = cryptr.encrypt(senha);

    console.log(`name: ${nome}, username: ${usuario}, password: ${senha}`);

     criarUsuario(usuario, cpf, senha, nome, email).then(results => {
        req.session.message = `Usuário ${usuario} criado com sucesso`;
        return res.status(302).redirect('/login');
    }).catch(erro => {
		console.error(`Erro: ${erro}`);
        res.status(400).send({'mensagem':`Erro ao cadastrar: ${erro}`});
    });

});

function criarUsuario(usuario, cpf, senha, nome, email) {
    return new Promise((resolve, reject) => {
        let create = undefined;
        verificarLogin(usuario).then(exists => {
            create = !exists;
            console.log('create:', create);
            if (create) {
                let querystring = `INSERT INTO Funcionario (usuario, nmrCpf, senha, nmFuncionario, emFuncionario) VALUES ('${usuario}', '${cpf}', '${senha}', '${nome}', '${email}');`;
                Database.query(querystring).then(results => {
                    resolve(results);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                });
            } else {
                reject(`Usuário ${usuario} já cadastrado!`);
            }
        }).catch((erro) => {
            reject(erro);
        });
    });
}

 function verificarLogin(usuario) {
    let querystring = `SELECT * FROM funcionario WHERE usuario = '${usuario}'`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
                let existe = results.recordsets[0].length > 0;
                resolve(existe);
            }).catch(error => {
                reject(error);
            });
        });
}
function verificarSenha(password){
    querystring = `SELECT * FROM TABELA WHERE PASSWORD = '${PASSWORD}'`;
        return new Promise((resolve, reject)=> {
            Database.query(querystring).then(results => {
                existe = results.recordsets[0].length > 0;
                resolve(existe);
            }).catch(error => {
                reject(error);
            })
        });
}

module.exports = router;