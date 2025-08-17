import "./NewGroup.css"

function NewGroup({setnewgroup,setcreategroup,setjoingroup}){
    return(
      <div className="NewGroupDiv">
        <input type='submit' value="X" onClick={e =>setnewgroup(false)} className="ibtn_x"></input>
        <div className="NewGroupPage">
            <div style={{"textAlign":"center"}}>New Group</div>
           <button className="creategroupbtn1" onClick={e=>{
            setcreategroup(true)
             setnewgroup(false)
             }}>Create Group</button>
           <button className="joingroupbtn" onClick={e=>{{
            setjoingroup(true)
            setnewgroup(false)
           }}}>Join a Group</button>
        </div>
      </div>
    )
}

export default NewGroup