import React, { Component } from 'react';

class Profiles extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: null,
			loaded: false,
			profiles: []
		}
	}

	componentDidMount() {
		fetch("https://api.enye.tech/v1/challenge/records")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						loaded: true,
						profiles: result.records.profiles,
						status: result.status,
						size: result.size,
						currentPage: 1,
						pageLimit: 20
					})
				},
				(error) => {
					this.setState({
						loaded: false,
						error
					})
				}
			)
	}

	render() { 
		const { error, loaded, profiles } = this.state
		if(error) {
			return ( <div>Error: { error.message } </div> )
		}
		else if(!loaded) {
			return ( <div>Loading...</div> )
		}

		let displayProfiles = this.gotoPage(1, 20)
		return ( 
			<div>
				{ displayProfiles.map(profile => 
					<div className="card" key={profile.Email}>
						<div className="card-body">
							<div>
								<h5 className="card-title">{profile.FirstName + " " + profile.LastName}</h5>
								<h6 class="card-subtitle mb-2 text-muted">{profile.Email}</h6>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	// Returns an array which contains only the profiles for the given page
	gotoPage = (n, pageLimit) => {
		const startIndex = pageLimit * (n - 1)
		const lastIndex = startIndex + pageLimit
		return this.state.profiles.slice(startIndex, lastIndex)
	}

	gotoNextPage() {

	}

	gotoPrevPage() {

	}
}
 
export default Profiles;