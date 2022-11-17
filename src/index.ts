import { server } from './server/server';
import 'dotenv/config';


server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
