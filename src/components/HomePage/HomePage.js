import React from "react";
import poster from "../../img/poster.jpg";
const HomePage = () => {
	return (
		<>
			<section className="pb-10 bg-gray-800">
				<div className="relative container px-4   mx-auto">
					<div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
						<div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
							<span className="text-lg font-bold text-blue-400">
								Share your thoughts with the World ! 🚀
							</span>
							<h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
								Whats in your mind ? 📑{" "}
								<span className="text-yellow-500">share your mind .</span>
							</h2>
							<p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
								Your blogs must be free from <b>Racism</b> and <b>Slangs</b>{" "}
							</p>
							<a
								className="inline-block px-12 py-5 text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
								href="/"
							>
								Lets Go
							</a>
						</div>
						<div className="w-full lg:w-1/2 px-4">
							<img className="w-full" src={poster} alt={poster} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
