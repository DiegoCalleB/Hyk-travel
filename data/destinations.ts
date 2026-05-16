export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: string;
  rating: number;
  category: "Playa" | "Montaña" | "Cultural" | "Exótico";
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Santorini Oia",
    country: "Grecia",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$1,490",
    rating: 4.9,
    category: "Playa",
  },
  {
    id: "2",
    name: "Ubud Resort",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$980",
    rating: 4.8,
    category: "Exótico",
  },
  {
    id: "3",
    name: "Costa Amalfitana",
    country: "Italia",
    image: "https://images.unsplash.com/photo-1516483638261-f40af5ff1e25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$2,100",
    rating: 5.0,
    category: "Playa",
  },
  {
    id: "4",
    name: "Atolón Maldivas",
    country: "Maldivas",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$3,500",
    rating: 4.9,
    category: "Exótico",
  },
  {
    id: "5",
    name: "Alpes Suizos",
    country: "Suiza",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$2,800",
    rating: 4.9,
    category: "Montaña",
  },
  {
    id: "6",
    name: "Kioto Imperial",
    country: "Japón",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$1,850",
    rating: 4.8,
    category: "Cultural",
  }
];
