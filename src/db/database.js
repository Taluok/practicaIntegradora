import { connect } from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/ecommerce';

const MONGOATLAS = 'mongodb+srv://tanialuduenaok:2023Proyect@taluok.crhrslr.mongodb.net/?retryWrites=true&w=majority'
try {
    await connect(MONGOATLAS);
    console.log('Conectado a la base de datos de MongoDB')
}catch (error) {
    console.log(error);
};