'use strict';

// configurações gerais, mexer com cautela
var express = require('express');
var router = express.Router();
var isNull = require('../script').isNull;
var Database = require('../Database');
const Cryptr = require('cryptr');
const config = require('../config');
const cryptr = new Cryptr(config.security.key);
const moment = require('moment-timezone');
// configurações gerais, mexer com cautela

var ambiente;
var ultimo;
var primeiro;

// consulta que retorna os N últimos registros de leitura
router.get('/ultimas/:amb', (req, res, next) => {

    ambiente = req.params.amb;
    //console.log(req.params.amb);
    var limite_linhas = 10;

    if(ambiente != null){
        Database.query(`SELECT DISTINCT TOP ${limite_linhas} * FROM dado  
                        Where arduino = (Select Ambiente from arduino Where Ambiente = (Select idAmbiente from ambiente where txtDescricao = '${ambiente}' ))
                        order by dtDia desc`).then(resultados => {
            resultados = resultados.recordsets[0];
            ultimo = resultados[9].idDado;
            primeiro = resultados[0].idDado;
            //console.log(resultados);
            res.json(resultados);
        }).catch(error => {
            console.log(error);
            res.status(400).json({"error": `erro na consulta junto ao banco de dados ${error}`});
        });
    }

});

// consulta que retorna as médias de temperatura e umidade
router.get('/medias', (req, res, next) => {

    Database.query(`SELECT avg(vlrTemperatura) as media_temp, avg(vlrUmidade) as media_umid FROM Dado`).then(resultados => {
        var linha = resultados.recordsets[0][0];
        var temperatura = linha.media_temp.toFixed(2);
        var umidade = linha.media_umid.toFixed(2);
        res.json({temperatura:temperatura, umidade:umidade});
    }).catch(error => {
        console.log(error);
        res.status(400).json({"error": `erro na consulta junto ao banco de dados ${error}`});
    });

});

router.get('/estatisticas/:amb', (req, res, next) => {

    //ambiente = req.params.amb;


    if(ambiente != null){
        Database.query(`Select distinct 
                        MIN([vlrTemperatura]) OVER(PARTITION BY 1) AS [minTemp],
                        PERCENTILE_CONT(0.25) WITHIN GROUP(ORDER BY [vlrTemperatura]) OVER(PARTITION BY 1) AS [primeiroQTemp],
                        PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY [vlrtemperatura]) OVER(PARTITION BY 1) AS [medianaTemp],
                        AVG(CAST([vlrTemperatura] AS DECIMAL(30,2))) OVER(PARTITION BY 1) AS [mediaTemp],
                        PERCENTILE_CONT(0.75) WITHIN GROUP(ORDER BY [vlrTemperatura]) OVER(PARTITION BY 1) AS [terceiroQTemp],
                        MAX([vlrTemperatura]) OVER(PARTITION BY 1) AS [maxTemp],
                        MIN([vlrUmidade]) OVER(partition by 1) AS [minUmi],
                        PERCENTILE_CONT(0.25) WITHIN GROUP(ORDER BY [vlrUmidade]) OVER(PARTITION BY 1) AS [primeiroQUmi],
                        PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY [vlrUmidade]) OVER(PARTITION BY 1) AS [medianaUmi],
                        AVG(CAST([vlrUmidade] AS DECIMAL(30,2))) OVER(PARTITION BY 1) AS [mediaUmi],
                        PERCENTILE_CONT(0.75) WITHIN GROUP(ORDER BY [vlrUmidade]) OVER(PARTITION BY 1) AS [terceiroQUmi],
                        MAX([vlrUmidade]) OVER(PARTITION BY 1) AS [maxUmi]
                        FROM dado Where arduino = (Select Ambiente from arduino Where Ambiente = 
                        (Select idAmbiente from ambiente where txtDescricao = '${ambiente}' )) AND 
                        idDado between ${ultimo} AND ${primeiro}`).then(resultados => {
                            var linha = resultados.recordsets[0][0];
                            var mediaTemp = linha.mediaTemp.toFixed(2);
                            var mediaUmi = linha.mediaUmi.toFixed(2);
                            var minTemp = linha.minTemp.toFixed(2);
                            var maxTemp = linha.maxTemp.toFixed(2);
                            var minUmi = linha.minUmi.toFixed(2);
                            var maxUmi = linha.maxUmi.toFixed(2);
                            var medianaTemp = linha.medianaTemp.toFixed(2);
                            var medianaUmi = linha.medianaUmi.toFixed(2);
                            var primeiroQTemp = linha.primeiroQTemp.toFixed(2);
                            var terceiroQTemp = linha.terceiroQTemp.toFixed(2);
                            var primeiroQUmi = linha.primeiroQUmi.toFixed(2);
                            var terceiroQUmi = linha.terceiroQUmi.toFixed(2);

                            res.json({mediaTemp: mediaTemp, mediaUmi: mediaUmi, minTemp: minTemp, maxTemp: maxTemp,
                                    minUmi: minUmi, maxUmi: maxUmi, medianaTemp: medianaTemp, medianaUmi: medianaUmi,
                                    primeiroQTemp: primeiroQTemp, terceiroQTemp: terceiroQTemp,
                                    primeiroQUmi: primeiroQUmi, terceiroQUmi:terceiroQUmi})
                        }).catch(error => {
                            console.log(error);
                            res.status(400).json({"error": `erro na consulta junto ao banco de dados ${error}`});
                        });
        }
});

router.get('/preencheComboBox', (req, res, next) => {

    Database.query(`SELECT txtDescricao FROM ambiente order by txtDescricao`).then(resultados => {
        resultados = resultados.recordsets[0];
        res.json(resultados);
    }).catch(error => {
        console.log(error);
        res.status(400).json({"error": `erro na consulta junto ao banco de dados ${error}`});
    });

});

router.get('/alerta/:amb', (req, res, next) => {

    //ambiente = req.params.amb;

    if(ambiente != null){
        Database.query(`SELECT vlrTemperaturaMax, vlrTemperaturaMin, vlrUmidadeMax, vlrUmidadeMin From Ambiente Where txtDescricao = '${ambiente}'`).then(resultados => {
            resultados = resultados.recordsets[0];
            res.json(resultados);
        }).catch(error => {
            console.log(error);
            res.status(400).json({"error": `erro na consulta junto ao banco de dados ${error}`});
        });
    }

});

module.exports = router;