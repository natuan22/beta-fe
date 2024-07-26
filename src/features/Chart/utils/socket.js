import { io } from "socket.io-client";
import { socketUrl } from "../../../services/config";

const socket = io(socketUrl, { transports: ["websocket"] });

export default socket;
