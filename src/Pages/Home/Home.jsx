import "./Home.css"
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar.jsx"
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid.jsx"
import {useSelector} from "react-redux"

function Home(){
    const topics=["Python","Advanced Java","Operating System","Music","Gaming","Bigg Boss","Spitsvilla","Dance","Computer Networks","Comic","DBMS","Graphics"]
    //console.log(useSelector(state=>state.videoreducer)?.data?.data)
    const videos=useSelector(state=>state.videoreducer)?.data?.data?.filter(q=>q).reverse()
    /*const videos=[{id:1,src:Video1,channel:"Spencer Melvin",title:"Summer fun", uploader:"Spencer Melvin",description:"Beach Fun with frnds!!!",views:"150"},
        {id:2,src:Video2,channel:"Dancing Divas",title:"Dance video",uploader:"Louis Angela",description:"Dancing and Enjoying" ,views:"250"},
        {id:3,src:Video3,channel:"Nature Lovers",title:"Bird video",uploader:"Nishta Gaur",description:"Single shot bird video captured",views:"750"},
        {id:4,src:Video4,channel:"Animal Lovers",title:"Cute Penguins",uploader:"Avika Singh",description:"Cute video of Penguins",views:"100"}
    ]*/
    return(
        <div className="HomeDiv">
            <LeftSidebar/>
            <div className="HomeDiv1">
               <div className="TopicsDiv">
                 {topics.map(m=><div key={m} className="TopicsDiv1">{m}</div>)}
                </div> 
                <ShowVideoGrid videos={videos}/>
            </div> 
        </div>
    )
}

export default Home