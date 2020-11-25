import mongoose from 'mongoose';
import { mongo } from './config/vars';

const connectDb = () => {
  return mongoose.connect(mongo.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
};

export { connectDb };
