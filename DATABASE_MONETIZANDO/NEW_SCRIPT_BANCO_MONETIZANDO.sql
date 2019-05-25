create table TBD_BANCO(
	idBanco int primary key identity (1,1),
    nomeBanco varchar(30),
    CNPJ char(14),
    telefone char(15),
    email varchar(30),
    tipoContrato varchar(50),
    qtdeAgencia char(6),
    senha varchar(30)
    );
	
	create table TBD_CPU(
    idCpu int primary key identity (1,1),
	CPU_USE int,
    cpuMax float,
    cpuMin float,
    cpuUptime time,
    cpuDowntime time
	);
	--
	--
	create table TBD_MEMORIA(
    idMemoria int primary key identity (1,1)
	MEMORIA_USE int,
    memoriaMax float,
    memoriaMin float,
    memoriaUptime time,
    memoriaDowntime time,
	);
	--
	--
	create table TBD_HD(
    idHd int primary key identity (1,1)
	DISCO_USE int,--uso atual
    discoMax float,--capacidade
    discoMin float,--capacidade
    discoUptime time,
    discoDowntime time
	);
    
	
create table TBR_AGENCIA(
	idAgencia int primary key,
    idBanco int,  
    qtdeCaixas char(2),
	CONSTRAINT FK_idBanco_agencia foreign key (idBanco) references TBD_BANCO(idBanco)
    );
	
	create table TBR_MONITORAMENTO(
	idMonitoramento int primary key identity (1,1),
    --idBanco int,
    --idAgencia int,
    --idCaixa int,
	mac_address char(15),
	momento datetime,
	idCpu int,
	idHd int,
	idMemoria int,
	CONSTRAINT FK_idCpu
	foreign key (idCpu) references TBD_CPU(idCpu),
	CONSTRAINT FK_idHd
	foreign key (idHd) references TBD_HD(idHd),
	CONSTRAINT FK_idMemoria
	foreign key (idMemoria) references TBD_MEMORIA(idMemoria)
	);
	--
    
    
create table TBR_CAIXA(
	idCaixa varchar(2) primary key identity (1,1),
    idBanco int,
    idAgencia int,
    idMonitoramento int,
	CONSTRAINT FK_idBanco
	foreign key (idBanco) references TBD_BANCO(idBanco),
	CONSTRAINT FK_idAgencia_caixa
	foreign key (idAgencia) references TBR_AGENCIA(idAgencia),
	foreign key (idMonitoramento) references TBR_MONITORAMENTO(idMonitoramento)
    );
	

CREATE TABLE TBD_CMD_REMOTO(
	ID_CMD_REMOTO INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	ID_CAIXA INT,
	COMANDO VARCHAR(9000),
	JA_EXECUTADO CHAR(1)
	CONTINUAR_EXECUTANDO CHAR(1),
	MOMENTO DATETIME
);


CREATE TABLE TBA_CMD_REMOTO_CONTEUDO (
	ID_CMD_REMOTO_CONTEUDO int PRIMARY KEY IDENTITY (1,1) NOT NULL,
	ID_CMD_REMOTO INT,
	DT_CADASTRO DATETIME,
	RETORNO_CMD NVARCHAR(max)
);

	

	