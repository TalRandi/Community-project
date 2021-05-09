import { Button } from 'react-bootstrap';

const Menu = (props) => {
    return (  
        <div className="side-menu">
            {(() => {
                //student
                if(props.type === 0)
                {
                    return(
                        <div className = "menu-content">
                            <Button>תכנים קבוצתיים</Button><br />
                            <Button>תכני קורס</Button><br />
                            <Button>פרטי קורס</Button><br />
                            <Button>פרטי מדריך</Button>
                        </div>
                    )
                }
                //instructor
                else if(props.type === 1)
                {
                    return(
                        <div className = "menu-content">
                            <Button>רשימת קורסים</Button><br />
                            <Button>רשימת סטודנטים</Button>
                        </div>
                    )
                }
                //admin
                else if(props.type === 2)
                {
                    return(
                        <div className = "menu-content">
                            <Button>רשימת מדריכים</Button><br />
                            <Button>רשימת קורסים</Button>
                        </div>
                    )
                }
            })()}
        </div>
    );
}
 
export default Menu;