import { Flex,Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

const HomePage = () => {
  return (
    <Link to={"/sai"}>
        <Flex w={'full'} justifyContent={"center"}>
            <Button mx={"auto"}>Visit Profile Page</Button>
            

        </Flex>
    </Link>
    
    
  )
}

export default HomePage