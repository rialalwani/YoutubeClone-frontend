import "./JoinGroup.css"
import { useState } from "react"
import {useSelector} from "react-redux"
import { updategroup } from "../../Action/group.js"
import { useDispatch } from "react-redux"

function JoinGroup({setjoingroup}){
    const [searchquery,setsearchquery]=useState("")
    const Groups=useSelector(s=>s.groupreducer).filter(g=>!searchquery || g.groupname.toUpperCase().includes(searchquery.toUpperCase()))
    const currentuser=useSelector(s=>s.currentuserreducer).result
    const [selected,setselected]=useState([])
    const dispatch=useDispatch()
    const handlechange=(e,group)=>{
        console.log(e.target.checked)
        const {checked}=e.target;
        if(checked){
            setselected([group])
        }
        else{
            setselected(...selected.filter(s=>s._id!==group._id))
        }
        console.log(selected)
    }
    function handlesubmit(){
        if(selected?.length===1){
           const group=selected[0];
           console.log(group)
           const newgroup={
            groupname:group.groupname,
            groupmembers:[...group.groupmembers,{name:currentuser.name,_id:currentuser._id}],
            createdBy:group.createdBy
        }
        console.log(newgroup)
        dispatch(updategroup({_id:group._id,groupdata:newgroup}))
        }
        else{
            alert("Please choose any one group")
        }
    }

    return(
        <div className="JoinGroupDiv">
        <input type='submit' value="X" onClick={e =>setjoingroup(false)} className="ibtn_x"></input>
            <div className="JoinGroupPage">
              <input type="text" placeholder="Search" onChange={e=>setsearchquery(e.target.value)} className="searchgroups"></input>
              <div className="Groupnames">
                {Groups.map((group,index)=>(
                    <div key={index}>
                        <input type="radio" id={`option${index}`} value={group._id} name="group" onChange={e=>handlechange(e,group)}></input>
                        <label for={`option${index}`}>{group.groupname}</label>
                    </div>
                ))}
              </div>
              <button className="joingroupbtn1" onClick={e=>handlesubmit()}>Join Group</button>
            </div>
        </div>
    )
}

export default JoinGroup