import { useNavigation } from "@react-navigation/native";
import { VStack, HStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import LogoSvg from '@assets/series.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";

export function SignUp() {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreate() {
    const response = await fetch('http://10.26.12.67:3333/users', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "email": mail,
        "password": password
      }),
    }).then(response => response.json())
    .then(data => console.log(data));
  }

  function handleGoBack() {
    navigation.goBack();
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
            Crie sua conta
          </Heading>

          <Input 
            placeholder="Nome"
            onChangeText={setName}
          />

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

          <Button title="Criar e acessar" onPress={handleCreate} />
        </Center>
        
        <Button 
          title="Voltar para o login" 
          variant="outline" 
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}