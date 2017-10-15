import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({menuOpen, currentTab, toggleMenu, goTo}) => {
	const tabs = ['home','login','trainee', 'trainingPackage', 'exercise','about']
	return (
	    <nav className="navbar navbar-default">
		  <div className="container-fluid">
		    
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle collapsed" onClick={toggleMenu} aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <a className="navbar-brand">Get Fit</a>
		    </div>
		    <div className={"collapse navbar-collapse" + (menuOpen ? " in":"")} id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav">
		      {
		      	tabs.map( tab => 
		      		<li key={tab} className={"" + (currentTab === tab ? 'active' : '')} onClick={()=>goTo(tab)}>
	      				<Link to={'/' + tab}>
	      					{tab}
		      			</Link>		
		      		</li>)
		      }
		      </ul>
		    </div>
		  </div>
		</nav>
);
}
export default Header;
