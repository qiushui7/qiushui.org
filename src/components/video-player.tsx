'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
      <div className="animate-pulse flex items-center space-x-2">
        <div className="w-8 h-8 bg-white/20 rounded-full" />
        <div className="text-white/60">Loading player...</div>
      </div>
    </div>
  )
});

interface VideoPlayerProps {
  url: string,
  title?: string,
  className?: string
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  const playerRef = useRef<HTMLMediaElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isMouseOverControls, setIsMouseOverControls] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setPlayerRef = useCallback((player: HTMLMediaElement | null) => {
    if (!player) return;
    playerRef.current = player;
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleBuffer = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleBufferEnd = useCallback(() => {
    setIsReady(true);
    setIsLoading(false);
  }, []);

  const handleDuration = useCallback((e: any) => {
    const duration = e.target.duration;
    setDuration(duration);
  }, []);

  const handleTimeUpdate = useCallback((e: any) => {
    if (isSeeking) return;
    const currentTime = e.target.currentTime;
    setCurrentTime(currentTime);
  }, [isSeeking]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(false);
  }, []);

  const handleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleSeek = useCallback((seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  }, []);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    }
  }, []);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (!isMouseOverControls) {
        setShowControls(false);
      }
    }, 2000);
  }, [isMouseOverControls]);

  const handleMouseMove = useCallback(() => {
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-full bg-black rounded-lg overflow-hidden group ${className}`}
      style={{
        cursor: showControls || isMouseOverControls ? 'default' : 'none'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-white/80 text-sm">Loading...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video player */}
      <ReactPlayer
        ref={setPlayerRef}
        src={url}
        width="100%"
        height="100%"
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoad={handleBuffer}
        onLoadedData={handleBufferEnd}
        onDurationChange={handleDuration}
        onTimeUpdate={handleTimeUpdate}
        controls={false}
        style={{ background: 'transparent' }}
      />

      {/* Clickable overlay for play/pause */}
      <div
        role="button"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute inset-0 z-20"
        onClick={() => {
          handlePlayPause();
          showControlsTemporarily();
        }}
      />

      {/* Custom Controls */}
      <AnimatePresence>
        {showControls && isReady && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-b from-transparent to-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsMouseOverControls(true)}
            onMouseLeave={() => setIsMouseOverControls(false)}
          >
            {/* Progress Bar */}
            <div className="px-4 py-2">
              <div className="relative h-2 bg-white/20 rounded-full cursor-pointer group">
                {/* Progress fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white rounded-full pointer-events-none"
                  style={{ width: `${progressPercentage}%` }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: isSeeking ? 0 : 0.1 }}
                />

                {/* Input range slider */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const newTime = Number.parseFloat(e.target.value);
                    setCurrentTime(newTime);
                  }}
                  onMouseUp={(e) => {
                    const newTime = Number.parseFloat(e.currentTarget.value);
                    handleSeek(newTime);
                    setIsSeeking(false);
                  }}
                  onMouseDown={() => {
                    setIsSeeking(true);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{
                    background: 'transparent',
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />

                {/* Custom thumb */}
                <motion.div
                  className="absolute top-1/2 w-4 h-4 bg-white rounded-full transform -translate-y-1/2 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progressPercentage}% - 8px)` }}
                  animate={{
                    scale: isSeeking ? 1.3 : 1,
                    opacity: isSeeking ? 1 : undefined
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Control Bar */}
            <div className=" p-4">
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center space-x-4">
                  {/* Play/Pause Button */}
                  <motion.button
                    onClick={handlePlayPause}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying
                      ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4v16h4V4H6zm8 0v16h4V4h-4z" />
                        </svg>
                      )
                      : (
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                  </motion.button>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={handleMute}
                      className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0
                        ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        )
                        : (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                    </motion.button>
                    <div className="w-20 h-1 bg-white/20 rounded-full relative">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <div className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-2">
                  {/* Fullscreen Button */}
                  <motion.button
                    onClick={handleFullscreen}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isFullScreen
                      ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                      )
                      : (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                      )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glass morphism border effect */}
      <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />

      {/* Subtle gradient overlay for better visual integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-lg" />
    </motion.div>
  );
}
