import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const socketUrl = process.env.REACT_APP_SOCKET_URL;

const TestSocket = () => {
  
  const socket = io(socketUrl, {transports: ['websocket']});


 useEffect(()=> {
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  return () => {
    socket.off('connect');
  }
 }, [])
const [data, setData] = useState()

useEffect(()=> {
  socket.on("chart-1",(data)=> {
    console.log(data)
    setData(data)
  })
},[data])

  return (
    <div>TestSocket</div>
  )
}

export default TestSocket