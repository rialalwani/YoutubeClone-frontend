import "./Room.css"
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../../context/SocketProvider"
import ReactPlayer from "react-player"
import peer from "../../service/peer.js"
import { PiPhoneCallFill } from "react-icons/pi";
import { MdCallEnd } from "react-icons/md";
import { MdOfflineShare } from "react-icons/md";
import { BsRecord2 } from "react-icons/bs";
import { PiStopCircle } from "react-icons/pi";

function Room() {
    const { _id } = useParams()
    const socket = useSocket()
    const [remotesocketid, setremotesocketid] = useState("")
    const [myStream, setmyStream] = useState()
    const [remoteStream, setremoteStream] = useState()
    const [isReceivingCall, setisReceivingCall] = useState(false)
    let chunks = [];
    let mediaRecorder = []

    const handleuserjoined = useCallback(({ email, id }) => {
        console.log(email, id)
        setremotesocketid(id)
    }, [])
    console.log(remotesocketid)

    const sendstreams = useCallback(() => {
        if (myStream) {
            for (const track of myStream.getTracks()) {
                peer.peer.addTrack(track, myStream)
            }
            console.log("sent")
        }
    }, [myStream])

    const handleCall = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true, audio: true
        })
        //console.log(stream)
        const offer = await peer.getoffer()
        socket.emit('user:call', { to: remotesocketid, offer })
        setmyStream(stream)
    }, [remotesocketid, socket])

    const handleincommingcall = useCallback(async ({ from, offer }) => {
        console.log("incomming call", from)
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true, audio: true
        })
        setmyStream(stream)
        setremotesocketid(from)
        const ans = await peer.getAnswer(offer)
        //console.log("working")
        //console.log(myStream)
        socket.emit("call:accepted", ({ to: from, ans }))
        setisReceivingCall(true)
    }, [socket, sendstreams, myStream])

    const handleNegoNeededIncomming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer)
        socket.emit('peer:nego:done', { to: from, ans })
    }, [socket])


    console.log(myStream)
    const handlecallaccepted = useCallback(async (data) => {
        console.log(data)
        peer.setLocalDescription(data.ans)
        console.log("call Accepted")
        console.log(myStream)
        sendstreams()
    }, [sendstreams, myStream])

    console.log(remoteStream)
    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remotestream = ev.streams
            console.log("Got Tracks")
            setremoteStream(remotestream[0])
        })
    }, [])

    const handlenegotiationneeded = useCallback(async () => {
        const offer = await peer.getoffer()
        socket.emit('peer:nego:needed', { offer, to: remotesocketid })
    }, [remotesocketid, socket])

    const handlenegofinal = useCallback(async (data) => {
        await peer.setLocalDescription(data.ans)
    }, [])

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handlenegotiationneeded)
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handlenegotiationneeded)
        }
    }, [handlenegotiationneeded])

    useEffect(() => {
        socket.on("user:joined", data => {
            //console.log("working")
            handleuserjoined(data)
        })

        socket.on("incomming:call", (data) => {
            //console.log("incomming call")
            console.log(data)
            handleincommingcall(data)
        })

        socket.on("call:accepted", (data) => {
            console.log("call:accepted")
            handlecallaccepted(data)
        })

        socket.on("peer:nego:needed", handleNegoNeededIncomming)
        socket.on("peer:nego:final", handlenegofinal)

        return () => {
            socket.off("user:joined")
            socket.off("incomming:call")
            socket.off("call:accepted")
            socket.off("peer:nego:needed")
            socket.off("peer:nego:final")
        }
    }, [socket, handleuserjoined, handleincommingcall, handlenegotiationneeded, handlenegofinal])

    useEffect(() => {
        socket.on("call:ended", () => {
            if (myStream) {
                myStream.getTracks().forEach(track => track.stop()); // Stop local stream
            }
            setmyStream(null);
            setremoteStream(null);
            setremotesocketid("");
            console.log("Call ended")
        });

        return () => {
            socket.off("call:ended");
        };
    }, [socket, myStream]);


    const handleEndCall = useCallback(() => {
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop()); // Stop local stream
        }
        setmyStream(null);       // Clear local stream
        setremoteStream(null);   // Clear remote stream
        socket.emit("call:end", { to: remotesocketid }); // Notify other peer
        setremotesocketid("");   // Reset remote socket ID
        console.log("Call end")
    }, [myStream, socket, remotesocketid]);

    const handleScreenShare = useCallback(async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

            screenStream.getVideoTracks()[0].onended = () => {
                setmyStream(prevStream => {
                    prevStream.getTracks().forEach(track => track.stop());
                    return null;
                });
                setremoteStream(null);
            };
            console.log(screenStream)

            setmyStream(screenStream); // Set the shared screen as the new stream
            console.log(myStream)
            sendstreams(); // Send the screen stream to the other peer
        } catch (error) {
            console.error("Error sharing screen:", error);
        }
    }, [sendstreams,myStream]);

    // Function to Start Recording
    const startRecording =useCallback(()=> {


        // 🎥 Create a new MediaStream and add tracks from both streams
        const stream = new MediaStream()

        // Add video/audio tracks from the local stream
        myStream.getVideoTracks().forEach(track => stream.addTrack(track));
        myStream.getAudioTracks().forEach(track => stream.addTrack(track));

        // Add video/audio tracks from the remote stream
        remoteStream.getVideoTracks().forEach(track => stream.addTrack(track));
        remoteStream.getAudioTracks().forEach(track => stream.addTrack(track));

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data)
            }
        };

        mediaRecorder.start();
    },[myStream,remoteStream]);

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "recording.webm";
                document.body.appendChild(a);
                a.click();
            };
        }
    };



    return (
        <div>
            {remotesocketid ?
                <div className="roomdiv">
                    <h2 style={{ textAlign: "center" }}>You are connected</h2>
                    <div className="media-streams">
                        {myStream && <ReactPlayer url={myStream} width={"300px"} height={"200px"} playing muted></ReactPlayer>}
                        {remoteStream && <ReactPlayer url={remoteStream} width={"300px"} height={"200px"} marginTop={"20px"} playing></ReactPlayer>}
                    </div>
                    <div className="videocallbtns">
                        <button className="vcbtn" onClick={e => handleCall()} id="Call-btn">{isReceivingCall ?
                            "Accept"
                            :
                            "Call"
                        }<PiPhoneCallFill /></button>
                        {myStream && remoteStream &&
                            <button className="vcbtn" onClick={e => handleEndCall()}>End<MdCallEnd /></button>
                        }
                        {myStream && remoteStream && <button className="vcbtn" onClick={e => handleScreenShare()}>Share Screen<MdOfflineShare /></button>}
                        {myStream && <button className="vcbtn" onClick={startRecording}>Screen Recording<BsRecord2 /></button>}
                        {myStream && <button className="vcbtn" onClick={stopRecording}>Stop<PiStopCircle /></button>}
                    </div>
                </div>
                :
                <div className="roomdiv"><h2 style={{ textAlign: "center" }}>No one in room</h2></div>}
        </div>
    )
}

export default Room