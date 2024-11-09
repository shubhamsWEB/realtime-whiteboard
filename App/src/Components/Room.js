'use client'
import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import rough from 'roughjs/bundled/rough.esm';
import Canvas from './Canvas';
import { useParams } from 'next/navigation';
import { useUserContext } from '../services/context/userContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { joinRoom, socket, disconnectSocket, sendDrawData } from '../utils/socketUtils';
import SideNav from '../Components/Sidebar';
const Room = () => {
    const { user, updateUser, loggerData } = useUserContext();
    const canvasRef = useRef(null);
    const hasJoined = useRef(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const params = useParams();
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const ctx = useRef(null);
    const [color, setColor] = useState("#000000");
    const [tool, setTool] = useState("pencil");
    const router = useRouter();

    useEffect(() => {
        if (user && !hasJoined.current) {
            joinRoom(user)
            hasJoined.current = true;
        } else if (loggerData) {
            joinRoom({ ...loggerData, roomId: params.roomId })
            hasJoined.current = true;
        }
    }, [loggerData]);

    useEffect(() => {
        socket.on("users", (data) => {
            updateUser(data);
        });
    }, []);

    useEffect(() => {
        ctx.current = rough.canvas(canvasRef.current);
    }, []);

    useEffect(() => {
        socket.on("message", (data) => {
            toast.info(data.message);
        });
    }, []);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (x, y) => {
        if (tool === "pencil") {
            ctx.current.line(lastPos.x, lastPos.y, x, y, {
                stroke: color,
                roughness: 1.5,
            });
            setLastPos({ x, y });
            sendDrawData({ x, y, lastPos, color, tool, isCanvasCleared: false })
        }
        if (tool === 'line') {
            ctx.current.line(lastPos.x, lastPos.y, x, y, {
                stroke: color,
                roughness: 0,
                strokeWidth: 5,
            });
            setLastPos({ x, y });
            sendDrawData({ x, y, lastPos, color, tool, isCanvasCleared: false })
        }
    };
    const handleOnLeaveRoom = () => {
        disconnectSocket();
        router.push('/')
    }

    useEffect(() => {
        socket.on('draw', (data) => {
            const { x, y, lastPos, color, tool, isCanvasCleared } = data;
            if (isCanvasCleared) {
                clearCanvas();
            } else if (tool === "pencil") {
                ctx.current.line(lastPos.x, lastPos.y, x, y, { stroke: color, roughness: 1.5 });
            } else if (tool === "line") {
                ctx.current.line(lastPos.x, lastPos.y, x, y, { stroke: color, roughness: 0, strokeWidth: 5 });
            }
        });

        return () => {
            socket.off('draw');
        };
    }, [tool, color]);

    return (
        <div className='p-2'>
            <div className="flex justify-evenly gap-6 items-center">
                <SideNav />
                <div className='flex gap-6'>
                    <div className="flex justify-evenly border rounded">
                        <div className='flex items-center'>
                            <h6>Color Picker : &nbsp;</h6>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex justify-center gap-4 border rounded p-2 '>
                        <div className='flex items-center gap-1'>
                            <input type="radio" name="tools" id="pencil" value="pencil" checked={tool === "pencil"} onClick={(e) => setTool(e.target.value)} readOnly={true} />
                            <label htmlFor="pencil">Pencil</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" name="tools" id="line" value="line" checked={tool === "line"} onClick={(e) => setTool(e.target.value)} readOnly={true} />
                            <label htmlFor="line">Line</label>
                        </div>
                        <button type="button" className="bg-gray-100 p-1 px-4 rounded border border-gray-600" onClick={() => {
                            socket.emit('draw', { x: 0, y: 0, lastPos, color, tool, isCanvasCleared: true });
                            clearCanvas();
                        }}>
                            Clear Canvas
                        </button>
                    </div>
                    <div className="text-center flex justify-center gap-4 items-center">
                        <span>Online Users: {user?.length - 1 || "0"}</span>
                        <button className='bg-red-600 p-1 px-4 rounded text-white' onClick={handleOnLeaveRoom}>
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <Canvas canvasRef={canvasRef} setIsDrawing={setIsDrawing} setLastPos={setLastPos} draw={draw} isDrawing={isDrawing} />
            </div>
        </div>
    );
}

export default Room;
