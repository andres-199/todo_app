import { Component, signal } from '@angular/core'
import { Task } from './interfaces/task.interface'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    { state: 'completed', title: 'Learn JavaScript', isCompleted: true },
    { state: null, title: 'Buy a unicorn', isCompleted: false },
    { state: 'editing', title: 'Make dishes', isCompleted: false }
  ])

  handleChangeNewTask(event: Event) {
    const element = event.target as HTMLInputElement
    const newTask = element.value
    this.createTask(newTask)
  }

  private createTask(task: string) {
    this.tasks.update(tasks => [...tasks, { state: null, title: task, isCompleted: false }])
  }

  private deleteTask(task: Task) {
    this.tasks.update(tasks => tasks.filter(_task => _task !== task))
  }

  handleClickDeleteTask(task: Task) { this.deleteTask(task) }
}
