import "./SearchList.css"
import { FaSearch } from "react-icons/fa";

function SearchList({list,setSearchQuery}){
    return(
        <div className="SearchListDiv"> 
            {list.map(m=>
            <div onClick={e=>setSearchQuery(m)} className="list-item">
               <FaSearch/>{m}
            </div>
            )}
        </div>
    )
}

export default SearchList