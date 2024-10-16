import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Modal, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import * as Location from "expo-location";

const LocationScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [newMarkerTitle, setNewMarkerTitle] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission not granted');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const handleMapLongPress = (event) => {
        const coordinate = event.nativeEvent.coordinate;
        setMarkers([...markers, { coordinate }]);
        setIsModalVisible(true);
    };

    const saveMarkerTitle = () => {
        if (!newMarkerTitle.trim()) {
            alert('Please enter a title for the marker');
            return;
        }

        const updatedMarkers = [...markers];
        const lastIndex = updatedMarkers.length - 1;
        updatedMarkers[lastIndex].title = newMarkerTitle;
        setMarkers(updatedMarkers);
        setNewMarkerTitle('');
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {currentLocation ? (
                <MapView
                    style={styles.map}
                    onLongPress={handleMapLongPress}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        title="Your location"
                    />
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            draggable
                            onDragEnd={(event) => {
                                const updatedMarkers = [...markers];
                                updatedMarkers[index].coordinate = event.nativeEvent.coordinate;
                                setMarkers(updatedMarkers);
                            }}
                        >
                            <Callout>
                                <Text>{marker.title}</Text>
                            </Callout>
                        </Marker>
                    ))}
                    <Polyline coordinates={markers.map(marker => marker.coordinate)} />
                </MapView>
            ) : null}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text>Enter marker title:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Marker title"
                            value={newMarkerTitle}
                            onChangeText={setNewMarkerTitle}
                        />
                        <Button title="Save" onPress={saveMarkerTitle} />
                    </View>
                </View>

Damir Zhakhan, [16.10.2024 18:56]
</Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
});

export default LocationScreen;