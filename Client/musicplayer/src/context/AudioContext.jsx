import { createContext, useEffect, useRef, useState } from "react";





export const AudioContext = createContext();

export const AudioProvider = ({children})=>{
     const [songs, setSongs]= useState([]);
     const audioRef = useRef(new Audio());
      const [currentSong, setCurrentSong] = useState(null);
       const [isPlaying , setIsPlaying] = useState(false);
       const [audioProgress, setAudioProgress] = useState(0);  // Track audio progress
       const [isControlsVisible, setIsControlsVisible] = useState(false);  // Show controls when song plays
       const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
       const [query, setQuery] = useState(""); //Search Songs


       const handlePlayPause = (song) =>{

        if(currentSong === song._id){
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current.play();
            setIsPlaying(true);
          }
        } else{
          setCurrentSong(song._id);
          audioRef.current.src = song.song;
        //   audioRef.current.play();
          audioRef.current.load();
          audioRef.current.play();
          setIsPlaying(true);
          setIsControlsVisible(true);  // Show controls when song starts playing
        }
    
      }



        // Update audio progress as the song plays
        useEffect(() => {
          const updateProgress = () => {
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setAudioProgress(progress);
          };
      
          const currentAudio = audioRef.current;
          currentAudio.addEventListener('timeupdate', updateProgress);
          currentAudio.addEventListener('ended', () => {
            setIsPlaying(false);  // Pause button will be shown once the song ends
          });
          
          // Cleanup function when the component unmounts or the effect needs to re-run
          return () => {
            currentAudio.removeEventListener('timeupdate', updateProgress);
            currentAudio.removeEventListener('ended', () => {
              setIsPlaying(false);  // Pause button will be shown once the song ends
            });
          }
        }, []);



            // Handle changing the progress by dragging the slider
            const handleProgressChange = (event) => {
              const newProgress = event.target.value;
              audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
              setAudioProgress(newProgress);
            };
        
            const handlePrevious = () => {
              const currentIndex = songs.findIndex(song => song._id === currentSong);
              if (currentIndex > 0) {
                const prevSong = songs[currentIndex - 1];
                setCurrentSong(prevSong._id);
                audioRef.current.src = prevSong.song;
                audioRef.current.play();
                setIsPlaying(true);
              }
            };
          
            // Next Song Logic
            const handleNext = () => {
              const currentIndex = songs.findIndex(song => song._id === currentSong);
              if (currentIndex < songs.length - 1) {
                const nextSong = songs[currentIndex + 1];
                setCurrentSong(nextSong._id);
                audioRef.current.src = nextSong.song;
                audioRef.current.play();
                setIsPlaying(true);
              }
            };
        
        
            //  Cleanup on component unmount
          useEffect(()=>{
            const currentAudio = audioRef.current; //This ensures the cleanup function always works with the correct reference at the time the useEffect is set up. audioRef.current might change between renders, and if you directly access it in the cleanup function, you might be working with an outdated reference.
            return ()=>{
              currentAudio.pause();
            }
          },[]);

          const formatDuration = (seconds) => {
            seconds = Math.round(seconds);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; //padStart tells there should be2 digit number, if single digit then 0 before it.
          };

          useEffect(()=>{
            setShowPlaylistMenu(false);
          },[])
        

          return(
            <AudioContext.Provider value={{songs, setSongs, audioRef, audioProgress, isControlsVisible, currentSong, isPlaying, handleProgressChange, handlePlayPause, handlePrevious, handleNext, formatDuration, showPlaylistMenu, setShowPlaylistMenu,  query,
              setQuery,}}>
                {children}


            </AudioContext.Provider>
          )
}