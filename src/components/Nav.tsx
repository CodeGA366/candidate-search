//import React from 'react' and link from react-router-dom
import { Link } from 'react-router-dom';

//nav component
const Nav = () => {
  return (
    <nav className='Nav'>
      <ul className='nav-item'>
        <li>
          <Link className='nav-link' to ="/">Home</Link>
        </li>
        <li>
          <Link className="nav-link" to ="./SavedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
