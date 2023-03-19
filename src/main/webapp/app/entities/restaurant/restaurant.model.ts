export interface IRestaurant {
  id: number;
  name?: string | null;
  address?: string | null;
}

export type NewRestaurant = Omit<IRestaurant, 'id'> & { id: null };
