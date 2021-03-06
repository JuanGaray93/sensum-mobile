import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Header,
  Left,
  Right,
  Button,
  Icon
} from 'native-base';
import { showToast, TopBarTitle } from './ui';

import NewSensationForm from './NewSensationForm';
import Oracle from '../model/Oracle';

import { ColorPalette } from '../../assets/styles/SensumTheme';

const NewSensationScreen = props => {
  const onNewSensation = ({author, message}) => {
    Oracle.newSensation({author, message}).then(() => {
      console.debug('[NewSensationScreen.newSensation] Successfully sent');
      props.navigation.popToTop();
      showToast({text: 'Tu sensación se está transmitiendo a través de la corriente'});
    }).catch((error) => {
      console.debug('[NewSensationScreen.newSensation] Error', error);
      showToast({text: 'Tu mensaje aún no es digno de ser enviado, modifícalo'});
    });
  };
  
  const goBack = () => {
    props.navigation.pop();
  };

  return (
    <View style={styles.container}>
      <Header 
        style={styles.header}
        androidStatusBarColor={styles.header.backgroundColor}>
          <Left/>
          <TopBarTitle />
          <Right>
            <Button transparent onPress={goBack}>
              <Icon type='FontAwesome' name='times' />
            </Button>
          </Right>
      </Header>
      <NewSensationForm onNewSensation={onNewSensation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  'container': {
    flex: 1,
    backgroundColor: ColorPalette.dark
  },
  'header': {
    backgroundColor: ColorPalette.dark,
    elevation: 0
  }
});

NewSensationScreen.navigationOptions = {
  header: null
};

export default NewSensationScreen;
