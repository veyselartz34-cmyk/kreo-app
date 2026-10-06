import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database with auth users...")

  const hashedPassword = await bcrypt.hash('123456', 10)

  // 1. Create default creator user: Nuh Veysel
  const user = await prisma.user.upsert({
    where: { email: 'nuhveysel@kreo.com' },
    update: {},
    create: {
      name: 'Nuh Veysel',
      username: 'nuhveysel',
      email: 'nuhveysel@kreo.com',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
      bio: 'Dijital ürün tasarımcısı ve geliştirici. UI/UX ipuçları ve premium şablonlar paylaşıyorum.',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    },
  })

  // 2. Create Products
  const p1 = await prisma.product.create({
    data: {
      title: 'SaaS Tasarım Sistemi (Figma)',
      description: 'Hızlıca SaaS panelleri tasarlayın.',
      price: 499,
      type: 'Dijital Ürün',
      userId: user.id
    }
  })

  const p2 = await prisma.product.create({
    data: {
      title: 'Birebir Mentorluk Seansı',
      description: '45 dakikalık Google Meet görüşmesi ile projeni analiz edelim.',
      price: 999,
      type: 'Dijital Ürün',
      userId: user.id
    }
  })

  const p3 = await prisma.product.create({
    data: {
      title: '1 Aylık VIP Discord Topluluğu',
      description: 'Sadece üyelere özel içerikler.',
      price: 199,
      type: 'Abonelik',
      userId: user.id
    }
  })

  // 3. Create Orders (Meetings)
  await prisma.meeting.createMany({
    data: [
      {
        title: p1.title,
        clientName: 'Ahmet Yılmaz',
        clientEmail: 'ahmet.y@example.com',
        date: 'Bugün, 14:30',
        time: '14:30',
        status: 'Başarılı',
        userId: user.id
      },
      {
        title: p2.title,
        clientName: 'Ayşe Demir',
        clientEmail: 'ayse.demir@example.com',
        date: 'Dün, 09:15',
        time: '09:15',
        status: 'Başarılı',
        userId: user.id
      }
    ]
  })

  console.log("Seeding completed successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
