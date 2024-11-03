import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule,HttpClientModule ],
  template: `
    <mat-card>
      <h2>Adicionar Nova Tarefa</h2>
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Título</mat-label>
          <input matInput formControlName="title" required>
          <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
            O título é obrigatório
          </mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">Adicionar</button>
      </form>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    mat-card {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
  `]
})
export class AddTaskComponent {
  taskForm = this.fb.group({
    title: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = { ...this.taskForm.value, completed: false };
      this.http.post('http://localhost:3000/tasks', newTask)
        .subscribe({
          next: () => {
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.error('Erro ao adicionar tarefa:', err);
          }
        });
    }
  }
}


