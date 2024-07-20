import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/AuthTut')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const schema = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    token: String
});

const Collection = mongoose.model('Collection', schema ,'authcollections');

export default Collection;
