import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";


export const StoryPage = () => {
  const [extraBubble, setExtraBubble] = useState(null);
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
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
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
          // start: 0, end: 3.12,
          // words: [
          //   { text: "Kate's", start: 0.5, end: 1.2 },
          //   { text: "Big", start: 1.2, end: 1.7 },
          //   { text: "Feelings", start: 1.7, end: 2.5 },
          // ]
        },
      ]
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0, end: 2.2,
          words: [
            { text: "I", start: 0.0, end: 0.3 },
            { text: "want", start: 0.3, end: 0.6 },
            { text: "to", start: 0.6, end: 0.9 },
            { text: "play", start: 0.9, end: 1.2 },
            { text: "dinosaur", start: 1.2, end: 1.6 },
            { text: "chase!", start: 1.6, end: 2.0 }
          ]
        },
        {
          start: 2.3, end: 3.8,
          words: [
            { text: "I", start: 2.4, end: 2.6 },
            { text: "want", start: 2.6, end: 2.8 },
            { text: "to", start: 2.8, end: 3.0 },
            { text: "play", start: 3.0, end: 3.2 },
            { text: "hide", start: 3.2, end: 3.4 },
            { text: "and", start: 3.4, end: 3.6 },
            { text: "seek!", start: 3.6, end: 3.8 }
          ]
        },
        {
          start: 3.9, end: 5.8,
          words: [
            { text: "My", start: 4.0, end: 4.3 },
            { text: "game", start: 4.3, end: 4.5 },
            { text: "is", start: 4.5, end: 4.7 },
            { text: "the", start: 4.7, end: 4.9 },
            { text: "best!", start: 4.9, end: 5.1 },
            { text: "Let’s", start: 5.1, end: 5.3 },
            { text: "play", start: 5.3, end: 5.5 },
            { text: "that!", start: 5.5, end: 5.7 }
          ]
        },


      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [

        {
          start: 5.3, end: 8.0,
          words: [
            { text: "You", start: 5.4, end: 5.7 },
            { text: "should", start: 5.7, end: 6.1 },
            { text: "take", start: 6.1, end: 6.4 },
            { text: "turns", start: 6.4, end: 6.7 },
            { text: "playing", start: 6.7, end: 7.1 },
            { text: "both", start: 7.1, end: 7.4 },
            { text: "games", start: 7.4, end: 7.8 }
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 0.8,
          words: [
            { text: "Great", start: 0.0, end: 0.3 },
            { text: "idea!", start: 0.3, end: 0.6 },
          ]
        },
        {
          start: 0.9, end: 7.0,
          words: [
            { text: "Yes,", start: 1.0, end: 1.3 },
            { text: "let’s", start: 1.6, end: 1.9 },
            { text: "take", start: 1.9, end: 2.3 },
            { text: "turns-", start: 2.3, end: 2.6 },
            { text: "we", start: 3.0, end: 3.3 },
            { text: "will", start: 3.3, end: 3.6 },
            { text: "play", start: 3.6, end: 3.9 },
            { text: "your", start: 3.9, end: 4.2 },
            { text: "game", start: 4.2, end: 4.5 },
            { text: "first,", start: 4.5, end: 4.8 },
            { text: "and", start: 4.8, end: 5.1 },
            { text: "then", start: 5.1, end: 5.4 },
            { text: "we", start: 5.4, end: 5.7 },
            { text: "will", start: 5.7, end: 6.0 },
            { text: "play", start: 6.0, end: 6.3 },
            { text: "my", start: 6.3, end: 6.6 },
            { text: "game,’", start: 6.6, end: 6.9 }
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [


      ]
    },

  ];


  const cloudPositions = {

    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: '15%', left: '70%', isFlipped: true },
      { top: '15%', left: '15%' },
      { top: '10%', left: '40%', isFlipped: true },
      { top: '10%', left: '40%' },
    ],

    2: [
      { top: '10%', right: '10%', isFlipped: true },
      { top: '15%', left: '70%', isFlipped: true },
      { top: '10%', left: '15%' },
    ],

    3: [
      { bottom: '85%', left: '60%', isFlipped: true },
      { top: '20%', left: '5%' },
      { top: '10%', left: '55%', isFlipped: true },
    ],

    4: [
      { top: '15%', left: '55%' },
      { top: '20%', left: '30%' },
    ],
    // 5: [
    //   { bottom: '80%', left: '48%', },
    //   { top: '20%', left: '25%' },
    //   { top: '10%', left: '50%', isFlipped: true },
    //   { top: '70%', left: '50%', isFlipped: true }
    // ],
    // 6: [
    //   { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
    //   { top: '10%', left: '10%' },
    //   { top: '10%', left: '50%', isFlipped: true },
    // ],
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 6.0, end: 8.8,
      words: [
        { text: "Oh", start: 6.0, end: 7.0 },
        { text: "dear!", start: 7.0, end: 7.8 },
        { text: "Everyone", start: 7.8, end: 8.1 },
        { text: "is", start: 8.1, end: 8.3 },
        { text: "arguing.", start: 8.3, end: 8.7 }
      ]
    },
    {
      videoIndex: 2,
      start: 0, end: 5.3,
      words: [
        { text: "Bella", start: 0.0, end: 0.3 },
        { text: "and", start: 0.3, end: 0.6 },
        { text: "Kerry", start: 0.6, end: 0.9 },
        { text: "want", start: 0.9, end: 1.2 },
        { text: "to", start: 1.2, end: 1.5 },
        { text: "play", start: 1.5, end: 1.8 },
        { text: "different", start: 1.8, end: 2.1 },
        { text: "games,", start: 2.1, end: 2.4 },
        { text: "but", start: 3.0, end: 3.3 },
        { text: "they", start: 3.3, end: 3.6 },
        { text: "also", start: 3.6, end: 3.9 },
        { text: "want", start: 3.9, end: 4.2 },
        { text: "to", start: 4.2, end: 4.5 },
        { text: "play", start: 4.5, end: 4.8 },
        { text: "together.", start: 4.8, end: 5.1 }
      ]
    }, {
      videoIndex: 4,
      start: 0, end: 3.1,
      words: [
        { text: "The", start: 0.0, end: 0.3 },
        { text: "teacher", start: 0.3, end: 0.6 },
        { text: "is", start: 0.6, end: 0.9 },
        { text: "happy", start: 0.9, end: 1.2 },
        { text: "to", start: 1.2, end: 1.5 },
        { text: "see", start: 1.5, end: 1.8 },
        { text: "the", start: 1.8, end: 2.1 },
        { text: "girls", start: 2.1, end: 2.4 },
        { text: "playing", start: 2.4, end: 2.7 },
        { text: "together", start: 2.7, end: 3.0 }
      ]
    },
    {
      videoIndex: 4,
      start: 3.4, end: 6.0,
      words: [
        { text: "The", start: 3.5, end: 3.8 },
        { text: "girls", start: 3.8, end: 4.1 },
        { text: "are", start: 4.1, end: 4.3 },
        { text: "happy", start: 4.3, end: 4.7 },
        { text: "too.", start: 4.7, end: 5.0 }
      ]
    }
  ];

  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );
  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);

  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;

  const activeCloudPosition = activeSubtitleIndex !== -1
    ? cloudPositions[currentVideo]?.[activeSubtitleIndex]
    : null;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    video.load();
    setCurrentTime(0);
    setShowBubble(true);

    const handleCanPlay = () => {
      setIsLoading(false);
      if (!showBanner) video.play().catch(() => { });
    };
    video.addEventListener('canplay', handleCanPlay);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentVideo]);

  // Preload next video
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

  // Video event listeners
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
    if (videoRef.current) {
      videoRef.current.load();
      setCurrentTime(0);
      setShowBubble(true);

      if (showBanner) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 2 && isPlaying) {
      console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        // video.currentTime = 5.0;
        // setCurrentTime(5.0);
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);


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
    setShowBanner(false);
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const handleEnded = useCallback(() => {
    if (currentVideo === videos.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else if (currentVideo !== 2) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate]);


  const toggleWordSelection = (wordText) => {
    const correctWords = ["turns"];
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
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        if (currentVideo === 2 && showBanner) {
          setShowBanner(false);
          videoRef.current.play();
        } else {
          videoRef.current.play();
        }
      }
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

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
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">
          {videos.map((vid, index) => (
            <video key={index} src={vid.url} preload="auto" style={{ display: 'none' }} />
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

          {currentVideo === 2 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how the teacher helped Bella and
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Kerry solve their problem.
              </p>
            </div>
          )}

          {activeSubtitle && activeCloudPosition && showBubble && showSubtitles && (
            <div
              className="subtitle-container"
              style={activeCloudPosition}
            >
              <div className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          if (currentVideo === 2) toggleWordSelection(word.text);
                        }}
                        className={`
                word-span
                ${isHighlighted ? 'active-word' : ''}
                ${currentVideo === 2 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                ${currentVideo === 2 ? 'clickable-word' : ''}
              `}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                {/* <button className="close" onClick={() => setShowBubble(false)}>×</button> */}
              </div>
            </div>
          )}
          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              // 2️⃣ غيرنا الموضع لتظهر في الأسفل بشكل واضح
              style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}
            >
              {/* 1️⃣ استخدمنا نفس الكلاس لترث التصميم */}
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
                  
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className="control-btn" title="Subtitles">
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>

                  <button onClick={() => setShowCaption(!showCaption)} className="control-btn" title="Caption">
                    <MessageSquareText className="w-6 h-5" />
                    <span className="control-label">Caption</span>
                  </button>

                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
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
                    {isPlaying ? <Pause className="w-12 h-12" fill="white" /> : <Play className="w-12 h-12" fill="white" />}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div key={index} className={`progress-dot ${index === currentVideo ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StoryPage;
