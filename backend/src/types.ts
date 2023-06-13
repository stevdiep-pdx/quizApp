export type IUpdateUsersBody = {
	name: string,
	id: number
}

export type ICreateQuestion = {
	quiz_id: number,
	question: string,
	answer: string,
	option2: string,
	option3: string,
	option4: string
}

export type IUpdateQuestion = {
	question_id: number,
	question: string,
	answer: string,
	option2: string,
	option3: string,
	option4: string
}
