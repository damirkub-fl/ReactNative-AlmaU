import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const restaurantData = [
    { id: '1', name: 'TAL Family', description: 'Семейный ресторан', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiNpAP1R9veDxoc6_wNUDGknrLZixOv-_e2A&s', latitude: 43.21060078526703, longitude: 76.88430622447954 },
    { id: '2', name: 'NAVAT', description: 'Восточная кухня', image: 'https://static.tildacdn.pro/tild6336-3031-4866-a362-343230613330/Navat_logo_2-01.jpg', latitude: 43.209848548150404, longitude: 76.89389803569628 },
    { id: '3', name: 'Del Papa', description: 'Итальянская кухня', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHqB0LjNmhYs7XUs3NgL5OM207D-2kTt_1w&s', latitude: 37.79245, longitude: -122.4343 },
    { id: '4', name: 'Дареджани', description: 'Грузинская кухня', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-AdE-dcWi11C5MuX8Pw23LS_0YkuT8r4GQ&s', latitude: 37.79455, longitude: -122.4354 },
    { id: '5', name: 'Paradise', description: 'Евразийская кухня', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAJvPDDMm3Sszf3V6sEZy1wc7lqHZ64sZ5PQ&s', latitude: 37.79665, longitude: -122.4365 },
  ];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);
  const [typingTimeout, setTypingTimeout] = useState(0);

  const searchRestaurants = (query) => {
    const filtered = restaurantData.filter(restaurant =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => {
      searchRestaurants(text);
    }, 500));
  };

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
        onChangeText={handleSearch}
      />
      
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurantCard}
        ListEmptyComponent={<Text style={styles.noResults}>Нет результатов</Text>}
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    padding: 10,
    justifyContent: 'center',
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
  noResults: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
