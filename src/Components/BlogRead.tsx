

const BlogRead = () => {
  return (
    <div>
        <h1></h1>
        <div className="paragraphHolder">
            <p></p>
        </div>
        <div className="footer">
            <button>Like</button>
            <button>Comment</button>
            {/* <button></button> */}
        </div>
        <div className="commentSection"></div>
        <div className="likedBylist">
            <ul>
                <li><a href="linkToProfile">Username</a></li>
            </ul>
        </div>
    </div>
  )
}

export default BlogRead