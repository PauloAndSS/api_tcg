import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/TCG_mongoBase');
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error('Erro de conexão:', err);
    process.exit(1);
  }
};

export default connectDB;