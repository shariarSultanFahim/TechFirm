export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  commentsCount: number;
  author: {
    name: string;
    avatar?: string;
  };
  image: string;
  featured?: boolean;
}

export const blogPostsData: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-technology-next-decade",
    title: "The Future of Technology: What to Expect in the Next Decade",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    slug: "10-simple-habits-change-life",
    title: "10 Simple Habits That Will Change Your Life Forever",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    slug: "beginners-guide-passive-income",
    title: "A Beginner's Guide to Building Passive Income Online",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "4",
    slug: "why-minimalism-key-stress-free-life",
    title: "Why Minimalism is the Key to a Stress-Free Life",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "5",
    slug: "top-15-travel-destinations",
    title: "Top 15 Travel Destinations You Must Visit Once",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "6",
    slug: "start-successful-online-business",
    title: "How to Start a Successful Online Business from Scratch",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "7",
    slug: "psychology-behind-productivity-focus",
    title: "The Psychology Behind Productivity and Focus",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "8",
    slug: "7-daily-routines-successful-people",
    title: "7 Daily Routines of Highly Successful People",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "9",
    slug: "ultimate-guide-personal-branding-2026",
    title: "The Ultimate Guide to Personal Branding in 2026",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content",
    category: "Technology",
    date: "January 05, 2026",
    commentsCount: 2,
    author: {
      name: "John Smith"
    },
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
  }
];

export function getBlogPost(slug: string): BlogPost {
  return blogPostsData.find((p) => p.slug === slug || p.id === slug) || blogPostsData[0]!;
}
