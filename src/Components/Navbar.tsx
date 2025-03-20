import { User } from '../Context/States/UserState'
import { Link } from 'react-router-dom'
const Navbar = ({user,logOut}:{user:User | null, logOut:any }) => {
  return (
    <>
  <nav className='flex justify-between items-center p-2 navbar'>
    <div className="logo">
      Blogs
    </div>
    <div className="centerLinks flex justify-center items-center gap-2">
      {/* <Link className='decoration-0' to={"/feed"}> Feed</Link> */}
      
   {user?.userId != undefined? (
    <>
    <Link to={"/blog-feed"} className='no-underline links'>Blog Feed</Link>
    <Link className='no-underline links' to={"/blogs-show"}> MyBlogs</Link>
    <Link to={"/blog-editor" } className='no-underline links'> Blog Editor</Link>
    
    <button className='btn btn-nav' onClick={logOut}>Logout</button>
     </>):<><Link to={"/login"} className='no-underline links'> Login</Link>
    <Link to={"/signup"} className='no-underline links'> Signup</Link> </>}
    
    </div>
    
    
  </nav>
    </>
  )
}

export default Navbar