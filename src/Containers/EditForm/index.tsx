import React from "react";
import { Button, Form, Input, Select, Card, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { Option } = Select;

interface EditData {
	name: string;
	is_active: boolean;
}

const EditForm: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const validate = localStorage.getItem("token");

	const editCategory = (values: EditData) => {
		console.log(values);
		const body = {
			id,
			...values,
		};
		console.log(JSON.stringify(body));
		fetch("https://mock-api.arikmpt.com/api/category/update", {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${validate}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error while edit category");
				}
				// return response.json();
			})
			.then((data) => {
				console.log("Success register:", data);
				Swal.fire({
					icon: "success",
					title: "Edit Category Success",
					text: "Edit Category Success",
				});
				navigate("/dashboard");
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Edit Category Failed",
					text: "An error occurred during Edit Category. Please try again.",
				});
			});
	};

	return (
		<Card
			title="Edit Category"
			style={{
				maxWidth: "400px",
				width: "100%",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Form
				name="edit-item-form"
				onFinish={editCategory}
				style={{ maxWidth: 600 }}
			>
				<Form.Item name="name" rules={[{ required: true }]}>
					<Input placeholder="Name" allowClear />
				</Form.Item>

				<Form.Item name="is_active" rules={[{ required: true }]}>
					<Select placeholder="Select a status option" allowClear>
						<Option value="true">Active</Option>
						<Option value="false">Deactive</Option>
					</Select>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button
							htmlType="button"
							onClick={() => {
								navigate("/dashboard");
							}}
						>
							Back
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default EditForm;
