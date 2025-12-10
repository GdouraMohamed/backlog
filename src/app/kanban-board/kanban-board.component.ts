import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  stage: number;
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {

  newTaskName = '';
  tasks: Task[] = [];
  stagesNames: string[] = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  stagesTasks: Task[][] = [];

  ngOnInit() {
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 }
    ];

    this.configureTasksForRendering();
  }

  configureTasksForRendering() {
    this.stagesTasks = Array.from({ length: this.stagesNames.length }, () => []);

    for (const task of this.tasks) {
      this.stagesTasks[task.stage].push(task);
    }
  }

  generateTestId(name: string) {
    return name.replace(/\s+/g, '-');
  }

  createTask() {
    const name = this.newTaskName.trim();
    if (!name) return;

    this.tasks.push({ name, stage: 0 });
    this.newTaskName = '';

    this.configureTasksForRendering();
  }

  moveBack(task: Task) {
    if (task.stage > 0) {
      task.stage--;
      this.configureTasksForRendering();
    }
  }

  moveForward(task: Task) {
    if (task.stage < this.stagesNames.length - 1) {
      task.stage++;
      this.configureTasksForRendering();
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.name !== task.name);
    this.configureTasksForRendering();
  }
}
