import { Flex,Text,Avatar,Divider } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import Actions from './Actions'

const Comments = ({comment,createdAt,likes,userAvatar,username}) => {
  const[liked,setLiked]=useState(false);

  return (
    <>
     <Flex gap={4} py={2} my={2}width={"full"}>
        <Avatar src={userAvatar} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={"sm"}>{username}</Text>
              <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                <BsThreeDots />

              </Flex>

            </Flex>
            <Text>{comment}</Text>
            <Actions liked={liked} setLiked={setLiked}/>
            <Text fontSize={"sm"} color={"gray.light"}>
             {likes+(liked?1:0)} likes
            </Text>
        </Flex>
     </Flex>
     <Divider my={4} />  
     </>
  )
}

export default Comments