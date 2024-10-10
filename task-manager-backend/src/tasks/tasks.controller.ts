import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks - Alle Aufgaben abrufen
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll(); // Ruft die Methode findAll() aus dem Service auf
  }

  // GET /tasks/:id - Eine bestimmte Aufgabe anhand der ID abrufen
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id); // Ruft die Methode findOne() aus dem Service auf
  }

  // POST /tasks - Eine neue Aufgabe erstellen
  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task); // Ruft die Methode create() aus dem Service auf
  }

  // PUT /tasks/:id - Eine bestehende Aufgabe aktualisieren
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.update(id, updateData); // Ruft die Methode update() aus dem Service auf
  }

  // DELETE /tasks/:id - Eine Aufgabe löschen
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id); // Ruft die Methode remove() aus dem Service auf
  }
}

// Der Controller ist für das Routing und das Verwalten der HTTP-Anfragen zuständig. Der Controller empfängt Anfragen von Clients (z.B. vom Browser oder von Postman)
// und delegiert die Arbeit an den entsprechenden Service. Er sorgt dafür, dass die Anfragen an die richtige Stelle weitergeleitet werden
// und dass die passende Antwort zurückgesendet wird.

//der Controller lediglich die Anfragen entgegennimmt und an den Service weitergibt.
