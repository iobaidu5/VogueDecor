import { PrismaClient } from '../generated/prisma';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Setup WebSocket support for Neon
// neonConfig.webSocketConstructor =
//   process.env.NODE_ENV === 'production' ? WebSocket : ws.WebSocket;

neonConfig.webSocketConstructor = ws.WebSocket;
  

const validateConnection = (conn?: string): string => {
  if (!conn) throw new Error('DATABASE_URL not defined');
  if (typeof conn !== 'string') throw new Error('Invalid DATABASE_URL type');
  if (!conn.startsWith('postgres://')) throw new Error('Invalid connection protocol');
  return conn;
};

// Ensure connection string is valid
// const connectionString = validateConnection(process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL as string;

if (!connectionString || typeof connectionString !== 'string') {
  throw new Error('Invalid or missing DATABASE_URL');
}
if (!connectionString.startsWith('postgres://')) {
  throw new Error('Invalid DATABASE_URL format');
}

// Create Pool (✅ correct input for PrismaNeon in your version)
// const pool = new Pool({ connectionString });

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create PrismaNeon adapter using pool
// const adapter = new PrismaNeon(pool);

const adapter = new PrismaNeon({
  connectionString,
  ssl: true // Simple boolean for production SSL
});

// Create PrismaClient with adapter and custom transformers
const prismaClient = new PrismaClient({ adapter, log: ['query', 'info', 'warn', 'error'] }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(order) {
          return order.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(order) {
          return order.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(order) {
          return order.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(order) {
          return order.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(orderItem) {
          return orderItem.price.toString();
        },
      },
    },
  },
});

export const prisma = prismaClient;
