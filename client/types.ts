export interface Merch {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: File | null;
}