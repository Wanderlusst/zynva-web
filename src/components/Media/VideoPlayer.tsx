'use client';

import React, { useRef, useState, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  poster?: string;
}

export default function VideoPlayer({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  poster,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted for autoplay policies
    video.muted = muted;
    
    // Set webkit and x5 attributes for better mobile support
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    // Try to play the video
    const playVideo = async () => {
      try {
        if (autoPlay) {
          await video.play();
          setIsLoading(false);
        }
      } catch (error) {
        // Autoplay was prevented, but video is still loaded
        console.log('Autoplay prevented, video ready to play');
        setIsLoading(false);
        // Try to play again after a short delay
        setTimeout(async () => {
          try {
            await video.play();
          } catch (e) {
            // User interaction may be required
          }
        }, 100);
      }
    };

    // Wait for video to be ready
    const handleCanPlay = () => {
      playVideo();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', () => {
      setIsLoading(false);
    });
    video.addEventListener('error', () => {
      setHasError(true);
      setIsLoading(false);
    });

    // If video is already loaded, try to play immediately
    if (video.readyState >= 3) {
      playVideo();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [autoPlay, muted, src]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const isBackgroundVideo = className.includes('object-cover') && !className.includes('rounded');
  
  return (
    <div className={`relative w-full h-full ${className}`} style={isBackgroundVideo ? { width: '100%', height: '100%' } : {}}>
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${isBackgroundVideo ? '' : 'rounded-2xl'} z-10`}>
          <div className="animate-pulse text-gray-400">Loading video...</div>
        </div>
      )}
      {hasError && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${isBackgroundVideo ? '' : 'rounded-2xl'} z-10`}>
          <div className="text-gray-400">Failed to load video</div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full ${className.includes('object-cover') ? 'object-cover' : 'object-contain'} ${isBackgroundVideo ? '' : 'rounded-2xl'}`}
        style={{
          objectFit: className.includes('object-cover') ? 'cover' : 'contain',
          width: '100%',
          height: '100%',
          ...(isBackgroundVideo && {
            position: 'absolute',
            top: 0,
            left: 0,
            minWidth: '100%',
            minHeight: '100%',
          }),
        }}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        poster={poster}
        onLoadedData={handleLoadedData}
        onError={handleError}
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

