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
        res.status(400).json({'mensagem': 'Nome, login e senha são obrigatórios'});
    }

	//tirar comentário caso desejar criptografar a senha
    //senha = cryptr.encrypt(senha);

    console.log(`name: ${nome}, username: ${usuario}, password: ${senha}`);

    criarUsuario(usuario, cpf, senha, nome, email).then(results => {
        req.session.message = `Usuário ${usuario} criado com sucesso`;
        res.status(302).redirect('/login.html');
    }).catch(erro => {
		console.error(`Erro: ${erro}`);
        res.status(400).json({'mensagem':`Erro ao cadastrar: ${erro}`});
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



router.post('/cadastrarResidente', (req, res, next) => {
	
	// após o body, são os nomes dos campos no formulário	
    let nome = req.body.full_name;
    let sintomas = req.body.sintomas;
    let cpf = req.body.cpf;
    let dtNasc = req.body.dataNascimento

    //if (isNull(nome) || isNull(sintomas) || isNull(cpf)) {
    //    res.status(400).json({'mensagem': 'Tudo é obrigatório'});
    //}

	//tirar comentário caso desejar criptografar a senha
    //senha = cryptr.encrypt(senha);

    //console.log(`name: ${nome}, username: ${usuario}, password: ${senha}`);

    criarResidente(nome,sintomas,cpf, dtNasc).then(results => {
        req.session.message = `Residente ${nome} criado com sucesso`;
        res.status(302).redirect('/grafico.html');
    }).catch(erro => {
		console.error(`Erro: ${erro}`);
        res.status(400).json({'mensagem':`Erro ao cadastrar: ${erro}`});
    });

});

function criarResidente(nome, sintomas, cpf, dtNasc) {
    return new Promise((resolve, reject) => {
        let create = undefined;
        verificarResidente(cpf).then(exists => {
            create = !exists;
            console.log('create:', create);
            if (create) {
                let querystring = `INSERT INTO Residente (nmResidente, txtHistorico, nmrCPF, dtNascimento) VALUES ('${nome}', '${sintomas}', '${cpf}', '${dtNasc}');`;
                Database.query(querystring).then(results => {
                    resolve(results);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                });
            } else {
                reject(`Residente ${nome} já cadastrado!`);
            }
        }).catch((erro) => {
            reject(erro);
        });
    });
}

 function verificarResidente(cpf) {
    let querystring = `SELECT * FROM residente WHERE nmrCPF = '${cpf}'`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
                let existe = results.recordsets[0].length > 0;
                resolve(existe);
            }).catch(error => {
                reject(error);
            });
        });
}

router.post('/cadastrarAmbiente', (req, res, next) => {
	
	// após o body, são os nomes dos campos no formulário	
    let descricao = req.body.descr;
    let tempMax = req.body.vlrTempMax;
    let tempMin = req.body.vlrTempMin;
    let umiMax = req.body.vlrUmiMax;
    let umiMin = req.body.vlrUmiMin;

    // if (isNull(nome) || isNull(usuario) || isNull(senha)) {
    //     res.status(400).json({'mensagem': 'Nome, login e senha são obrigatórios'});
    // }

	//tirar comentário caso desejar criptografar a senha
    //senha = cryptr.encrypt(senha);

    //console.log(`name: ${nome}, username: ${usuario}, password: ${senha}`);

    criarAmbiente(descricao,tempMax,tempMin,umiMax,umiMin).then(results => {
        req.session.message = `Ambiente ${descricao} criado com sucesso`;
        res.status(302).redirect('/grafico.html');
    }).catch(erro => {
		console.error(`Erro: ${erro}`);
        res.status(400).json({'mensagem':`Erro ao cadastrar: ${erro}`});
    });

});

function criarAmbiente(descricao, tempMax, tempMin, umiMax, umiMin) {
    return new Promise((resolve, reject) => {
        let create = undefined;
        verificarAmbiente(descricao).then(exists => {
            create = !exists;
            console.log('create:', create);
            if (create) {
                let querystring = `INSERT INTO Ambiente (txtDescricao, vlrTemperaturaMax, vlrTemperaturaMin, vlrUmidadeMax, vlrUmidadeMin) VALUES ('${descricao}', ${tempMax}, ${tempMin}, ${umiMax}, ${umiMin});`;
                Database.query(querystring).then(results => {
                    resolve(results);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                });
            } else {
                reject(`Ambiente ${descricao} já cadastrado!`);
            }
        }).catch((erro) => {
            reject(erro);
        });
    });
}

 function verificarAmbiente(ambiente) {
    let querystring = `SELECT * FROM ambiente WHERE txtDescricao = '${ambiente}'`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
                let existe = results.recordsets[0].length > 0;
                resolve(existe);
            }).catch(error => {
                reject(error);
            });
        });
}


module.exports = router;