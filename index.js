import { getMongoConnection } from './mongo.js';

import cors from 'cors'
import express from 'express'
import { ObjectId } from 'mongodb';
const server = express();
server.use(express.json());
server.use(cors());

const conn = await getMongoConnection();

server.get('/galeria', async (req, res) => {
    const dados = await conn
        .db('barbearia-romas')       // Nome do seu banco
        .collection('galeria')       // Nome da sua collection
        .find()
        .toArray();

    const resultado = dados.map(doc => ({
        id: doc._id.toString(),
        nome: doc.nome,
        comentario: doc.comentario,
        img: doc.img
    }));

    res.send(resultado);
});


server.post('/galeria', async (req, res) => {
    const item = req.body;
    const resultado = await conn.db('barbearia-romas')
        .collection('galeria')
        .insertOne(item);

    res.status(201).send({ ...item, id: resultado.insertedId });
});

server.delete('/galeria/:id', async (req, res) => {
    const id = req.params.id;
    await conn.db('barbearia-romas')
        .collection('galeria')
        .deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(204);
});

server.put('/galeria/:id', async (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    await conn.db('barbearia-romas')
        .collection('galeria')
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: dados }
        );

    res.send({ ...dados, id });
});

server.get('/agendamentos', async (req, res) => {
    const dados = await conn
        .db('barbearia-romas')
        .collection('agendamento')
        .find()
        .toArray();

    const resultado = dados.map(doc => ({
        id: doc._id.toString(),
        cliente: doc.cliente,
        telefone: doc.telefone,
        servico: doc.servico,
        barbeiro: doc.barbeiro,
        data: doc.data,
        horario: doc.horario
    }));

    res.send(resultado);
});

server.post('/agendamentos', async (req, res) => {
    const item = req.body;

    const resultado = await conn
        .db('barbearia-romas')
        .collection('agendamento')
        .insertOne(item);

    res.status(201).send({ ...item, id: resultado.insertedId });
});

server.delete('/agendamentos/:id', async (req, res) => {
    const id = req.params.id;

    await conn
        .db('barbearia-romas')
        .collection('agendamento')
        .deleteOne({ _id: new ObjectId(id) });
    return res.sendStatus(204);
});

server.put('/agendamentos/:id', async (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    await conn
        .db('barbearia-romas')
        .collection('agendamento')
        .updateOne({ _id: new ObjectId(id) }, { $set: dados });
    res.send({ ...dados, id });
});

server.post('/admin', async (req, res) => {
    const { user, password } = req.body;
    const coll = conn.db('barbearia-romas').collection('user');
    const admin = await coll.findOne({ user });

    if (!admin || admin.password !== password) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    return res.status(200).json({ authenticated: true });
})

server.listen(5010, () => console.log('API is up'));