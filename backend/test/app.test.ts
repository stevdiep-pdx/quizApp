// @ts-nocheck
import * as dotenv from "dotenv";

dotenv.config();
import "chai/register-should.js"; // Using Should style
// @ts-ignore
import tap from "tap";
import { MikroORM, ISeedManager } from "@mikro-orm/core";
import { faker } from "@faker-js/faker";
import app from "../src/app.js";
import config from "../src/db/mikro-orm.config.js";
import { DatabaseSeeder } from "../src/db/seeders/DatabaseSeeder.js";

let orm: MikroORM;

tap.before(async () => {
	app.log.warn("Initializing database...");
	orm = await MikroORM.init(config);
	const seeder: ISeedManager = orm.getSeeder();
	app.log.warn("Refreshing database schema...");
	await orm.getSchemaGenerator()
		.refreshDatabase();
	app.log.warn("Database refreshed, seeding...");
	await seeder.seed(DatabaseSeeder);
	app.log.warn("Finished seeding.");
});

tap.teardown(async () => {
	await orm.close();
	await app.close();
});

void tap.test("List all users from /dbvoid tap.test", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/dbTest"
	});

	response.statusCode.should.equal(200);
});



// USERS CRUD TEST //
// Reading a user
void tap.test("Getting a user", async () => {
	const payload = {
		id: 1
	};

	const response = await app.inject({
		method: "SEARCH",
		url: "/users",
		payload
	});

	// Verifying the results
	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.name.should.equal("Steven");
});

// Updating a user
void tap.test("Updating a user's name", async () => {
	const payload = {
		id: 1,
		name: "Stephen"
	};

	const response = await app.inject({
		method: "PUT",
		url: "/users",
		payload
	});

	// Verifying the results
	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.name.should.equal(payload.name);
});

// Deleting a user
void tap.test("Deleting a user", async () => {
	let payload = {
		id: 1,
	};

	// Good delete
	let response = await app.inject({
		method: "DELETE",
		url: "/users",
		payload
	});

	response.statusCode.should.equal(200);

	// Invalid ID should have a bad response code
	payload = { my_id: 1000000 };

	response = await app.inject({
		method: "DELETE",
		url: "/users",
		payload
	});

	response.statusCode.should.equal(500);
});



// QUIZZES CRUD TEST //

// Creating a quiz
void tap.test("Creating a new quiz", async () => {
	const payload = {
		id: 2,
		quiz_name: "Amendments"
	};
	
	const response = await app.inject({
		method: "POST",
		url: "/quizzes",
		payload
	});
	
	// Verifying the results
	response.statusCode.should.equal(200);
	response.payload.should.not.equal(payload);
	const resPayload = response.json();
	resPayload.creator.id.should.equal(2);
});

// Reading all quizzes for a user
void tap.test("Getting all quizzes for a user", async () => {
	const payload = {
		id: 2
	};
	
	const response = await app.inject({
		method: "SEARCH",
		url: "/quizzes",
		payload
	});
	
	// Verifying the results
	response.statusCode.should.equal(200);
});

// Updating a quiz
void tap.test("Updating a quiz's name", async () => {
	const payload = {
		quiz_id: 3,
		new_name: "US Presidents"
	};
	
	const response = await app.inject({
		method: "PUT",
		url: "/quizzes",
		payload
	});
	
	// Verifying the results
	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.name.should.equal(payload.new_name);
});

// Deleting a quiz
void tap.test("Deleting a quiz", async () => {
	let payload = {
		quiz_id: 1,
	};
	
	// Bad delete, user gone
	let response = await app.inject({
		method: "DELETE",
		url: "/quizzes",
		payload
	});
	
	response.statusCode.should.equal(500);
	
	// Invalid ID should have a bad response code
	payload = { quiz_id: 1000000 };
	
	response = await app.inject({
		method: "DELETE",
		url: "/quizzes",
		payload
	});
	
	response.statusCode.should.equal(500);
	
	// Good delete
	payload = {
		quiz_id: 3,
	};
	
	response = await app.inject({
		method: "DELETE",
		url: "/quizzes",
		payload
	});
	
	response.statusCode.should.equal(200);
});



// QUESTIONS CRUD TEST //

// Creating a question
void tap.test("Creating a new question", async () => {
	const payload = {
		quiz_id: 4,
		question: "What is the capitol of Oregon?",
		answer: "Salem",
		option2: "Portland",
		option3: "Gresham",
		option4: "Troutdale"
	};
	
	const response = await app.inject({
		method: "POST",
		url: "/questions",
		payload
	});
	
	// Verifying the results
	response.statusCode.should.equal(200);
	response.payload.should.not.equal(payload);
	const resPayload = response.json();
	resPayload.quiz.id.should.equal(4);
	resPayload.answer.should.equal(payload.answer);
});

// Reading all questions from a quiz
void tap.test("Getting all questions from a quiz", async () => {
	const payload = {
		quiz_id: 4
	};
	
	const response = await app.inject({
		method: "SEARCH",
		url: "/questions",
		payload
	});
	
	// Verifying the results
	response.statusCode.should.equal(200);
});

// Updating a question
void tap.test("Updating a question", async () => {
	const payload = {
		question_id: 6,
		question: "What is the capitol of the state of Oregon?",
		answer: "Salem",
		option2: "Portland",
		option3: "Gresham",
		option4: "Troutdale"
	};
	
	const response = await app.inject({
		method: "PUT",
		url: "/questions",
		payload
	});
	
	// Verifying the results
	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.question.should.equal(payload.question);
});

// Deleting a question
void tap.test("Deleting a question", async () => {
	// Invalid ID should have a bad response code
	let payload = {
		question_id: 100000,
	};
	
	let response = await app.inject({
		method: "DELETE",
		url: "/questions",
		payload
	});
	
	response.statusCode.should.equal(500);
	
	// Good delete
	payload = {
		question_id: 6,
	};
	
	response = await app.inject({
		method: "DELETE",
		url: "/questions",
		payload
	});
	
	response.statusCode.should.equal(200);
});
