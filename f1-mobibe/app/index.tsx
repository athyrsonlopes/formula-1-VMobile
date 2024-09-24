import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import Painel from './components/Painel';
import Carta from './components/Carta';

interface Player {
  idPlayer: string;
  strPlayer: string;
  strSport: string;
  strNationality: string;
  strTeam: string;
  strThumb: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [favoritos, setFavoritos] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [qtdPlayer] = useState<number>(3);
  const [lista, setLista] = useState<Player[]>([]);

  useEffect(() => {
    if (query) {
      pesquisar();
    }
  }, [query]);

  const pesquisar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`
      );
      const automobilistas: Player[] = response.data.player.filter(
        (player: Player) => player.strSport === 'Motorsport'
      );

      setLista(automobilistas);
      setPlayers(automobilistas.slice(0, qtdPlayer));
      setPage(1);
    } catch (error) {
      console.error('Erro ao pesquisar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlayers = () => {
    const startIndex = page * qtdPlayer;
    const nextPlayers = lista.slice(startIndex, startIndex + qtdPlayer);
    setPlayers(nextPlayers);
    setPage(page + 1);
  };

  const favoritar = (player: Player) => {
    if (!favoritos.some((favPlayer) => favPlayer.idPlayer === player.idPlayer)) {
      setFavoritos([...favoritos, player]);
    } else {
      alert('Já favoritado');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>F1 Info</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="nome do automobilista"
          value={query}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={pesquisar} // Automatically triggers search on Enter
        />
        <Button title="Buscar" onPress={pesquisar} />
      </View>
      {isLoading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : players.length > 0 ? (
        players.map((player) => (
          <Carta key={player.idPlayer} player={player} favoritar={favoritar} />
        ))
      ) : (
        query && <Text style={styles.errorText}>Nenhum automobilista encontrado.</Text>
      )}
      {players.length > 0 && !isLoading && (
        <Button title="Mais" onPress={loadPlayers} />
      )}
      <Text style={styles.title}>Favoritos</Text>
      <Painel favoritos={favoritos} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    color: 'white',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default App;
