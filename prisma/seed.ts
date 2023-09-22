import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
import { Role } from './enums/role';

function getProducts() {
  return [
    {
      id: 'prod1',
      title: 'Diamond Necklace',
      photo: 'url_to_photo1',
      price: 500,
      description: 'Beautiful diamond necklace',
    },
    {
      id: 'prod2',
      title: 'Gold Ring',
      photo: 'url_to_photo2',
      price: 200,
      description: 'Stunning gold ring',
    },
  ];
}

function getUsers() {
  return [
    {
      id: 'user1',
      name: 'Anna Smith',
      email: 'anna@example.com',
      address: '123 St, NY',
      role: Role.USER,
      password: {
        id: 'pw1',
        hashedPassword: 'hashed_password_here',
      },
    },
    {
      id: 'user2',
      name: 'John Doe',
      email: 'john@example.com',
      address: '456 St, LA',
      role: Role.ADMIN,
      password: {
        id: 'pw2',
        hashedPassword: 'another_hashed_password',
      },
    },
  ];
}

function getCarts() {
  return [
    {
      id: 'cart1',
      product: { connect: { id: 'prod1' } },
      amount: 1,
      color: 'Silver',
      size: 'M',
      comment: 'Gift wrap it!',
      user: { connect: { id: 'user1' } },
    },
    {
      id: 'cart2',
      product: { connect: { id: 'prod2' } },
      amount: 2,
      color: 'Gold',
      size: 'L',
      comment: 'Please deliver faster!',
      user: { connect: { id: 'user2' } },
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'order1',
      cart: { connect: { id: 'cart1' } },
      date: new Date(),
      priceSum: 500,
      comment: 'Gift wrap',
      clientName: 'Anna Smith',
      email: 'anna@example.com',
      address: '123 St, NY',
    },
  ];
}

async function seed() {
  for (const product of getProducts()) {
    await db.product.create({ data: product });
  }

  for (const user of getUsers()) {
    await db.user.create({
      data: {
        ...user,
        password: {
          create: user.password,
        },
      },
    });
  }

  for (const cart of getCarts()) {
    await db.cart.create({ data: cart });
  }

  for (const order of getOrders()) {
    await db.order.create({ data: order });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
