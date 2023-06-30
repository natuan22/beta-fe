import { io } from 'socket.io-client'
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const socket = io(socketUrl,{transports: ['websocket']});

export default socket;

// export const handleSocket=()=> {
//     socket.on("connect", () => {
//         console.log(socket.connected); // true
//       });
//       socket.on("listen-do-rong-thi-truong",(data)=> {
//         console.log(data)
//       })
// }
//  useEffect(()=> {
  
//   return () => {
//     socket.off('connect');
//   }
//  }, [])

// useEffect(()=> {
  
//   socket.on()
// },[])