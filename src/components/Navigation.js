import React from 'react';
import logo from '../logo.svg'

class Navigation extends React.Component {
  render(){
      return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <img src={logo} height="50" width="50" alt="Green Stocks"/>
            
            <div class="navbar navbar-fixed-top">
                <div class="navbar-nav">
                    <a className="nav-link" href="https://github.com/delphe/green-stocks" target="_blank" rel="noopener noreferrer">Source Code &nbsp; </a>
                </div>
                <div class="navbar-nav">
                    <a className="nav-link" href="https://github.com/delphe/green-stocks/wiki" target="_blank" rel="noopener noreferrer">Wiki</a>
                </div>
            </div>
        </nav>
      )
  }
}

export default Navigation;
