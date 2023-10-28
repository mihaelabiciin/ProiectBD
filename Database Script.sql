#source C:/wamp64/bin/mysql/mysql8.0.31/data/proiectbd.sql;

DROP DATABASE IF EXISTS litoral;
CREATE DATABASE litoral;
USE litoral;


CREATE TABLE tblLocatii(
    id SMALLINT(3) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nume VARCHAR(45) NOT NULL,
    descriere VARCHAR(150)
);

DESCRIBE tblLocatii;

CREATE TABLE tblHoteluri(
    id SMALLINT(3) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nume VARCHAR(45) NOT NULL,
    numarStele SMALLINT(1),
	notaRecenzieHotel FLOAT,
	adresa VARCHAR(100) NOT NULL,
	contact VARCHAR(10),
    micDejun BOOLEAN,
    pretMicDejun FLOAT,
	idLocatie SMALLINT(3) UNSIGNED,
	CONSTRAINT fk_tblHoteluri_tblLocatii  FOREIGN KEY (idLocatie) 
    REFERENCES tblLocatii(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

DESCRIBE tblHoteluri;

CREATE TABLE tblRestaurante(
    id SMALLINT(3) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nume VARCHAR(45) NOT NULL,
	notaRecenzie FLOAT,
	adresa VARCHAR(100) NOT NULL,
	contact VARCHAR(10),
	specificRestaurant VARCHAR(50) DEFAULT "Nespecificat",
	idLocatie SMALLINT(3) UNSIGNED,
	CONSTRAINT fk_tblRestaurante_tblLocatii  FOREIGN KEY (idLocatie) 
    REFERENCES tblLocatii(id) ON DELETE CASCADE ON UPDATE CASCADE 
);


DESCRIBE tblRestaurante;


CREATE TABLE tblActivitati(
    id SMALLINT(3) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nume VARCHAR(45) NOT NULL,
	pret FLOAT NOT NULL,
	antrenor BOOLEAN DEFAULT FALSE,
	contact VARCHAR(10) DEFAULT NULL,
	idLocatie SMALLINT(3) UNSIGNED,
	CONSTRAINT fk_tblActivitati_tblLocatii  FOREIGN KEY (idLocatie) 
    REFERENCES tblLocatii(id) ON DELETE CASCADE ON UPDATE CASCADE 
);


DESCRIBE tblActivitati;


CREATE TABLE tblCamere(
    id SMALLINT(3) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tip VARCHAR(50) DEFAULT "Nespecificat",
    pret FLOAT NOT NULL,
	aerConditionat BOOLEAN,
    wiFi BOOLEAN,
    balcon BOOLEAN,
    frigider BOOLEAN,
	idHotel SMALLINT(3) UNSIGNED,
	CONSTRAINT fk_tblCamere_tblHoteluri FOREIGN KEY (idHotel) 
    REFERENCES tblHoteluri(id) ON DELETE CASCADE ON UPDATE CASCADE 
);


DESCRIBE tblCamere;

INSERT INTO tblLocatii VALUES(0,"Mamaia", NULL);
INSERT INTO tblLocatii VALUES(0,"Venus", NULL);
SELECT * FROM tblLocatii;

INSERT INTO tblHoteluri VALUES(0, "Perla", 5,4.2, "Str. Belvedere", "0785372852",TRUE,50,2);
INSERT INTO tblHoteluri VALUES (0, "Diona", 3, 3.5, "Str. Elisabeta", "0711222333", TRUE, 0, 1);
SELECT * FROM tblHoteluri;

INSERT INTO tblRestaurante VALUES(0,"Scoica", 5.35, "Str. Belvedere", "0785372852","vegan",1);
SELECT * FROM tblRestaurante;

INSERT INTO tblActivitati VALUES(0,"Surf", 230, TRUE, "0785372852",1);
SELECT * FROM tblActivitati;

INSERT INTO tblCamere VALUES(0,"Single",260.0, FALSE,TRUE,TRUE,TRUE,1);
SELECT * FROM tblCamere;