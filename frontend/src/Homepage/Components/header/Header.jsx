import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuildingColumns, faGraduationCap, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
 const Header = ({type}) => {
  return (
    <div className="header">
      <div className={type ==="list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
            <div className="headerListItem">
            <Link
                     to='/guest/UserRegistration'>
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>USER</span></Link>
            </div>
           
            <div className="headerListItem">
            <Link
                     to='/guest/CollegeRegistration'>
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>College</span></Link>
            </div>
            <div className="headerListItem">
            <Link
                     to='/guest/AgencyRegistration'>
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>Agency</span></Link>
            </div>
           
            </div>
            {type!=="list"&&
            <>
            <h1 className="headerTitle">An investment in knowledge pays the best interest.</h1>
            <p className="headerDesc">“Education is the passport to the future, for tomorrow belongs to those who prepare for it today.</p>
            <div className="linkcontainer">
<div className="linkcon">
            <a
                     href='#about'
                     style={{ textDecoration: 'none' }}
                     >
                     <button className="headerBtn">View Colleges</button>
                  </a></div>
                  <div className="linkcon">
                  <Link
                     to='#about'
                     style={{ textDecoration: 'none' }}
                     >
                     <button className="headerBtn">View Agencies</button>
                  </Link></div>
                       </div>
           </>}
        </div>
    </div>
  )
}
export default Header
