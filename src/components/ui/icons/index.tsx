const EnterFullScreen = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color}  fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
    </svg>
);

const ExistFullScreen = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color}  fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/>
    </svg>

);

const Play = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color} fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
    </svg>

);

const Pause = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color}  fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>
    </svg>
);

const Stop = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color}  fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"/>
    </svg>

);

const VolumeOn = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color}  fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>
    </svg>
);

const VolumeMute = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color}  fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"/>
    </svg>

);

const NextEpisode = ({color}: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={!color ? "#EDE6D4" : color} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
    </svg>
);

export {
  EnterFullScreen,
  ExistFullScreen,
  Play,
  Pause,
  Stop,
  VolumeOn,
  VolumeMute,
  NextEpisode
};