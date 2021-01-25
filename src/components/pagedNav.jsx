import React, { Component } from 'react';

class PagedNav extends Component {
	state = {  }
	render() { 
		return ( 
			<nav aria-label="Page navigation example">
  					<ul class="pagination">
    				<li class="page-item"><a class="page-link" href="#">First</a></li>
    				<li class="page-item"><a class="page-link" href="#">Prev</a></li>
    				<li class="page-item"><a class="page-link" href="#">1/1</a></li>
    				<li class="page-item"><a class="page-link" href="#">Next</a></li>
    				<li class="page-item"><a class="page-link" href="#">Last</a></li>
  				</ul>
			</nav>
		 );
	}
}
 
export default PagedNav;