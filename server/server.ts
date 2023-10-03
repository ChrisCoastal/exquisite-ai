import app from './app';
import mongoose from 'mongoose';

const DB = process.env.DATABASE!.replace(
  '<DB_PASSWORD>',
  process.env.DB_PASSWORD!
);

mongoose
  .connect(DB, {})
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
