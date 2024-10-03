const express = require('express');
const router = express.Router();
const connection = require('../database');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jvitorcavalcante18@gmail.com',
        pass: 'bbnn tblh lspd yvyr'
    }
})

function enviarEmail(remetente, destinatario, imovelID, corpoCliente, valor_proposta) {
    const mailOptions = {
        from: remetente,
        to: destinatario,
        subject: 'Solicitação de visita',
        html: `
            <p>Olá</p>
            <p>O cliente enviou uma oferta nova de preço para o seu imóvel</p>
            <a href="http://localhost:3000/imovel?id=${imovelID}">Página do imóvel</a>
            <p>Aqui estão algumas informações do cliente:</p>
            <pre>${corpoCliente}</pre>
            <p>O valor proposto pelo cliente foi R$ ${valor_proposta}.</p>
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

router.get('/verpropostasenviadas', (req, res) => {
    const { clienteID } = req.query

    let query = `SELECT * FROM propostas WHERE clienteID = ${clienteID}`

    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).send(err)
        }

        return res.send(result)
    })
})

router.post('/enviarproposta', (req, res) => {
    const { clienteID, consultorID, imovelID, valor_proposta } = req.body
    let consultorEmail
    let dados_cliente

    connection.query(`SELECT consultorId FROM imoveis WHERE imoveisID = ${imovelID}`, (err, result) => {
        console.log(result[0].consultorId)
    })

    connection.query(`SELECT consultor_email FROM consultores WHERE consultorId = ${consultorID}`, (err, result) =>{
        consultorEmail = result[0].consultor_email
    })

    connection.query(`SELECT nome, email, celular FROM clientes WHERE clienteId = ${clienteID}`, (err, result) => {
        dados_cliente = `
        Nome: ${result[0].nome},
        Email: ${result[0].email},
        Telefone: ${result[0].celular}
        `
    })

    let query = `INSERT INTO propostas (clienteID, imovelID, consultorID, valor_proposta, status_proposta) VALUES (${clienteID}, ${imovelID}, ${consultorID}, ${valor_proposta}, "pendente")`
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        enviarEmail("jvitorcavalcante18@gmail.com", consultorEmail, imovelID, dados_cliente, valor_proposta)
        return res.send(result)
    })
})

module.exports = router