export default () => ({
  port: parseInt(process.env.PORT_NUMBER, 10) || 3000,
  mongoURL: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
});
