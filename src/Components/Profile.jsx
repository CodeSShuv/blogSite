import React,{useEffect, useContext, useState} from 'react'
import userContext from '../Context/userContext'

import "./Css/profile.css"
import BlogsShow from './BlogsShow';
const Profile = () => {
  const {user, setUser} = useContext(userContext);
  const [contentEditable, setContentEditable] = useState(false)
  
  const changeContentEditable = ()=>{
    if(contentEditable){
      setContentEditable(false);
      
    }else{
      setContentEditable(true);
    }
  } 
  return (
    <>
    <div className='ProfileInfo'>
       
        <div className="infoContainer">
            <div className="fullName">
                 {user?.firstName[0]?.toUpperCase()+user?.firstName?.slice(1)+ " "+ user?.lastName[0]?.toUpperCase()+user?.lastName?.slice(1)}
            </div>
            <div className="emailContainer">
                {user?.email}
            </div>
            <p className='bio'onDoubleClick={changeContentEditable}  contentEditable={contentEditable}>
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