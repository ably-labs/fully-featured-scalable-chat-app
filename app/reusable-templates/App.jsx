import React, { useState, useEffect } from 'react';
import TypeScriptComponent from './TypeScriptComponent';

import logo from './logo.svg';
import './App.css';

function App() {
    // Create the count state.
    const [count, setCount] = useState(0);
    // Update the count (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);
    // Return the App component.
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Page has been open for <code>{count}</code> seconds.
                </p>
                <TypeScriptComponent></TypeScriptComponent>

            </header>
        </div>
    );
}

export default App;
