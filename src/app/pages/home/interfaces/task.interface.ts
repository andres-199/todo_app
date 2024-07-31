export interface Task {
	id: string
	state: 'completed' | 'editing' | null
	title: string
	isCompleted: boolean
}