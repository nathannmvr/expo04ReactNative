import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView, HStack } from "native-base";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/series.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";

export function SignIn() {

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleLogin() {
    const response = await fetch('http://10.26.12.67:3333/sessions', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "email": mail,
        "password": password
      }),
    }).then(response => response.json())
    .then(data => {setToken});

    return storeData(token);
  }

  const storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (e) {
      // saving error
    }
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1} px={10} pb={16}>
        <Image 
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <HStack>
            <LogoSvg width='50' height='50' />
            <Text color='gray.100' fontSize='3xl' ml='3' fontFamily='heading'>Gym</Text>
          </HStack>

          <Text color="gray.100" fontSize="sm">
            Recarregue sua bateria de saúde.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse a conta
          </Heading>

          <Input 
            placeholder="E-mail" 
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setMail}
          />
          <Input 
            placeholder="Senha" 
            secureTextEntry
            onChangeText={setPassword}
          />

          <Button title="Acessar" onPress={handleLogin} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button 
            title="Criar Conta" 
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}