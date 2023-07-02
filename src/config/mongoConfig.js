module.exports = {
  mongoURI: `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@zu2702.gtzrpwg.mongodb.net/`,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
