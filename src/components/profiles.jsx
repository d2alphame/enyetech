import React, { Component } from 'react';
import PagedNav from './pagedNav'

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
					let totalPages = Math.floor(result.size / 20) + (result.size % 20 ? 1 : 0)
					this.setState({
						loaded: true,
						profiles: result.records.profiles,
						status: result.status,
						size: result.size,
						currentPage: 1,
						pageLimit: 20,
						totalPages: totalPages
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
		const { error, loaded, currentPage, pageLimit, profiles} = this.state
		if(error) {
			return ( <div>Error: { error.message } </div> )
		}
		else if(!loaded) {
			return ( <div>Loading...</div> )
		}

		let displayProfiles = this.gotoPage(currentPage, pageLimit, profiles)
		return ( 
			<div>
				<PagedNav currPage={currentPage} totPages={this.state.totalPages} nextPageHandler={this.gotoNextPage} prevPageHandler={this.gotoPrevPage} />
				{ displayProfiles.map(profile => 
					<div className="card my-5" key={profile.Email}>
						<div className="card-header">
							<b><i>{profile.FirstName + " " + profile.LastName}</i></b><br />
							<i>{profile.Email}</i><br />
							<i>{profile.PhoneNumber}</i><br />
							<i>{profile.DomainName}</i><br />
						</div>
						<div className="card-body">
							<h5 className="card-title">{profile.UserName}</h5>
							Credit Card Number: {profile.CreditCardNumber.substring(0, 4)}***<br />
							Credit Card Type: {profile.CreditCardType}<br />
							Payment Method: {profile.PaymentMethod}<br />
							<a href={profile.URL} target="_blank" rel="noopener noreferrer" className="card-link" >{profile.URL}</a><br />
							<p></p>
						</div>
						<div className="card-footer text-muted">
    						Last logged in on {profile.LastLogin} <br />
							From {profile.Longitude}, {profile.Latitude} <br />
							With {profile.MacAddress}
  						</div>
					</div>
				)}
			</div>
		);
	}

	// Returns an array which contains only the profiles for the given page
	// n is the page number, count is the number of items per page and arr
	// is the array to page
	gotoPage = (n, count, arr) => {

		let len = arr.length

		if(n <= 0) { n = 1 }					// We can't go to page 0, can we :D so just go to page 1 instead
		let startIndex = count * (n - 1)

		// Need to avoid ArrayIndexOutOfBounds
		if(startIndex >= len) {

			// Rather than ArrayIndexOutOfBounds, just return the last page
			startIndex = len - (len % count)
		}

		const lastIndex = startIndex + count
		return arr.slice(startIndex, lastIndex)
	}

	

	gotoNextPage = () => {
		let { currentPage, totalPages } = this.state
		if(currentPage < totalPages) {
			currentPage++
			this.setState({currentPage: currentPage})
		}
	}


	gotoPrevPage = () => {
		let { currentPage } = this.state
		if(currentPage > 1) {
			currentPage--
			this.setState({currentPage: currentPage})
		}
	}
}
 
export default Profiles;