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
import img1 from "./assets/nex.png";

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
        },
      ]
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 13.0, end: 16.8,
          words: [
            { text: "Your", start: 13.5, end: 13.8 },
            { text: "picture", start: 13.8, end: 14.2 },
            { text: "does", start: 14.2, end: 14.5 },
            { text: "not", start: 14.5, end: 14.8 },
            { text: "look", start: 14.8, end: 15.1 },
            { text: "nice!’", start: 15.1, end: 15.4 },
          ]
        },
      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 4.0, end: 6.0,
          words: [
            { text: "where", start: 4.1, end: 4.4 },
            { text: "is", start: 4.4, end: 4.7 },
            { text: "your", start: 4.7, end: 5.0 },
            { text: "picture,", start: 5.0, end: 5.3 },
            { text: "Mia?", start: 5.3, end: 5.6 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 12.0, end: 14.0,
          words: [
            { text: "I", start: 12.2, end: 12.4 },
            { text: "put it", start: 12.4, end: 12.6 },
            { text: "in", start: 12.6, end: 12.8 },
            { text: "the bin", start: 12.8, end: 13.4 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0.7, end: 3.5,
          words: [
            { text: "Thank", start: 1.1, end: 1.4 },
            { text: "you", start: 1.4, end: 1.7 },
            { text: "for", start: 1.7, end: 2.0 },
            { text: "telling", start: 2.0, end: 2.3 },
            { text: "me", start: 2.3, end: 2.6 },
            { text: "the", start: 2.6, end: 2.9 },
            { text: "truth", start: 2.9, end: 3.2 },
            { text: "Paul,", start: 3.2, end: 3.5 },
          ]
        },
        {
          start: 3.5, end: 6.5,
          words: [
            { text: "now", start: 3.6, end: 3.9 },
            { text: "we", start: 3.9, end: 4.2 },
            { text: "can", start: 4.2, end: 4.5 },
            { text: "fix", start: 4.5, end: 4.8 },
            { text: "the", start: 4.8, end: 5.1 },
            { text: "problem.", start: 5.1, end: 5.4 },
          ]
        },

        {
          start: 9.2, end: 9.8,
          words: [
            { text: "Sorry", start: 9.3, end: 9.6 },
          ]
        },
        {
          start: 9.9, end: 10.5,
          words: [
            { text: "Sorry", start: 10.0, end: 7.4 },
          ]
        },
      ]
    },
    { url: img1, title: "Section 2 (Image)", subtitles: [] },
  ];

  const cloudPositions = {
    0: [],

    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '60%', isFlipped: true },
      { top: '10%', left: '1%' },
      { top: '10%', left: '40%', isFlipped: true },
      { top: '1%', left: '50%', isFlipped: true }
    ],

    2: [
      { top: '10%', right: '48%' },
      { top: '1%', left: '32%' }
    ],

    3: [
      { bottom: '80%', left: '73%', isFlipped: true },
      { top: '30%', left: '5%' },
      { top: '10%', left: '80%', isFlipped: true },
      { top: '10%', left: '15%' }
    ],

    4: [
      { top: '15%', left: '10%' },
      { top: '10%', left: '30%' },
      { top: '15%', left: '80%', isFlipped: true },
      { top: '15%', left: '80%', isFlipped: true },
      { top: '35%', left: '50%', isFlipped: true },
    ],
    5: [
      // { bottom: '80%', left: '48%', isFlipped: true },
      // { top: '35%', left: '40%' },                    
    ],
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 2.3,
      words: [
        { text: "Mia", start: 0.1, end: 0.5 },
        { text: "draws", start: 0.5, end: 0.9 },
        { text: "a nice", start: 0.9, end: 1.4 },
        { text: "picture.", start: 1.4, end: 1.8 },
      ]
    },
    {
      videoIndex: 1,
      start: 2.4,
      end: 4.4,
      words: [
        { text: "She", start: 2.4, end: 2.8 },
        { text: "is happy", start: 2.8, end: 3.2 },
        { text: "with", start: 3.2, end: 3.6 },
        { text: "her", start: 3.6, end: 4.0 },
        { text: "work.", start: 4.0, end: 4.4 },
      ]
    },
    {
      videoIndex: 1,
      start: 6.0,
      end: 11.0,
      words: [
        { text: "Paul", start: 6.0, end: 6.4 },
        { text: "is next", start: 6.4, end: 6.8 },
        { text: "to", start: 6.8, end: 7.0 },
        { text: "her", start: 7.0, end: 7.3 },
        { text: "He", start: 8.0, end: 8.3 },
        { text: "thinks", start: 8.3, end: 8.6 },
        { text: "drawing", start: 8.6, end: 8.9 },
        { text: "is", start: 8.9, end: 9.2 },
        { text: "difficult.", start: 9.2, end: 9.5 },
      ]
    },
    {
      videoIndex: 1,
      start: 12.0,
      end: 13.2,
      words: [
        { text: "Mia", start: 12.1, end: 12.3 },
        { text: "finishes", start: 12.3, end: 12.6 },
        { text: "her", start: 12.6, end: 12.9 },
        { text: "picture.", start: 12.9, end: 13.0 },
      ]
    },


    {
      videoIndex: 2,
      start: 0.0, end: 4.0,
      words: [
        { text: "Paul", start: 0.3, end: 0.7 },
        { text: "feels", start: 1.1, end: 1.5 },
        { text: "angry", start: 1.5, end: 1.8 },
        { text: "and", start: 2.1, end: 2.4 },
        { text: "throws", start: 2.4, end: 2.7 },
        { text: "Mia’s", start: 2.7, end: 3.0 },
        { text: "picture", start: 3.0, end: 3.3 },
        { text: "in the", start: 3.3, end: 3.6 },
        { text: "bin.", start: 3.6, end: 3.9 },
      ]
    },



    {
      videoIndex: 3,
      start: 1.5, end: 4.1,
      words: [
        { text: "Now", start: 2.5, end: 2.8 },
        { text: "Paul", start: 2.8, end: 3.2 },
        { text: "feels", start: 3.2, end: 3.6 },
        { text: "bad.", start: 3.6, end: 4.0 },
      ]
    },
    {
      videoIndex: 3,
      start: 4.2, end: 10.0,
      words: [
        { text: "He", start: 4.3, end: 4.6 },
        { text: "wants", start: 4.6, end: 4.9 },
        { text: "to tell", start: 4.9, end: 5.2 },
        { text: "his", start: 5.2, end: 5.5 },
        { text: "teacher", start: 5.5, end: 5.8 },
        { text: "the", start: 5.8, end: 6.1 },
        { text: "truth,", start: 6.1, end: 6.4 },
        { text: "but", start: 6.4, end: 6.7 },
        { text: "he", start: 6.7, end: 7.0 },
        { text: "is", start: 7.0, end: 7.3 },
        { text: "worried", start: 7.3, end: 7.6 },
        { text: "the", start: 7.6, end: 7.9 },
        { text: "teacher", start: 7.9, end: 8.2 },
        { text: "will", start: 8.2, end: 8.5 },
        { text: "be", start: 8.5, end: 8.8 },
        { text: "angry", start: 8.8, end: 9.1 },
        { text: "with", start: 9.1, end: 9.4 },
        { text: "him.", start: 9.4, end: 9.7 },
      ]
    },
    {
      videoIndex: 3,
      start: 10.0, end: 11.9,
      words: [
        { text: "Paul", start: 10, end: 10.4 },
        { text: "decides", start: 10.4, end: 10.8 },
        { text: "to tell", start: 10.8, end: 11.2 },
        { text: "the", start: 11.2, end: 11.6 },
        { text: "truth.", start: 11.6, end: 11.8 },
      ]
    },

    {
      videoIndex: 4,
      start: 6.6, end: 2.9,
      words: [
        { text: "The", start: 6.7, end: 7.0 },
        { text: "teacher", start: 7.0, end: 7.3 },
        { text: "tells", start: 7.3, end: 7.6 },
        { text: "them", start: 7.6, end: 7.9 },
        { text: "both", start: 7.9, end: 8.2 },
        { text: "to", start: 8.2, end: 8.5 },
        { text: "say", start: 8.5, end: 8.8 },
        { text: "sorry.", start: 8.8, end: 9.1 },
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

  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);


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

    if (currentVideo === 4 && isPlaying) {
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
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
    } else if (currentVideo !== 4) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  useEffect(() => {
    // تحقق إذا كانت الصورة آخر عنصر
    if (currentVideo === videos.length - 1 && !currentVideoData.url.endsWith(".mp4")) {
      // تأخير صغير حتى تظهر الصورة قبل الـ Swal
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate]);


  const toggleWordSelection = (wordText) => {
    const correctWords = ["Sorry"];
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
        if (currentVideo === 4 && showBanner) {
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
          {currentVideoData.url.endsWith(".mp4") ? (
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
          ) : (
            <img
              src={currentVideoData.url}
              alt={currentVideoData.title || "Image"}
              className="w-full aspect-video object-cover"
            />
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the phrase how Paul decided
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                to fix the problem.
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
                          if (currentVideo === 4) toggleWordSelection(word.text);
                        }}
                        className={`
                word-span
                ${isHighlighted ? 'active-word' : ''}
                ${currentVideo === 4 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                ${currentVideo === 4 ? 'clickable-word' : ''}
              `}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                <button className="close" onClick={() => setShowBubble(false)}>×</button>
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
