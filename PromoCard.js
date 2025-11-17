import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import CONFIG from '../utils/config';

const { height } = Dimensions.get('window');

export default function PromoCard({ item }) {
  const [liked, setLiked] = useState(item.liked || false);
  const [saved, setSaved] = useState(item.saved || false);

  const toggleLike = async () => {
    try {
      setLiked(!liked);
      await fetch(`${CONFIG.BACKEND_URL}/promotions/${item.id}/like`, { method: 'POST' });
    } catch (e) {
      // ignore network errors for now
    }
  };

  const toggleSave = async () => {
    try {
      setSaved(!saved);
      await fetch(`${CONFIG.BACKEND_URL}/promotions/${item.id}/save`, { method: 'POST' });
    } catch (e) {}
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      {item.video_url ? (
        <Video
          source={{ uri: item.video_url }}
          style={styles.media}
          shouldPlay
          isLooping
          resizeMode="cover"
          useNativeControls={false}
          volume={0}
        />
      ) : (
        <Image source={{ uri: item.images[0] }} style={styles.media} />
      )}

      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.store}>{item.store_name} • R$ {item.price_promotional}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleLike} style={styles.controlButton}>
          <Text style={styles.controlText}>{liked ? '♥' : '♡'} Curtir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSave} style={styles.controlButton}>
          <Text style={styles.controlText}>{saved ? '🔖 Salvo' : '🔖 Salvar'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', height, backgroundColor: '#000' },
  media: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 120, left: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  store: { color: 'white', fontSize: 16, marginTop: 6 },
  controls: { position:'absolute', right:12, bottom:80, alignItems:'center' },
  controlButton: { marginVertical:8, backgroundColor:'rgba(0,0,0,0.4)', paddingVertical:6, paddingHorizontal:10, borderRadius:8 },
  controlText: { color:'white', fontSize:14 }
});
