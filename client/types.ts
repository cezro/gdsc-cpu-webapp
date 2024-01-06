export interface Merch {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
}

export interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  unique_token: string;
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
