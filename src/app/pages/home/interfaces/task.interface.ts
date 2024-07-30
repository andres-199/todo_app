export interface Task {
	state: 'completed' | 'editing' | null
	title: string
	isCompleted:boolean
}