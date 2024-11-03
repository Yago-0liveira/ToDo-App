import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <h1>Bem-vindo ao Gerenciador de Tarefas</h1>
      <p>Organize suas tarefas de forma simples e eficiente.</p>
    </mat-card>
  `,
  styles: []
})
export class HomeComponent {}

