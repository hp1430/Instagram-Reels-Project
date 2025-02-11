import { useEffect, useRef } from "react"
import "./video.css"
import { ReelFooter } from "@/components/atoms/ReelFooter/ReelFooter"

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
    }, [playing, id])

    useEffect(() => {
        // use intersection observer to figure out when the video is in view
        const observer = new IntersectionObserver((entries) => {
            // entries are the elements that are being observed

            entries.forEach(entry => {
                if(entry.isIntersecting) {  // if entry is intersecting with the threshold value
                    videoRef.current.play();    // play the video when it is in view
                    setPlaying(id);
                }
            })
        }, {
            threshold: 0.5  // when 50% of the video is in view above callback is called
        });

        if(videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if(videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }

    }, [id, setPlaying])

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

            <div className="bottom">
                <ReelFooter channel={"hp1430"} caption={caption}/>
            </div>

        </div>
    )
}