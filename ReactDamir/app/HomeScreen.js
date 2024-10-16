import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import config from '../api/config';

const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fetchRestaurants = async () => {
    try {
      const response = await config.get('/search', {
        params: {
          limit: 6,
          location: 'san jose',
          term: ''
        }
      });
      setRestaurants(response.data.businesses);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard} onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}>
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список ресторанов</Text>
    
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск ресторанов"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('MapScreen', { restaurants })}>
        <Text style={styles.mapButtonText}>Показать на карте</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('LocationScreen', {})}>
        <Text style={styles.mapButtonText}>Показать локацию</Text>
      </TouchableOpacity>
      
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRestaurantCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    padding: 10,
    justifyContent: 'center',
  },
  mapButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
