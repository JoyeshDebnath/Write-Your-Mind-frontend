import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};

const Loading = () => {
	return (
		<ClipLoader color="red" loading={true} cssOverride={override}></ClipLoader>
	);
};

export default Loading;
