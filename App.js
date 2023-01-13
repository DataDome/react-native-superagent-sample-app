/**
 * Sample React Native App - Superagent integration
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { DataDome, DataDomeInterceptor, DataDomeModal } from '@datadome/datadome-superagent';
import {CLIENT_KEY} from '@env';

import {View, Button} from 'react-native';
const superagent = require('superagent');
const agent = superagent.agent();
agent
  .use(DataDomeInterceptor.requestInterceptor)
  .use(DataDomeInterceptor.responseInterceptor)

const makeMultipleRequests = () => {
  for (var i=0; i<5; i++) {
    makeRequest()
  }
}

const makeRequest = () => {
  agent
  .get('https://datashield.co/')
  .set('User-Agent', 'BLOCKUA')
  .set('accept', 'application/json')
  .then((res, err) => {
    // Calling the end function will send the request
    console.log("Got error", err)
    console.log("Got response code", res.status)
  })
  .catch((err) => {console.log("Error from request", err)});
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    DataDome.getInstance().setSdkKey(CLIENT_KEY);
  }


  render() {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
          
          <DataDomeModal onRef={ref => (DataDome.getInstance().setContainerViewRef(ref))} />
          <Button
            title='Press me'
            onPress={() => makeMultipleRequests()}/>
    </View>
  );
  }
}


