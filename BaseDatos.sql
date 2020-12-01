CREATE TABLE usuario (
  id_usuario int(11) NOT NULL AUTO_INCREMENT,
  apodo varchar(100) DEFAULT NULL,
  contra varchar(255) DEFAULT NULL,
  foto varchar(200) DEFAULT NULL,
  nombre varchar(200) DEFAULT NULL,
  correo varchar(200) DEFAULT NULL,
  tipo int(11) DEFAULT '1',
  PRIMARY KEY (id_usuario)
) 

CREATE TABLE tema (
	id_tema INT auto_increment NOT NULL,
	tema TEXT NULL,
	tipo INT DEFAULT 0 NULL,
	id_usuario INT NULL,
    vistas INT NULL DEFAULT 0,
	fecha DATETIME DEFAULT now() NOT NULL,
	CONSTRAINT tema_PK PRIMARY KEY (id_tema),
	CONSTRAINT tema_FK FOREIGN KEY (id_usuario) REFERENCES foro.usuario(id_usuario)
)

CREATE TABLE foro.comentario (
	id_comentario INT auto_increment NOT NULL,
	id_usuario INT NULL,
	comentario TEXT NULL,
	fecha DATETIME DEFAULT now() NULL,
	id_tema INT NULL,
	CONSTRAINT comentario_PK PRIMARY KEY (id_comentario),
	CONSTRAINT comentario_FK FOREIGN KEY (id_usuario) REFERENCES foro.usuario(id_usuario),
	CONSTRAINT comentario_FK_1 FOREIGN KEY (id_tema) REFERENCES foro.tema(id_tema)
)