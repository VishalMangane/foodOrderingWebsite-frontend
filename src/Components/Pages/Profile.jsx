import React,{useContext} from 'react'
import AuthContext from '../Auth/AuthContext';


function Profile() {

  const authCtx =  useContext(AuthContext);

  return (
    <div>
      <h1>Hi,{authCtx.userName} </h1>
      <p>Welcome to Bitemeals</p>
      <div>
        <span>Loading...................</span>
      </div>
    </div>
  )
}

export default Profile;
