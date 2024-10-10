import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonModule } from '@angular/common';
interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule],
})
export class TasksComponent implements OnInit {
  //tasks: Task[] = [];
  tasks: any[] = [];
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Aufgaben vom Backend laden
  loadTasks(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Neue Aufgabe hinzufügen
  addTask(title: string, description: string): void {
    const newTask: Partial<Task> = { title, description, isCompleted: false };
    this.tasksService.createTask(newTask).subscribe((task) => {
      this.tasks.push(task);
    });
  }

  // Aufgabe löschen
  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
