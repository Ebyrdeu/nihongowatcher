import {useCallback, useEffect, useRef} from 'react';
import {Video} from '@/components/ui/video';
import {useLinkStore, useOverLayStore} from '@/store';
import {Button} from '@/components/ui/button';
import {Flex} from '@/components/ui/flex';
import {EnterFullScreen, ExistFullScreen, NextEpisode, Pause, Play, VolumeMute, VolumeOn} from '@/components/ui/icons';
import {Slider} from '@/components/ui/slider';

/**
 * VideoPlayer component displays a video with optional overlay
 * that becomes visible when the mouse hovers over the video.
 */
const VideoPlayer = () => {
  const {link: videoLink, next: episode, changeNext: changeEpisode} = useLinkStore();
  const {isPaused, isFullscreen, isMuted, isVolume, isOverlay, setPaused, setFullscreen, setMute, setVolume, setOverlay} = useOverLayStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLInputElement>(null);

  const onPlay = useCallback(() => {
    if (videoRef.current?.paused) {
      setPaused(true);
      return videoRef.current?.play();
    }
    setPaused(false);
    return videoRef.current?.pause();
  }, [setPaused]);

  const onFullScreen = useCallback(() => {
    if (document.fullscreenElement === null) {
      setFullscreen(true);
      return divRef.current?.requestFullscreen();
    }
    setFullscreen(false);
    return document.exitFullscreen();
  }, [setFullscreen]);

  const onMute = useCallback(() => {
    if (!videoRef.current || !slideRef.current) return;

    if (videoRef.current.volume === 0) {
      videoRef.current.volume = Math.min(100, Math.max(0, Number.parseFloat(slideRef.current.value))) / 100;
      return setMute(true);
    }

    videoRef.current.volume = 0;
    return setMute(false);
  }, [setMute]);

  useEffect(() => {
    const stopVideoKey = (event: KeyboardEvent) => (event.key === ' ' || event.code === 'Space') ? onPlay() : null;
    const fullScreenVideoKey = (event: KeyboardEvent) => (event.key === 'f' || event.code === 'KeyF') ?
        onFullScreen() :
        null;
    const muteVideoKey = (event: KeyboardEvent) => (event.key === 'm' || event.code === 'KeyM') ? onMute() : null;

    document.addEventListener('keydown', stopVideoKey);
    document.addEventListener('keydown', fullScreenVideoKey);
    document.addEventListener('keydown', muteVideoKey);
    return () => {
      document.removeEventListener('keydown', stopVideoKey);
      document.removeEventListener('keydown', fullScreenVideoKey);
      document.removeEventListener('keydown', muteVideoKey);
    };
  }, [onPlay, onFullScreen, onMute]);

  const onVolumeChange = () => (videoRef.current && slideRef.current) ?
      videoRef.current.volume = Math.min(100, Math.max(0, Number.parseFloat(slideRef.current.value))) / 100 :
      null;

  const onButtonRef = (instance: HTMLButtonElement) => instance?.blur();

  const onVolumeRef = (instance: HTMLDivElement) => {
    if (!instance) return;

    instance.onmouseenter = () => setVolume(true);
    instance.onmouseleave = () => setVolume(false);

  };

  const onDivRef = (instance: HTMLDivElement) => {
    if (!instance) return;
    instance.onmouseenter = () => setOverlay(true);
    instance.onmouseleave = () => setOverlay(false);
  };

  return (
      <div ref={divRef} className={'w-1/2 m-auto mt-24 relative'}>
        <div ref={onDivRef}>
          <Video ref={videoRef}
                 src={videoLink[episode]}
                 subtitles={''}
                 onChange={onPlay}
                 onClick={onPlay}
                 onDoubleClick={onFullScreen}
          />

          {/*Overlay*/}
          <Flex className={`
          ${isOverlay ? 'opacity-100' : 'opacity-0'} 
          absolute bottom-0 left-0 right-0 bg-primary-content/75 transition duration-150 ease-in-out
          `}>
            <Flex>
              <Button ref={onButtonRef}
                      text={'dark'} variant={'subtle'}
                      onClick={onPlay}>
                {isPaused ? <Pause/> : <Play/>}
              </Button>

              {videoLink.length < 2 ? null :
                  <Button ref={onButtonRef}
                          text={'dark'} variant={'subtle'}
                          onClick={changeEpisode}>
                    <NextEpisode/>
                  </Button>
              }

              <Flex ref={onVolumeRef}>
                <Button ref={onButtonRef} onClick={onMute} variant={'subtle'}>
                  {isMuted ? <VolumeOn/> : <VolumeMute/>}
                </Button>
                <Slider className={`${isVolume ? 'opacity-100' : 'opacity-0'}`}
                        ref={slideRef}
                        onChange={onVolumeChange}/>
              </Flex>
            </Flex>

            <Button ref={onButtonRef} variant={'subtle'} onClick={onFullScreen}>
              {isFullscreen ? <ExistFullScreen/> : <EnterFullScreen/>}
            </Button>
          </Flex>
        </div>
      </div>
  );
};

export default VideoPlayer;