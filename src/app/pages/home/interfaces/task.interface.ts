export interface Task {
    id: string
    title: string
    isCompleted?: boolean
    isEditing?: boolean
}

export enum TaskFilter {
    ALL = 'all',
    PENDING = 'pending',
    COMPLETED = 'completed',
}
