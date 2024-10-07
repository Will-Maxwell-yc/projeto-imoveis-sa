const express = require('express')
const router = express.Router()
const connection = require('../database')
const authCliente = require('../middleware/authCliente')
const nodemailer = require('nodemailer')
require('dotenv').config()

//Configuração do nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'juninhojoka11@gmail.com',
        pass: 'juninhojr11'
    }
})

// função para enviar e-mail
function enviarEmail(remetente, destinatario, imovelID, corpoCliente, dataVisita) {
    const mailOptions = {
        from: remetente,
        to: destinatario,
        subject: 'Solicitação de visita',
        html: `
            <p> Olá</p>
            <p>O cliente solicitou uma visita para o seguinte imóvel:</p>
            <a href="http://localhost:3000/imovel?id=${imovelID}">Página do imóvel</a>
            <p>Aqui estão algumas informações do cliente:</p>
            <pre>${corpoCliente}</pre>
            <p>A visita está agendada para a data ${dataVisita}.</p>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error)
        } else {
            console.log('Email enviado com sucesso:', info.response)
        }
    })
}

// Rota para verificar a disponibilidade e agendar visita 
router.post('/', authCliente, (req, res) => {
    const { imoveisID, data_visita } = req.body
    const clienteId = req.clienteId

    const sql = ` INSERT INTO visitas (clienteId, imoveisID, data_visita) VALUES (?, ?, ?)`

    connection.query(sql, [clienteId, imoveisID, data_visita], (err, results) => {
        if (err) {
            console.error('Erro ao agendar a visita: ', err)
            return res.status(500).json({ error: 'Erro ao agendar a visita' })
        }
        // Após o agendamento buscando informações para enviar o email
        const consultaImovel = `
        SELECT *
        FROM imoveis
        WHERE imoveisID = ?
    `;
        connection.query(consultaImovel, [imoveisID], (err, resultsImovel) => {
            if (err) {
                console.error('Erro ao buscar informações no imóvel:', err)
                return req.status(500).json({ error: 'Erro ao buscar informações no imóvel' })
            }

            const consultaCliente = `
            SELECT * 
            FROM clientes
            WHERE clienteId = ?
        `
            connection.query(consultaCliente, [clienteId], (err, resultsCliente) => {
                if (err) {
                    console.error('Erro ao buscar inforamções do cliente')
                    return res.status(500).json({ error: 'Erro ao buscar inforamções do cliente' })
                }
                if (resultsImovel.length > 0 && resultsCliente.length > 0) {
                    const corpoImovel = JSON.stringify(resultsImovel[0], null, 2);
                    const corpoCliente = JSON.stringify(resultsCliente[0], null, 2)

                    enviarEmail(process.env.EMAIL_DESTINATARIO, corpoImovel, corpoCliente, data_visita)

                    res.json({ message: 'Visita agendada com sucesso ' })
                } else {
                    res.status(404).json({ error: 'Imóvel ou cliente não encontrado ' })
                }
            })
        })
    })
})
router.get('/visitas', (req, res) => {
    const { clienteID, consultorID } = req.query;

    let query = `
        SELECT v.visitaId, v.comentario, v.clienteId, i.imoveisID, v.consultorId, v.data_visita, v.comentario, 
        i.tipo, i.endereco, i.numero, i.bairro, i.cidade, i.cep, i.quartos, i.banheiros, i.preco_venda, i.preco_aluguel, 
        i.tamanho, i.disponibilidade, i.vagas, co.nome AS nome_consultor, co.consultor_email, 
        IFNULL(ci.email, v.email_cliente) AS cliente_email, IFNULL(ci.nome, v.nome_cliente) AS nome_cliente
        FROM visitas AS v 
        JOIN imoveis AS i ON v.imoveisID = i.imoveisID 
        JOIN consultores AS co ON v.consultorId = co.consultorId 
        LEFT JOIN clientes AS ci ON v.clienteId = ci.clienteId
    `;

    if (clienteID) {
        query += ` WHERE v.clienteId = ${clienteID}`;
    } else if (consultorID) {
        query += ` WHERE v.consultorId = ${consultorID}`;
    }

    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

router.get('/getconsultores', (req, res) => {
    const {clienteID} = req.query

    let query = "SELECT DISTINCT c.consultorId, c.nome, c.consultor_email FROM visitas JOIN consultores AS c ON visitas.consultorId = c.consultorId WHERE clienteId = 1"

    connection.query(query, [clienteID], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
})
router.post('/agendarvisita', (req, res) => {
    const { clienteID, consultorID, imovelID, data_visita, comentario, nome, email } = req.body

    let dados_cliente;
    let consultorEmail;

    // Verifica se a data já está reservada
    connection.query("SELECT * FROM visitas WHERE imoveisID = ? AND data_visita = ?", [imovelID, data_visita], (req, result) => {
        if(result.length > 0) {
            return res.send(JSON.stringify({agendado: false, mensagem: "A data solicitada já está reservada"}));
        }

        if (clienteID) {
            // Cliente cadastrado
            connection.query("SELECT nome, email, celular FROM clientes WHERE clienteId = ?", [clienteID], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                dados_cliente = `
                    Nome: ${result[0].nome},
                    Email: ${result[0].email},
                    Telefone: ${result[0].celular}
                `;
            });
        } else {
            // Cliente não cadastrado, usa o nome e email fornecidos
            dados_cliente = `
                Nome: ${nome},
                Email: ${email}
            `;
        }

        // Busca o email do consultor
        connection.query("SELECT consultor_email FROM consultores WHERE consultorId = ?", [consultorID], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            consultorEmail = result[0].consultor_email;
        });

        // Insere a visita no banco de dados (clienteID pode ser null, e nome/email fornecidos se cliente não estiver cadastrado)
        connection.query(
            "INSERT INTO visitas (clienteId, imoveisID, consultorId, data_visita, comentario, nome_cliente, email_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [clienteID || null, imovelID, consultorID, data_visita, comentario, nome || null, email || null], 
            (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // Envia o email após agendar
                enviarEmail("juninhojoka11@gmail.com", consultorEmail, imovelID, dados_cliente, data_visita, comentario);
                return res.send({ agendado: true });
            }
        );
    });
});


router.get('/cancelarvisita/:id', (req, res) => {
    const visitaId = req.params.id

    const query = "SELECT * FROM visitas WHERE visitaId = ?"
    connection.query(query, [visitaId], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }

        res.send(result)
    })
})
module.exports = router