import "./static/css/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Menu from "./Components/Menu";
import Main from "./Components/Main";
import Error from "./Components/Error";
import MyAccount from "./Components/MyAccount";
import MyCart from "./Components/MyCart";
import OrderPlaced from "./Components/OrderPlaced";
import PrivateRoute from "./Components/PrivateRoute";
import { useCookies } from "react-cookie";
const jwt = require("jsonwebtoken");

export default function App(props) {
	const [cookies] = useCookies();
	let token = cookies.user;
	let loggedIn = false;
	let user = {};

	if (token !== undefined) {
		user = jwt.decode(token);
		if (user !== null) {
			loggedIn = true;
		}
	}

	return (
		<div>
			<Routes>
				<Route path="/" exact element={<Main />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/menu" element={<Menu />} />
				<Route
					path="my-account"
					element={
						<PrivateRoute isAuth={loggedIn} redirectTo="/login">
							<MyAccount />
						</PrivateRoute>
					}
				/>
				<Route
					path="my-cart"
					element={
						<PrivateRoute isAuth={loggedIn} redirectTo="/login">
							<MyCart />
						</PrivateRoute>
					}
				/>
				<Route path="/order-placed" element={<OrderPlaced />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
}
