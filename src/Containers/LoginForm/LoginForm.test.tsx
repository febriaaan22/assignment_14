// import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./index";
import { BrowserRouter as Router } from "react-router-dom";

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

	it("login page render correctly", async () => {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		const title = screen.getAllByText("Login Page");
		expect(title).toBeDefined();
	});
	it("label email render correctly", async () => {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		const emailInput = screen.getByPlaceholderText("Enter Email");
		expect(emailInput).toBeDefined();
	});

	it("label password render correctly", async () => {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		const passwordInput = screen.getByPlaceholderText("Enter Password");
		expect(passwordInput).toBeDefined();
	});

	it("login button render correctly", async () => {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		const loginButton = screen.getByText("Login");
		expect(loginButton).toBeDefined();
	});

	it("register button render correctly", async () => {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		const registerButton = screen.getByText("Register");
		expect(registerButton).toBeDefined();
	});

	it("onSubmit works correctly", async () => {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		const emailInput = screen.getByPlaceholderText("Enter Email");
		const passwordInput = screen.getByPlaceholderText("Enter Password");
		const loginButton = screen.getByText("Login");
		const registerButton = screen.getByText("Register");

		fireEvent.change(emailInput, { target: { value: "invalidemail" } });
		fireEvent.change(passwordInput, { target: { value: "" } });

		fireEvent.click(loginButton);
		fireEvent.click(registerButton);
	});
});
