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
          start: 9.0, end: 10.5,
          words: [
            { text: "silly’", start: 9.1, end: 9.7 },
            { text: "mean", start: 9.7, end: 10.2 },
          ]
        },

      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [

        {
          start: 4.0, end: 6.5,
          words: [
            { text: "The", start: 4.0, end: 4.3 },
            { text: "words", start: 4.3, end: 4.6 },
            { text: "you", start: 4.6, end: 4.9 },
            { text: "are", start: 4.9, end: 5.2 },
            { text: "using", start: 5.2, end: 5.5 },
            { text: "are", start: 5.5, end: 5.8 },
            { text: "not", start: 5.8, end: 6.1 },
            { text: "nice.", start: 6.1, end: 6.4 },

          ]
        },
        {
          start: 8.0, end: 11.0,
          words: [
            { text: "Calling", start: 8.0, end: 8.4 },
            { text: "someone", start: 8.4, end: 8.8 },
            { text: "silly", start: 8.8, end: 9.2 },
            { text: "and", start: 9.2, end: 9.6 },
            { text: "mean", start: 9.6, end: 10.0 },
            { text: "is", start: 10.0, end: 10.4 },
            { text: "wrong", start: 10.4, end: 10.8 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 2.1,
          words: [
            { text: "Rude", start: 0.1, end: 0.5 },
            { text: "words", start: 0.5, end: 0.9 },
            { text: "make", start: 0.9, end: 1.3 },
            { text: "people", start: 1.3, end: 1.7 },
            { text: "upset.", start: 1.7, end: 2.1 },

          ]
        },
        {
          start: 2.2, end: 6.0,
          words: [
            { text: "You", start: 2.2, end: 2.6 },
            { text: "should", start: 2.6, end: 3.0 },
            { text: "always", start: 3.0, end: 3.4 },
            { text: "use", start: 3.4, end: 3.8 },
            { text: "good", start: 3.8, end: 4.2 },
            { text: "language", start: 4.2, end: 4.6 },
            { text: "to", start: 4.6, end: 5.0 },
            { text: "solve", start: 5.0, end: 5.4 },
            { text: "a problem.", start: 5.4, end: 5.8 },
          ]
        },
        {
          start: 6.5, end: 12.0,
          words: [
            { text: "Try", start: 6.6, end: 7.0 },
            { text: "to", start: 7.0, end: 7.4 },
            { text: "use", start: 7.4, end: 7.8 },
            { text: "words", start: 7.8, end: 8.2 },
            { text: "like", start: 8.2, end: 8.6 },
            { text: "please,", start: 8.6, end: 9.3 },
            { text: "thank you,", start: 9.3, end: 10.5 },
            { text: "and", start: 10.5, end: 1.9 },
            { text: "sorry.", start: 10.9, end: 11.8 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [


        {
          start: 5.2, end: 7.9,
          words: [
            { text: "I am", start: 5.3, end: 5.7 },
            { text: "sorry", start: 5.7, end: 6.1 },
            { text: "I", start: 6.1, end: 6.5 },
            { text: "said", start: 6.5, end: 6.9 },
            { text: "mean", start: 6.9, end: 7.3 },
            { text: "words.", start: 7.3, end: 7.7 },

          ]
        },
        {
          start: 8.0, end: 10.1,
          words: [
            { text: "Let’s", start: 8.1, end: 8.5 },
            { text: "share", start: 8.5, end: 8.9 },
            { text: "the", start: 8.9, end: 9.2 },
            { text: "last", start: 9.2, end: 9.6 },
            { text: "cookie.", start: 9.6, end: 10.0 },
          ]
        },
        {
          start: 10.2, end: 14,
          words: [
            { text: "Thank you,", start: 10.4, end: 11.7 },
            { text: "Jane.", start: 11.7, end: 12.3 },
            { text: "That’s", start: 12.3, end: 12.6 },
            { text: "a good", start: 12.6, end: 12.9 },
            { text: "idea!", start: 12.9, end: 13.8 },

          ]
        },
      ]
    },
    // {
    //   url: video7,
    //   title: "Section 7",
    //   subtitles: [
    //     {
    //       start: 0, end: 2.5,
    //       words: [
    //         { text: "You", start: 0, end: 0.4 },
    //         { text: "are,", start: 0.4, end: 0.7 },
    //         { text: "a", start: 0.7, end: 0.8 },
    //         { text: "big,", start: 0.8, end: 1.2 },
    //         { text: "girl.", start: 1.2, end: 1.5 },
    //         { text: "now,", start: 1.5, end: 1.8 },
    //         { text: "Kate.", start: 1.8, end: 2.0 },
    //       ]
    //     },
    //     {
    //       start: 2.5, end: 8,
    //       words: [
    //         { text: "You", start: 2.5, end: 2.8 },
    //         { text: "do", start: 2.8, end: 3.0 },
    //         { text: "not", start: 3.0, end: 3.3 },
    //         { text: "need", start: 3.3, end: 3.6 },
    //         { text: "as", start: 3.6, end: 3.7 },
    //         { text: "much", start: 3.7, end: 4.0 },
    //         { text: "help", start: 4.5, end: 4.8 },
    //         { text: "as", start: 4.8, end: 5.1 },
    //         { text: "your", start: 5.1, end: 5.4 },
    //         { text: "little", start: 5.4, end: 5.7 },
    //         { text: "sister.", start: 5.7, end: 6.0 },
    //       ]
    //     },
    //   ]
    // },
    // {
    //   url: video8,
    //   title: "Section 8",
    //   subtitles: [
    //     {
    //       start: 0, end: 4,
    //       words: [
    //         { text: "Can", start: 0, end: 0.3 },
    //         { text: "you", start: 0.3, end: 0.6 },
    //         { text: "help", start: 0.6, end: 0.9 },
    //         { text: "me", start: 0.9, end: 1.2 },
    //         { text: "bake", start: 1.2, end: 1.5 },
    //         { text: "a", start: 1.5, end: 1.6 },
    //         { text: "cake?", start: 1.6, end: 2.1 },
    //       ]
    //     },
    //   ]
    // },
    // {
    //   url: video9,
    //   title: "Section 9",
    //   subtitles: [
    //     {
    //       start: 0, end: 2,
    //       words: [
    //         { text: "Kate", start: 0, end: 0.3 },
    //         { text: "and", start: 0.3, end: 0.5 },
    //         { text: "Mum", start: 0.5, end: 0.8 },
    //         { text: "bake", start: 0.8, end: 1.2 },
    //         { text: "a chocolate.", start: 1.2, end: 1.6 },
    //         { text: "cake.", start: 1.6, end: 1.9 },
    //       ]
    //     },
    //     {
    //       start: 2, end: 6.6,
    //       words: [
    //         { text: "I", start: 3.0, end: 3.3 },
    //         { text: "can", start: 3.3, end: 3.6 },
    //         { text: "help", start: 3.6, end: 3.9 },
    //         { text: "you", start: 3.9, end: 4.2 },
    //         { text: "and", start: 4.2, end: 4.5 },
    //         { text: "May", start: 4.5, end: 4.8 },
    //         { text: "with", start: 4.8, end: 5.1 },
    //         { text: "different", start: 5.1, end: 5.4 },
    //         { text: "things", start: 5.4, end: 5.7 },
    //         { text: "at", start: 5.7, end: 6.0 },
    //         { text: "different", start: 6.0, end: 6.3 },
    //         { text: "times,", start: 6.3, end: 6.6 },
    //       ]
    //     },
    //     {
    //       start: 9, end: 12,
    //       words: [
    //         { text: "Kate", start: 9.1, end: 9.4 },
    //         { text: "understands", start: 9.4, end: 9.7 },
    //         { text: "and", start: 9.7, end: 10.0 },
    //         { text: "gives", start: 10.0, end: 10.3 },
    //         { text: "her", start: 10.3, end: 10.6 },
    //         { text: "mum", start: 10.6, end: 10.9 },
    //         { text: "a", start: 10.9, end: 11.0 },
    //         { text: "hug.", start: 11.1, end: 11.5 },
    //       ]
    //     },
    //   ]
    // },
    // {
    //   url: video10,
    //   title: "Section 10",
    //   subtitles: [
    //     {
    //       // start: 0, end: 3.12,
    //       // words: [
    //       //   { text: "Kate's", start: 0.5, end: 1.2 },
    //       //   { text: "Big", start: 1.2, end: 1.7 },
    //       //   { text: "Feelings", start: 1.7, end: 2.5 },
    //       // ]
    //     },
    //   ]
    // },
  ];


  // const cloudPositions = [
  //   { bottom: '34.375rem', left: '32%', transform: 'translateX(-50%)' },
  //   { top: '1%', left: '45%', transform: 'translateY(0)' },
  //   { top: '10%', right: '65%', transform: 'translateX(0)', left: 'auto' },
  //   { bottom: '85%', left: '30%', transform: 'translateX(-50%)' },
  //   { top: '10%', left: '50%', transform: 'translateX(0)', isFlipped: true },
  // ];


  const cloudPositions = {

    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: '65%', left: '40%' },
      { top: '10%', left: '15%' },
      { top: '10%', left: '5%' },
      { top: '20%', left: '85%', isFlipped: true },
      { top: '10%', left: '5%' },
    ],

    2: [
      { top: '60%', right: '35%', isFlipped: true },
      { top: '5%', left: '50%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
    ],

    3: [
      { bottom: '75%', left: '30%', isFlipped: true },
      { top: '8%', left: '28%', isFlipped: true },
      { top: '10%', left: '25%', isFlipped: true },
    ],

    4: [
      { top: '15%', left: '23%', isFlipped: true },
      { top: '5%', left: '25%', isFlipped: true },
      { top: '10%', left: '10%' },
      { top: '10%', left: '10%' },
      { top: '5%', left: '4%' },
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
      start: 0, end: 2.0,
      words: [
        { text: "Jane", start: 0.1, end: 0.4 },
        { text: "and", start: 0.4, end: 0.7 },
        { text: "Amy", start: 0.7, end: 1.0 },
        { text: "are", start: 1.0, end: 1.3 },
        { text: "at", start: 1.3, end: 1.6 },
        { text: "home.", start: 1.6, end: 1.9 },
      ]
    },
    {
      videoIndex: 1,
      start: 2.5, end: 5.1,
      words: [
        { text: "They", start: 2.6, end: 2.9 },
        { text: "eat", start: 2.9, end: 3.2 },
        { text: "cookies", start: 3.2, end: 3.5 },
        { text: "that", start: 3.5, end: 3.8 },
        { text: "Mum", start: 3.8, end: 4.1 },
        { text: "made", start: 4.1, end: 4.4 },
        { text: "for", start: 4.4, end: 4.7 },
        { text: "them.", start: 4.7, end: 5.0 },

      ]
    }, {
      videoIndex: 1,
      start: 5.1, end: 8.6,
      words: [
        { text: "The", start: 5.8, end: 6.1 },
        { text: "girls", start: 6.1, end: 6.4 },
        { text: "start", start: 6.4, end: 6.7 },
        { text: "to", start: 6.7, end: 7.0 },
        { text: "fight", start: 7.0, end: 7.3 },
        { text: "over", start: 7.3, end: 7.6 },
        { text: "the", start: 7.6, end: 7.9 },
        { text: "last", start: 7.9, end: 8.2 },
        { text: "cookie.", start: 8.2, end: 8.5 },
      ]
    }, {
      videoIndex: 1,
      start: 10.6, end: 11.8,
      words: [
        { text: "Amy", start: 10.7, end: 11.0 },
        { text: "starts", start: 11.0, end: 11.3 },
        { text: "crying.", start: 11.3, end: 11.6 }
      ]
    },
    {
      videoIndex: 2,
      start: 0, end: 4.0,
      words: [
        { text: "Mum", start: 0.0, end: 0.5 },
        { text: "hears", start: 0.5, end: 0.8 },
        { text: "the", start: 0.8, end: 1.1 },
        { text: "girls", start: 1.1, end: 1.4 },
        { text: "and", start: 1.4, end: 1.7 },
        { text: "calls", start: 1.7, end: 2.0 },
        { text: "them", start: 2.0, end: 2.3 },
        { text: "into", start: 2.3, end: 2.6 },
        { text: "the", start: 2.6, end: 2.9 },
        { text: "kitchen.", start: 2.9, end: 3.2 },

      ]
    },
    {
      videoIndex: 4,
      start: 0, end: 2.4,
      words: [
        { text: "The", start: 0, end: 0.4 },
        { text: "girls", start: 0.4, end: 0.7 },
        { text: "feel", start: 0.7, end: 1.0 },
        { text: "bad", start: 1.0, end: 1.3 },
        { text: "about", start: 1.3, end: 1.6 },
        { text: "their", start: 1.6, end: 1.9 },
        { text: "fight.", start: 1.9, end: 2.3 },

      ]
    },
    {
      videoIndex: 4,
      start: 2.7, end: 5.1,
      words: [
        { text: "They", start: 2.9, end: 3.2 },
        { text: "decide", start: 3.2, end: 3.6 },
        { text: "to", start: 3.6, end: 3.8 },
        { text: "use", start: 3.8, end: 4.2 },
        { text: "a good", start: 4.2, end: 4.6 },
        { text: "language.", start: 4.6, end: 5.0 },

      ]
    }
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

    if (currentVideo === 3 && isPlaying) {
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
    } else if (currentVideo !== 3) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate]);


  const toggleWordSelection = (wordText) => {
    const correctWords = ["please,", "thank you,", "sorry"];
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
        if (currentVideo === 3 && showBanner) {
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

          {currentVideo === 3 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the phrase James says to show
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                he cares about Joe’s feelings.
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
                          if (currentVideo === 3) toggleWordSelection(word.text);
                        }}
                        className={`
                word-span
                ${isHighlighted ? 'active-word' : ''}
                ${currentVideo === 3 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                ${currentVideo === 3 ? 'clickable-word' : ''}
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
