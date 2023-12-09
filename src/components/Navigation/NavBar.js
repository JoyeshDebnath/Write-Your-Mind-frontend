import React from "react";
import PublicNavigation from "./PublicNavigation/PublicNavigation";
import PrivateNavigation from "./PrivateNavigation/PrivateNavigation";
import AdminNavigation from "./AdminNavigation/AdminNavigation";
import { useSelector } from "react-redux";

const NavBar = () => {
	const storeData = useSelector((state) => state);
	// console.log("Inside the nav bar component ...", storeData.users);
	const { userAuth } = storeData?.users; //get the logged in user from store
	const isAdmin = userAuth?.isAdmin; //if user logged in we can get the status of the user ---->> Admin or Not Admin   ...
	return (
		<>
			{!userAuth ? (
				<PublicNavigation />
			) : isAdmin ? (
				<AdminNavigation />
			) : (
				<PrivateNavigation />
			)}
		</>
	);
};

export default NavBar;
