import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

interface Player {
  idPlayer: string;
  strThumb: string;
  strPlayer: string;
  strNationality: string;
  strTeam: string;
}

interface PainelProps {
  favoritos: Player[];
}

const Painel: React.FC<PainelProps> = ({ favoritos }) => {
  const rows: Player[][] = [];
  for (let i = 0; i < favoritos.length; i += 4) {
    rows.push(favoritos.slice(i, i + 4));
  }

  return (
    <View style={styles.panelContainer}>
      <Text style={styles.title}>Favoritos</Text>
      {favoritos.length > 0 && (
        <ScrollView>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((player) => (
                <View key={player.idPlayer} style={styles.cardContainer}>
                  <View style={styles.card}>
                    <Image
                      source={{ uri: player.strThumb }}
                      style={styles.playerImage}
                      resizeMode="cover"
                    />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{player.strPlayer}</Text>
                      <Text style={styles.cardText}>Nacionalidade: {player.strNationality}</Text>
                      <Text style={styles.cardText}>Time: {player.strTeam}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    marginVertical: 20,
    padding: 20,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  cardContainer: {
    width: '45%',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  playerImage: {
    width: '100%',
    height: 150,
  },
  cardBody: {
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Painel;