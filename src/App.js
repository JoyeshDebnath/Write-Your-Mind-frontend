import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
