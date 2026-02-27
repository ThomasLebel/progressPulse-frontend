export interface Exercise {
  _id: string;
  name: string;
  muscleGroupe: string; // field name as defined in DB schema
  description?: string;
  image?: string;
}
