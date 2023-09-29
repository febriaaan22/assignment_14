import React from "react";
import { Button, Form, Input, Card, Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface RegisterPage {
	name: string;
	email: string;
	password: string;
}

const initialValues = {
	name: "",
	email: "",
	password: "",
};

const validationSchema = yup.object({
	name: yup.string().required("The Name field is required"),
	email: yup
		.string()
		.email("Enter Valid Email Address")
		.required("The email must be a valid email address"),
	password: yup
		.string()
		.required("The Password Field is required")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"The Password must be exactly 8 characters long, must contain at least one letter, one number and one special character"
		),
});

const RegisterForm: React.FC = () => {
	const navigate = useNavigate();

	const handleSubmit = (values: RegisterPage) => {
		fetch("https://mock-api.arikmpt.com/api/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error while register");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success register:", data);
				Swal.fire({
					icon: "success",
					title: "Registration Success",
					text: "Registration Success",
				});
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Registration Failed",
					text: "An error occurred during registration. Please try again.",
				});
			});
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema: validationSchema,
	});

	const handleRegister = () => {
		formik.validateForm().then(() => {
			if (Object.keys(formik.errors).length === 0) {
				formik.handleSubmit();
			}
		});
	};

	// const handleLogin = () => {
	//     navigate('/login');
	// };

	return (
		<Card title="Register Page" style={{ width: "400px" }}>
			<Form
				style={{ maxWidth: 600 }}
				name="register_page"
				className="register"
				initialValues={{ remember: true }}
				onFinish={formik.handleSubmit}
			>
				<div id="name-div">
					<Input
						placeholder="Name"
						value={formik.values.name}
						onChange={formik.handleChange("name")}
						status={formik.errors.name && "error"}
					/>
				</div>

				<Form.Item>
					{formik.errors.name && <Typography>{formik.errors.name}</Typography>}
				</Form.Item>

				<div id="email-div">
					<Input
						placeholder="Email Address"
						value={formik.values.email}
						onChange={formik.handleChange("email")}
						status={formik.errors.email && "error"}
					/>
				</div>

				<Form.Item>
					{formik.errors.email && (
						<Typography>{formik.errors.email}</Typography>
					)}
				</Form.Item>

				<div id="password-div">
					<Input
						type="password"
						placeholder="Enter Password"
						value={formik.values.password}
						onChange={formik.handleChange("password")}
						status={formik.errors.password && "error"}
					/>
				</div>

				<Form.Item>
					{formik.errors.password && (
						<Typography>{formik.errors.password}</Typography>
					)}
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button
						type="primary"
						htmlType="button"
						onClick={handleRegister}
						style={{ margin: "12px" }}
					>
						Register
					</Button>
					{/* <Button type="primary" htmlType="button" onClick={handleLogin} >
        Login
    </Button> */}
				</Form.Item>
			</Form>
		</Card>
	);
};

export default RegisterForm;
