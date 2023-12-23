import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import {
	fetchAllPostAction,
	togglePostLikeAction,
	togglePostDislikeAction,
} from "../../redux/slices/posts/postsSlices";
import { fetchAllCategoriesAction } from "../../redux/slices/category/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../utils/Loading";
import DateFormatter from "../../utils/DateFormatter";

export default function PostsList() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const storeData = useSelector((state) => state);

	//categroies
	const {
		categoryList,
		loading: categoryLoading,
		appErr: categoryAppErr,
		serverErr: categoryServerErr,
	} = storeData?.category;
	console.log(categoryList);
	// console.log(storeData.posts);
	//posts
	const { loading, appErr, serverErr, postsList, likes, dislikes } =
		storeData?.posts;
	const dispatch = useDispatch();
	//fetch all posts dispatch
	useEffect(() => {
		dispatch(fetchAllPostAction(""));
	}, [dispatch, likes, dislikes]);
	//any time the likes and dislikes states changes the component should rerender .... thats why the dependency array of UseEffect contains likes and dislikes as a dependency ....

	//fetch all categories dispatch
	useEffect(() => {
		dispatch(fetchAllCategoriesAction());
	}, [dispatch]);

	return (
		<>
			<section>
				<div className="py-20 bg-neutral-900 min-h-screen radius-for-skewed">
					<div className="container mx-auto px-4">
						<div className="mb-16 flex flex-wrap items-center">
							<div className="w-full lg:w-1/2">
								<span className="text-green-600 font-bold">
									Latest Posts from our awesome authors
								</span>
								<h2 className="text-4xl text-gray-300 mb-3 lg:text-5xl font-bold font-heading">
									Latest Post
								</h2>

								<h3 className="text-2xl text-fuchsia-500 mt-2 font-bold">
									Category Selected ✏:{"    "}
									<span className="text-purple-200">{selectedCategory}</span>
								</h3>
							</div>
							<div className=" block text-right w-1/2">
								{/* View All */}
								<button
									onClick={() => {
										dispatch(fetchAllPostAction(""));
										setSelectedCategory("All");
									}}
									className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
								>
									View All Posts
								</button>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3">
							<div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
								<div className="py-4 px-6 bg-gray-700 shadow rounded">
									<h4 className="mb-4 text-emerald-50 font-bold uppercase">
										Categories
									</h4>
									<ul>
										{categoryLoading ? (
											<div className="mb-2">
												<Loading />
											</div>
										) : null}

										{categoryAppErr || categoryServerErr ? (
											<div className="text-red-500 text-base">
												{categoryServerErr} - {categoryAppErr}
											</div>
										) : categoryList?.length === 0 ? (
											<div className="text-xl text-gray-100 text-center">
												No category
											</div>
										) : (
											categoryList?.map((category) => {
												return (
													<li
														onClick={() => {
															dispatch(fetchAllPostAction(category?.title));
															setSelectedCategory(category?.title);
														}}
													>
														<p className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-300 font-bold bg-gray-500">
															{/* {category?.title} */} {category?.title}
														</p>
													</li>
												);
											})
										)}
										{/* {} */}
									</ul>
								</div>
							</div>
							<div className="w-full lg:w-3/4 px-3">
								{/* posts here  */}
								{loading ? (
									<Loading />
								) : appErr || serverErr ? (
									<h1>Errr.....</h1>
								) : postsList?.length === 0 ? (
									<h1>No Post Found </h1>
								) : (
									postsList?.map((post) => {
										return (
											<div
												key={post.id}
												className="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6"
											>
												<div className="mb-10  w-full lg:w-1/4 px-3">
													<Link>
														{/* Post image */}
														<img
															className="w-full h-full object-cover rounded"
															src={post.image}
															alt=""
														/>
													</Link>
													{/* Likes, views dislikes */}
													<div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
														{/* Likes */}
														<div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
															{/* Togle like  */}
															<div className="">
																<ThumbUpIcon
																	onClick={() =>
																		dispatch(togglePostLikeAction(post?._id))
																	}
																	className="h-7 w-7 text-indigo-600 cursor-pointer"
																/>
															</div>
															<div className="pl-2 text-gray-600">
																({post?.likes?.length})
															</div>
														</div>
														{/* Dislike */}
														<div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
															<div>
																<ThumbDownIcon
																	onClick={() =>
																		dispatch(togglePostDislikeAction(post?._id))
																	}
																	className="h-7 w-7 cursor-pointer text-red-500"
																/>
															</div>
															<div className="pl-2 text-gray-600">
																{post?.dislikes?.length}
															</div>
														</div>
														{/* Views */}
														<div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
															<div>
																<EyeIcon className="h-7 w-7  text-gray-400" />
															</div>
															<div className="pl-2 text-gray-600">
																{/* {post?.numViews} */}
																{post?.numViews}
															</div>
														</div>
													</div>
												</div>
												<div className="w-full lg:w-3/4 px-3">
													<Link className="hover:underline">
														<h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
															{post?.title}
														</h3>
													</Link>
													<p className="text-gray-300">{post.description}</p>
													{/* Read more */}
													<Link className="text-indigo-500 hover:underline">
														Read More..
													</Link>
													{/* User Avatar */}
													<div className="mt-6 flex items-center">
														<div className="flex-shrink-0">
															<Link>
																<img
																	className="h-10 w-10 rounded-full"
																	src={post?.user?.profilePhoto}
																	alt=""
																/>
															</Link>
														</div>
														<div className="ml-3">
															<p className="text-sm font-medium text-gray-900">
																<Link className="text-yellow-400 hover:underline ">
																	{post?.user?.firstName} {post?.user?.lastName}
																</Link>
															</p>
															<div className="flex space-x-1 text-sm text-green-500">
																<time>
																	{/* <DateFormatter date={post?.createdAt} /> */}
																	{<DateFormatter date={post?.createdAt} />}
																</time>
																<span aria-hidden="true">&middot;</span>
															</div>
														</div>
													</div>
													{/* <p class="text-gray-500">
                          Quisque id sagittis turpis. Nulla sollicitudin rutrum
                          eros eu dictum...
                        </p> */}
												</div>
											</div>
										);
									})
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-900">
					<div className="skew bg-green-500 skew-bottom mr-for-radius">
						<svg
							className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
							viewBox="0 0 10 10"
							preserveAspectRatio="none"
						>
							<polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
						</svg>
					</div>
					<div className="skew bg-gray-500  skew-bottom ml-for-radius">
						<svg
							className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
							viewBox="0 0 10 10"
							preserveAspectRatio="none"
						>
							<polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
						</svg>
					</div>
				</div>
			</section>
		</>
	);
}
