import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Alert from "./Alert";
const jwt = require("jsonwebtoken");

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [, setCookies] = useCookies();
	const [error, setError] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Pizza King - Login";
	}, []);

	function loginUser(email, password) {
		const url = "http://localhost:9999/api/users/login";
		let data = JSON.stringify({
			email: email,
			password: password,
		});
		let resources = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		};
		return fetch(url, resources).then((res) => res.json());
	}
	function submitHandler(event) {
		event.preventDefault();
		loginUser(email, password).then((res) => {
			if (res === "Invalid email or password") {
				setError(res);
			} else {
				setCookies("user", res);
				navigate("/my-account");
				let token = res;
				let user = jwt.decode(token);
				document.getElementById("alert").style.display = "block";
				document.getElementById(
					"alertMessage"
				).innerText = `Welcome back, ${user.firstName}!`;
			}
		});
	}

	return (
		<div className="container">
			<Alert />
			<form className="loginForm" onSubmit={submitHandler}>
				<h3>Sign in</h3>
				<p className="error-message">{error}</p>
				<input
					name="email"
					type="text"
					placeholder="Email Address"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="password"
					name="password"
					placeholder="  Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<div className="container">
					<button type="submit">Submit</button>
				</div>
				<Link to="/registration">Click here to create an account</Link>
			</form>
		</div>
	);
}
