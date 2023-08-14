import React from 'react'
import Footer from './Footer'
import '../App.css'



export default function MainLayout(props) {
  return (
    <main stlye= {{zIndex:"-1", marginTop: "200px"}}>
      {props.children}      
      <Footer></Footer>
    </main>
  )
}
