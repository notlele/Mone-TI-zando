create table TBD_BANCO(
	idBanco int primary key auto_increment,
    nomeBanco varchar(30),
    CNPJ char(14),
    telefone char(15),
    email varchar(30),
    tipoContrato varchar(50),
    qtdeAgencia char(6));
    
create table TBR_AGENCIA(
	idAgencia int primary key,
    idBanco int,  
    qtdeCaixas char(2)
    );
    
    
create table TBR_CAIXA(
	idCaixa varchar(2) primary key,
    idBanco int,
    idAgencia int,
    idMonitoramento int
    );

create table TBD_MONITORAMENTO(
	idMonitoramento int primary key auto_increment,
    idBanco int,
    idAgencia int auto_increment,
    idCaixa int,
    CPU_USE int,
    cpuMax float,
    cpuMin float,
    cpuUptime time,
    cpuDowntime time,
    MEMORIA_USE int,
    memoriaMax float,
    memoriaMin float,
    memoriaUptime time,
    memoriaDowntime time,
    DISCO_USE int,
    discoMax float,
    discoMin float,
    discoUptime time,
    discoDowntime time
    );
    


alter table TBR_AGENCIA add foreign key (idBanco) references TBD_BANCO(idBanco);

alter table TBR_CAIXA add foreign key (idBanco) references TBD_BANCO(idBanco);
alter table TBD_CAIXA add foreign key (idAgencia) references TBR_AGENCIA(idAgencia);
alter table TBD_CAIXA add foreign key (idMonitoramento) references TBD_MONITORAMENTO(idMonitoramento);

alter table TBD_MONITORAMENTO add foreign key (idBanco) references TBD_BANCO(idBanco);
alter table TBD_MONITORAMENTO add foreign key (idAgencia) references TBR_AGENCIA(idAgencia);
alter table TBD_MONITORAMENTO add foreign key (idCaixa) references TBD_CAIXA(idCaixa);




    
    
		