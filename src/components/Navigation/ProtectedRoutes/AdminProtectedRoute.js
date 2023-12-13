import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminProtectedRoute = ({ component: Component, ...rest }) => {
	const storeData = useSelector((state) => state);
	const { userAuth } = storeData?.users;

	return (
		<Route
			{...rest}
			render={() => {
				if (userAuth?.isAdmin) {
					return <Component {...rest} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>
	);
};

export default AdminProtectedRoute;
