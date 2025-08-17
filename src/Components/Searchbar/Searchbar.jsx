import "./Searchbar.css"
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { useState } from "react";
import "../SearchList/SearchList.jsx"
import SearchList from "../SearchList/SearchList.jsx";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"

function Searchbar(){
  const [SearchQuery,setSearchQuery]=useState("")
  const [ShowSearchList,setShowSearchList]=useState(false)
  //const list=["Videos","Animation Videos","Movies","Action Videos","Graphics","Music","Dance Videos"].filter(q=>q.toUpperCase().includes(SearchQuery.toUpperCase()));
  const list=useSelector(state=>state.videoreducer)?.data?.data?.filter(q=>q?.videotitle.toUpperCase().includes(SearchQuery.toUpperCase())).map(m=>m?.videotitle)
    return(
        <div className="SearchbarDiv">
           <div className="SearchContainer1">
             <input type="text" placeholder="Search" className="searchbox" onChange={e=>setSearchQuery(e.target.value)} onClick={e=>setShowSearchList(true)}></input>
             <Link to={"/search/"+SearchQuery}><FaSearch className="searchIcon" onClick={e=>setShowSearchList(false)} /></Link>
           </div>
           <FaMicrophone className="MicIcon"/>
           {ShowSearchList&& SearchQuery &&
           <SearchList list={list} setSearchQuery={setSearchQuery}/>
           }
        </div>
    )
}

export default Searchbar