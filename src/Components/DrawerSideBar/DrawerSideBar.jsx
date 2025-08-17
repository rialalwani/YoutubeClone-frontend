import "./DrawerSideBar.css"
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";

function DrawerSideBar({toggleDrawer}){
    return(
      <div className="DrawerSideBar">
        <div className="logoAndSettings">
                <div className="Settings" onClick={e=>toggleDrawer()}>
                   <div className="horizontalLines"></div> 
                   <div className="horizontalLines"></div>
                   <div className="horizontalLines"></div>
                </div>
                <div className="youtube-logo">
                    <img src="/youtube-logo.svg" alt="youtube-logo" height={"27rem"} width={"27rem"}></img>
                    <p>YourTube</p>
                </div>
            </div>
        <div className="DrawerSideBarDiv">
           <Link to="/"className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons" style={{marginTop:'0.8rem'}}><AiOutlineHome size={24}/></div>
            <p className="DrawerIconsText" style={{marginTop:'0.8rem'}}>Home</p>
          </Link>
          <div className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><MdOutlineExplore size={24}/></div>
            <p className="DrawerIconsText">Explore</p>
          </div>
          <div className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><SiYoutubeshorts size={24}/></div>
            <p className="DrawerIconsText">Shorts</p>
          </div>
          <div className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><MdOutlineSubscriptions size={24}/></div>
            <p className="DrawerIconsText">Subscriptions</p>
          </div>
          <div className="Straight-Line"></div>
          <Link to="/library" className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><MdOutlineVideoLibrary size={24}/></div>
            <p className="DrawerIconsText">Library</p>
          </Link>
          <Link to="/history" className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><FaHistory size={24}/></div>
            <p className="DrawerIconsText">Hisrtory</p>
          </Link>
          <Link to="/yourvideos" className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><BiSolidVideos size={24}/></div>
            <p className="DrawerIconsText">Your Videos</p>
          </Link>
          <Link to="/watchlater" className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><MdOutlineWatchLater size={24}/></div>
            <p className="DrawerIconsText">Watch Later</p>
          </Link>
          <Link to="/likedvideos" className="DrawerSideBarIconsDiv">
            <div className="DrawerSideBarIcons"><BiSolidLike size={24}/></div>
            <p className="DrawerIconsText">Liked Videos</p>
          </Link>
          <h4 style={{color:"aliceblue", textDecoration:"underline", marginLeft:"0.6rem"}}>Your Subscription</h4>
          <div className="Subscribed-Channels-div">
            <div className="Subscribed-Channels-logo">
                <div className="channel-first-letter">C</div>
            </div>
            <p>Channel</p>
          </div>
          <div className="Subscribed-Channels-div">
            <div className="Subscribed-Channels-logo">
                <div className="channel-first-letter">C</div>
            </div>
            <p>Channel</p>
          </div>
          <div className="Subscribed-Channels-div">
            <div className="Subscribed-Channels-logo">
                <div className="channel-first-letter">C</div>
            </div>
            <p>Channel</p>
          </div>
          <div className="Subscribed-Channels-div">
            <div className="Subscribed-Channels-logo">
                <div className="channel-first-letter">C</div>
            </div>
            <p>Channel</p>
          </div>
        </div>
        </div>
    )
}

export default DrawerSideBar