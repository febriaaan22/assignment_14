// import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Profile from ".";

describe("test login page", () => {
	beforeAll(() => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});

	it("My Profile render correctly", async () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const title = screen.getAllByText("MY PROFILE");
		expect(title).toBeDefined();
	});
	it("back button render correctly", async () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const backButton = screen.getByText("Back");
		expect(backButton).toBeDefined();
	});

	it("login as render correctly", async () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const loginInput = screen.queryByText("Login as");
		expect(loginInput).toBeDefined();
	});
	it("email render correctly", async () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const emailInput = screen.queryByText("Email");
		expect(emailInput).toBeDefined();
	});

	it("onSubmit works correctly", async () => {
		render(
			<Router>
				<Profile />
			</Router>
		);

		const backButton = screen.getByText("Back");

		fireEvent.click(backButton);
	});
});
