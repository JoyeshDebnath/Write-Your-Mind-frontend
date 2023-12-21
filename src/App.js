import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import NavBar from "./components/Navigation/NavBar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PrivateProtectedRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectedRoute";
import AdminProtectedRoute from "./components/Navigation/ProtectedRoutes/AdminProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostList";

function App() {
	return (
		<BrowserRouter>
			<NavBar></NavBar>
			<Switch>
				{/* Admin Only Access */}
				<AdminProtectedRoute
					exact
					path="/update-category/:id"
					component={UpdateCategory}
				/>
				<AdminProtectedRoute
					exact
					path="/add-category"
					component={AddNewCategory}
				/>
				<AdminProtectedRoute
					exact
					path="/category-list"
					component={CategoryList}
				/>

				{/* Logged in useers  */}
				<PrivateProtectedRoute
					exact
					path="/create-post"
					component={CreatePost}
				/>
				{/* for all users  */}

				<Route exact path="/" component={HomePage} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route eaxct path="/posts" component={PostsList} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
