import NavBar from './navigation_bar';
import Menu from './menu';

const HomeAdmin = (props) => {
    return (  
        <div>
            <NavBar 
                isAuthorized = {props.isAuthorized} 
                setAuthorized = {props.setAuthorized}
                name = {props.name}/>
            <Menu 
                type = {props.type}/>
        </div>
    );
}
 
export default HomeAdmin;