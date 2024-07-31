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
        { id: '1', title: 'Learn JavaScript' },
        { id: '2', title: 'Buy a unicorn' },
        { id: '3', title: 'Make dishes' },
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
        this.tasks.update((tasksState) =>
            tasksState.map((_task) => {
                if (_task.id === task.id) {
                    return task
                }
                return { ..._task, isEditing: false }
            })
        )
    }

    handleUpdateTask(task: Task, update: Partial<Task>) {
        this.updateTask({ ...task, ...update })
    }

    handleClickDeleteTask(task: Task) {
        this.deleteTask(task)
    }
}
