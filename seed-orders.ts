import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("Kullanıcı bulunamadı.");
    return;
  }

  // Ensure there are some products
  let product1 = await prisma.product.findFirst({ where: { userId: user.id } });
  if (!product1) {
    product1 = await prisma.product.create({
      data: {
        title: "Sistem: Notion Yaşam Yönetimi",
        description: "Notion ile hayatınızı yönetin.",
        price: 499,
        type: "Dijital Urun",
        userId: user.id
      }
    });
  }

  let product2 = await prisma.product.findFirst({ where: { title: "1:1 Yazılım Mentörlüğü" } });
  if (!product2) {
    product2 = await prisma.product.create({
      data: {
        title: "1:1 Yazılım Mentörlüğü",
        description: "Kariyeriniz için hızlandırıcı.",
        price: 1500,
        type: "Birebir Gorusme",
        userId: user.id
      }
    });
  }

  // Create a couple of customers
  const c1 = await prisma.customer.upsert({
    where: { email_creatorId: { email: "ahmet@test.com", creatorId: user.id } },
    update: {},
    create: {
      name: "Ahmet Yılmaz",
      email: "ahmet@test.com",
      creatorId: user.id
    }
  });

  const c2 = await prisma.customer.upsert({
    where: { email_creatorId: { email: "ayse@test.com", creatorId: user.id } },
    update: {},
    create: {
      name: "Ayşe Kaya",
      email: "ayse@test.com",
      creatorId: user.id
    }
  });

  // Create some orders for the past week
  const today = new Date();
  
  await prisma.order.createMany({
    data: [
      { amount: 499, status: "SUCCESS", productId: product1.id, customerId: c1.id, createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 1) },
      { amount: 499, status: "SUCCESS", productId: product1.id, customerId: c2.id, createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 2) },
      { amount: 1500, status: "SUCCESS", productId: product2.id, customerId: c1.id, createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 3) },
      { amount: 499, status: "SUCCESS", productId: product1.id, customerId: c2.id, createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 5) },
      { amount: 1500, status: "SUCCESS", productId: product2.id, customerId: c2.id, createdAt: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 6) }
    ]
  });

  console.log("Mock data generated.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
