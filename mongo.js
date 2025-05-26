import 'dotenv/config';
import { MongoClient } from 'mongodb'
  
export async function getMongoConnection() {
  try {
    let conn = await MongoClient.connect(process.env.MONGO_URI);
    
    console.log('MongoDB conectado com sucesso!');
    return conn;
  }
  catch (error) {
    console.log(error);
    throw new Error('Erro na conexão com MongoDB');
  }
}
