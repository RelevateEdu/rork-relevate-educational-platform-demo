type Listener = (e: { routeName: string }) => void;
const listeners: Listener[] = [];

export function emitScrollToTop(routeName: string) {
  listeners.forEach((l) => {
    try { l({ routeName }); } catch (e) { console.log('scroll emit error', e); }
  });
}

export function onScrollToTop(listener: Listener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}