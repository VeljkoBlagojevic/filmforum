import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useValidInformation } from '../../../services/api';

export const cities = ['Beograd', 'Novi Sad', 'Nis'];
interface Props {
  setName: (value: string) => void;
  setSurname: (value: string) => void;
}

function validateAll(name: String, surname: String) {
  let errorMsg: String = '';

  if (name.length < 2) {
    errorMsg = errorMsg + ' Morate uneti ime koje ima minimum 2 karaktera.\n';
  }
  if (surname.length < 2) {
    errorMsg =
      errorMsg + ' Morate uneti prezime koje ima minimum 2 karaktera.\n';
  }

  return errorMsg;
}

function SignUpPersonal(props: Props) {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const { setValue } = useValidInformation();

  useEffect(() => {
    setValue(false);
  }, []);

  const checkData = () => {
    let validationMsg = validateAll(name, surname);

    if (validationMsg === '') {
      props.setName(name);
      props.setSurname(surname);
      setValue(true);
    } else {
      Alert.alert(validationMsg.valueOf());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your firstname:</Text>
        <TextInput
          clearTextOnFocus
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your lastname:</Text>
        <TextInput
          clearTextOnFocus
          value={surname}
          onChangeText={(text) => setSurname(text)}
          style={styles.inputText}
        />
      </View>
      <Button title="Check Data!" onPress={() => checkData()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    height: 400,
    marginTop: '15%',
    paddingTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#8D89CA',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  inputText: {
    borderBottomWidth: 2,
    borderColor: '#8D89CA',
    height: 30,
  },
  groupedElements: {
    height: 70,
    width: 250,
  },
});
export default SignUpPersonal;
