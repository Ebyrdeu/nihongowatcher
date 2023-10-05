import React, { useCallback, useEffect } from 'react';
import { Video } from '@/components/ui/video';
import { useLinkStore, useOverLayStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import {
  AddEpisode,
  EnterFullScreen,
  ExitFullScreen,
  NextEpisode,
  Pause,
  Play,
  Subtitles,
  VolumeMute,
  VolumeOn,
} from '@/components/ui/icons';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { uploadFiles } from '@/lib/utils';
import { useMultiRef } from '@/hooks';

const VideoPlayer = () => {
  const { link: videoLink, next: episode, changeNext: changeEpisode, changeLink } = useLinkStore();
  const {
    isPaused,
    isFullscreen,
    isMuted,
    isVolume,
    isOverlay,
    setPaused,
    setFullscreen,
    setMute,
    setVolume,
    setOverlay,
    setVolumeScale,
  } = useOverLayStore();

  const { videoRef, divRef, slideRef } = useMultiRef();
  const onPlay = useCallback(() => {

    if (videoRef.current?.paused) {
      void videoRef.current?.play();
      setPaused(false);
    } else {
      void videoRef.current?.pause();
      setPaused(true);
    }
  }, [setPaused, videoRef]);

  const onFullScreen = useCallback(() => {
    if (document.fullscreenElement === null) {
      setFullscreen(true);
      void divRef.current?.requestFullscreen();
    } else {
      setFullscreen(false);
      void document.exitFullscreen();
    }
  }, [setFullscreen, divRef]);

  const onMute = useCallback(() => {
    if (!videoRef.current || !slideRef.current) return;

    if (videoRef.current.volume === 0) {
      videoRef.current.volume = setVolumeScale(slideRef.current.value);
      setMute(false);
    } else {
      videoRef.current.volume = 0;
      setMute(true);
    }
  }, [setMute, setVolumeScale, videoRef, slideRef]);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') onPlay();
      if (event.key === 'f' || event.code === 'KeyF') onFullScreen();
      if (event.key === 'm' || event.code === 'KeyM') onMute();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPlay, onFullScreen, onMute]);

  const onVolumeChange = () => (videoRef.current && slideRef.current) ? videoRef.current.volume = setVolumeScale(
    slideRef.current.value) : null;

  const handleButtonRef = (instance: HTMLButtonElement) => instance?.blur();

  const handleVolumeRef = (instance: HTMLDivElement) => {
    if (!instance) return;
    instance.onmouseenter = () => setVolume(true);
    instance.onmouseleave = () => setVolume(false);

  };

  const handleOverlayRef = (instance: HTMLDivElement) => {
    if (!instance) return;
    instance.onmouseenter = () => setOverlay(true);
    instance.onmouseleave = () => setOverlay(false);
  };

  const overlayClass = isOverlay ? 'opacity-100' : 'opacity-0';
  const volumeSliderClass = isVolume ? 'opacity-100' : 'opacity-0';

  return (<div ref={divRef} className={'w-1/2 m-auto mt-24 relative'}>
    <div ref={handleOverlayRef}>
      <Video ref={videoRef}
             src={videoLink[episode] && videoLink[episode].link}
             subtitles={''}
             onChange={onPlay}
             onClick={onPlay}
             onDoubleClick={onFullScreen}
      />

      <div className={`${overlayClass} absolute top-0 left-0 right-0 transition duration-150 ease-in-out`}>
        <p className={'text-neutral-content p-2'}>{videoLink[episode] && videoLink[episode].name}</p>
      </div>
      {/*Overlay*/}
      <Flex
        className={`${overlayClass} absolute bottom-0 left-0 right-0 bg-primary-content/25 transition duration-150 ease-in-out`}>
        <Flex>
          <Button ref={handleButtonRef}
                  text={'dark'} variant={'subtle'}
                  onClick={onPlay}>
            {isPaused ? <Play/> : <Pause/>}
          </Button>
          {videoLink.length < 2 ? null : <Button ref={handleButtonRef}
                                                 text={'dark'} variant={'subtle'}
                                                 onClick={changeEpisode}>
            <NextEpisode/>
          </Button>}

          <Flex ref={handleVolumeRef}>
            <Button ref={handleButtonRef} onClick={onMute} variant={'subtle'}>
              {isMuted ? <VolumeMute/> : <VolumeOn/>}
            </Button>
            <Slider className={volumeSliderClass} ref={slideRef} onChange={onVolumeChange}/>
          </Flex>
        </Flex>

        <Flex>
          <label className={'cursor-pointer'} htmlFor={'addEpisode'}><AddEpisode/></label>
          <Input accept={'video/*, video/x-matroska'} onChange={(e) => uploadFiles(e, changeLink)}
                 id={'addEpisode'}
                 multiple={true}/>
          <Button ref={handleButtonRef} variant={'subtle'}><Subtitles/></Button>
          <Button ref={handleButtonRef} variant={'subtle'} onClick={onFullScreen}>
            {isFullscreen ? <ExitFullScreen/> : <EnterFullScreen/>}
          </Button>
        </Flex>
      </Flex>
    </div>
  </div>);
};

export default VideoPlayer;