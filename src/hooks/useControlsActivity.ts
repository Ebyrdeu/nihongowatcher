import { useControlStore } from '@/store';

export function useControlsActivity () {
  const { controls } = useControlStore();

  return {
    controls,
  };
}
