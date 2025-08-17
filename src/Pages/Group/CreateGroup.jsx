import "./CreateGroup.css"
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { creategroup } from "../../Action/group.js"

function CreateGroup({ setcreategroup }) {
    /*const Friends = [
        { _id: 1, name: "Aryan Mishra" },
        { _id: 2, name: "Rakhi Singh" },
        { _id: 3, name: "Niharika Mishra" },
        { _id: 4, name: "Aditi Kuamri" },
        { _id: 5, name: "Jyoti" }
    ]*/
    //console.log(Friends)
    const [groupname, setgroupname] = useState()
    const [searchquery, setsearchquery] = useState("")
    const [selected, setselected] = useState([])
    const currentuser = useSelector(state => state.currentuserreducer).result
    const Users = useSelector(s => s.channelreducer).filter(q => !searchquery || q.name?.toUpperCase().includes(searchquery.toUpperCase()))
    const filteredusers=Users.filter(user=>user._id!==currentuser._id && user.name)
    const dispatch = useDispatch()
    //console.log(Users)
    function handlesubmit() {
        if (!currentuser) {
            alert("Please login to create a group")
        }
        else if (!groupname)
            alert("Enter Group name")
        else if (selected.length === 0)
            alert("Please select atleast one")
        else {
            dispatch(creategroup({ groupname: groupname, groupmembers: selected, createdBy: { _id: currentuser._id, name: currentuser.name } }))
            console.log("Group created")
            setcreategroup(false)
        }
    }
    function handlechange(e, u) {
        console.log(e)
        const { checked } = e
        console.log(u, checked)
        if (checked) {
            if (!selected.find(s => s._id === u._id))
                setselected([...selected, { _id: u._id, name: u.name }])
        }
        else {
            setselected(selected.filter(s => s._id !== u._id))
        }
        console.log(selected)
    }

    return (
        <div className="creategroupdiv">
            <input type='submit' value="X" onClick={e => setcreategroup(false)} className="ibtn_x"></input>
            <div className="creategroupdiv1">
                <div className="newgroup">New Group</div>
                <input type="text" placeholder="Group Name" className="groupname" onChange={(e => setgroupname(e.target.value))} ></input>
                <div className="searchusersdiv">
                    <i className="searchusersicon"><FaSearch /></i>
                    <input type="text" placeholder="Search" className="searchusers" onChange={(e => {
                        setsearchquery(e.target.value)
                    }
                    )}></input>
                </div>
                    <div className="suggestedusers">
                        {filteredusers.map((u, index) =>(
                            <div key={index}>
                                <input type="checkbox" value={u._id} id={`option${index}`} onChange={e => handlechange(e.target, u)}></input>
                                <label for={`option${index}`} style={{ paddingLeft: '2px' }}>{u.name}</label>
                            </div>)
                        )}
                    </div>
                <input type="submit" className="creategroupbtn" value="Create Group" onClick={e => handlesubmit()}></input>
            </div>
        </div>
    )
}

export default CreateGroup