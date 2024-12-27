import { ArrowDownToLine, ImageIcon, Loader2, Maximize, Play, Pause, VideoIcon, MusicIcon } from "lucide-react";
import { Minimize } from "lucide-react";
import { useRef, useState } from "react";



const AudioGenerated = ({audio, index}: {audio: string | null, index: number}) => {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = async () => {
    try {
      // Fetch the image data
      const response = await fetch(audio);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element to programmatically trigger a download
      const a = document.createElement('a');
      a.href = blobUrl;
      // Optional: specify a filename
      const urlParts = audio.split('/');
      const suggestedFileName = urlParts[urlParts.length - 1] || 'downloaded-audio';
      a.download = suggestedFileName;
      
      // Append the anchor to the body and trigger a click
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };



  return (
    <div>
      <div className="w-full h-[200px] aspect-square my-2 rounded-lg border bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative p-4">
        {audio === null ? (
          <div className="flex flex-col items-center justify-center">
            <MusicIcon className="w-16 h-16 text-primary" /> 
            <Loader2 className="w-8 h-8 animate-spin text-primary mt-auto" />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <audio
              ref={audioRef}
              src={audio}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            
            {/* Waveform Visualization (placeholder) */}
            <div className="w-full h-20 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg flex items-center justify-center">
              <MusicIcon className="w-12 h-12 text-primary/50" /> 
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-secondary/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
                <span>{formatTime(duration)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  className="bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
                  onClick={handleDownload}
                >
                  <ArrowDownToLine className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={togglePlay}
                  className="bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" /> 
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>
                
              </div>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <audio 
              src={audio!} 
              className="max-h-[70vh] max-w-[90vw] min-w-[80vw] object-contain rounded-lg"
              autoPlay
              loop
              controls
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(false)}
            >
              <Minimize className="w-7 h-7 text-white"/>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


const VideoGenerated = ({video, index}: {video: string | null, index: number}) => {

  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    try {
      // Fetch the image data
      const response = await fetch(video);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element to programmatically trigger a download
      const a = document.createElement('a');
      a.href = blobUrl;
      // Optional: specify a filename
      const urlParts = video.split('/');
      const suggestedFileName = urlParts[urlParts.length - 1] || 'downloaded-video';
      a.download = suggestedFileName;
      
      // Append the anchor to the body and trigger a click
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };



  return (
    <div>
      <div className="w-full h-[200px] aspect-square my-2 rounded-lg border flex items-center justify-center relative">
        {video === null ? (
          <div className="flex flex-col items-center justify-center">
            <VideoIcon className="w-16 h-16 text-primary" /> 
            <Loader2 className="w-8 h-8 animate-spin text-primary mt-auto" />
          </div>
        ) : (
          <>
            <video 
              src={video} 
              className="w-full h-full object-contain rounded-lg"
              autoPlay
              loop
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(true)}
            >
              <Maximize className="w-7 h-7 text-white"/>
            </button>
          </>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <video 
              src={video!} 
              className="max-h-[70vh] max-w-[90vw] min-w-[80vw] object-contain rounded-lg"
              autoPlay
              loop
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(false)}
            >
              <Minimize className="w-7 h-7 text-white"/>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



const ImageGenerated = ({image, index}: {image: string | null, index: number}) => {

  const [open, setOpen] = useState(false); 

  const handleDownload = async () => {
    try {
      // Fetch the image data
      const response = await fetch(image);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element to programmatically trigger a download
      const a = document.createElement('a');
      a.href = blobUrl;
      // Optional: specify a filename
      const urlParts = image.split('/');
      const suggestedFileName = urlParts[urlParts.length - 1] || 'downloaded-image';
      a.download = suggestedFileName;
      
      // Append the anchor to the body and trigger a click
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };



  return (
    <div>
      <div className="w-full h-[200px] aspect-square my-2 rounded-lg border flex items-center justify-center relative">
        {image === null ? (
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-16 h-16 text-primary" />
            <Loader2 className="w-8 h-8 animate-spin text-primary mt-auto" />
          </div>
        ) : (
          <>
            <img 
              src={image} 
              alt={`Generated image ${index + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(true)}
            >
              <Maximize className="w-7 h-7 text-white"/>
            </button>
          </>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img 
              src={image!} 
              alt={`Generated image ${index + 1}`}
              className="max-h-[70vh] max-w-[70vw] min-w-[70vw] object-contain rounded-lg"
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(false)}
            >
              <Minimize className="w-7 h-7 text-white"/>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


export { AudioGenerated, VideoGenerated, ImageGenerated };