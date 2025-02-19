
const Card = ({ title, content, index, deleteBlog ,id}: { title: string, content: string, index: number, deleteBlog:any,id:string   }) => {
  return (
    <>



      <div className="card">
        <div className="card-header flex justify-between">
          <div className="left">

          Blog : {index + 1}
          </div>
          <div className="rigt">
            <button onClick  = {()=>{deleteBlog(id)}} >Delete</button>
          </div>
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