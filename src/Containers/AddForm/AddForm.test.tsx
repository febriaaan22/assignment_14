import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from ".";
import { BrowserRouter as Router } from "react-router-dom";
import AddForm from ".";

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
	test("Add New Category render correctly", async () => {
		render(
			<Router>
				<AddForm />
			</Router>
		);
		const title = screen.getByText("Add New Category");
		expect(title).toBeDefined();
	});
	test("field name render correctly", async () => {
		render(
			<Router>
				<AddForm />
			</Router>
		);
		const nameInput = screen.getByPlaceholderText("Name");
		expect(nameInput).toBeDefined();
	});
	test("status option render correctly", async () => {
		render(
			<Router>
				<AddForm />
			</Router>
		);
		const selectElement = screen.getByText("Select Option");
		expect(selectElement).toBeDefined();
	});
	test("Submit button render correctly", async () => {
		render(
			<Router>
				<AddForm />
			</Router>
		);
		const registerButton = screen.getByText("Submit");
		expect(registerButton).toBeDefined();
	});

	test("Back button render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const backButton = screen.getByText("Back");
		expect(backButton).toBeDefined();
	});
});

it("onSubmit works correctly", async () => {
	render(
		<Router>
			<RegisterForm />
		</Router>
	);

	const nameInput = screen.getByPlaceholderText("Name");
	const selectElement = screen.getByText("Select Option");
	const submitButton = screen.getByText("Submit");
	const backButton = screen.getByText("Back");

	fireEvent.change(nameInput, { target: { value: "" } });
	// fireEvent.change(selectElement, { target: { value: "true" } });

	fireEvent.click(selectElement);
	fireEvent.click(submitButton);
	fireEvent.click(backButton);
});
