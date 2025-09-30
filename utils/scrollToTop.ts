import { Platform, NativeModules } from 'react-native';

export type TabKey = 'home' | 'progress' | 'profile';

const registry = new Map<TabKey, { scrollToTop: () => void }>();

export function registerScrollHandler(key: TabKey, handler: { scrollToTop: () => void }) {
  registry.set(key, handler);
}

export function unregisterScrollHandler(key: TabKey) {
  registry.delete(key);
}

export function scrollToTop(key: TabKey) {
  const handler = registry.get(key);
  if (handler) {
    try {
      handler.scrollToTop();
    } catch (e) {
      console.log('scrollToTop error', e);
    }
  }
}
