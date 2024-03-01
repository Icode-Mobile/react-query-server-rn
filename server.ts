import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    error: false,
    message: 'Server is running',
    data: [],
  });
});

app.post('/create-product', async (req, res) => {
  const { name } = req.body as { name: string };
  const today = new Date(Date.now());

  const data = await prisma.product.create({
    data: {
      name,
      createdAt: today,
    },
  });
  if (data.id) {
    return res.status(200).json({
      error: false,
      message: 'Product Created',
      data,
    });
  } else {
    return res.status(200).json({
      error: true,
      message: 'Product Not Created',
      data: [],
    });
  }
});

app.get('/products', async (req, res) => {
  const data = await prisma.product.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return res.status(200).json({
    error: false,
    message: 'Products Found',
    data,
  });
});

app.listen(PORT, () => {
  console.log('Server is running: http://localhost:' + PORT);
});
