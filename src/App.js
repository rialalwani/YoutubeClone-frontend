import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx"
import { useState,useEffect } from 'react';
import DrawerSideBar from "./Components/DrawerSideBar/DrawerSideBar.jsx"
import VideoPage from "./Pages/VideoPage/VideoPage.jsx"
import CreateEditChannel from "./Pages/Channel/CreateEditChannel.jsx"
import Channel from './Pages/Channel/Channel.jsx';
import VideoUploadPage from "./Pages/VideoUploadPage/VideoUploadPage.jsx"
import Library from "./Pages/Library/Library.jsx"
import LikedVideos from './Pages/Liked Videos/LikedVideos.jsx';
import History from "./Pages/History/History.jsx"
import WatchLater from './Pages/WatchLater/WatchLater.jsx';
import YourVideos from "./Pages/YourVideos/YourVideos.jsx"
import Search from "./Pages/Search/Search.jsx"
import { useDispatch} from 'react-redux';
import { fetchallchannel } from './Action/channeluser.js';
import { getallvideos } from './Action/video.js';
import { getcomment } from './Action/comment.js';
import { getallhistory } from './Action/history.js';
import { getlikedvideos } from './Action/likevids.js';
import { getwhl } from './Action/whl.js';
import CreateGroup from './Pages/Group/CreateGroup.jsx';
import { getallgroups } from './Action/group.js';
import ShowGroups from './Pages/Group/ShowGroups.jsx';
import NewGroup from './Pages/Group/NewGroup.jsx';
import JoinGroup from './Pages/Group/JoinGroup.jsx';
import VideoCall from './Pages/Videocall/Videocall.jsx';
import Room from "./Pages/Videocall/Room.jsx"
import { SocketProvider } from './context/SocketProvider.jsx';

function App() {
  //const user={Email:null,Name:null}
  //const user={Email:"rialalwani2003@gmail.com",Name:"Ria Lalwani"}
  const [toggleDrawerSidebar,settoggleDrawerSidebar]=useState({display:"none"});
  const [CreateEditChannelBtn,setCreateEditChannelBtn]=useState(false)
  const [videoUploadPage,setvideoUploadPage]=useState(false)
  const [creategroup,setcreategroup]=useState(false)
  const [newgroup,setnewgroup]=useState(false)
  const [joingroup,setjoingroup]=useState(false)

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchallchannel())
    dispatch(getallvideos())
    dispatch(getcomment())
    dispatch(getallhistory())
    dispatch(getlikedvideos())
    dispatch(getwhl())
    dispatch(getallgroups())
  },[dispatch])

  const toggleDrawer=()=>{
    if(toggleDrawerSidebar.display==="none")
      settoggleDrawerSidebar({display:"flex"})
    else
    settoggleDrawerSidebar({display:"none"})
  }
  return (
      <Router>
        <SocketProvider>
      <Navbar toggleDrawer={toggleDrawer} setCreateEditChannelBtn={setCreateEditChannelBtn}/>
      {CreateEditChannelBtn&& <CreateEditChannel setCreateEditChannelBtn={setCreateEditChannelBtn}/>}
      {videoUploadPage && <VideoUploadPage setvideoUploadPage={setvideoUploadPage}/>}
      {creategroup && <CreateGroup setcreategroup={setcreategroup}/>}
      {newgroup && <NewGroup setnewgroup={setnewgroup} setcreategroup={setcreategroup} setjoingroup={setjoingroup}/>}
      {joingroup && <JoinGroup setjoingroup={setjoingroup}/>}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/videopage/:id" element={<VideoPage/>}></Route>
        <Route path='/channel/:cid' element={<Channel setCreateEditChannelBtn={setCreateEditChannelBtn} setvideoUploadPage={setvideoUploadPage} setnewgroup={setnewgroup}/>}></Route>
        <Route path='/library' element={<Library/>}></Route>
        <Route path="/likedvideos" element={<LikedVideos/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path="/watchlater" element={<WatchLater/>}></Route>
        <Route path="/yourvideos" element={<YourVideos/>}></Route>
        <Route path="/search/:SearchQuery" element={<Search/>}></Route>
        <Route path="/showgroups" element={<ShowGroups/>}></Route>
        <Route path="/videocall" element={<VideoCall/>}></Route>
        <Route path="/room/:_id" element={<Room/>}></Route>
      </Routes>
      {toggleDrawerSidebar.display==="flex" &&
         <DrawerSideBar toggleDrawer={toggleDrawer}/>
      }
      </SocketProvider>
      </Router>
  );
}

export default App;
