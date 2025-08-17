import "./Channel.css"
import LeftSideBar from "../../Components/LeftSidebar/LeftSidebar"
import { RiUploadFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid.jsx"
import { MdOutlineGroups } from "react-icons/md";

function Channel({ setCreateEditChannelBtn, setvideoUploadPage, setnewgroup }) {
  //const currentuser={Email:"rialalwani2003@gmail.com",Name:"Ria Lalwani",desc:"Student"}
  const { cid } = useParams()
  const channel = useSelector(state => state.channelreducer)
  //console.log(channel)
  const currentuser = useSelector(state => state.currentuserreducer)
  const currentchannel = channel?.filter(c => c?._id === cid)[0]
  const videos = useSelector(state => state.videoreducer)?.data?.data?.filter(q => q?.videochannel === cid).reverse()
  //console.log(currentchannel?.name)

  return (
    <div className="ChannelPageDiv">
      <LeftSideBar />

      <div className="ChannelPageContainer1">

        <div className="ChannelPageConatiner2">
          <div className="ChannelPageContainer3">
            <div className="ChannelPageContainer4">
              <div className="ChannelPageContainer5">
                <div className="outer-circle">
                  <div className="inner-circle">
                    <div className="name-first-letter">{currentuser?.result?.name?.charAt(0).toUpperCase()}</div>
                  </div>
                </div>
                <h2 style={{ textAlign: "center" }}>{currentuser?.result?.name}</h2>
                <h3 style={{ textAlign: "center" }}>{currentuser?.result?.desc}</h3>
              </div>
            </div>
            <div className="editChannelVideoPagebtns">
              <button className="edit-channel-btn" onClick={e => {
                setCreateEditChannelBtn(true)
              }}><FaRegEdit />Edit Channel</button>
              <button className="new-group" onClick={e => setnewgroup(true)}><MdOutlineGroups />  New Group</button>
              <button className="upload-btn" onClick={e => setvideoUploadPage(true)}><RiUploadFill />Upload Video</button>
            </div>
          </div>
          <div className="Blue-Straight-Line"></div>
        </div>
        <ShowVideoGrid videos={videos} />
      </div>
    </div>
  )
}

export default Channel