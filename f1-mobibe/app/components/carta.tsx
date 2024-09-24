import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Player {
  idPlayer: string;
  strThumb: string;
  strPlayer: string;
  strNationality: string;
  strTeam: string;
  strStatus: string;
  strHeight: string;
}

interface CartaProps {
  player: Player;
  favoritar: (player: Player) => void;
}

function cleanHeight(height: string): string {
  return height.replace(/\s*\(.*?\)\s*/, '');
}

const Carta: React.FC<CartaProps> = ({ player, favoritar }) => {
  return (
    <View key={player.idPlayer} style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: player.strThumb }}
              style={styles.playerImage}
              resizeMode="contain"
            />
            <Text style={styles.playerName}>{player.strPlayer}</Text>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.cardText}><Text style={styles.boldText}>Nacionalidade:</Text> {player.strNationality}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Equipe:</Text> {player.strTeam}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Status:</Text> {player.strStatus}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Altura:</Text> {cleanHeight(player.strHeight)}</Text>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => favoritar(player)}>
              <Text style={styles.buttonText}>Favoritar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  playerImage: {
    width: 200,
    height: 'auto',
  },
  playerName: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Carta;