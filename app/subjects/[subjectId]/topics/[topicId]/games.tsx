import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Linking, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { ArrowLeft, Gamepad2, Zap, BookOpen, ExternalLink } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
}

const games: Game[] = [
  {
    id: 'quick-quiz',
    title: 'Quick Quiz',
    description: 'Test your knowledge with rapid-fire questions',
    url: 'https://relevateedu.github.io/Relevate-games/quick-quiz/',
    icon: Zap,
    color: '#FF6B6B',
  },
  {
    id: 'matching-pairs',
    title: 'Matching Pairs',
    description: 'Match concepts with their definitions',
    url: 'https://relevateedu.github.io/Relevate-games/matching/',
    icon: Gamepad2,
    color: '#4ECDC4',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Review key concepts with interactive cards',
    url: 'https://relevateedu.github.io/Relevate-games/card/',
    icon: BookOpen,
    color: '#45B7D1',
  },
];

export default function GamesPage() {
  const { colors, theme } = useThemeContext();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [webViewError, setWebViewError] = useState(false);

  const handleGameSelect = (game: Game) => {
    if (!game?.title?.trim() || game.title.length > 100) {
      console.error('Invalid game title');
      return;
    }
    console.log(`Opening game: ${game.title}`);
    setSelectedGame(game);
    setIsLoading(true);
    setWebViewError(false);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setIsLoading(false);
    setWebViewError(false);
  };

  const handleOpenInBrowser = async (url: string) => {
    try {
      const themeParam = theme === 'dark' ? '?theme=dark' : '?theme=light';
      const fullUrl = url + themeParam;
      const supported = await Linking.canOpenURL(fullUrl);
      if (supported) {
        await Linking.openURL(fullUrl);
      } else {
        Alert.alert('Error', 'Unable to open URL');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Unable to open URL');
    }
  };

  const getGameUrl = (baseUrl: string) => {
    const themeParam = theme === 'dark' ? '?theme=dark' : '?theme=light';
    return baseUrl + themeParam;
  };

  if (selectedGame) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header />
        
        <View style={styles.gameHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToGames}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.gameTitle, { color: colors.text }]}>{selectedGame.title}</Text>
        </View>

        {webViewError ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.text }]}>Unable to load game</Text>
            <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
              The game couldn&apos;t be loaded in the app
            </Text>
            <TouchableOpacity
              style={[styles.browserButton, { backgroundColor: colors.primary }]}
              onPress={() => handleOpenInBrowser(selectedGame.url)}
            >
              <ExternalLink size={20} color={colors.background} />
              <Text style={[styles.browserButtonText, { color: colors.background }]}>
                Open in Browser
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.webViewContainer}>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.text }]}>Loading game...</Text>
              </View>
            )}
            {Platform.OS !== 'web' ? (
              <WebView
                source={{ uri: getGameUrl(selectedGame.url) }}
                style={styles.webView}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setWebViewError(true);
                }}
                onHttpError={() => {
                  setIsLoading(false);
                  setWebViewError(true);
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
              />
            ) : (
              <View style={styles.webFallback}>
                <Text style={[styles.webFallbackText, { color: colors.text }]}>
                  WebView not supported on web. Please use the browser button above.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>Learning Games</Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
              Choose a game to practice your knowledge
            </Text>
          </View>
        </View>
        
        <View style={styles.gamesContainer}>
          {games.map((game) => {
            const IconComponent = game.icon;
            return (
              <TouchableOpacity
                key={game.id}
                style={[styles.gameCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => {
                  if (!game?.title?.trim() || game.title.length > 100) {
                    console.error('Invalid game data');
                    return;
                  }
                  handleGameSelect(game);
                }}
              >
                <View style={[styles.gameIconContainer, { backgroundColor: game.color + '20' }]}>
                  <IconComponent size={32} color={game.color} />
                </View>
                <View style={styles.gameContent}>
                  <Text style={[styles.gameCardTitle, { color: colors.text }]}>{game.title}</Text>
                  <Text style={[styles.gameDescription, { color: colors.textSecondary }]}>
                    {game.description}
                  </Text>
                </View>
                <View style={styles.playButton}>
                  <Text style={[styles.playButtonText, { color: colors.primary }]}>Play</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <View style={styles.infoSection}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>How it works</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Each game is designed to help you learn and retain information in a fun, interactive way. 
            Games adapt to your current theme settings and provide immediate feedback on your progress.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  titleContainer: {
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    marginBottom: 8,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  gamesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  gameCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  gameIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  gameContent: {
    flex: 1,
  },
  gameCardTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  playButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginLeft: 16,
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500' as const,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  browserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  browserButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  webFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  webFallbackText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});