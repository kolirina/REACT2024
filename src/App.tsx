import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/UncontrolledForm"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Uncontrolled Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/HookForm"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              React Hook Form
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
