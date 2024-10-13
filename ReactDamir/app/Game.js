import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RockPaperScissorsGame = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("Let's Play!");

  const playGame = (player) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(player);
    setComputerChoice(randomChoice);
    setResult(getWinner(player, randomChoice));
  };

  const getWinner = (player, computer) => {
    if (player === computer) {
      return 'Ничья!';
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'Вы выиграли!';
    } else {
      return 'Вы проиграли!';
    }
  };

  const renderChoiceIcon = (choice) => {
    switch (choice) {
      case 'rock':
        return <Image source={require('../assets/rock.png')} style={styles.icon} />;
      case 'paper':
        return <Image source={require('../assets/paper.png')} style={styles.icon} />;
      case 'scissors':
        return <Image source={require('../assets/scissors.png')} style={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.resultText}>{result}</Text>
      <View style={styles.choicesContainer}>
        <View style={styles.choice}>
          {renderChoiceIcon(playerChoice)}
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.choice}>
          {renderChoiceIcon(computerChoice)}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => playGame('rock')}>
          <Image source={require('../assets/rock.png')} style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => playGame('paper')}>
          <Image source={require('../assets/paper.png')} style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => playGame('scissors')}>
          <Image source={require('../assets/scissors.png')} style={styles.iconButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  choicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choice: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 24,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50,
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  iconButton: {
    width: 60,
    height: 60,
  },
});

export default RockPaperScissorsGame;
