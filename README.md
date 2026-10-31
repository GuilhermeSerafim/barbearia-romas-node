# 💈 Barbearia Romas — API Node.js

API com Node.js, Express e MongoDB para galeria e agendamentos da barbearia. A conexão é configurada por `MONGO_URI`; o README original indica MongoDB Atlas.

## Tecnologias e configuração

O manifesto declara Express 5, MongoDB driver 6, dotenv e CORS. Com Node.js e npm compatíveis com as dependências, instale-as e configure `MONGO_URI` no ambiente ou em um arquivo `.env` local antes de iniciar:

```bash
npm install
node index.js
```

`mongo.js` lê `process.env.MONGO_URI`. Use uma instância de desenvolvimento e não versione credenciais. O servidor aguarda a conexão ao banco antes de ouvir na porta `5010`.

## Rotas

| Recurso | Operações | Coleção no banco `barbearia-romas` |
| --- | --- | --- |
| `/galeria` | GET e POST; PUT e DELETE em `/:id` | `galeria` |
| `/agendamentos` | GET e POST; PUT e DELETE em `/:id` | `agendamento` |
| `/admin` | POST com `user` e `password` | `user` |

A galeria usa nome, comentário e imagem. Os agendamentos usam cliente, telefone, serviço, barbeiro, data e horário. PUT e POST encaminham os dados recebidos ao MongoDB sem validação de esquema do corpo nas rotas.

## Limites

`/admin` compara os dados recebidos com o registro encontrado e devolve `authenticated: true`; não emite token nem estabelece sessão. As rotas de galeria e agendamento não possuem middleware de autorização e CORS está aberto. Portanto, esse fluxo não constitui proteção das operações administrativas. O script `npm test` é um placeholder que termina com erro, não uma suíte implementada.
