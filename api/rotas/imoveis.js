const express = require('express')
const router = express.Router()
const connection = require('../database')
const authconsultor = require('../middleware/authConsultor')
const path = require('path')
const { rawListeners } = require('process')

// conexão com a tabela "imoveis"
router.get('/', (req, res) => {
    connection.query(`SELECT * FROM imoveis`, (err, results, fields) => {
        if (err) {
            console.error('Erro ao buscar infomações:', err)
            res.status(500).json({ error: 'Erro ao buscar informações no banco de dados' })
            return
        }

        res.json(results)
    })
})
// Rota para buscar imóveis
router.get('/busca', (req, res) => {

    const { tipo, bairro, cidade, quartos, banheiros, precoVendaMin, precoVendaMax, precoAluguelMin, precoAluguelMax, qualidadeMax, qualidadeMin } = req.query
    const disponibilidade = req.query.disponibilidade ? req.query.disponibilidade.split(',') : []

    let sqlQuery = 'SELECT * FROM imoveis WHERE 1'

    if (tipo) {
        const tipos = tipo.split(',').map(t => `'${t.trim()}'`).join(',')
        sqlQuery += ` AND tipo IN (${tipos})`
    }

    if (bairro) {
        const bairros = bairro.split(',').map(b => `'${b.trim()}'`).join(',');
        sqlQuery += ` AND bairro IN (${bairros})`
    }

    if (cidade) {
        sqlQuery += ` AND cidade = '${cidade}'`
    }

    if (quartos) {
        sqlQuery += ` AND quartos = '${quartos}'`
    }

    if (banheiros) {
        sqlQuery += ` AND banheiros = '${banheiros}'`
    }
    if (disponibilidade.length) {
        const dispoConditions = disponibilidade.map(d => `(disponibilidade = '${d}' OR disponibilidade = 'venda_e_aluguel')`).join(' OR ');
        sqlQuery += ` AND (${dispoConditions})`;
    }

    if (precoVendaMin && precoVendaMax) {
        sqlQuery += ` AND preco_venda BETWEEN ${precoVendaMin} AND ${precoVendaMax}`
    } else if (precoVendaMin) {
        sqlQuery += ` AND preco_venda >= ${precoVendaMin}`
    } else if (precoVendaMax) {
        sqlQuery += ` AND preco_venda <= ${precoVendaMax}`
    }

    if (precoAluguelMin && precoAluguelMax) {
        sqlQuery += ` AND preco_aluguel BETWEEN ${precoAluguelMin} AND ${precoAluguelMax}`
    } else if (precoAluguelMin) {
        sqlQuery += ` AND preco_aluguel >= ${precoAluguelMin}`
    } else if (precoAluguelMax) {
        sqlQuery += ` AND preco_aluguel <= ${precoAluguelMax}`
    }
    if (qualidadeMin && qualidadeMax) {
        sqlQuery += ` AND qualidade BETWEEN ${qualidadeMin} AND ${qualidadeMax}`
    } else if (qualidadeMin) {
        sqlQuery += ` AND qualidade >= ${qualidadeMin}`
    } else if (qualidadeMax) {
        sqlQuery += ` AND qualidade <= ${qualidadeMax}`
    }

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis' })
        }

        res.json(results)
    })
})
// rota para adicionar imoveis 
router.post('/adicionar', (req, res) => {
    
    const { tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, disponibilidade, qualidade, tamanho } = req.body;

    // Validar dados recebidos (validação simples)
    if (!tipo || !endereco || !numero || !bairro || !cidade || !cep || !quartos || !banheiros || !descricao || !preco_venda || !disponibilidade || !qualidade || !tamanho) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const imovel = {
        tipo,
        endereco,
        numero,
        bairro,
        cidade,
        cep,
        quartos: parseInt(quartos),
        banheiros: parseInt(banheiros),
        descricao,
        preco_aluguel: preco_aluguel === "null" || preco_aluguel === "0" ? null : parseFloat(preco_aluguel),
        preco_venda: preco_venda === "null" || preco_venda === "0" ? null : parseFloat(preco_venda),
        disponibilidade,
        qualidade,
        tamanho: parseFloat(tamanho),
        
    };

    connection.query('INSERT INTO imoveis SET ?', imovel, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar imóvel:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
        }
        const newId = result.insertId;
        console.log('Imóvel cadastrado com sucesso! ID:', newId);
        res.status(201).json({ id: newId, message: 'Imóvel cadastrado com sucesso!', imovel });
    });
})
// Rota de deletar imóvel 
router.delete('/deletar/:id', authconsultor, (req, res) => {
    const imovelID = req.params.id
    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    // Verificar se o imovel com ID especificado existe
    connection.query('SELECT * FROM imoveis WHERE imoveisID = ? AND consultorId = ? ', [imovelID, consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel:', err)
            return res.status(500).json({ error: 'Erro ao bucar imóvel' })
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Você não tem permissão para deletar esse imovel ' })
        }

        const imovel = results[0]

        // Se o imovel existe, executa aquery para deleta-lo
        connection.query('DELETE FROM imoveis WHERE imoveisID = ?  ', imovelID, (err, result) => {
            if (err) {
                console.error('Erro ao deletar imóvel:', err)
                return res.status(500).json({ error: 'Erro ao deletar imóvel' })
            }

            console.log('Imovel deletado com sucesso!')
            res.status(200).json({ message: 'Imovel deletado com sucesso!', imovelDeletado: imovel })
        })
    })
})
// Rota de atualizar imóvel
router.put('/atualizar/:id', authconsultor, (req, res) => {
    const imovelID = req.params.id
    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    // Parâmetros para atualizar
    const { tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, tamanho, qualidade, disponibilidade } = req.body

    if (!tipo || !endereco || !numero || !bairro || !cidade || !cep || !quartos || !banheiros || !descricao || !preco_venda || !preco_aluguel || tamanho == null || !qualidade || !disponibilidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    connection.query('SELECT * FROM imoveis WHERE imoveisID = ? AND consultorId = ?', [imovelID, consultorId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar o imóvel no banco de dados' })
        }
        if (results.length === 0) {
            return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para atualizar esse imóvel' })
        }
        const imovelAtualizado = {
            tipo,
            endereco,
            numero,
            bairro,
            cidade,
            cep,
            quartos: parseInt(quartos),
            banheiros: parseInt(banheiros),
            descricao,
            preco_aluguel: preco_aluguel === "null" || preco_aluguel === "0" ? null : parseFloat(preco_aluguel),
            preco_venda: preco_venda === "null" || preco_venda === "0" ? null : parseFloat(preco_venda),
            qualidade,
            disponibilidade,
            tamanho: parseFloat(tamanho)
        }

        connection.query('UPDATE imoveis SET ? WHERE imoveisID = ?', [imovelAtualizado, imovelID], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar imóvel:', err)
                return res.status(500).json({ error: 'Erro ao atualizar imóvel' })
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Imóvel não encontrado' })
            }
            console.log('Imóvel atualizado com sucesso!')
            return res.status(200).json({ message: 'Imóvel atualizado com sucesso!', imovelAtualizado })
        })
    })
})
// Rotas de disponibilidade {venda e aluguel }
// Rota para separar disponibilidade de venda
router.get('/venda', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis WHERE disponibilidade IN ("venda", "venda_e_aluguel")'

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel para venda:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis para a venda' })
        }
        console.log('Imóvel buscado com sucesso!')
        res.json(results)
    })
})
// Rota para separar disponibilidade de aluguel
router.get('/aluguel', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis WHERE disponibilidade IN ("aluguel", "venda_e_aluguel")'

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel para aluguel:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis para a aluguel' })
        }
        res.json(results)
    })
})
//rota para pegar todas as cidades disponíveis
router.get('/cidades', (req, res) => {
    let sqlQuery = 'SELECT DISTINCT cidade FROM imoveis ORDER BY cidade ASC'
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cidades disponíveis: ', err)
            return res.status(500).json({ error: 'Erro ao buscar cidades disponíveis' })
        }
        res.json(results)
    })
})
// rota para pegar as cidades disponíveis dos imóveis a venda
router.get('/cidadesvenda', (req, res) => {
    let sqlQuery = 'SELECT DISTINCT cidade FROM imoveis WHERE disponibilidade = "venda" OR disponibilidade = "venda_e_aluguel" ORDER BY cidade ASC'
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cidades disponíveis: ', err)
            return res.status(500).json({ error: 'Erro ao buscar cidades disponíveis' })
        }
        res.json(results)
    })
})
// rota para pegar as cidades disponíveis dos imóveis para alugar
router.get('/cidadesaluguel', (req, res) => {
    let sqlQuery = 'SELECT DISTINCT cidade FROM imoveis WHERE disponibilidade = "aluguel" OR disponibilidade = "venda_e_aluguel" ORDER BY cidade ASC'
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cidades disponíveis: ', err)
            return res.status(500).json({ error: 'Erro ao buscar cidades disponíveis' })
        }
        res.json(results)
    })
})
// rota para pegar o imóvel por id 
router.get('/buscarimovelid', (req, res) => {
    const imovelID = req.query.id

    let sqlQuery = 'SELECT * FROM imoveis WHERE imoveisID = ?'
    connection.query(sqlQuery, [imovelID], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel por id:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis por id ' })
        }
        res.json(results)
    })
})

