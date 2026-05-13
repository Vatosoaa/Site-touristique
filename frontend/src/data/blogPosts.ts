export interface BlogPostType {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  categories: string[];
  contentParagraphs: string[];
  contentImages: string[];
  tags: string[];
  authorQuote?: string;
}

export const blogPosts: BlogPostType[] = [
  {
    id: 1,
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
    tags: ["Foods", "Fun", "Hotels"]
  },
  {
    id: 2,
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
    tags: ["Family", "Tips", "Vacation"]
  },
  {
    id: 3,
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
    tags: ["Photo", "Memories", "Art"]
  }
];
