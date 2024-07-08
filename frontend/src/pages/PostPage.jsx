import { Flex,Avatar,Text,Image,Box, Divider, Button } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { useState } from 'react'
import Actions from '../components/Actions'
import Comments from '../components/Comments'
const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
     <Flex>
       <Flex w={"full"} alignItems={"center"} gap={3}>
					<Avatar src='/post1.png' size={"md"} name='Mark Zuckerberg' />
					<Flex>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							Mark Zuckerberg
						</Text>
						<Image src='/verified.png' w='4' h={4} ml={4} />
					</Flex>
				</Flex>
        <Flex gap={4} alignItems={"center"}>
         <Text fontSize={"sm"} color={"gray.light"}>
          1d
         </Text>
         <BsThreeDots />
        </Flex>

     </Flex>
     <Text my={3}>Let's talk about threads.</Text>
     <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
							<Image src='/post1.png' w={"full"} />
			</Box>
      <Flex gap={3} my={3}>
						<Actions liked={liked} setLiked={setLiked}  />
					</Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
        <Box w={0.5}h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>{200+(liked?1:0)} likes</Text>

      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>🙌</Text>
          <Text color={"gray.light"}>Get the App to like,post and comment</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comments 
       comment='looks really good'
       createdAt='1d'
       likes={21}
       username='john doe'
       userAvatar='https://bit.ly/dan-abramov'
       />
      <Comments 
       comment=' really good'
       createdAt='2d'
       likes={20}
       username='jane doe'
       userAvatar='https://bit.ly/code-beast'
       />
      <Comments 
       comment=' good'
       createdAt='3d'
       likes={23}
       username='sally doe'
       userAvatar='https://bit.ly/sage-adebayo'
       />

    </>
  )
}

export default PostPage