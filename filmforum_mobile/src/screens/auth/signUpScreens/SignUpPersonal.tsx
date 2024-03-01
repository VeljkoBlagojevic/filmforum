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

interface Props {
  setName: (value: string) => void;
  setSurname: (value: string) => void;
}

function validateAll(name: string, surname: string) {
  let errorMsg: string = '';

  if (name.length < 2) {
    errorMsg = errorMsg + 'Name must have at least 2 characters.\n';
  }
  if (surname.length < 2) {
    errorMsg = errorMsg + 'Surname must have at least 2 characters.\n';
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
      Alert.alert(validationMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your first name:</Text>
        <TextInput
          clearTextOnFocus
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Insert your last name:</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '15%',
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
    width: '100%',
  },
  groupedElements: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#8D89CA',
    marginTop: 20,
  },
});

export default SignUpPersonal;
