import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//store and redux
import store from "./redux/store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
