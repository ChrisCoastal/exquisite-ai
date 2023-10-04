import dotenv from 'dotenv';
import { httpServer } from 'src/app';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.local' });

const DB = process.env.DATABASE!.replace(
  '<DB_PASSWORD>',
  process.env.DB_PASSWORD!
);

mongoose
  .connect(DB, {})
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4001;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${PORT}/`);
