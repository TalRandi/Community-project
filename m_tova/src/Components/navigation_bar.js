import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav>
                <ul className = "nav-list">
                    <h3>Logo</h3>
                    {/* <Link to = "/">
                        <li></li>    
                    </Link>
                    <Link to = "login">
                        <li>Login</li>    
                    </Link> */}
                    <Link to = "/">
                        <li>התנתק</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}
 
export default NavBar;