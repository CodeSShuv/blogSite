import "./Css/card.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faComment }  from '@fortawesome/free-solid-svg-icons'
const Card = ({ title, content,visibility,  deleteBlog ,id, publicFeed, userName}: { title: string,visibility?:string, content: string, deleteBlog?:any,id:string, publicFeed:boolean, userName?:string   }) => {
  return (
    <>



      <div className="card mb-4 customCardDesign">
        <div className="card-header flex justify-between">
          <div className="left">
          <><span>{userName}</span></>
{!publicFeed? (<span> {visibility}</span>):' '}
          
          </div>
          {!publicFeed? <div className="right">
            <button onClick  = {()=>{deleteBlog(id)}} >Delete</button>
          </div>:<div></div>}
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content.length > 100? content.slice(101).trim() + "..." : content}</p>

        </div>
        <div className="postFooter">
          <div className="like">

          <FontAwesomeIcon icon={faHeart} style={{color: "#6e6e6e",}} />
          <span className="likesCount">120</span>
          </div>
          <div className="comment">
          <FontAwesomeIcon icon={faComment} style={{color: "#6e6e6e",}} />
          <span className="commentCount">120</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card