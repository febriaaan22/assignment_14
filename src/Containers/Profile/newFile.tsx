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

	it("login page render correctly", async () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const title = screen.getAllByText("Login Page");
		expect(title).toBeDefined();
	});
	it("label email render correctly", async () => {
		render(
			<Router>
				<ProfilePage />
			</Router>
		);
		const emailInput = screen.getByText("Enter Email");
		expect(emailInput).toBeDefined();
	});

	it("label password render correctly", async () => {
		render(
			<Router>
				<ProfilePage />
			</Router>
		);
		const passwordInput = screen.getByPlaceholderText("Enter Password");
		expect(passwordInput).toBeDefined();
	});

	it("onSubmit works correctly", async () => {
		render(
			<Router>
				<ProfilePage />
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
