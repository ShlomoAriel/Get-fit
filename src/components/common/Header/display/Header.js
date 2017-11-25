import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({menuOpen, currentTab, toggleMenu, goTo}) => {
	const tabs = [{route:'home',name:'ראשי'}, {route:'traineeWorkout',name:'תכנית אימון'},
				  {route:'traineeDashboard',name:'עמוד מתאמן'}, {route:'paymentDashboard',name:'תשלומים וחבילות'},
				  {route:'trainee',name:'מתאמנים'}, {route:'trainingPackage',name:'חבילות אימון'},
				  {route:'exercise',name:'תרגילים'}, {route:'login',name:'התחברות'}]
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
		      		<li key={tab.route} className={"" + (currentTab.route === tab.route ? 'active' : '')} onClick={()=>goTo(tab.route)}>
	      				<Link to={'/' + tab.route}>
	      					{tab.name}
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
