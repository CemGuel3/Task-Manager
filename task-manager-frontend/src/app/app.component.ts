// import { Component, OnInit, importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { TaskService } from './services/task.service';
// import { TasksComponent } from './tasks/tasks.component';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   imports: [TasksComponent, HttpClientModule, CommonModule], // TasksComponent und HttpClientModule importieren
//   providers: [TaskService], // TaskService als Provider hinzufügen
// })
// export class AppComponent implements OnInit {
//   tasks: any[] = [];

//   constructor(private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.taskService.getTasks().subscribe((data) => {
//       this.tasks = data;
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TasksComponent, CommonModule, FormsModule], // CommonModule und FormsModule hinzufügen
  providers: [TaskService],
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  // Methode zum Hinzufügen einer neuen Aufgabe
  addTask(): void {
    if (this.newTaskTitle && this.newTaskDescription) {
      const newTask = {
        title: this.newTaskTitle,
        description: this.newTaskDescription,
      };

      // Aufgabe zum Backend hinzufügen
      this.taskService.createTask(newTask).subscribe((task) => {
        this.tasks.push(task); // Die neue Aufgabe zur Liste hinzufügen
        this.newTaskTitle = ''; // Eingabefelder leeren
        this.newTaskDescription = '';
      });
    }
  }

  // Tracking-Funktion für die Aufgabenliste
  trackByTaskId(index: number, task: any): number {
    return task.id;
  }
}
