import { Component, signal } from '@angular/core'
import { Task } from './interfaces/task.interface'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { noWhiteSpaceValidator } from './validators/no-white-space.validator'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    tasks = signal<Task[]>([
        {
            id: '1',
            state: 'completed',
            title: 'Learn JavaScript',
            isCompleted: true,
        },
        { id: '2', state: null, title: 'Buy a unicorn', isCompleted: false },
        { id: '3', state: 'editing', title: 'Make dishes', isCompleted: false },
    ])

    inputTaskCtrl = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, noWhiteSpaceValidator],
    })

    handleChangeNewTask() {
        if (this.inputTaskCtrl.valid) {
            this.createTask(this.inputTaskCtrl.value)
            this.inputTaskCtrl.setValue('')
        }
    }

    private createTask(taskName: string) {
        this.tasks.update((tasks) => [
            ...tasks,
            {
                id: `${taskName}-${tasks.length}`,
                state: null,
                title: taskName,
                isCompleted: false,
            },
        ])
    }

    private deleteTask(task: Task) {
        this.tasks.update((tasks) =>
            tasks.filter((_task) => _task.id !== task.id)
        )
    }

    private updateTask(task: Task) {
        this.tasks.update((tasks) => {
            const index = tasks.findIndex((_task) => _task.id === task.id)
            if (index > -1) {
                tasks.splice(index, 1, task)
            }
            return tasks
        })
    }

    handleUpdateTask(task: Task, update: Partial<Task>) {
        this.updateTask({
            ...task,
            ...update,
            state: update.isCompleted ? 'completed' : null,
        })
    }

    handleClickDeleteTask(task: Task) {
        this.deleteTask(task)
    }
}
