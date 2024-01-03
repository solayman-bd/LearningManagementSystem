import { Redis } from 'ioredis';
require('dotenv').config();

const createRedisClient = (): Redis => {
    try {
        if (process.env.REDIS_URL) {
            const redis = new Redis(process.env.REDIS_URL);
            console.log('Redis connected.');
            return redis;
        } else {
            throw new Error('REDIS_URL is not defined in the environment variables.');
        }
    } catch (error:any) {
        console.error('Redis connection failed:', error.message);
        throw error;
    }
};

export default createRedisClient;
