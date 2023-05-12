export type ICreateUsersBody = {
	name: string,
	email: string,
	password: string
}

export type IUpdateUsersBody = {
	name: string,
	id: number
}

export type ICreateMessage = {
	sender_id: number,
	receiver_id: number,
	message: string,
}
