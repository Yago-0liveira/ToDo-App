import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule,HttpClientModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.http.get<Task[]>(this.apiUrl);
  }

  markAsCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask)
      .subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Erro ao atualizar tarefa:', err)
      });
  }

  deleteTask(task: Task) {
    this.http.delete(`${this.apiUrl}/${task.id}`)
      .subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Erro ao excluir tarefa:', err)
      });
  }
}







