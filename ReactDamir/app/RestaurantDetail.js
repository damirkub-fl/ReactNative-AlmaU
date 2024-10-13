import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const RestaurantDetailScreen = ({ route }) => {
  const { restaurant } = route.params;

  const restaurantLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>

      {/* Карта с маркером */}
      <MapView
        style={styles.map}
        initialRegion={restaurantLocation}
      >
        <Marker
          coordinate={restaurantLocation}
          title={restaurant.name}
          description={restaurant.description}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 300,
  },
});

export default RestaurantDetailScreen;
