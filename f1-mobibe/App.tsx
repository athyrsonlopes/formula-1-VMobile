import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './app/Index';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginScreen = ({ navigation }: any) => {
  const handleLoginPress = () => {
    navigation.navigate('Tabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>F1 info</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />

      <Button title="Login" onPress={handleLoginPress} />
      <StatusBar style="auto" />
    </View>
  );
};

// Tab navigator component
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Index" component={IndexScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '75%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
});