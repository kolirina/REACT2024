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

export interface Animal {
  name: string;
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
}

export interface LoaderData {
  data: AnimalDetails;
}
