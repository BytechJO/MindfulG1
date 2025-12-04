import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/3-1.mp4";
import video2 from "./assets/3-2.mp4";
import video3 from "./assets/3-3.mp4";
import video4 from "./assets/3-4.mp4";
import video5 from "./assets/3-5.mp4";
import video6 from "./assets/3-6.mp4";
import video7 from "./assets/3-7.mp4";

import questionGif from './assets/question.gif';

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

      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 2.0,
          words: [
            { text: "That’s", start: 0.1, end: 0.6 },
            { text: "not", start: 0.6, end: 1.2 },
            { text: "nice!", start: 1.2, end: 1.7 },
          ]
        },
        {
          start: 2.5, end: 7.0,
          words: [
            { text: "She", start: 3.0, end: 3.3 },
            { text: "runs", start: 3.3, end: 3.6 },
            { text: "to", start: 3.6, end: 3.9 },
            { text: "pick", start: 3.9, end: 4.2 },
            { text: "up", start: 4.2, end: 4.5 },
            { text: "the", start: 4.5, end: 4.8 },
            { text: "wrapper", start: 4.8, end: 5.1 },
            { text: "and", start: 5.1, end: 5.4 },
            { text: "throws", start: 5.4, end: 5.7 },
            { text: "it", start: 5.7, end: 6.0 },
            { text: "in", start: 6.0, end: 6.3 },
            { text: "the", start: 6.3, end: 6.6 },
            { text: "bin.", start: 6.6, end: 6.9 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 2,
          words: [
            { text: "Why", start: 0, end: 0.2 },
            { text: "did", start: 0.2, end: 0.4 },
            { text: "you", start: 0.4, end: 0.6 },
            { text: "do", start: 0.6, end: 0.8 },
            { text: "that,", start: 0.8, end: 1.0 },
            { text: "Noura?", start: 1.0, end: 1.2 },
          ]
        },
        {
          start: 3, end: 8.7,
          words: [
            { text: "At", start: 3.0, end: 3.2 },
            { text: "school,", start: 3.2, end: 3.5 },
            { text: "we", start: 3.5, end: 3.8 },
            { text: "learnt", start: 3.8, end: 4.1 },
            { text: "to", start: 4.1, end: 4.3 },
            { text: "take", start: 4.3, end: 4.6 },
            { text: "care", start: 4.6, end: 4.9 },
            { text: "of", start: 4.9, end: 5.2 },
            { text: "the", start: 5.2, end: 5.5 },
            { text: "public", start: 5.5, end: 5.8 },
            { text: "places", start: 5.8, end: 6.1 },
            { text: "around", start: 6.1, end: 6.4 },
            { text: "us", start: 6.4, end: 6.7 },
            { text: "and", start: 6.7, end: 6.9 },
            { text: "to", start: 6.9, end: 7.1 },
            { text: "keep", start: 7.1, end: 7.4 },
            { text: "them", start: 7.4, end: 7.7 },
            { text: "safe", start: 7.7, end: 7.9 },
            { text: "for", start: 7.9, end: 8.2 },
            { text: "others.", start: 8.2, end: 8.5 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 2.5,
          words: [
            { text: "How", start: 0, end: 0.3 },
            { text: "do", start: 0.3, end: 0.6 },
            { text: "we", start: 0.6, end: 0.9 },
            { text: "take", start: 0.9, end: 1.2 },
            { text: "care", start: 1.2, end: 1.5 },
            { text: "of", start: 1.5, end: 1.8 },
            { text: "public", start: 1.8, end: 2.1 },
            { text: "places?", start: 2.1, end: 2.4 },
          ]
        },
        {
          start: 5.0, end: 9.5,
          words: [
            { text: "We", start: 5.4, end: 5.7 },
            { text: "keep", start: 5.7, end: 6.0 },
            { text: "public", start: 6.0, end: 6.3 },
            { text: "places", start: 6.3, end: 6.6 },
            { text: "clean", start: 6.6, end: 6.9 },
            { text: "by", start: 6.9, end: 7.2 },
            { text: "throwing", start: 7.2, end: 7.5 },
            { text: "our", start: 7.5, end: 7.8 },
            { text: "rubbish", start: 7.8, end: 8.2 },
            { text: "in", start: 8.2, end: 8.4 },
            { text: "the", start: 8.4, end: 8.7 },
            { text: "bin.", start: 8.7, end: 9.0 },
          ]
        },
      ]
    },
    {
      url: video6,
      title: "Section 6",
      subtitles: [

      ]
    },
    {
      url: video7,
      title: "Section 7",
      subtitles: [

        {
          start: 3.5, end: 5.0,
          words: [
            { text: "Well", start: 3.6, end: 3.9 },
            { text: "done", start: 3.9, end: 4.2 },
            { text: "Ben!", start: 4.2, end: 4.8 },
          ]
        },
        {
          start: 5.0, end: 9.0,
          words: [
            { text: "You", start: 5.0, end: 5.3 },
            { text: "did", start: 5.3, end: 5.6 },
            { text: "the", start: 5.6, end: 5.9 },
            { text: "right", start: 5.9, end: 6.2 },
            { text: "thing.", start: 6.2, end: 6.5 },
          ]
        },
      ]
    },
  ];

  const cloudPositions = {

    0: [{ bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }],

    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' }
    ],

    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true }
    ],

    3: [
      { bottom: '80%', left: '28%', isFlipped: true },
      { top: '10%', left: '45%' },
    ],

    4: [
      { top: '10%', left: '30%', isFlipped: true },
      { top: '5%', left: '35%' },
    ],
    5: [
      { bottom: '80%', left: '48%', },
      { top: '20%', left: '25%' },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '70%', left: '50%', isFlipped: true }
    ],
    6: [
      { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
      { top: '10%', left: '10%' },
      { top: '10%', left: '50%', isFlipped: true },
    ],
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 2.5,
      words: [
        { text: "Noura", start: 0.0, end: 0.4 },
        { text: "and", start: 0.4, end: 0.7 },
        { text: "Ben", start: 0.7, end: 1.2 },
        { text: "are", start: 1.2, end: 1.5 },
        { text: "at", start: 1.5, end: 2.0 },
        { text: "the", start: 2.0, end: 2.2 },
        { text: "fair.", start: 2.2, end: 2.5 },
      ]
    },
    {
      videoIndex: 1,
      start: 2.6,
      end: 4.9,
      words: [
        { text: "They", start: 2.9, end: 3.2 },
        { text: "eat", start: 3.2, end: 3.5 },
        { text: "chips", start: 3.5, end: 3.8 },
        { text: "and", start: 3.8, end: 4.1 },
        { text: "cotton", start: 4.1, end: 4.4 },
        { text: "candy.", start: 4.4, end: 4.8 },
      ]
    },
    {
      videoIndex: 1,
      start: 5.0,
      end: 8.7,
      words: [
        { text: "Ben", start: 5.3, end: 5.6 },
        { text: "finishes", start: 5.6, end: 5.9 },
        { text: "his", start: 5.9, end: 6.2 },
        { text: "chips", start: 6.2, end: 6.5 },
        { text: "and", start: 6.5, end: 6.8 },
        { text: "throws", start: 6.8, end: 7.1 },
        { text: "the", start: 7.1, end: 7.4 },
        { text: "wrapper", start: 7.4, end: 7.7 },
        { text: "on", start: 7.7, end: 8.0 },
        { text: "the", start: 8.0, end: 8.3 },
        { text: "ground.", start: 8.3, end: 8.6 },
      ]
    },


    {
      videoIndex: 5,
      start: 0.0, end: 2.5,
      words: [
        { text: "The", start: 0, end: 0.3 },
        { text: "next", start: 0.3, end: 0.6 },
        { text: "day,", start: 0.6, end: 0.9 },
        { text: "Ben", start: 0.9, end: 1.2 },
        { text: "is", start: 1.2, end: 1.5 },
        { text: "at", start: 1.5, end: 1.8 },
        { text: "the", start: 1.8, end: 2.1 },
        { text: "park.", start: 2.1, end: 2.4 },
      ]
    },
    {
      videoIndex: 5,
      start: 3.5, end: 5.8,
      words: [
        { text: "He", start: 3.6, end: 3.9 },
        { text: "is", start: 3.9, end: 4.1 },
        { text: "thirsty", start: 4.1, end: 4.4 },
        { text: "and", start: 4.4, end: 4.7 },
        { text: "drinks", start: 4.7, end: 5.0 },
        { text: "some", start: 5.0, end: 5.3 },
        { text: "juice.", start: 5.3, end: 5.6 },
      ]
    },
    {
      videoIndex: 5,
      start: 6.0, end: 9.5,
      words: [
        { text: "Ben", start: 6.0, end: 6.3 },
        { text: "wants", start: 6.3, end: 6.6 },
        { text: "to", start: 6.6, end: 6.9 },
        { text: "throw", start: 6.9, end: 7.2 },
        { text: "his", start: 7.2, end: 7.5 },
        { text: "empty", start: 7.5, end: 7.8 },
        { text: "juice", start: 7.8, end: 8.1 },
        { text: "box", start: 8.1, end: 8.4 },
        { text: "on", start: 8.4, end: 8.7 },
        { text: "the", start: 8.7, end: 9.0 },
        { text: "ground,", start: 9.0, end: 9.3 },
      ]
    },
    {
      videoIndex: 5,
      start: 10.0, end: 15.0,
      words: [
        { text: "but", start: 10.1, end: 10.4 },
        { text: "then", start: 10.4, end: 10.7 },
        { text: "he", start: 10.7, end: 10.9 },
        { text: "remembers", start: 10.9, end: 11.5 },
        { text: "that", start: 11.5, end: 11.8 },
        { text: "he", start: 11.8, end: 12.2 },
        { text: "should", start: 12.2, end: 12.5 },
        { text: "keep", start: 12.5, end: 12.9 },
        { text: "public", start: 12.9, end: 13.3 },
        { text: "places", start: 13.3, end: 13.7 },
        { text: "clean", start: 13.7, end: 14.1 },
        { text: "and", start: 14.1, end: 14.4 },
        { text: "safe.", start: 14.4, end: 14.9 },
      ]
    },

    {
      videoIndex: 6,
      start: 0.0, end: 3.0,
      words: [
        { text: "Ben", start: 0.1, end: 0.4 },
        { text: "decides", start: 0.4, end: 0.7 },
        { text: "to", start: 0.7, end: 1.0 },
        { text: "throw", start: 1.0, end: 1.3 },
        { text: "his", start: 1.3, end: 1.6 },
        { text: "rubbish", start: 1.6, end: 1.9 },
        { text: "in", start: 1.9, end: 2.2 },
        { text: "the", start: 2.2, end: 2.5 },
        { text: "bin.", start: 2.5, end: 2.8 },
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

    if (currentVideo === 2 && isPlaying) {
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        video.currentTime = 5.0;
        setCurrentTime(5.0);
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
    const correctWords = ["throws"];
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
                Highlight the action we must take to
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                keep public places clean.
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
                    {/* يمكنك تغيير الأيقونة إذا أردت */}
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
