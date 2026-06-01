import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // 1. Create Default Admin
  const adminUsername = "admin"
  const adminPassword = "admin123"
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      password: hashedPassword
    }
  })
  console.log(`Default admin created: ${adminUsername} / ${adminPassword}`)

  // 2. Create Tours
  const toursData = [
    {
      title: "Thailand",
      price: "$599",
      amenities: "Beach | Hotel | Vehicle",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/images/destination2.jpg"
    },
    {
      title: "North Africa",
      price: "$800",
      amenities: "Beach | Hotel | Vehicle",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/images/destination3.jpg"
    },
    {
      title: "South Korea",
      price: "$650",
      amenities: "Beach | Hotel | Vehicle",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/images/destination4.jpg"
    },
    {
      title: "Switzerland",
      price: "$700",
      amenities: "Beach | Hotel | Vehicle",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/images/destination2.jpg"
    }
  ]

  for (const tour of toursData) {
    const existing = await prisma.tour.findFirst({
      where: { title: tour.title }
    })
    if (!existing) {
      await prisma.tour.create({ data: tour })
    }
  }
  console.log("Tours seeded.")

  // 3. Create Packages
  const packagesData = [
    {
      region: "Europe",
      title: "Winter Action",
      price: "$700",
      description: "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      image: "/images/destination2.jpg"
    },
    {
      region: "Thailand",
      title: "Snow Surfing",
      price: "$1200",
      description: "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      image: "/images/destination3.jpg"
    },
    {
      region: "Africa",
      title: "Ropeway",
      price: "$900",
      description: "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      image: "/images/destination4.jpg"
    }
  ]

  for (const pkg of packagesData) {
    const existing = await prisma.package.findFirst({
      where: { title: pkg.title, region: pkg.region }
    })
    if (!existing) {
      await prisma.package.create({ data: pkg })
    }
  }
  console.log("Packages seeded.")

  // 4. Create Blog Posts
  const blogPostsData = [
    {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop",
      title: "Top Restaurant To Visit",
      excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem...",
      date: "May 2, 2026",
      categories: ["Lifestyle", "Management", "Planning"],
      contentParagraphs: [
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC."
      ],
      contentImages: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Foods", "Fun", "Hotels"],
      authorQuote: "Good food is the foundation of genuine happiness."
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
      title: "Tips for Family Trips",
      excerpt: "We share our best travel tips, family vacation itineraries, adventurous...",
      date: "May 15, 2026",
      categories: ["Travel", "Family", "Tips"],
      contentParagraphs: [
        "Traveling with family can be one of the most rewarding experiences, but it also requires careful planning and a lot of patience. From choosing the right destination to making sure everyone has activities they enjoy, a successful family trip is all about balance.",
        "Pack light but pack smart. Bringing too many bags can make traveling stressful, especially if you have young children. Focus on versatile clothing and don't forget to pack a small first-aid kit, healthy snacks, and some entertainment for the road or flight."
      ],
      contentImages: [
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Family", "Tips", "Vacation"],
      authorQuote: "Family trips are the best investments in lifetime memories."
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
      title: "Most Experience Photographer With Us To Capture",
      excerpt: "Photography is a way of feeling, of touching, of loving....",
      date: "May 28, 2026",
      categories: ["Photography", "Nature", "Art"],
      contentParagraphs: [
        "Capturing the perfect moment requires more than just a good camera; it demands an eye for detail, an understanding of light, and the patience to wait for the exact right second. Our experienced photographers bring all of these elements to ensure your memories are beautifully preserved.",
        "Whether it's a stunning sunset over the ocean, the raw emotion of a cultural festival, or the quiet majesty of a mountain peak, photography is about storytelling. Each image we capture tells a unique story that you will be able to share and cherish for a lifetime."
      ],
      contentImages: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200&auto=format&fit=crop"
      ],
      tags: ["Photo", "Memories", "Art"],
      authorQuote: "A photograph is a pause button on life."
    }
  ]

  for (const post of blogPostsData) {
    const existing = await prisma.blogPost.findFirst({
      where: { title: post.title }
    })
    if (!existing) {
      await prisma.blogPost.create({ data: post })
    }
  }
  console.log("Blog posts seeded.")

  // 5. Create Roles
  const rolesData = [
    {
      name: "Directeur d'Agence",
      description: "Gestion globale de l'agence, des employés et de l'ensemble du contenu.",
      permissions: ["manage_tours", "manage_packages", "manage_blog", "manage_messages", "manage_employees"]
    },
    {
      name: "Chef de Produit Touristique",
      description: "Création et modification des destinations, circuits et formules de voyage.",
      permissions: ["manage_tours", "manage_packages", "manage_blog"]
    },
    {
      name: "Support Client & Réservations",
      description: "Suivi des réservations clients et gestion des messages reçus.",
      permissions: ["manage_messages"]
    }
  ]

  const createdRoles: Record<string, any> = {}
  for (const r of rolesData) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: {
        description: r.description,
        permissions: r.permissions
      },
      create: r
    })
    createdRoles[r.name] = role
  }
  console.log("Roles seeded.")

  // 6. Create Employees
  const employeesData = [
    {
      name: "Jean Dupont",
      email: "jean@explorile.mg",
      phone: "+261 34 01 123 45",
      bio: "Directeur de l'agence Vatosoaa depuis 2021. Passionné de voyages et d'aventure à Madagascar.",
      status: "Actif",
      color: "bg-indigo-500",
      roleId: createdRoles["Directeur d'Agence"].id
    },
    {
      name: "Marie Laurent",
      email: "marie@explorile.mg",
      phone: "+261 34 02 234 56",
      bio: "Experte en création de circuits sur-mesure et formules haut de gamme.",
      status: "Actif",
      color: "bg-emerald-500",
      roleId: createdRoles["Chef de Produit Touristique"].id
    },
    {
      name: "Thomas Martin",
      email: "thomas@explorile.mg",
      phone: "+261 34 03 345 67",
      bio: "Chargé du support client, toujours à l'écoute pour garantir un voyage inoubliable.",
      status: "Actif",
      color: "bg-amber-500",
      roleId: createdRoles["Support Client & Réservations"].id
    }
  ]

  for (const emp of employeesData) {
    await prisma.employee.upsert({
      where: { email: emp.email },
      update: {
        name: emp.name,
        phone: emp.phone,
        bio: emp.bio,
        status: emp.status,
        color: emp.color,
        roleId: emp.roleId
      },
      create: emp
    })
  }
  console.log("Employees seeded.")

  // 7. Create Services
  const servicesData = [
    { title: "Réservation de Vols", description: "Assistance et réservation de billets nationaux et internationaux pour Madagascar." },
    { title: "Hébergements de Prestige", description: "Sélection d'hôtels et d'écolodges haut de gamme partenaires." },
    { title: "Tours Guidés", description: "Accompagnement professionnel sur mesure à travers l'île." },
    { title: "Location de Véhicules", description: "Mise à disposition de 4x4 avec chauffeur guide expérimenté." }
  ]

  for (const srv of servicesData) {
    const existing = await (prisma as any).service.findFirst({
      where: { title: srv.title }
    })
    if (!existing) {
      await (prisma as any).service.create({ data: srv })
    }
  }
  console.log("Services seeded.")

  console.log("Seeding complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
