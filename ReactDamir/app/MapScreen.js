import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { restaurants } = route.params;

  return (
    <View style={{ flex: 1 }}>
     <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
>
  <Marker
    coordinate={{
      latitude: 37.7749,
      longitude: -122.4194,
    }}
    title="Test Marker"
    description="This is a test marker"
  />
  
  {restaurants.map((restaurant) => {
    const { latitude, longitude } = restaurant.coordinates || {};

    if (latitude && longitude) {
      return (
        <Marker
          key={restaurant.id}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={restaurant.name}
          description={restaurant.location.address1}
        />
      );
    } else {
      console.warn(`Coordinates missing for restaurant: ${restaurant.name}`);
      return null;
    }
  })}
</MapView>
    </View>
  );
};

export default MapScreen;
