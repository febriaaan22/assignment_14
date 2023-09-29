import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface LoginPage {
	emailAddress: string;
	password: string;
}

const initialValues = {
	emailAddress: "",
	password: "",
};

const validationSchema = yup.object({
	emailAddress: yup
		.string()
		.email("Please insert a valid email address")
		.required("Email address can't be blank"),
	password: yup.string().required("Please Enter your password"),
});

const LoginForm: React.FC = () => {
	const navigate = useNavigate();

	const handleSubmit = (values: LoginPage) => {
		const body = {
			email: values.emailAddress,
			password: values.password,
		};

		fetch("https://mock-api.arikmpt.com/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error while login");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data.data.token);
				localStorage.setItem("token", data.data.token);

				Swal.fire({
					title: "Login Success !",
					width: 600,
					padding: "3em",
				});
				navigate("/dashboard");
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					title: `User not found !`,
					width: 600,
					padding: "3em",
				});
			});
	};

	const formMik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema: validationSchema,
	});

	return (
		<Card title="Login Page" style={{ padding: "20px" }}>
			<Form
				style={{ width: "310px" }}
				onFinish={formMik.handleSubmit}
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
			>
				<div id="email-div" style={{ marginTop: "15px" }}>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder={"Enter Email"}
						allowClear
						value={formMik.values.emailAddress}
						onChange={formMik.handleChange("emailAddress")}
						status={formMik.errors.emailAddress && "error"}
					/>
				</div>
				<Form.Item style={{ marginBottom: "5px" }}>
					{formMik.errors.emailAddress && (
						<Typography>{formMik.errors.emailAddress}</Typography>
					)}
				</Form.Item>

				<div id="password-div">
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						allowClear
						placeholder={"Enter Password"}
						value={formMik.values.password}
						onChange={formMik.handleChange("password")}
						status={formMik.errors.password && "error"}
					/>
				</div>
				<Form.Item style={{ marginBottom: "5px" }}>
					{formMik.errors.password && (
						<Typography>{formMik.errors.password}</Typography>
					)}
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						style={{ margin: "15px" }}
					>
						Login
					</Button>
					<Button
						type="primary"
						htmlType="submit"
						className="login-link"
						onClick={() => {
							navigate("/register");
						}}
						style={{ margin: "15px" }}
					>
						Register
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default LoginForm;
