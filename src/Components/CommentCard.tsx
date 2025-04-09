import React from 'react'
import "./Css/commentCard.css"
const CommentCard = ({comment, firstName, lastName}:{comment:string, firstName:string, lastName:string}) => {
 
  return (
    <div>
        <div className="card" id='customCard' style={{}}>
  <div className="card-body">
    <h5 className="card-title" id='commentBy'>{firstName + lastName }</h5>
    <p className="card-text">{comment}</p>
   
  </div>
</div>
    </div>
  )
}

export default CommentCard