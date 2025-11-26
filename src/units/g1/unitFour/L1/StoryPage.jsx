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
          start: 5.5, end: 6.4,
          words: [
            { text: "Thank you,", start: 5.6, end: 6.0 },
            { text: "Amy,", start: 6.0, end: 6.3 }
          ]
        },
        {
          start: 6.4, end: 8.8,
          words: [
            { text: "Why", start: 6.5, end: 6.8 },
            { text: "did", start: 6.8, end: 7.1 },
            { text: "you", start: 7.1, end: 7.4 },
            { text: "say", start: 7.4, end: 7.7 },
            { text: "Thank", start: 7.7, end: 8.0 },
            { text: "you”", start: 8.0, end: 8.3 },
            { text: "Mum?", start: 8.3, end: 8.6 }
          ]
        },

      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [


        {
          start: 4.5, end: 11.0,
          words: [
            { text: "That", start: 4.5, end: 4.9 },
            { text: "is", start: 4.9, end: 5.3 },
            { text: "very", start: 5.3, end: 5.7 },
            { text: "kind", start: 5.7, end: 6.1 },
            { text: "of", start: 6.1, end: 6.5 },
            { text: "you,", start: 6.5, end: 6.9 },
            { text: "Amy,", start: 6.9, end: 7.3 }
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [

        {
          start: 2.2, end: 5.1,
          words: [
            { text: "Thank", start: 2.3, end: 2.6 },
            { text: "you", start: 2.6, end: 2.9 },
            { text: "for", start: 2.9, end: 3.2 },
            { text: "working", start: 3.2, end: 3.5 },
            { text: "so", start: 3.5, end: 3.8 },
            { text: "hard", start: 3.8, end: 4.1 },
            { text: "for", start: 4.1, end: 4.4 },
            { text: "us,", start: 4.4, end: 4.7 },
            { text: "Dad", start: 4.7, end: 5.0 }
          ]
        },
        {
          start: 5.2, end: 8.7,
          words: [
            { text: "Wow!", start: 5.2, end: 5.5 },
            { text: "It", start: 5.5, end: 5.8 },
            { text: "makes", start: 5.8, end: 6.1 },
            { text: "me", start: 6.1, end: 6.4 },
            { text: "happy", start: 6.4, end: 6.7 },
            { text: "to", start: 6.7, end: 7.0 },
            { text: "hear", start: 7.0, end: 7.3 },
            { text: "you", start: 7.3, end: 7.6 },
            { text: "say", start: 7.6, end: 7.9 },
            { text: "thank", start: 7.9, end: 8.2 },
            { text: "you", start: 8.2, end: 8.5 }
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 6.0,
          words: [
            { text: "Thank", start: 0.0, end: 0.3 },
            { text: "you", start: 0.3, end: 0.6 },
            { text: "for", start: 0.6, end: 0.9 },
            { text: "loving", start: 0.9, end: 1.2 },
            { text: "us,", start: 1.2, end: 1.5 },
            { text: "Amy!", start: 1.5, end: 1.8 }
          ]
        },
      ]
    },

  ];


  const cloudPositions = {

    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: '20%', left: '40%', isFlipped: true },
      { top: '15%', left: '40%', isFlipped: true },
      { top: '20%', left: '50%', isFlipped: true },
      { top: '10%', left: '0%' },
      { top: '10%', left: '0%' },
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
      { top: '15%', left: '25%', isFlipped: true },
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
      start: 0, end: 2.5,
      words: [
        { text: "Mum", start: 0.5, end: 0.8 },
        { text: "is", start: 0.8, end: 1.0 },
        { text: "busy", start: 1.0, end: 1.4 },
        { text: "in", start: 1.4, end: 1.6 },
        { text: "the", start: 1.6, end: 1.8 },
        { text: "kitchen.", start: 1.8, end: 2.2 }
      ]
    },
    {
      videoIndex: 1,
      start: 2.6, end: 5.4,
      words: [
        { text: "Amy", start: 2.7, end: 3.0 },
        { text: "gives", start: 3.0, end: 3.4 },
        { text: "her", start: 3.4, end: 3.7 },
        { text: "a", start: 3.7, end: 3.9 },
        { text: "glass", start: 3.9, end: 4.3 },
        { text: "of", start: 4.3, end: 4.5 },
        { text: "cold", start: 4.5, end: 4.8 },
        { text: "water.", start: 4.8, end: 5.2 }
      ]
    },
    {
      videoIndex: 1,
      start: 8.9, end: 15.0,
      words: [
        { text: "Mum", start: 9.0, end: 9.3 },
        { text: "explains", start: 9.3, end: 9.7 },
        { text: "that", start: 9.7, end: 10.0 },
        { text: "saying", start: 10.0, end: 10.3 },
        { text: "‘thank you’", start: 10.3, end: 10.9 },
        { text: "shows", start: 11.5, end: 11.8 },
        { text: "that", start: 11.8, end: 12.1 },
        { text: "you", start: 12.1, end: 12.4 },
        { text: "care.", start: 12.4, end: 12.7 }
      ]
    },
    {
      videoIndex: 2,
      start: 0, end: 2.5,
      words: [
        { text: "Thank", start: 0.0, end: 0.4 },
        { text: "you", start: 0.4, end: 0.8 },
        { text: "for", start: 0.5, end: 0.75 },
        { text: "taking", start: 0.75, end: 1.0 },
        { text: "care", start: 1.0, end: 1.25 },
        { text: "of", start: 1.25, end: 1.5 },
        { text: "the", start: 1.5, end: 1.75 },
        { text: "house,", start: 1.75, end: 2.0 },
        { text: "Mum,", start: 2.0, end: 2.25 }
      ]
    },
    {
      videoIndex: 2,
      start: 2.6, end: 4.4,
      words: [
        { text: "Amy’s", start: 2.7, end: 3.1 },
        { text: "mum", start: 3.1, end: 3.5 },
        { text: "hugs", start: 3.5, end: 3.9 },
        { text: "her", start: 3.9, end: 4.3 }
      ]
    },
    {
      videoIndex: 3,
      start: 0, end: 2.1,
      words: [
        { text: "Dad", start: 0.0, end: 0.4 },
        { text: "comes", start: 0.4, end: 0.8 },
        { text: "home", start: 0.8, end: 1.2 },
        { text: "from", start: 1.2, end: 1.6 },
        { text: "work.", start: 1.6, end: 2.0 }
      ]
    }
  ];

  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);


  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );


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

    if (currentVideo === 1 && isPlaying) {
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
    } else if (currentVideo !== 1) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);


  const toggleWordSelection = (wordText) => {
    const correctWords = ["‘thank you’"];
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
        if (currentVideo === 1 && showBanner) {
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

          {currentVideo === 1 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight why is it important to say
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                “thank you”.
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
                          if (currentVideo === 1) toggleWordSelection(word.text);
                        }}
                        className={`
                word-span
                ${isHighlighted ? 'active-word' : ''}
                ${currentVideo === 1 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                ${currentVideo === 1 ? 'clickable-word' : ''}
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
                    {/* يمكنك تغيير الأيقونة إذا أردت */}
                    <MessageSquareText className="w-6 h-6" />
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
