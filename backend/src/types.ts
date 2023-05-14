export type ICreateUsersBody = {
	name: string,
	email: string,
	password: string
}

export type IUpdateUsersBody = {
	name: string,
	id: number
}
