import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

// --- Assets ---
import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import img1 from "./assets/nex.png";

export const StoryPage = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [extraBubble, setExtraBubble] = useState(null);

  const videoRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // --- 1. مصدر البيانات الموحد ---
  const mediaItems = [
    {
      type: 'video', url: video1, title: "Section 1",
      subtitles: [

      ]
    },
    {
      type: 'video',
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 4.6, end: 8.1,
          words: [
            { text: "‘Be", start: 4.7, end: 5.0 },
            { text: "careful,’", start: 5.0, end: 5.3 },
            { text: "Please", start: 6.2, end: 6.5 },
            { text: "don’t", start: 6.5, end: 6.8 },
            { text: "play", start: 6.8, end: 7.1 },
            { text: "in", start: 7.1, end: 7.4 },
            { text: "the", start: 7.4, end: 7.7 },
            { text: "kitchen.", start: 7.7, end: 8.0 }

          ]
        },
        {
          start: 8.1, end: 10.5,
          words: [
            { text: "take", start: 8.2, end: 8.5 },
            { text: "your", start: 8.5, end: 8.8 },
            { text: "toys", start: 8.8, end: 9.2 },
            { text: "to", start: 9.2, end: 9.4 },
            { text: "your", start: 9.4, end: 9.7 },
            { text: "bedroom.’", start: 9.7, end: 10.3 }

          ]
        },
        {
          start: 10.5, end: 11.5,
          words:
            [
              { text: "‘Okay", start: 10.7, end: 11.0 },
              { text: "Mum,’", start: 11.0, end: 11.3 }

            ]
        }
      ]
    },
    {
      type: 'video',
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 9, end: 11.5,
          words:
            [
              { text: "Oh", start: 9.2, end: 9.5 },
              { text: "dear,", start: 9.5, end: 9.8 },
              { text: "there", start: 10.3, end: 10.6 },
              { text: "is", start: 10.6, end: 10.9 },
              { text: "a", start: 10.9, end: 11.2 },
              { text: "mess!", start: 11.2, end: 11.5 }

            ]
        }
      ]
    },
    {
      type: 'video',
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0.0, end: 2.5,
          words: [
            { text: "‘Look", start: 0.1, end: 0.4 },
            { text: "at", start: 0.4, end: 0.7 },
            { text: "all", start: 0.7, end: 1.0 },
            { text: "the", start: 1.0, end: 1.3 },
            { text: "mess!,", start: 1.3, end: 1.6 },
            { text: "What", start: 1.6, end: 1.9 },
            { text: "happened?’", start: 1.9, end: 2.3 }]
        },
        {
          start: 5.0, end: 6.5,
          words:
            [
              { text: "‘Emma", start: 5.1, end: 5.4 },
              { text: "did", start: 5.4, end: 5.7 },
              { text: "it!’", start: 5.7, end: 6.0 }

            ]
        }
      ]
    },
    {
      type: 'video',
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 6.6, end: 9.3,
          words: [
            { text: "‘I’m", start: 6.7, end: 7.0 },
            { text: "sorry,", start: 7.0, end: 7.4 },
            { text: "Mum.", start: 7.4, end: 7.8 },
            { text: "I", start: 8.0, end: 8.2 },
            { text: "made", start: 8.2, end: 8.5 },
            { text: "a", start: 8.5, end: 8.7 },
            { text: "mess.’", start: 8.7, end: 9.0 }

          ]
        },
        {
          start: 12.5, end: 17.0,
          words: [
            { text: "‘It’s", start: 13.2, end: 13.5 },
            { text: "okay.", start: 13.5, end: 13.9 },
            { text: "Let’s", start: 14.0, end: 14.3 },
            { text: "clean", start: 14.3, end: 14.6 },
            { text: "up", start: 14.6, end: 14.8 },
            { text: "the", start: 14.8, end: 15.0 },
            { text: "mess", start: 15.0, end: 15.3 },
            { text: "together.’", start: 15.3, end: 15.8 }

          ]
        }
      ]
    },
    {
      type: 'image',
      url: img1,
      title: "The End",
      subtitles: [
        {
          start: 0, end: 999,
          words: [
          ]
        }]
    }
  ];

  const cloudPositions = {
    0: {},
    1: [{ top: '15%', left: '10%' }, { top: '10%', left: '45%', isFlipped: true }, { top: '15%', left: '15%' }, { top: '15%', left: '15%' }, { top: '15%', left: '15%' }],
    2: [{ top: '10%', right: '5%', isFlipped: true }, { top: '1%', left: '45%', isFlipped: true }, { top: '1%', left: '25%', isFlipped: true }],
    3: [{ bottom: '80%', left: '28%' }, { top: '30%', left: '35%', isFlipped: true }, { top: '30%', left: '35%', isFlipped: true }],
    4: [{ top: '10%', left: '50%', isFlipped: true }, { top: '5%', left: '30%' }, { top: '5%', left: '30%' }],
    5: {
    }
  };


  const extraBubblesData = [
    {
      itemIndex: 1, start: 0, end: 3.0,
      words: [
        { text: "John", start: 0.0, end: 0.4 },
        { text: "plays", start: 0.4, end: 0.7 },
        { text: "at", start: 0.7, end: 1.2 },
        { text: "home", start: 1.2, end: 1.5 },
        { text: "with", start: 1.5, end: 2.0 },
        { text: "his", start: 2.0, end: 2.2 },
        { text: "little", start: 2.2, end: 2.5 },
        { text: "sister", start: 2.5, end: 2.8 },
        { text: "Emma.", start: 2.8, end: 3.1 }
      ]
    },

    {
      itemIndex: 1, start: 3.1, end: 4.5,
      words: [
        { text: "They", start: 3.2, end: 3.5 },
        { text: "are", start: 3.5, end: 3.8 },
        { text: "having", start: 3.8, end: 4.1 },
        { text: "fun.", start: 4.1, end: 4.4 }
      ]
    },

    {
      itemIndex: 2, start: 0.0, end: 3.0,
      words: [
        { text: "Mum", start: 0.1, end: 1.4 },
        { text: "walks", start: 1.4, end: 1.7 },
        { text: "out", start: 1.7, end: 2.0 },
        { text: "of", start: 2.0, end: 2.3 },
        { text: "the", start: 2.3, end: 2.6 },
        { text: "kitchen.", start: 2.6, end: 2.9 }
      ]
    },

    {
      itemIndex: 2, start: 3.1, end: 9.2,
      words: [
        { text: "The", start: 3.0, end: 3.3 },
        { text: "children", start: 3.3, end: 3.8 },
        { text: "stay", start: 3.8, end: 4.1 },
        { text: "and", start: 4.1, end: 4.4 },
        { text: "play.", start: 4.4, end: 4.8 },
        { text: "John", start: 6.0, end: 6.3 },
        { text: "spills", start: 6.3, end: 6.6 },
        { text: "spices", start: 6.6, end: 6.9 },
        { text: "from", start: 6.9, end: 7.2 },
        { text: "a", start: 7.2, end: 7.5 },
        { text: "jar", start: 7.5, end: 7.8 },
        { text: "onto", start: 7.8, end: 8.1 },
        { text: "the", start: 8.1, end: 8.4 },
        { text: "kitchen", start: 8.4, end: 8.7 },
        { text: "bench.", start: 8.7, end: 9.0 }
      ]
    },

    {
      itemIndex: 3, start: 2.9, end: 4.6,
      words: [
        { text: "John", start: 3.0, end: 3.3 },
        { text: "thinks", start: 3.3, end: 3.6 },
        { text: "about", start: 3.6, end: 3.9 },
        { text: "blaming", start: 3.9, end: 4.2 },
        { text: "Emma.", start: 4.2, end: 4.5 }

      ]
    },

    {
      itemIndex: 4, start: 0.0, end: 4.5,
      words: [
        { text: "John", start: 0.1, end: 0.4 },
        { text: "knows", start: 0.4, end: 0.8 },
        { text: "his", start: 0.8, end: 1.0 },
        { text: "sister", start: 1.0, end: 1.4 },
        { text: "might", start: 1.4, end: 1.7 },
        { text: "be", start: 1.7, end: 1.9 },
        { text: "in", start: 1.9, end: 2.1 },
        { text: "trouble", start: 2.1, end: 2.5 },
        { text: "for", start: 2.5, end: 2.8 },
        { text: "his", start: 2.8, end: 3.0 },
        { text: "mistake,", start: 3.0, end: 3.5 },
        { text: "so", start: 3.6, end: 3.8 },
        { text: "he", start: 3.8, end: 4.0 },
        { text: "tells", start: 4.0, end: 4.3 },
        { text: "the", start: 4.3, end: 4.5 },
        { text: "truth.", start: 4.5, end: 4.9 }

      ]
    },
  ];

  const currentItem = mediaItems[currentItemIndex];
  const isVideo = currentItem.type === 'video';

  const activeSubtitleIndex = isVideo
    ? currentItem.subtitles.findIndex(sub => currentTime >= sub.start && currentTime < sub.end)
    : (currentItem.subtitles.length > 0 ? 0 : -1);

  const activeSubtitle = activeSubtitleIndex !== -1 ? currentItem.subtitles[activeSubtitleIndex] : null;

  const activeCloudPosition = activeSubtitleIndex !== -1
    ? (Array.isArray(cloudPositions[currentItemIndex]) ? cloudPositions[currentItemIndex][activeSubtitleIndex] : cloudPositions[currentItemIndex])
    : null;

  // --- 3. دوال التحكم الرئيسية ---
  const handleNext = useCallback(() => {
    if (currentItemIndex === mediaItems.length - 1) {
      ValidationAlert.storyEnd(() => navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`));
    } else {
      setCurrentItemIndex(prev => prev + 1);
    }
  }, [currentItemIndex, mediaItems.length, navigate, unitId, lessonId]);

  const handlePrevious = () => {
    setCurrentItemIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const togglePlay = () => {
    if (!isVideo || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  // --- 4. useEffect Hooks الموحدة ---
  useEffect(() => {
    setShowBubble(true);
    if (isVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => setIsPlaying(false));
      setCurrentTime(0);
    } else if (!isVideo) {
      setIsPlaying(false);
      const timer = setTimeout(handleNext, 5000); // الانتقال التلقائي بعد 5 ثوانٍ للصورة
      return () => clearTimeout(timer);
    }
  }, [currentItemIndex, isVideo, handleNext]);

  useEffect(() => {
    const video = videoRef.current;
    if (!isVideo || !video) return;
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
  }, [isVideo, currentItemIndex]);

  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble => bubble.itemIndex === currentItemIndex && currentTime >= bubble.start && currentTime < bubble.end);
    setExtraBubble(bubbleToShow || null);
  }, [currentItemIndex, currentTime]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };
  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="story-page-container">
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">
          {isVideo ? (
            <video
              key={currentItemIndex}
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src={currentItem.url}
              muted={isMuted}
              onEnded={handleNext}
              preload="auto"
            />
          ) : (
            <img
              key={currentItemIndex}
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full aspect-video object-cover"
            />
          )}

          {/* --- عرض الفقاعات (Subtitles) --- */}
          {activeSubtitle && activeCloudPosition && showBubble && showSubtitles && (
            <div className="subtitle-container" style={activeCloudPosition}>
              <div className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = isVideo && currentTime >= word.start && currentTime < word.end;
                    return <span key={index} className={`word-span ${isHighlighted ? 'active-word' : ''}`}>{word.text}{' '}</span>;
                  })}
                </p>
                {/* <button className="close" onClick={() => setShowBubble(false)}>×</button> */}
              </div>
            </div>
          )}

          {/* --- عرض الفقاعة الإضافية --- */}
          {showCaption && extraBubble && extraBubble.words && (
            <div className="subtitle-container" style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}>
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
              <button onClick={handlePrevious} className="control-btn left-nav-btn"><ChevronLeft className="w-8 h-8" /></button>
              <button onClick={handleNext} className="control-btn right-nav-btn"><ChevronRight className="w-8 h-8" /></button>
            </div>
            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className="control-btn" title="Subtitles">
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>
                  <button onClick={() => setShowCaption(!showCaption)} className="control-btn" title="Caption">
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
                  </button>
                  <div className="volume-control" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                    <button onClick={toggleMute} className="control-btn" disabled={!isVideo}>
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    {showVolumeSlider && isVideo && (
                      <div className="volume-slider-container"><input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="volume-slider" orient="vertical" /></div>
                    )}
                  </div>
                  <div className="speed-control-container">
                    <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="control-btn speed-btn" title="Playback Speed" disabled={!isVideo}>
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>
                    {showSpeedMenu && isVideo && (
                      <ul className="speed-dropdown-list">{availableSpeeds.map(speed => <li key={speed} onClick={() => selectPlaybackSpeed(speed)} className={playbackSpeed === speed ? 'active-speed' : ''}>{speed}x</li>)}</ul>
                    )}
                  </div>
                </div>
                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn" disabled={!isVideo}>
                    {isPlaying ? <Pause className="w-12 h-12" fill="white" /> : <Play className="w-12 h-12" fill="white" />}
                  </button>
                </div>
                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn"><Maximize2 className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-indicator-container">
            {mediaItems.map((_, index) => <div key={index} className={`progress-dot ${index === currentItemIndex ? 'active' : ''}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
