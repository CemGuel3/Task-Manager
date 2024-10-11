import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { TasksComponent } from './tasks/tasks.component';

interface Task {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [TaskService],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  // Aufgabe hinzufügen
  addTask(): void {
    if (this.newTaskTitle && this.newTaskDescription) {
      const newTask = {
        title: this.newTaskTitle,
        description: this.newTaskDescription,
      };

      this.taskService.createTask(newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTaskTitle = '';
        this.newTaskDescription = '';
      });
    }
  }

  // Aufgabe als erledigt markieren (löschen)
  completeTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    });
  }

  // Aufgabe bearbeiten
  editTask(task: Task): void {
    this.taskToEdit = { ...task }; // Kopie des zu bearbeitenden Tasks erstellen
  }

  // Bearbeitung speichern
  saveTask(): void {
    if (this.taskToEdit) {
      this.taskService.updateTask(this.taskToEdit).subscribe((updatedTask) => {
        const index = this.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.taskToEdit = null; // Bearbeitungsmodus beenden
      });
    }
  }

  // Bearbeitung abbrechen
  cancelEdit(): void {
    this.taskToEdit = null; // Bearbeitungsmodus beenden
  }

  // Tracking-Funktion für ngFor
  trackByTaskId(index: number, task: any): number {
    return task.id;
  }
}
