import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/posts/postsSlices";
import CategoryDropdown from "../Categories/CategoryDropdown";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import { Redirect } from "react-router-dom";
//yup setup
const formSchema = Yup.object({
	title: Yup.string().required("Post Title is Required!"),
	description: Yup.string().required("Post Description is Required!"),
	category: Yup.object().required("Category Required !"),
	image: Yup.string().required("please provide an image !"),
});

// Dropozone css

const Container = styled.div`
flex: 1;

  display: flex;

  flex-direction: column;

  align-items: center;

  padding: 20px;

  border-width: 2px;

  border-radius: 2px;

  border-style: dashed;

  background-color: #fafafa;

  color: #bdbdbd;

border-color:'red'

  transition: border 0.24s ease-in-out;
`;
export default function CreatePost() {
	const dispatch = useDispatch();
	//formik setup
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			category: "",
			image: "",
		},
		onSubmit: (values) => {
			const data = {
				category: values?.category?.label,
				title: values?.title,
				description: values?.description,
				image: values?.image,
			};
			dispatch(createPostAction(data));
			// console.log("Have access ???? ", values);
		},
		validationSchema: formSchema,
	});

	//state data from  store
	const storeData = useSelector((state) => state);
	const { loading, serverErr, appErr, postCreated, isPostCreated } =
		storeData?.posts;
	// console.log("Inside the create Post Component ...", storeData.posts);
	//redirect if the post was created successfully..
	if (isPostCreated) {
		return <Redirect to="/posts" />;
		//NOTE:  after redirect after post success empty the p[ostcreated state in redux else it will be redirceted ..
	}
	return (
		<>
			<div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				{appErr || serverErr ? (
					// <div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
						{serverErr} - {appErr} !
					</h2>
				) : null}
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
						Create Post
					</h2>

					<p className="mt-2 text-center text-sm text-gray-600">
						<p className="font-medium text-green-600 hover:text-indigo-500">
							Share your Thoughts and Ideas 💡 . Dont use any Slangs in your
							Post 🎯
						</p>
					</p>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form onSubmit={formik.handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Post Title 👦
								</label>
								<div className="mt-1">
									{/* Title */}
									<input
										value={formik.values.title}
										onChange={formik.handleChange("title")}
										onBlur={formik.handleBlur("title")}
										id="title"
										name="title"
										type="title"
										autoComplete="title"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
								{/* Err msg */}
								<div className="text-red-500">
									{formik?.touched?.title && formik?.errors?.title}
								</div>
							</div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mt-3 "
							>
								Select Post Category 👇
							</label>
							<CategoryDropdown
								value={formik.values.category?.label}
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
								error={formik.errors.category}
								touched={formik.touched.category}
							/>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-3"
								>
									Post Description 🎅
								</label>
								{/* Description */}
								<textarea
									value={formik.values.description}
									onChange={formik.handleChange("description")}
									onBlur={formik.handleBlur("description")}
									rows="5"
									cols="10"
									className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
									type="text"
								></textarea>
								{/* Err msg */}
								<div className="text-red-500">
									{formik?.touched?.description && formik?.errors?.description}
								</div>
								{/* image component  */}
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mt-3 mb-3"
								>
									Select Image to Upload 🙇‍♂️
								</label>
								<Container className="container bg-gray-800">
									<Dropzone
										onBlur={formik.handleBlur("image")}
										accept="image/jpeg, image/png"
										onDrop={(acceptedFiles) => {
											formik.setFieldValue("image", acceptedFiles[0]);
										}}
									>
										{({ getRootProps, getInputProps }) => {
											return (
												<div className="container">
													<div
														{...getRootProps({
															className: "dropzone",
															onDrop: (event) => event.stopPropagation(),
														})}
													>
														<input {...getInputProps()} />

														<p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
															Click here to select image
														</p>
													</div>
												</div>
											);
										}}
									</Dropzone>
								</Container>
							</div>
							<div>
								{/* Submit btn */}
								{loading ? (
									<button
										disabled
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Please Wait !
									</button>
								) : (
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Create
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
