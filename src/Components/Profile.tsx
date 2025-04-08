import React,{useEffect, useContext} from 'react'
import userContext from '../Context/userContext'

import "./Css/profile.css"
import BlogsShow from './BlogsShow';
const Profile:React.FC = () => {
  const {user, setUser} = useContext(userContext);
  return (
    <>
    <div className='ProfileInfo'>
       
        <div className="infoContainer">
            <div className="fullName">
                 {user?.firstName+ " "+ user
                 ?.lastName}
            </div>
            <div className="emailContainer">
                {user?.email}
            </div>
            <p className='bio'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, eaque! 
            </p>
        </div>
        <hr />
    </div>
    <BlogsShow key={3} publicFeed={false}/>
    </>
  )
}

export default Profile