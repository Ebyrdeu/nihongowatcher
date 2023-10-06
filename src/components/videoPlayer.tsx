import React from 'react';
import { Video } from '@/components/ui/video';
import { useLinkStore, useOverLayStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import {
  AddEpisodeIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  NextEpisodeIcon,
  PauseIcon,
  PlayIcon,
  SubtitlesIcon,
  VolumeMuteIcon,
  VolumeOnIcon,
} from '@/components/ui/icons';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { uploadFiles } from '@/lib/utils';
import { useOverlayManipulations } from '@/hooks';

const VideoPlayer = () => {
  const { link: videoLink, next: episode, changeNext: changeEpisode, changeLink } = useLinkStore();
  const { setOverlay, setVolume, setCursor, isOverlay, isCursor, isVolume, isMuted, isPaused, isFullscreen } = useOverLayStore();
  const { videoRef, sliderRef, divRef, handleVolumeChange, toggleFullscreenMode, toggleMuteVolume, togglePlayPause } = useOverlayManipulations();

  const handleButtonRef = (instance: HTMLButtonElement | null) => instance && instance.blur();

  const handleVolumeRef = (instance: HTMLDivElement | null) => {
    if (!instance) return;
    instance.onmouseenter = () => setVolume(true);
    instance.onmouseleave = () => setVolume(false);
  };

  const handleOverlayRef = (instance: HTMLDivElement | null) => {
    if (!instance) return;
    instance.onmouseenter = () => setOverlay(true);
    instance.onmouseleave = () => setOverlay(false);
  };

  const overlayClass = isOverlay ? 'opacity-100' : 'opacity-0';
  const volumeSliderClass = isVolume ? 'opacity-100' : 'opacity-0';

  return (
    <div
      onMouseMoveCapture={() => {
        setOverlay(true);
        setCursor(true);
      }} ref={divRef} className={`w-1/2 m-auto mt-24 relative ${isCursor ? 'cursor-default' : 'cursor-none'}`}>
      <div ref={handleOverlayRef}>
        <Video
          ref={videoRef}
          src={videoLink[episode]?.link}
          subtitles={''}
          onChange={togglePlayPause}
          onClick={togglePlayPause}
          onDoubleClick={toggleFullscreenMode}
        />
        {/*Title*/}
        <div className={`${overlayClass} absolute top-0 left-0 right-0 transition duration-150 ease-in-out`}>
          <p className="text-neutral-content p-2">{videoLink[episode]?.name}</p>
        </div>

        {/* Overlay */}
        <Flex variant="between"
              className={`${overlayClass} absolute bottom-0 left-0 right-0 bg-primary-content/25 transition duration-150 ease-in-out`}>
          <Flex>
            <Button ref={handleButtonRef} text="dark" variant="subtle" onClick={togglePlayPause}>
              {isPaused ? <PlayIcon/> : <PauseIcon/>}
            </Button>
            {videoLink.length >= 2 && (
              <Button ref={handleButtonRef} text="dark" variant="subtle" onClick={changeEpisode}>
                <NextEpisodeIcon/>
              </Button>
            )}
            <Flex ref={handleVolumeRef}>
              <Button ref={handleButtonRef} onClick={toggleMuteVolume} variant="subtle">
                {isMuted ? <VolumeMuteIcon/> : <VolumeOnIcon/>}
              </Button>
              <Slider className={volumeSliderClass} ref={sliderRef} onChange={handleVolumeChange}/>
            </Flex>
          </Flex>

          <Flex>
            <label className="cursor-pointer" htmlFor="addEpisode"><AddEpisodeIcon/></label>
            <Input accept="video/*, video/x-matroska" onChange={(e) => uploadFiles(e, changeLink)} id="addEpisode"
                   multiple/>
            <Button ref={handleButtonRef} variant="subtle"><SubtitlesIcon/></Button>
            <Button ref={handleButtonRef} variant="subtle" onClick={toggleFullscreenMode}>
              {isFullscreen ? <ExitFullScreenIcon/> : <EnterFullScreenIcon/>}
            </Button>
          </Flex>

        </Flex>
      </div>
    </div>
  );
};

export default VideoPlayer;