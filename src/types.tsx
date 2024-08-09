export interface SelectedItem {
  uid: string;
  name: string;
  description?: string;
}

export interface Animal {
  uid: string;
  name: string;
  descriptions?: string[];
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
}

export interface Descriptions {
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
}

export interface AnimalDetails {
  animal: Animal;
}

export interface SearchAnimalsResponse {
  animals: Animal[];
  page: {
    pageNumber: number;
    totalPages: number;
  };
}

export interface SearchAnimalsRequest {
  searchTerm: string;
  pageNumber: number;
  pageSize: number;
}

export interface HomePageProps {
  initialSearchTerm: string;
  initialPage: number;
  initialAnimals: Animal[];
  totalPages: number;
}
