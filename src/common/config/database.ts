export default () => ({
  mongodb: {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    host: process.env.MONGODB_HOST,
    collection: process.env.MONGODB_COLLECTION,
    options: process.env.MONGODB_OPTIONS,
    uri: getUri(process.env),
  },
});

const getUri = (env) =>
  `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASS}@${env.MONGODB_HOST}/${env.MONGODB_COLLECTION}${env.MONGODB_OPTIONS}`;
