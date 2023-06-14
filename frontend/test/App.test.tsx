// @ts-nocheck
// import dependencies
import React from "react";
// import react-testing methods
import { render, fireEvent, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../src/Components/HomePage.js";
import { Leaderboard } from "../src/Components/Leaderboard.js";
import { QuizList } from "../src/Components/QuizList.js";

describe("Renders React components correctly", () => {
	test("Math.sqrt()", () => {
		expect(Math.sqrt(4)).toBe(2);
		expect(Math.sqrt(144)).toBe(12);
		expect(Math.sqrt(2)).toBe(Math.SQRT2);
	});
	
	it("Should render homepage correctly", () => {
		render(<Home />);
		const elem = screen.queryByText("Quizr");
		expect(elem)
			.not
			.toBeNull();
		expect(elem)
			.toBeVisible();
	});
	
	test("Loads Leaderboard", () => {
		render(<MemoryRouter><Leaderboard /></MemoryRouter>);
		const elem = screen.queryByText("Leaderboard");
		expect(elem)
			.toBeVisible();
	});
	
	test("Loads Quizzes", () => {
		render(<MemoryRouter><QuizList /></MemoryRouter>);
		const elem = screen.queryByText("Select a Quiz");
		expect(elem)
			.toBeVisible();
	});
});
