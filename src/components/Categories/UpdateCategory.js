import {
	PlusCircleIcon,
	BookOpenIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	updateCategoryAction,
	fetchSingleCategoryAction,
	deleteCategoryAction,
} from "../../redux/slices/category/categorySlice";
import * as Yup from "yup";
import { useFormik } from "formik";

const categoryFormSchema = Yup.object({
	title: Yup.string().required(
		"Please enter the category title You want to Add ."
	),
});
const UpdateCategory = (props) => {
	const id = props?.match?.params?.id;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSingleCategoryAction(id));
	}, []);
	//get category state data
	const storeData = useSelector((state) => state);
	const { loading, category, appErr, serverErr } = storeData?.category;
	// console.log("CATEGOTY :", category);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: category?.title,
		},
		onSubmit: (values) => {
			//prepare the data for update

			dispatch(updateCategoryAction({ title: values.title, categoryId: id }));
		},
		validationSchema: categoryFormSchema,
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<BookOpenIcon className="mx-auto h-12 w-auto" />
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Update The Category 📑
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						<p className="font-medium text-indigo-600 hover:text-indigo-500">
							These are the categories user will select when creating a post
						</p>
						{/* Error Message  */}
						<div>
							{appErr || serverErr ? (
								<h2 className="text-red-500 text-center text-lg">
									{appErr} {serverErr}
								</h2>
							) : null}
						</div>
					</p>
				</div>
				{/* Form */}
				<form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Name
							</label>
							{/* Title */}
							<input
								value={formik.values.title}
								onChange={formik.handleChange("title")}
								onBlur={formik.handleBlur("title")}
								type="text"
								autoComplete="text"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
								placeholder="New Category"
							/>
							<div className="text-red-400 mb-2">
								{formik.touched.title && formik.errors.title}
							</div>
						</div>
					</div>

					<div>
						<div>
							{/* Submit */}
							{loading ? (
								<button
									disabled
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
								>
									LOADING ...
								</button>
							) : (
								<>
									<button
										type="submit"
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<PencilIcon
												className="h-5 w-5 text-black-500 group-hover:text-black-400"
												aria-hidden="true"
											/>
										</span>
										Update Category
									</button>
									{/* delete  */}
									<button
										onClick={() => dispatch(deleteCategoryAction(id))}
										type="submit"
										className="group relative mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<TrashIcon
												className="h-5 w-5 text-black-500 group-hover:text-black-400"
												aria-hidden="true"
											/>
										</span>
										Delete Category
									</button>
								</>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateCategory;
