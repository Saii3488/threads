import { Button, Container } from "@chakra-ui/react"
import { useState } from "react"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import PostPage from "./pages/PostPage"
import UserPage from "./pages/UserPage"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import Header from "./components/Header"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
function App() {
  
  const user=useRecoilValue(userAtom)
  return (
    <Container maxW='620px'>
      <Header />
      <Routes>
        <Route path='/' element={user?<HomePage />:<AuthPage />} />
        <Route path='/auth' element={!user?<AuthPage />:<HomePage />} />

        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage />} />
      </Routes>
      {user && <LogoutButton />}
    </Container>
  )
}

export default App
