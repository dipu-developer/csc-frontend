import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./Components/nav.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
	return (
		<>
			<Router>
				<Nav />
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
