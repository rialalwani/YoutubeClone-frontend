import "./ShowGroups.css"
import LeftSideBar from "../../Components/LeftSidebar/LeftSidebar.jsx"
import { useSelector } from "react-redux"
import { RiGroup2Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function ShowGroups() {
  const currentuser=useSelector(s=>s.currentuserreducer)?.result
  const Groups = useSelector(s => s.groupreducer).filter(g=>g?.createdBy?._id===currentuser?._id || g?.groupmembers?.some(m=>m._id===currentuser?._id))
  //console.log(currentuser,Groups)
  return (
    <div className="GroupsPage">
      <LeftSideBar />
      <div className="GroupsPageDiv1">
        <h2 style={{ textAlign: "Center" }}>USER GROUPS</h2>
        <div className="GroupsDiv2">
          {Groups.map((m, index) =>
            <div key={index} className="groupdiv3">
              <div className="groupdiv4">
                <div className="groupandadmin">
                  <div className="groupname">
                    <RiGroup2Line size={30} />
                    {m.groupname}
                  </div>
                  <div className="admin">
                    Admin: {m.createdBy.name} <FaEdit />
                  </div>
                </div>
                <div className="members">
                  Members
                  <div className="membersscrollbar">
                    {m.groupmembers.map((n, index) =>
                      <div key={index}>
                        {n.name}
                      </div>)}
                  </div>
                </div>
              </div>
              <div className="groupeditbtns">
                <button>Invite</button>
                <button>Exit</button>
                <button>Delete</button>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default ShowGroups