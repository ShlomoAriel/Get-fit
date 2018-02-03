import React from 'react';
import { Link } from 'react-router-dom'
import TraineePersonalInfoComponent from 'components/Management/Trainee/container/TraineePersonalInfoComponent'

const Header = ({menuOpen, currentTab, toggleMenu, goTo}) => {

	function goToAndSet(tab){
		toggleMenu()
		goTo(tab)
	}
	const tabs = [
				// {route:'home',name:'ראשי'}, 
				// {route:'traineeWorkout',name:'תכנית אימון'},
				  {route:'schedule',name:'לוז'},
				  {route:'',name:'עמוד מתאמן'}, {route:'paymentDashboard',name:'תשלומים וחבילות'},
				  {route:'trainee',name:'מתאמנים'},
				  {route:'settings',name:'הגדרות'},
				  {route:'login',name:'התחברות'},]
				  // {route:'exercise',name:'תרגילים'}, {route:'trainingPackage',name:'חבילות אימון'}]
	return (
	    <nav className="navbar navbar-default">
		  <div className="container-fluid container">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle collapsed" onClick={toggleMenu} aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <a className="navbar-brand" onClick={toggleMenu}>Avital Fitness Club</a>
		    </div>
		    <div className={"collapse navbar-collapse" + (menuOpen ? " in":"")} id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav">
		      {
		      	tabs.map( tab => 
		      		<li key={tab.route} className={"" + (currentTab === tab.route ? 'active' : '')}>
	      				<Link to={'/' + tab.route} onClick={()=>goToAndSet(tab.route)} >
	      					{tab.name}
		      			</Link>		
		      		</li>)
		      }
		      </ul>
			<TraineePersonalInfoComponent/>
		    </div>
		  </div>
		</nav>
);
}
export default Header;
