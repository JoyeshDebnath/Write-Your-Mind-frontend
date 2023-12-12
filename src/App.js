import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import NavBar from "./components/Navigation/NavBar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";

function App() {
	return (
		<BrowserRouter>
			<NavBar></NavBar>
			<Switch>
				<Route exact path="/update-category/:id" component={UpdateCategory} />
				<Route exact path="/add-category" component={AddNewCategory} />
				<Route exact path="/category-list" component={CategoryList} />
				<Route exact path="/" component={HomePage} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
