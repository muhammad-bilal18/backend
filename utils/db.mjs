import mongoose from 'mongoose';
import config from 'config';

export function connectToDatabase() {
    const url =  config.get('db') || 'mongodb://localhost/ve-apis'
    
    mongoose.connect(url)
        .then(() => {
            console.log(`Connected to ${url}`);
        })
        .catch((error) => {
            console.log(`Failed to connect to the database. Error: ${error.message}`);
        });
}