import React from "react";

const SearchBar = (props) => {
	const { setSearch } = props;

	return (
		<div className="searchbar">
			<input
				placeholder="Search for a Pokémon..."
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
		</div>
	);
};

export default SearchBar;