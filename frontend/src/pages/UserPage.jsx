import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
     <UserHeader />
     <UserPost likes={1200} replies={481} postImg='/post1.png' postTitle='Lets talk about threads' />
     <UserPost likes={100} replies={482} postImg='/post2.png' postTitle='Nice Tutorial' />
     <UserPost likes={200} replies={81} postImg='/post3.png' postTitle='Elon Musk' />
     <UserPost likes={400} replies={41}  postTitle='Its Working!! Yay' />


    </>
  )
}

export default UserPage