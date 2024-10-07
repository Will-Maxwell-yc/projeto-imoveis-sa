USE websiteInfo;

CREATE TABLE IF NOT EXISTS visitas (
    visitaId INTEGER PRIMARY KEY AUTO_INCREMENT,
    clienteId INTEGER NULL,
    imoveisID INTEGER NOT NULL,
    consultorId INTEGER NOT NULL,
    data_visita DATETIME NOT NULL,
    comentario VARCHAR(250) NULL,
    nome_cliente VARCHAR(255) NULL,
    email_cliente VARCHAR(255) NULL,
    FOREIGN KEY (clienteId) REFERENCES clientes(clienteId),
    FOREIGN KEY (imoveisID) REFERENCES imoveis(imoveisID),
    FOREIGN KEY (consultorId) REFERENCES consultores(consultorId)
);