
const Card = ({ title, content,visibility, index, deleteBlog ,id, publicFeed, userName}: { title: string,visibility?:string, content: string, index: number, deleteBlog?:any,id:string, publicFeed:boolean, userName?:string   }) => {
  return (
    <>



      <div className="card">
        <div className="card-header flex justify-between">
          <div className="left">
          <><span>{userName}</span></>
{!publicFeed? (<span> {visibility}</span>):' '}
          
          </div>
          {!publicFeed? <div className="rigt">
            <button onClick  = {()=>{deleteBlog(id)}} >Delete</button>
          </div>:<div></div>}
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>

        </div>
      </div>
    </>
  )
}

export default Card