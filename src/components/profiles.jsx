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
		return ( 
			<div class="accordion" id="profiles">
			  <div class="accordion-item">
			    <h2 class="accordion-header" id="headingOne">
			      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			        Accordion Item #1
			      </button>
			    </h2>
			    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#profiles">
			      <div class="accordion-body">
			        <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
 
export default Profiles;