router.get('/ordenarimovelqualidade', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis ORDER BY qualidade DESC'
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar imóveis por qualidade ' })
        }

        res.json(results)
    })
})

router.get('/porConsultor', (req, res) => {
    const { consultorId } = req.query

    if (!consultorId) {
        return res.status(400).json({ error: 'ConsultorId é obrigatório' });
    }

    const sqlQuery = 'SELECT * FROM imoveis WHERE consultorId = ?'
    connection.query(sqlQuery, [consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err);
            return res.status(500).json({ error: 'Erro ao buscar imóveis' })
        }

        res.json(results)
    })
})
// rota para busacar imagem por id do imovel 
router.get('/imagensimovel/:id', (req, res) => {
    const id = req.params.id.trim()
    const caminhoImagem = path.join(__dirname, '../imagens-imovel', `imovel${id}.jpg`)

    console.log(caminhoImagem)

    res.sendFile(caminhoImagem, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err)
            res.status(404).send('Imagem não encontrada')
        }
    })
})

// adicionar e pegar os imoveis marcados como favoritos pelos usuarios
router.get('/favoritos', (req, res) => {
    const { clienteID } = req.query

    const query = 'SELECT * FROM imoveis WHERE imoveisID IN (SELECT imovelID FROM favoritos WHERE clienteID = ?)'

    connection.query(query, [clienteID], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.json(results)
    })
})

