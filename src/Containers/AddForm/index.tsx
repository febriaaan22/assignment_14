import { Button, Form, Card, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const { Option } = Select;

interface FormData {
	name?: string;
	is_active?: boolean;
}

const initialValues = {
	name: "",
	status: "",
};

const validationSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	is_active: yup.boolean().required("Status is required"),
});

const AddForm = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const addFormItem = (values: FormData) => {
		fetch("https://mock-api.arikmpt.com/api/category/create", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error while add category");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success register:", data);
				Swal.fire({
					icon: "success",
					title: "Add Category Success",
					text: "Add Category Success",
				});
				navigate("/dashboard");
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Add Category Failed",
					text: "An error occurred during Add Category. Please try again.",
				});
			});
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: addFormItem,
		validationSchema: validationSchema,
	});

	return (
		<Card title="Add New Category">
			<Form name="control-ref" onFinish={addFormItem} style={{ width: 200 }}>
				<Form.Item
					name="name"
					validateStatus={
						formik.touched.name && formik.errors.name ? "error" : ""
					}
					help={formik.touched.name && formik.errors.name}
				>
					<Input name="name" placeholder="Name" value={formik.values.name} />
				</Form.Item>
				<Form.Item name="status">
					<Select placeholder="Select Option" allowClear>
						<Option value="active">Active</Option>
						<Option value="deactive">Deactive</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button onClick={() => navigate("/dashboard")} htmlType="button">
							Back
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default AddForm;
