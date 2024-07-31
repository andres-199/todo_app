import { Component, computed, effect, signal } from '@angular/core'
import { Task, TaskFilter } from './interfaces/task.interface'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { noWhiteSpaceValidator } from './validators/no-white-space.validator'

const filterTasks = (filter: TaskFilter, tasks: Task[]) => {
    if (filter === TaskFilter.COMPLETED) {
        return tasks.filter((task) => task.isCompleted)
    }
    if (filter === TaskFilter.PENDING) {
        return tasks.filter((task) => !task.isCompleted)
    }
    return tasks
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    taskFilter = TaskFilter
    tasks = signal<Task[]>([])
    filter = signal<TaskFilter>(TaskFilter.ALL)
    filteredTasks = computed<Task[]>(() => {
        return filterTasks(this.filter(), this.tasks())
    })

    inputTaskCtrl = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, noWhiteSpaceValidator],
    })

    constructor() {
        effect(() => {
            localStorage.setItem('tasks', JSON.stringify(this.tasks()))
        })
    }

    ngOnInit() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]')
        this.tasks.set(storedTasks)
    }

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

    handleChangeFilter(taskFilter: TaskFilter) {
        this.filter.set(taskFilter)
    }
}
