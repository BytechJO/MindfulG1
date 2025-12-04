import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1-1.mp4";
import video2 from "./assets/1-2.mp4";
import video3 from "./assets/1-3.mp4";
import video4 from "./assets/1-4.mp4";
import video5 from "./assets/1-5.mp4";
import video7 from "./assets/1-7.mp4";
import video8 from "./assets/1-8.mp4";
import video9 from "./assets/1-9S.mp4";

export const StoryPage = () => {
  // 1
  const [extraBubble, setExtraBubble] = useState(null);
  // e
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fullscreenContainerRef = useRef(null);


  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: [
        {
        },
      ]
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 4,
          words: [
            { text: "You're", start: 0, end: 0.5 },
            { text: "a", start: 0.5, end: 0.7 },
            { text: "big", start: 0.7, end: 1 },
            { text: "girl", start: 1, end: 1.4 },
            { text: "Kate,", start: 1.4, end: 2 },
            { text: "Keep", start: 2, end: 2.5 },
            { text: "trying.", start: 2.5, end: 3.8 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [

      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 5,
          words: [
            { text: "You", start: 0, end: 0.4 },
            { text: "help", start: 0.4, end: 0.7 },
            { text: "May", start: 0.7, end: 1.1 },
            { text: "all", start: 1.1, end: 1.2 },
            { text: "the", start: 1.2, end: 1.4 },
            { text: "time", start: 1.4, end: 1.8 },
            { text: "and", start: 1.8, end: 2.3 },
            { text: "I", start: 2.3, end: 2.4 },
            { text: "feel", start: 2.4, end: 2.8 },
            { text: "sad", start: 2.8, end: 3.4 },
            { text: "and", start: 3.4, end: 3.6 },
            { text: "angry", start: 3.6, end: 3.9 },
          ]
        },
      ]
    },
    {
      url: video7,
      title: "Section 7",
      subtitles: [
        {
          start: 0, end: 2.5,
          words: [
            { text: "You", start: 0, end: 0.4 },
            { text: "are", start: 0.4, end: 0.7 },
            { text: "a", start: 0.7, end: 0.8 },
            { text: "big", start: 0.8, end: 1.2 },
            { text: "girl", start: 1.2, end: 1.5 },
            { text: "now", start: 1.5, end: 1.8 },
            { text: "Kate.", start: 1.8, end: 2.0 },
          ]
        },
        {
          start: 2.5, end: 8,
          words: [
            { text: "You", start: 2.5, end: 2.8 },
            { text: "do", start: 2.8, end: 3.0 },
            { text: "not", start: 3.0, end: 3.3 },
            { text: "need", start: 3.3, end: 3.6 },
            { text: "as", start: 3.6, end: 3.7 },
            { text: "much", start: 3.7, end: 4.0 },
            { text: "help", start: 4.5, end: 4.8 },
            { text: "as", start: 4.8, end: 5.1 },
            { text: "your", start: 5.1, end: 5.4 },
            { text: "little", start: 5.4, end: 5.7 },
            { text: "sister.", start: 5.7, end: 6.0 },
          ]
        },
      ]
    },
    {
      url: video8,
      title: "Section 8",
      subtitles: [
        {
          start: 0, end: 4,
          words: [
            { text: "Can", start: 0, end: 0.3 },
            { text: "you", start: 0.3, end: 0.6 },
            { text: "help", start: 0.6, end: 0.9 },
            { text: "me", start: 0.9, end: 1.2 },
            { text: "bake", start: 1.2, end: 1.5 },
            { text: "a", start: 1.5, end: 1.6 },
            { text: "cake?", start: 1.6, end: 2.1 },
          ]
        },
      ]
    },
    {
      url: video9,
      title: "Section 9",
      subtitles: [

        {
          start: 2, end: 6.6,
          words: [
            { text: "I", start: 3.0, end: 3.3 },
            { text: "can", start: 3.3, end: 3.6 },
            { text: "help", start: 3.6, end: 3.9 },
            { text: "you", start: 3.9, end: 4.2 },
            { text: "and", start: 4.2, end: 4.5 },
            { text: "May", start: 4.5, end: 4.8 },
            { text: "with", start: 4.8, end: 5.1 },
            { text: "different", start: 5.1, end: 5.4 },
            { text: "things", start: 5.4, end: 5.7 },
            { text: "at", start: 5.7, end: 6.0 },
            { text: "different", start: 6.0, end: 6.3 },
            { text: "times,", start: 6.3, end: 6.6 },
          ]
        },
      ]
    },
  ];

  const cloudPositions = [
    { bottom: '34.375rem', left: '32%', transform: 'translateX(-50%)' },
    { top: '1%', left: '45%' },
    { top: '10%', right: '65%', transform: 'translateX(0)', left: 'auto' },
    { bottom: '85%', left: '30%', transform: 'translateX(-50%)' },
    { top: '10%', left: '50%', transform: 'translateX(0)', isFlipped: true },
    { bottom: '80%', right: '40%', transform: 'translateX(0)', left: 'auto' },
    { top: '20%', left: '60%', transform: 'translateX(0)', isFlipped: true },
    { bottom: '80%', right: '48%', transform: 'translateX(0)', left: 'auto' },
    { bottom: '75%', left: '30%', transform: 'translateX(-50%)' },
  ];

  // 2
  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 4.5,
      words: [
        { text: "Kate", start: 0, end: 0.5 },
        { text: "has", start: 0.6, end: 0.69 },
        { text: "a", start: 0.69, end: 0.9 },
        { text: "little", start: 0.9, end: 1.3 },
        { text: "sister", start: 1.3, end: 1.8 },
        { text: "named", start: 1.8, end: 2.2 },
        { text: "May", start: 2.2, end: 2.6 },
        { text: "Mum", start: 2.8, end: 3.1 },
        { text: "helps", start: 3.1, end: 3.5 },
        { text: "May", start: 3.5, end: 3.8 },
        { text: "with", start: 3.8, end: 4.0 },
        { text: "everything.", start: 4.0, end: 4.5 }
      ]
    },
    {
      videoIndex: 1,
      start: 4.6,
      end: 8,
      words: [
        { text: "If", start: 5.0, end: 5.3 },
        { text: "Kate", start: 5.3, end: 5.7 },
        { text: "wants", start: 5.7, end: 6.1 },
        { text: "help,", start: 6.1, end: 6.6 },
        { text: "Mum", start: 6.6, end: 7.0 },
        { text: "says.", start: 7.0, end: 7.9 }
      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 4,
      words: [
        { text: "Kate", start: 0.2, end: 0.5 },
        { text: "looks", start: 0.5, end: 0.8 },
        { text: "sad", start: 0.9, end: 1.3 },
        { text: "Her", start: 1.3, end: 1.6 },
        { text: "mum", start: 1.6, end: 2.4 },
        { text: "asks", start: 2.4, end: 3 },
        { text: "her", start: 3.1, end: 3.4 },
        { text: "why", start: 3.5, end: 4 },
      ]
    },
    {
      videoIndex: 3,
      start: 4.0, end: 7.0,
      words: [
        { text: "Kate", start: 4.1, end: 4.6 },
        { text: "tells", start: 4.6, end: 5.0 },
        { text: "her", start: 5.0, end: 5.4 },
        { text: "mum", start: 5.4, end: 5.9 },
        { text: "how", start: 5.9, end: 5.9 },
        { text: "she", start: 5.9, end: 6.4 },
        { text: "feels.", start: 6.4, end: 7.0 },
      ]
    },
    {
      videoIndex: 3,
      start: 7.0, end: 8.0,
      words: [
        { text: "she", start: 7.1, end: 7.4 },
        { text: "says", start: 7.4, end: 8.0 },
      ]
    },

    {
      videoIndex: 7,
      start: 0, end: 2,
      words: [
        { text: "Kate", start: 0, end: 0.3 },
        { text: "and", start: 0.3, end: 0.5 },
        { text: "Mum", start: 0.5, end: 0.8 },
        { text: "bake", start: 0.8, end: 1.2 },
        { text: "a chocolate", start: 1.2, end: 1.6 },
        { text: "cake.", start: 1.6, end: 1.9 },
      ]
    },
    {
      videoIndex: 7,
      start: 9.0, end: 12.0,
      words: [
        { text: "Kate", start: 9.1, end: 9.4 },
        { text: "understands", start: 9.4, end: 9.7 },
        { text: "and", start: 9.7, end: 10.0 },
        { text: "gives", start: 10.0, end: 10.3 },
        { text: "her", start: 10.3, end: 10.6 },
        { text: "mum", start: 10.6, end: 10.9 },
        { text: "a", start: 10.9, end: 11.0 },
        { text: "hug.", start: 11.1, end: 11.5 },
      ]
    },
  ];



  const currentVideoData = videos[currentVideo];
  const activeSubtitle = currentVideoData.subtitles.find(
    sub => currentTime >= sub.start && currentTime < sub.end
  );

  // 3
  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);

  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo, videos]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 4 && isPlaying) {
      console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);





  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setDuration(video.duration);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);


  useEffect(() => {
    if (showBanner && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showBanner]);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setCurrentTime(0);
      setShowBubble(true);

      if (!showBanner) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }
    }
  }, [currentVideo, showBanner]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);


  const handlePrevious = () => {
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    } else {
      setCurrentVideo(prev => prev + 1);
    }
  };

  const handleEnded = useCallback(() => {
    if (currentVideo === 4) {
      setShowBanner(true);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = videoRef.current.duration;
      }
    }
    else if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    }
    else {
      setShowBanner(false);
      setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : prev));
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["sad", "angry"];
    const cleanedWord = wordText.replace('.', '');

    if (correctWords.includes(cleanedWord)) {
      setSelectedWords(prev =>
        prev.includes(wordText)
          ? prev.filter(w => w !== wordText)
          : [...prev, wordText]
      );
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const container = fullscreenContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="story-page-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">
          {videos.map((vid, index) => (
            <video
              key={index}
              src={vid.url}
              preload="auto"
              style={{ display: 'none' }}
            />
          ))}

          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            muted={isMuted}
            onEnded={handleEnded}
            preload="auto"
            src={currentVideoData.url}
          >
            Your browser does not support the video tag.
          </video>

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the words that help you know
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Kate's feelings now.
              </p>
            </div>
          )}

          {showBubble && showSubtitles && activeSubtitle && activeSubtitle.words && (
            <div className="subtitle-container" style={cloudPositions[currentVideo]}>
              <div className={`bubble-cloud animate__animated animate__fadeIn ${cloudPositions[currentVideo]?.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return (
                      <span key={index} onClick={() => { if (currentVideo === 4) toggleWordSelection(word.text); }} className={`word-span ${isHighlighted ? 'active-word' : ''} ${currentVideo === 4 && selectedWords.includes(word.text) ? 'selected-word' : ''}`}>
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                {/* <button className="close" onClick={() => setShowBubble(false)}>×</button> */}
              </div>
            </div>
          )}

          {/* 4 */}
          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}
            >
              <div className="extra-cloud animate__animated animate__fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return <span key={index} className={`word-span ${isHighlighted ? 'active-word' : ''}`}>{word.text}{' '}</span>;
                  })}
                </p>
              </div>
            </div>
          )}


          <div className="video-overlay" />
          <div className="controls-container">

            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn">
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button onClick={handleNext} className="control-btn right-nav-btn">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">

                  <button
                    onClick={() => setShowCaption(!showCaption)}
                    className={`control-btn ${!showCaption ? "disabled-btn" : ""}`}
                    title="Caption"
                  >
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
                  </button>


                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`control-btn ${!showSubtitles ? "disabled-btn" : ""}`}
                    title="Subtitles"
                  >
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>

                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>
                    {showVolumeSlider && (
                      <div className="volume-slider-container">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                          orient="vertical"
                        />
                      </div>
                    )}
                  </div>

                  <div className="speed-control-container">
                    <button
                      onClick={() => setShowSpeedMenu(prev => !prev)}
                      className="control-btn speed-btn"
                      title="Playback Speed"
                    >
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>

                    {showSpeedMenu && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map((speed) => (
                          <li
                            key={speed}
                            onClick={() => selectPlaybackSpeed(speed)}
                            className={playbackSpeed === speed ? 'active-speed' : ''}
                          >
                            {speed}x
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn">
                    {isPlaying ? (
                      <Pause className="w-12 h-12" fill="white" />
                    ) : (
                      <Play className="w-12 h-12" fill="white" />
                    )}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? (
                      <Minimize2 className="w-6 h-6" />
                    ) : (
                      <Maximize2 className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentVideo ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
