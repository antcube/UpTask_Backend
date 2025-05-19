import moongose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        // MongoDB connection with mongoose
        const {connection} = await moongose.connect(process.env.DATABASE_URL);
        const url = `${connection.host}:${connection.port}`;
        console.log(colors.magenta.bold(`MongoDB connected: ${url}`));
    } catch (error) {
        console.error(colors.red.bold(`MongoDB connection error: ${error}`));
        exit(1);
    }
}