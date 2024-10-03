USE websiteInfo;

CREATE TABLE IF NOT EXISTS propostas (
    propostaID INTEGER PRIMARY KEY AUTO_INCREMENT,
    clienteID INTEGER,
    imovelID INTEGER,
    consultorID INTEGER,
    valor_proposta FLOAT,
    status_proposta ENUM("cancelada", "pendente", "aceita"),
    FOREIGN KEY (clienteID) REFERENCES clientes(clienteId),
    FOREIGN KEY (imovelID) REFERENCES imoveis(imoveisID),
    FOREIGN KEY (consultorID) REFERENCES consultores(consultorId)
);