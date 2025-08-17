import { Link } from "react-router-dom";
import "./Auth.css"
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux"
import { googleLogout } from "@react-oauth/google";
import { setcurrentuser } from "../../Action/currentuser"

function Auth({ setCreateEditChannelBtn, setAuthBtn }) {

  const currentuser = useSelector(state => state.currentuserreducer)
  //console.log(currentuser)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(setcurrentuser(null))
    localStorage.clear()
    googleLogout()
  }

  const displayName = currentuser?.result?.name || currentuser?.result?.email || "";
  const firstCharacter = displayName.charAt(0).toUpperCase();

  return (
    <div className="AuthDiv">
      {displayName ? (
        <div className="UserNameOrEmail">
          <div className="first-letter-div">
            <div className="first-letter">{firstCharacter}</div>
          </div>
          <div>
            <div>{displayName}</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="Auth-Straight-line"></div>
      <div style={{ textAlign: "Center" }}>
        {currentuser?.result?.name ?
          <Link to={`/channel/${currentuser?.result?._id}`} className="channel-Link">Your Channel</Link>
          :
          <button className="CreateEditChannelBtn" onClick={e => { setCreateEditChannelBtn(true); setAuthBtn(false) }}>Create your own Channel</button>
        }
      </div>
      <div>
        <Link to={'/showgroups'} className="yourgroups">Your Groups</Link>
      </div>
      <div style={{ textAlign: "Center" }} onClick={e => { logout() }}><RiLogoutBoxLine />Log Out</div>
    </div>
  )
}

export default Auth