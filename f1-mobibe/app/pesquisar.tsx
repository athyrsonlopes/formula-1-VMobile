import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favoritos.length > 0 && (
        <View>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((player) => (
                <View key={player.idPlayer} style={styles.cardContainer}>
                  <View style={styles.card}>
                    <Image
                      style={styles.image}
                      source={{ uri: player.strThumb }}
                      accessibilityLabel={player.strPlayer}
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginVertical: 16,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
  },
});

export default Painel;