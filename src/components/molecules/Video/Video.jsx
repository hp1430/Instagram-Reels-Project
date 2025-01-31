import { useEffect, useRef } from "react"
import "./video.css"

export default function Video({
    id,
    url,
    caption,
    playing,
    setPlaying
}) {

    const videoRef = useRef(null);

    function handleClick() {
        if(videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(id);
        }
        else {
            videoRef.current.pause();
            setPlaying(null);
        }
    }

    useEffect(() => {
        if(playing !== id) {
            videoRef.current.pause();
        } 
    }, [playing])

    return (
        <div
            className="video-wrapper"
        >
            <video 
                className="video-player" 
                loop
                onClick={handleClick} 
                ref={videoRef} 
                src={url}>

            </video>

        </div>
    )
}