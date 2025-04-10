import "./Css/card.css"
import{Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faComment,faTrashCan,faPenToSquare }  from '@fortawesome/free-regular-svg-icons'



const Card = ({ title, content,visibility,  deleteBlog ,id, publicFeed, userName , editBlog,likesCount,commentsCount}) => {

  return (
    <>   



      <div className="card customCardDesign">
        <div className="card-header flex justify-between">
          <div className="left">
          <><span>{userName}</span></>
{!publicFeed? (<span> {visibility}</span>):' '}
          
          </div>
          {!publicFeed? <div className="right">
            <button className="topRightBtn" title="Edit" onClick={()=>{
              editBlog(title,content,visibility,id);
              
            }}>
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button  title="delete" onClick  = {()=>{deleteBlog(id)}} >
            
            <FontAwesomeIcon  icon={faTrashCan} />
            </button>
          </div>:<div></div>}
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <Link  to={`http://localhost:5173/blog/?q=${id}`}>
            {title}</Link>
            
            </h5>
            {/* Shows content body only until 101  characters. */}
          <p className="card-text"> {content.length > 100? content.slice(0,101).trim() + "..." : content}</p>

        </div>
        <div className="postFooter">
          <div className="like">

          <FontAwesomeIcon icon={faHeart} style={{color: "#ea445a",}} />
          <span className="likesCount">{likesCount}</span>
          </div>
          <div className="comment">
          <FontAwesomeIcon icon={faComment} style={{color: "#ea445a",}} />
          <span className="commentCount">{commentsCount}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card