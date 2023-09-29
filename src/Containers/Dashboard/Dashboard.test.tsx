import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from ".";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from ".";

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
	test("Add New Category Button render correctly", async () => {
		render(
			<Router>
				<Dashboard />
			</Router>
		);
		const categoryButton = screen.getByText("Add New Category");
		expect(categoryButton).toBeDefined();
	});
	test("Logout Button render correctly", async () => {
		render(
			<Router>
				<Dashboard />
			</Router>
		);
		const logoutButton = screen.getByText("Logout");
		expect(logoutButton).toBeDefined();
	});
	test("Edit button render correctly", async () => {
		render(
			<Router>
				<Dashboard />
			</Router>
		);
		const editButton = screen.getByText("Action");
		expect(editButton).toBeDefined();
	});
	test("Delete button render correctly", async () => {
		render(
			<Router>
				<Dashboard />
			</Router>
		);
		const deleteButton = screen.getByText("Action");
		expect(deleteButton).toBeDefined();
	});
	it("fetches data and displays it in the table", async () => {
		render(
			<Router>
				<Dashboard />
			</Router>
		);
		const idSection = screen.getByText("ID");
		expect(idSection).toBeDefined();

		const nameSection = screen.getByText("Name");
		expect(nameSection).toBeDefined();

		const statusSection = screen.getByText("Status");
		expect(statusSection).toBeDefined();
	});
});

it("onSubmit works correctly", async () => {
	render(
		<Router>
			<RegisterForm />
		</Router>
	);

	const categoryButton = screen.getByText("Add New Category");
	const logoutButton = screen.getByText("Logout");
	const editButton = screen.getByText("Action");
	const deleteButton = screen.getByText("Action");

	fireEvent.click(editButton);
	fireEvent.click(deleteButton);
	fireEvent.click(categoryButton);
	fireEvent.click(logoutButton);
});
