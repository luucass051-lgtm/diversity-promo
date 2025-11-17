import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, StatusBar, ActivityIndicator, Text } from 'react-native';
import PromoCard from '../components/PromoCard';
import CONFIG from '../utils/config';

const { height } = Dimensions.get('window');

export default function FeedScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${CONFIG.BACKEND_URL}/promotions`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.loader}><Text style={{color:'white'}}>Erro: {error}</Text></View>;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PromoCard item={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={height}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loader: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000' }
});
