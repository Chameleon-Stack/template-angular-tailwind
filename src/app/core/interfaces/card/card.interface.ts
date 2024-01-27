export interface Card {
  id?: string;
  title: string;
  description: string;
  status: 'Não iniciado' | 'Em progresso' | 'Completo';
  category_ids?: string[];
  category?: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
