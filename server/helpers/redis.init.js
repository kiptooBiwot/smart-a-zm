const redis = require('ioredis')

const client = redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@redis-17744.c1.us-west-2-2.ec2.cloud.redislabs.com:${process.env.REDIS_PORT}`
  // password: process.env.REDIS_PASSWORD,
  // socket: {
  //   host: 'redis-17744.c1.us-west-2-2.ec2.cloud.redislabs.com',
  //   port: process.env.REDIS_PORT
  // }
})

// const client = redis.createClient({
//   url: `redis://Elvis:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${parseInt(process.env.REDIS_PORT)}`
// })

// const client = redis.createClient({
//   port: process.env.REDIS_PORT || 6379,
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   password: process.env.REDIS_PASSWORD || null
// });

console.log(`REDIS CLIENT: ${client}`)

client.on("connect", () => {
  console.log("Client connected to redis");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from Redis!");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