router.post('/adicionarimovelfavorito', (req, res) => {
    const { clienteID, imovelID } = req.body

    const query = 'INSERT INTO favoritos (clienteID, imovelID) VALUES (?, ?)'

    connection.query(query, [clienteID, imovelID], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send('Produto adicionado aos favoritos')
    })
})

router.delete('/removerimovelfavorito', (req, res) => {
    const { clienteID, imovelID } = req.body

    const query = "DELETE FROM favoritos WHERE clienteID = ? AND imovelID = ?"

    connection.query(query, [clienteID, imovelID], (err, result) =>{
        if(err){
            return res.status(500).send(err)
        }
        res.send('Produto removido dos favoritos')
    })
})

router.get('/visitascliente', (req, res) => {
    const {id} = req.query

    const query = "SELECT * FROM visitas WHERE clienteId = ?"

    connection.query(query, [id], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
})
router.get('/visitasconsultor', (req, res) => {
    const {id} = req.query

    const query = "SELECT * FROM visitas WHERE consultorId = ?"

    connection.query(query, [id], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result)
    })
})
router.post('/agendarvisita', (req, res) => {
    const {clienteID, consultorID, imovelID, data_visita} = req.body

    const query = "INSERT INTO visitas (clienteId, imoveisID, consultorId, data_visita) VALUES (?, ?, ?, ?)"
    connection.query(query, [clienteID, imovelID, consultorID, data_visita], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }

        res.send("Visita agendada")
    })
})
router.get('/cancelarvisita', (req, res) => {
    const {visitaId} = req.body

    const query = "SELECT * FROM visitas WHERE visitaId = ?"
    connection.query(query, [visitaId], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }

        res.send(result)
    })
})

module.exports = router