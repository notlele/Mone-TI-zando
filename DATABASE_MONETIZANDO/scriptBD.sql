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
    idBanco
    idAgencia int;
    idMonitoramento int;
    );

create table TBR_MONITORAMENTO(
	idMonitoramento int primary key auto_increment,
    idBanco int;
    idAgencia int;
    idCaixa int;
    CPU 
    idMax float;
    idMin float;
    idUptime time;
    idDowntime time;
    );
    


alter table TBR_AGENCIA add foreign key (idBanco) references TBD_BANCO(idBanco);

alter table TBR_MONITORAMENTO add foreign key (idBanco) references TBD_BANCO(idBanco);
alter table TBR_MONITORAMENTO add foreign key (idAgencia) references TBR_AGENCIA(idAgencia);
alter table TBR_MONITORAMENTO add foreign key (idCaixa) references TBD_CAIXA(idCaixa);




    
    
		