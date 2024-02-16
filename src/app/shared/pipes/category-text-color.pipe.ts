import { Pipe, PipeTransform } from '@angular/core';

interface TextColors {
  Bug: string;
  Melhoria: string;
  Feature: string;
  Sprint: string;
  Review: string;
  'Não planejada': string;
  Urgente: string;
  Estória: string;
  [key: string]: string;
}

@Pipe({
  name: 'categoryTextColor',
})
export class CategoryTextColorPipe implements PipeTransform {
  private textColors: TextColors = {
    Bug: '#f97316',
    Melhoria: '#3b82f6',
    Feature: '#10b981',
    Sprint: '#eab308',
    Review: '#6b7280',
    'Não planejada': '#8b5cf6',
    Urgente: '#ef4444',
    Estória: '#a25b5b',
  };

  transform(category: string): string {
    return this.textColors[category as keyof TextColors] || 'grey';
  }
}