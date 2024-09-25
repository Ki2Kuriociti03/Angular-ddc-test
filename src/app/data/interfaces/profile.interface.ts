export interface Profile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

export interface Resource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
