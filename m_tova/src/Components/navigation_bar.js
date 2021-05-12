import {Link} from 'react-router-dom';
import logo from '../Images/m_tova_logo.jpeg';


const NavBar = (props) => {

    const log_off = () =>
    {
        props.setAuthorized(false);
    }


    return (
        <div>
            <nav>
                <ul className = "nav-list">
                    <img id = "small-logo" src={logo} />
                    <h3 className = "hello-name">שלום, {props.name}</h3>
                    <Link to = "/">
                        <li onClick = {log_off}>התנתק</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}
 
export default NavBar;