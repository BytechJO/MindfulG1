import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/2-1.mp4";
import video2 from "./assets/2-2.mp4";
import video3 from "./assets/2-3.mp4";
import video4 from "./assets/2-4.mp4";
import video5 from "./assets/2-5.mp4";


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

  // --- START: التعديلات المطلوبة ---
  // 1. إنشاء ref للحاوية التي ستدخل وضع ملء الشاشة
  const fullscreenContainerRef = useRef(null);
  // --- END: التعديلات المطلوبة ---

  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: [
        // {
        //   start: 0, end: 3.12,
        //   words: [
        //     { text: "Nessie", start: 0.5, end: 1.2 },
        //     { text: "Doesn’t", start: 1.2, end: 1.7 },
        //     { text: "Like", start: 1.7, end: 2.1 },
        //     { text: "Tag", start: 2.1, end: 2.5 },
        //   ]
        // },
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
          start: 4.0, end: 9.0,
          words: [
            { text: "She", start: 4.5, end: 4.7 },
            { text: "takes", start: 4.7, end: 5.0 },
            { text: "a", start: 5.0, end: 5.3 },
            { text: "deep", start: 5.3, end: 5.6 },
            { text: "breath", start: 5.6, end: 5.9 },
            { text: "and", start: 5.9, end: 6.2 },
            { text: "counts", start: 6.2, end: 6.6 },
            { text: "to", start: 6.6, end: 6.9 },
            { text: "ten.", start: 6.9, end: 7.2 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 6.0, end: 8.0,
          words: [
            { text: "This", start: 6.0, end: 6.3 },
            { text: "game", start: 6.3, end: 6.6 },
            { text: "isn’t", start: 6.6, end: 7.0 },
            { text: "fun", start: 7.0, end: 7.3 },
            { text: "for", start: 7.3, end: 7.6 },
            { text: "me.", start: 7.6, end: 8.0 },
          ]
        },
        {
          start: 8.5, end: 12.0,
          words: [
            { text: "I", start: 8.5, end: 8.7 },
            { text: "am", start: 8.7, end: 9.0 },
            { text: "too", start: 9.0, end: 9.3 },
            { text: "slow.", start: 9.3, end: 9.8 },
            { text: "I", start: 9.8, end: 10.0 },
            { text: "don’t", start: 10.0, end: 10.3 },
            { text: "like", start: 10.3, end: 10.6 },
            { text: "how", start: 10.6, end: 10.8 },
            { text: "it", start: 10.8, end: 11.0 },
            { text: "makes", start: 11.0, end: 11.3 },
            { text: "me", start: 11.3, end: 11.5 },
            { text: "feel.", start: 11.5, end: 12.0 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 2.2, end: 5.0,
          words: [
            { text: "Thank", start: 2.2, end: 2.6 },
            { text: "you", start: 2.6, end: 2.9 },
            { text: "for", start: 2.9, end: 3.2 },
            { text: "telling", start: 3.2, end: 3.6 },
            { text: "us", start: 3.6, end: 3.9 },
            { text: "how", start: 3.9, end: 4.2 },
            { text: "you", start: 4.2, end: 4.5 },
            { text: "feel,", start: 4.5, end: 5.0 },
          ]
        },
        {
          start: 9.5, end: 11.5,
          words: [
            { text: "I", start: 9.5, end: 9.7 },
            { text: "really", start: 9.7, end: 10.1 },
            { text: "like", start: 10.1, end: 10.4 },
            { text: "playing", start: 10.4, end: 10.8 },
            { text: "this", start: 10.8, end: 11.1 },
            { text: "game,", start: 11.1, end: 11.5 },
          ]
        },
      ]
    },
  ];

  const cloudPositions = {
    0: [{ bottom: '30rem', left: '25%', transform: 'translateX(-50%)' }],
    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' }
    ],
    2: [
      { top: '10%', right: '65%', left: 'auto' },
      { top: '15%', left: '70%', isFlipped: true }
    ],
    3: [
      { bottom: '80%', left: '58%', transform: 'translateX(-50%)', isFlipped: true },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '10%', left: '50%', isFlipped: true }
    ],
    4: [
      { top: '10%', left: '50%', transform: 'translateX(-50%)' },
      { top: '10%', left: '5%' },
      { top: '10%', left: '5%' },
      { bottom: '80%', left: '50%' },
      { bottom: '80%', left: '40%' }
    ]
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 3.1,
      words: [
        { text: "Nessie", start: 0.0, end: 0.5 },
        { text: "is", start: 0.5, end: 0.69 },
        { text: "upset", start: 0.69, end: 1.2 },
        { text: "Her", start: 1.2, end: 1.5 },
        { text: "friends", start: 1.5, end: 2.0 },
        { text: "are", start: 2.0, end: 2.2 },
        { text: "playing", start: 2.2, end: 2.7 },
        { text: "tag.", start: 2.7, end: 3.1 },
      ]
    },
    {
      videoIndex: 1,
      start: 3.6,
      end: 6.7,
      words: [
        { text: "She", start: 3.7, end: 4.0 },
        { text: "cannot", start: 4.0, end: 4.3 },
        { text: "run", start: 4.3, end: 4.6 },
        { text: "as", start: 4.6, end: 4.9 },
        { text: "fast", start: 4.9, end: 5.2 },
        { text: "as", start: 5.2, end: 5.5 },
        { text: "they", start: 5.5, end: 5.9 },
        { text: "do.", start: 5.9, end: 6.3 },
      ]
    },
    {
      videoIndex: 1,
      start: 6.5,
      end: 8.7,
      words: [
        { text: "She", start: 6.6, end: 6.9 },
        { text: "wants", start: 6.9, end: 7.2 },
        { text: "to", start: 7.2, end: 7.5 },
        { text: "shout", start: 7.5, end: 7.8 },
        { text: "at", start: 7.8, end: 8.1 },
        { text: "her", start: 8.1, end: 8.4 },
        { text: "friends.", start: 8.4, end: 8.7 },
      ]
    },

    {
      videoIndex: 2,
      start: 0, end: 4,
      words: [
        { text: "Nessie", start: 0.1, end: 0.6 },
        { text: "remembers", start: 0.6, end: 1.2 },
        { text: "how", start: 1.2, end: 1.5 },
        { text: "to", start: 1.5, end: 1.8 },
        { text: "keep", start: 1.8, end: 2.0 },
        { text: "calm", start: 2.0, end: 2.3 },
        { text: "when", start: 2.3, end: 2.6 },
        { text: "she", start: 2.6, end: 2.9 },
        { text: "feels", start: 2.9, end: 3.2 },
        { text: "upset.", start: 3.2, end: 3.6 },
      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 4.4,
      words: [
        { text: "Nessie", start: 0.2, end: 0.6 },
        { text: "feels", start: 0.6, end: 1.0 },
        { text: "calm", start: 1.0, end: 1.4 },
        { text: "and", start: 1.4, end: 1.7 },
        { text: "is", start: 1.7, end: 2.0 },
        { text: "ready", start: 2.0, end: 2.4 },
        { text: "to", start: 2.4, end: 2.6 },
        { text: "tell", start: 2.6, end: 3.0 },
        { text: "her", start: 3.0, end: 3.2 },
        { text: "friends", start: 3.2, end: 3.6 },
        { text: "how", start: 3.6, end: 3.8 },
        { text: "she", start: 3.8, end: 4.0 },
        { text: "feels.", start: 4.0, end: 4.4 },
      ]
    },
    {
      videoIndex: 3,
      start: 4.8, end: 5.5,
      words: [
        { text: "She", start: 4.8, end: 5.1 },
        { text: "says,", start: 5.1, end: 5.5 },
      ]
    },
    {
      videoIndex: 3,
      start: 4.8, end: 5.5,
      words: [
        { text: "She", start: 4.8, end: 5.1 },
        { text: "says,", start: 5.1, end: 5.5 },
      ]
    },

    {
      videoIndex: 4,
      start: 0, end: 1.9,
      words: [
        { text: "Nessie’s", start: 0.1, end: 0.5 },
        { text: "friends", start: 0.5, end: 0.9 },
        { text: "listen", start: 0.9, end: 1.3 },
        { text: "to", start: 1.3, end: 1.5 },
        { text: "her.", start: 1.5, end: 1.9 },
      ]
    },
    {
      videoIndex: 4,
      start: 5.5, end: 6.0,
      words: [
        { text: "they", start: 5.5, end: 5.8 },
        { text: "say.", start: 5.8, end: 6.0 },
      ]
    },
    {
      videoIndex: 4,
      start: 6.5, end: 9.0,
      words: [
        { text: "The", start: 6.5, end: 6.8 },
        { text: "girls", start: 6.8, end: 7.2 },
        { text: "agree", start: 7.2, end: 7.6 },
        { text: "to", start: 7.6, end: 7.8 },
        { text: "play", start: 7.8, end: 8.2 },
        { text: "hopscotch.", start: 8.2, end: 9.0 },
      ]
    },
    {
      videoIndex: 4,
      start: 12.0, end: 12.8,
      words: [
        { text: "says", start: 12.0, end: 12.4 },
        { text: "Nessie.", start: 12.4, end: 12.8 },
      ]
    },
  ];

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
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);

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

  // Auto-play or pause based on video/banner change
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
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        // video.currentTime = 5.0;
        // setCurrentTime(5.0);
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);


  const [isLoading, setIsLoading] = useState(false);

  // Loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true); // بدء التحميل
    video.load(); // تحميل الفيديو الجديد
    setCurrentTime(0);
    setShowBubble(true);

    const handleCanPlay = () => {
      setIsLoading(false); // انتهى التحميل
      if (!showBanner) video.play().catch(() => { });
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentVideo]);


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
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["breath", "counts"];
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
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
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
                Highlight the action words Nessie
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                used to keep calm.
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
    </div>
  );
};

export default StoryPage;
