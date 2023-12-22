export const Pagination = ({
	postsPerPage,
	totalPosts,
	paginate,
	currentPage,
}: any) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="mb-24 flex justify-center">
			<ul className="flex list-none">
				{pageNumbers.map((number) => (
					<li key={number} className="mx-1">
						<a
							onClick={() => paginate(number)}
							href="#!"
							className={`block px-4 py-2 text-sm border rounded hover:opacity-80 transition-all duration-500 font-bold   ${
								number === currentPage
									? 'bg-[#F7AB0A] text-black'
									: 'bg-[#c4c3c3] text-black '
							} cursor-pointer hover:bg-[#F7AB0A] hover:text-black`}
						>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};
