import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryBackgroundColor',
})
export class CategoryBackgroundColorPipe implements PipeTransform {
  private backgroundColors = {
    Bug: 'rgba(249, 115, 22, 0.5)',
    Melhoria: 'rgba(59, 130, 246, 0.5)',
    Feature: 'rgba(16, 185, 129, 0.5)',
    Sprint: 'rgba(234, 179, 8, 0.5)',
    Review: 'rgba(107, 114, 128, 0.5)',
    'Não planejada': 'rgba(139, 92, 246, 0.5)',
    Urgente: 'rgba(239, 68, 68, 0.5)',
    Estória: 'rgba(162, 91, 91, 0.5)',
  };

  transform(category: string): any {
    return (
      this.backgroundColors[category as keyof typeof this.backgroundColors] ||
      'rgba(128, 128, 128, 0.5)'
    );
  }
}
