export type State = {
	currentProfile: ProfileType;
	likeHistory: Array<ProfileType>;
	passHistory: Array<ProfileType>;
};

export type ProfileType = {
	imgUri: string;
	thumbUri: string;
	name: string;
	petType: string;
	id: number;
};

export type QuestionType = {
	question: string;
	answer: string;
	option2: string;
	option3: string;
	option4: string;
}
