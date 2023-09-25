import React, { Component } from 'react';
import './HeaderComponent.css';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-dark bg-dark'>
                        
                            <h1>Employee CRUD Full Stack</h1>

                    </nav>
                </header>
                
            </div>
        );
    }
}

export default HeaderComponent;