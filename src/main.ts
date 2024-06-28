import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  const prisma = new PrismaClient();
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  );

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  async function getWorkspaceName() {
    try {
      const work = await prisma.workspace.findMany({
        where: {
          workName: 'Tierra',
        },
      });
      console.log(work);
    } catch (error) {
      console.log('Error creating workshop', error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
bootstrap();
