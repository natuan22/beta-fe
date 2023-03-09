import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const TestSocket = () => {
  const hostSocket ='http://192.168.15.181:3001/socket'
  const socket = io(hostSocket, {transports: ['websocket']});


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