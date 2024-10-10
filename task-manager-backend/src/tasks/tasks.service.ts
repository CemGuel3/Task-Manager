import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>, // TypeORM Repository für die Task-Entity
  ) {}

  // Alle Aufgaben abrufen
  findAll(): Promise<Task[]> {
    return this.tasksRepository.find(); // Holt alle Aufgaben aus der Datenbank
  }

  // Eine Aufgabe anhand der ID abrufen
  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id }); // Holt eine Aufgabe anhand der ID
  }

  // Eine neue Aufgabe erstellen
  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task); // Erstellt eine neue Task-Instanz
    return this.tasksRepository.save(newTask); // Speichert die neue Aufgabe in der Datenbank
  }

  // Eine Aufgabe aktualisieren
  async update(id: number, updateData: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, updateData); // Aktualisiert die Aufgabe in der Datenbank
    return this.tasksRepository.findOneBy({ id }); // Gibt die aktualisierte Aufgabe zurück
  }

  // Eine Aufgabe löschen
  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id); // Löscht die Aufgabe anhand der ID
  }
}

//Der TasksService wird die Geschäftslogik für das Verwalten der Aufgaben enthalten.
// Wir fügen Methoden hinzu, um Aufgaben zu erstellen, lesen, aktualisieren und löschen;  CRUD + DB über typeorm wiederverwendbar
