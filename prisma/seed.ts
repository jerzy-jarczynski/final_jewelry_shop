import { PrismaClient } from '@prisma/client';
import { Role } from './enums/role';

const db = new PrismaClient();

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
      // hashedPassword will be associated in the getPasswords function
    },
    {
      id: 'user2',
      name: 'John Doe',
      email: 'john@example.com',
      address: '456 St, LA',
      role: Role.ADMIN,
      // hashedPassword will be associated in the getPasswords function
    },
  ];
}

function getPasswords() {
  return [
    {
      user: { connect: { id: 'user1' } },
      hashedPassword: 'hashed_password_here',
    },
    {
      user: { connect: { id: 'user2' } },
      hashedPassword: 'another_hashed_password',
    },
  ];
}

function getCarts() {
  return [
    {
      id: 'cart1',
      user: { connect: { id: 'user1' } },
    },
    {
      id: 'cart2',
      user: { connect: { id: 'user2' } },
    },
  ];
}

function getCartItems() {
  return [
    {
      cart: { connect: { id: 'cart1' } },
      product: { connect: { id: 'prod1' } },
      amount: 1,
      color: 'Silver',
      size: 'M',
      comment: 'Gift wrap it!',
    },
    {
      cart: { connect: { id: 'cart2' } },
      product: { connect: { id: 'prod2' } },
      amount: 2,
      color: 'Gold',
      size: 'L',
      comment: 'Please deliver faster!',
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
  await db.order.deleteMany();
  await db.cartItem.deleteMany();
  await db.cart.deleteMany();
  await db.user.deleteMany(); // This will also delete Password because of cascade delete
  await db.product.deleteMany();

  for (const product of getProducts()) {
    await db.product.create({ data: product });
  }

  for (const user of getUsers()) {
    await db.user.create({ data: user });
  }

  for (const password of getPasswords()) {
    await db.password.create({ data: password });
  }

  for (const cart of getCarts()) {
    await db.cart.create({ data: cart });
  }

  for (const cartItem of getCartItems()) {
    await db.cartItem.create({ data: cartItem });
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
