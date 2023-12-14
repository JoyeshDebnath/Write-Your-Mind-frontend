import React from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategoriesAction } from "../../redux/slices/category/categorySlice";
import Loading from "../../utils/Loading";

const CategoryDropdown = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllCategoriesAction());
	}, [dispatch]);
	const storeData = useSelector((state) => state?.category);
	const { categoryList, loading, serverErr, appErr } = storeData;
	const allCategories = categoryList?.map((category) => {
		return {
			value: category._id,
			label: category.title,
		};
	});
	//handle the changes in dropdown
	const handleChange = (value) => {
		props.onChange("category", value);
	};

	//handle blur in dropdown
	const handleBlur = () => {
		props.onBlur("category", true);
	};

	console.log("all categories  ......", allCategories);
	return (
		<div style={{ margin: "1rem 0" }}>
			{loading ? (
				<Loading />
			) : (
				<Select
					onChange={handleChange}
					onBlur={handleBlur}
					id="category"
					options={allCategories}
					value={props?.value?.label}
				/>
			)}
			{/* dispaly dropdon error  */}
			{props?.error && <div className="text-red-500">{props?.error}</div>}
		</div>
	);
};

export default CategoryDropdown;
