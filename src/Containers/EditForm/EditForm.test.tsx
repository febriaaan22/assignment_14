import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from ".";
import { BrowserRouter as Router } from "react-router-dom";
import EditForm from ".";

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
	test("Edit Category form render correctly", async () => {
		render(
			<Router>
				<EditForm />
			</Router>
		);
		const title = screen.getByText("Edit Category");
		expect(title).toBeDefined();
	});
	test("field name render correctly", async () => {
		render(
			<Router>
				<EditForm />
			</Router>
		);
		const nameInput = screen.getByPlaceholderText("Name");
		expect(nameInput).toBeDefined();
	});
	test("status input render correctly", async () => {
		render(
			<Router>
				<EditForm />
			</Router>
		);
		const selectElement = screen.getByText("Select a status option");
		expect(selectElement).toBeDefined();

		// const activeValue = screen.getByText("active");
		// expect(activeValue).toBeDefined();

		// const deactiveValue = screen.getByText("deactive");
		// expect(deactiveValue).toBeDefined();
	});
	test("Submit button render correctly", async () => {
		render(
			<Router>
				<RegisterForm />
			</Router>
		);
		const submitButton = screen.getByText("Submit");
		expect(submitButton).toBeDefined();
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
	const selectElement = screen.getByText("Select a status option");
	const submitButton = screen.getByText("Submit");
	const backButton = screen.getByText("Back");

	fireEvent.change(nameInput, { target: { value: "" } });
	// fireEvent.change(selectElement, { target: { value: "true" } });

	fireEvent.click(selectElement);
	fireEvent.click(submitButton);
	fireEvent.click(backButton);
});
