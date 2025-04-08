import { User } from '../Context/States/UserState'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare, faCompass, faUser, faPenToSquare }  from '@fortawesome/free-solid-svg-icons'
const Navbar = ({user,logOut}:{user:User | null, logOut:any }) => {
  return (
    <>
  <nav className='flex justify-between items-center p-2 navbar'>
    <div className="logo">
 
    writeScape.
    </div>
    <div className="centerLinks flex justify-center items-center gap-4">
      {/* <Link className='decoration-0' to={"/feed"}> Feed</Link> */}
      
   {user?.userId != undefined? (
    <>
    <Link to={"/feed"} className='no-underline links' title='Feed '>    <FontAwesomeIcon icon={faCompass} size='2xl' /></Link>
    <Link to={"/blog-editor" } className='no-underline links' title='editor'> <FontAwesomeIcon icon={faPenToSquare} size='xl' /></Link>
    <Link className='no-underline links' to={"/profile"} title='profile'> <FontAwesomeIcon icon={faUser}  size='xl' /></Link>
    
    <button className='btn btn-nav' onClick={logOut}>
    <FontAwesomeIcon icon={faShareFromSquare} size='xl' />

    </button>
     </>):<><Link to={"/login"} id="login-btn" className='no-underline links LS-btn'> Login</Link>
    <Link to={"/signup"} id="signup-btn" className='no-underline links LS-btn'> Signup</Link> </>}
    
    </div>
    
    
  </nav>
    </>
  )
}

export default Navbar