import createContextHook from '@nkzw/create-context-hook';
import { useTheme } from '@/hooks/useTheme';

export const [ThemeProvider, useThemeContext] = createContextHook(() => {
  return useTheme();
});