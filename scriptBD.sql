create table TBD_BANCO(
	idBanco int primary key auto_increment,
    nomeBanco varchar(30),
    CNPJ char(14),
    telefone char(15),
    email varchar(30),
    tipoContrato varchar(50)
    qtdeAgencia char(6));
    
create table TBR_AGENCIA(
	idAgencia int primary key,
    idBanco int,  
    qtdeCaixas char(2)
    );
    
    
create table TBD_CAIXA(
	idCaixa varchar(2) primary key,
    idAgencia int
    );

create table TBR_MONITORAMENTO(
	idMonitoramento int primary key auto_increment,
    idBanco int;
    idAgencia int;
    idCaixa int;
    codBarras varchar(50)
    );
    
create table TBD_CPU (
    idCpu int primary key;
    idMax float;
    idMin float;
    idUptime float;
    idDowntime float;
    );
    
create table TBD_MEMORIA (
    idCpu int primary key;
    idMax float;
    idMin float;
    idUptime float;
    idDowntime float;
    );
    
create table TBD_DISCO (
    idCpu int primary key;
    idMax float;
    idMin float;
    idUptime float;
    idDowntime float;
    );




    
    
		