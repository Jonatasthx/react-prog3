import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="user-circle" size={80} color="#a78bfa" />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Insira o email"
        placeholderTextColor="#6b7280"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        placeholder="Insira a senha"
        placeholderTextColor="#6b7280"
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, styles.Botao1]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.Botao2]}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function salvar() {
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={22} color="#a78bfa" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Cadastro</Text>

        <View style={{ width: 22 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#6b7280"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#6b7280"
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={[styles.button, styles.Botao1]} onPress={salvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// lista 
function Contatos({ navigation }) {
  const [users, setUsers] = useState([
    { name: 'Samuel Wallace', phone: '81 3333-444', email: 'teste@gmail.com' },
    { name: 'Adrell gabriel', phone: '81 9999-5555', email: 'teset@gmail.com' },
    { name: 'Jonatas Correia', phone: '81 6666-5555', email: 'sla@gmail.com' },
  ]);

  // Função que adiciona novo contato 
  function adicionarContato(novoContato) {
    setUsers((prev) => [...prev, novoContato]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de Contatos</Text>

        <TouchableOpacity onPress={() => navigation.navigate('CadContato', { onSalvar: adicionarContato })}>
          <FontAwesome name="plus" size={22} color="#a78bfa" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ backgroundColor: '#111827' }}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('AltContato', { contato: user })}
          >
            <View style={styles.contactCard}>
              <View style={styles.contactRow}>
                <View style={styles.avatar}>
                  <FontAwesome name="user" size={20} color="#a78bfa" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.contactName}>{user.name}</Text>
                  <Text style={styles.contactPhone}>{user.phone}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function CadContato({ navigation, route }) {
  const { onSalvar } = route.params;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

 
  function salvar() {
    onSalvar({ name: nome, email: email, phone: telefone });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={22} color="#a78bfa" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Contato</Text>

        <View style={{ width: 22 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#6b7280"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#6b7280"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity style={[styles.button, styles.Botao1]} onPress={salvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

function AltContato({ navigation, route }) {
  const { contato } = route.params;

  const [nome, setNome] = useState(contato.name);
  const [email, setEmail] = useState(contato.email || '');
  const [telefone, setTelefone] = useState(contato.phone);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={22} color="#a78bfa" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Contato</Text>

        <View style={{ width: 22 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

        <TouchableOpacity style={[styles.button, styles.Botao1]}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.Botao2]}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Contatos} />
          <Stack.Screen name="CadContato" component={CadContato} />
          <Stack.Screen name="AltContato" component={AltContato} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  tinyLogo: {
    width: 50,
    height: 50,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    color: '#e5e7eb',
    borderColor: '#374151',
    backgroundColor: '#1f2937',
    borderRadius: 6,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#1f2937',
    color: '#a78bfa',
    width: 400,
  },

  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginRight: 160,
  },

  imglog: {
    gap: 15,
  },

  header: {
    backgroundColor: '#1f2937',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },

  headerText: {
    color: '#a78bfa',
    fontSize: 18,
    fontWeight: 'bold',
  },

  contactCard: {
    backgroundColor: '#1f2937',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e5e7eb',
  },

  contactPhone: {
    color: '#9ca3af',
  },

  button: {
    width: 220,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  Botao1: {
    backgroundColor: '#7c3aed',
  },

  Botao2: {
    backgroundColor: '#4b5563',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  botaoVoltar: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  label: {
    color: '#d1d5db',
  },
});