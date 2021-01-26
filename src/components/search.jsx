import React, { Component } from 'react';

class Search extends Component {
	state = {  displayProfiles: [] }
	render() {
		let {displayProfiles} = this.state 
		return (
			<React.Fragment>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" id="searchTerm" type="search" placeholder="Search" aria-label="Search" />
					<button 
						className="btn btn-outline-success my-2 my-sm-0" 
						onClick={this.search}>Search</button>
				</form>
				<ul className="list-group">
					{
						displayProfiles.map(profile =>
							<li className="list-group-item" key={profile.Email}>
								{profile.FirstName + " " + profile.LastName}
							</li>
						)
					}
				</ul>
				
			</React.Fragment> 
		 );
	}

	search = () => {
		let searchTerm = document.getElementById('searchTerm').value.toLowerCase()
		let {searchableProfiles} = this.props
		let matchingProfiles = searchableProfiles.filter(profile => 
			profile.FirstName.toLowerCase().includes(searchTerm)	||
			profile.LastName.toLowerCase().includes(searchTerm)	||
			profile.UserName.toLowerCase().includes(searchTerm)	||
			profile.Email.toLowerCase().includes(searchTerm)
		)

		this.setState({displayProfiles: matchingProfiles})
	}
}
 
export default Search;