import React, { Component } from 'react';

class PagedNav extends Component {
	state = {  }
	render() { 
		return ( 
			<nav aria-label="Page navigation example">
  				<ul class="pagination">
    				<li className="page-item"><a className="page-link" href="#">First</a></li>
    				<li className="page-item" onClick={this.props.prevPageHandler}><a className="page-link" href="#">Prev</a></li>
    				<li className="page-item"><a className="page-link" href="#">{this.props.currPage}/{this.props.totPages}</a></li>
    				<li className="page-item" onClick={this.props.nextPageHandler}><a className="page-link" href="#">Next</a></li>
    				<li className="page-item"><a className="page-link" href="#">Last</a></li>
  				</ul>
			</nav>
		 );
	}
}
 
export default PagedNav;