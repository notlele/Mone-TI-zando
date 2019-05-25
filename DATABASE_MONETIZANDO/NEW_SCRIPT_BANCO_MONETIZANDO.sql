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
	add foreign key (idBanco) references TBD_BANCO(idBanco)
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
	add foreign key (idCpu) references TBD_CPU(idCpu),
	add foreign key (idHd) references TBD_HD(idHd),
	add foreign key (idMemoria) references TBD_MEMORIA(idMemoria)
	);
	--
    
    
create table TBR_CAIXA(
	idCaixa varchar(2) primary key identity (1,1),
    idBanco int,
    idAgencia int,
    idMonitoramento int,
	add foreign key (idBanco) references TBD_BANCO(idBanco),
	add foreign key (idAgencia) references TBR_AGENCIA(idAgencia),
	add foreign key (idMonitoramento) references TBR_MONITORAMENTO(idMonitoramento)
    );
	

	