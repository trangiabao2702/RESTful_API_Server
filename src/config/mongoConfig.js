export const mongoURI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@zu2702.gtzrpwg.mongodb.net/${process.env.DATABASE_NAME}`;

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
