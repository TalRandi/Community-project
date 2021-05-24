import logo from '../Images/mtova_logo_white.png';

const Footer = (props) => {

    return(
        <div>
            <footer>
            <img id = "small_logo_footer" src={logo} alt = ""/>
            משרד ראשי
            בית יד שרה
            שדרות הרצל ,124 ירושלים      961872
            מייל: office@mtova.org.il
            טל: 02-6513816 | 1800-100-947            
            </footer>
        </div>
    );
}

export default Footer;