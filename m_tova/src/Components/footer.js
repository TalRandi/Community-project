import logo from '../Images/mtova_logo_white.png';
import { MdPlace } from "react-icons/md";
import { IoCall,IoMail } from "react-icons/io5";

const Footer = (props) => {

    return (
        <div>
            <footer>
                <img id="small_logo_footer" src={logo} alt="" />
                <MdPlace size={20}/>
                <h6 className="footer-content">
                    משרד ראשי
                    בית יד שרה
                    שדרות הרצל   , 124 ירושלים
                    961872
                       </h6>
                <IoCall size={20}/><h6 className="footer-content"> office@mtova.org.il </h6>

                <IoMail size={20}/> <h6 className="footer-content">02-6513816 | 1800-100-947  </h6>
            </footer>
        </div>
    );
}

export default Footer;