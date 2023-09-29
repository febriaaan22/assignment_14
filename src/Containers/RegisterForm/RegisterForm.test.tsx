import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from ".";
import { BrowserRouter as Router } from "react-router-dom";

describe("Register Form Test", () => {
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
	test("field Register form render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const title = screen.getByText("Register Page");
		expect(title).toBeDefined();
	});
	test("field name render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const nameInput = screen.getByPlaceholderText("Name");
		expect(nameInput).toBeDefined();
	});
	test("field email render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const emailInput = screen.getByPlaceholderText("Email Address");
		expect(emailInput).toBeDefined();
	});
	test("field password render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const passwordInput = screen.getByPlaceholderText("Enter Password");
		expect(passwordInput).toBeDefined();
	});
	test("Register button render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const registerButton = screen.getByText("Register");
		expect(registerButton).toBeDefined();
	});
});

it("onSubmit works correctly", async () => {
	render(
		<Router>
			<RegisterForm />
		</Router>
	);

	const nameInput = screen.getByPlaceholderText("Name");
	const emailInput = screen.getByPlaceholderText("Email Address");
	const passwordInput = screen.getByPlaceholderText("Enter Password");
	const registerButton = screen.getByText("Register");

	fireEvent.change(nameInput, { target: { value: "" } });
	fireEvent.change(emailInput, { target: { value: "invalidemail" } });
	fireEvent.change(passwordInput, { target: { value: "" } });

	fireEvent.click(registerButton);
});
