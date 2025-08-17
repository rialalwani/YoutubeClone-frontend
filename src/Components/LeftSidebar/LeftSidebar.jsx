import "./LeftSidebar.css"
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";

function LeftSidebar(){
    return(
        <div className="LeftSidebarDiv">
          <Link to="/" className="SideBarIconsDiv">
            <div className="SideBarIcons" style={{marginTop:'0.8rem'}}><AiOutlineHome size={24}/></div>
            <p className="IconsText">Home</p>
          </Link>
          <div className="SideBarIconsDiv">
            <div className="SideBarIcons"><MdOutlineExplore size={24}/></div>
            <p className="IconsText">Explore</p>
          </div>
          <div className="SideBarIconsDiv">
            <div className="SideBarIcons"><SiYoutubeshorts size={24}/></div>
            <p className="IconsText">Shorts</p>
          </div>
          <div className="SideBarIconsDiv">
            <div className="SideBarIcons"><MdOutlineSubscriptions size={24}/></div>
            <p className="IconsText">Subscriptions</p>
          </div>
          <Link to="/library" className="SideBarIconsDiv">
            <div className="SideBarIcons"><MdOutlineVideoLibrary size={24}/></div>
            <p className="IconsText">Library</p>
          </Link>
        </div>
    )
}

export default LeftSidebar