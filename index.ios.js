/**
 * Sample React Native App
 */
 'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-ibeacon';

var region = {
  identifier: 'Estimotes',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
  major: 49607,
  minor: 30744
};

Beacons.requestAlwaysAuthorization();
Beacons.startRangingBeaconsInRegion(region);
DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    console.log(data);
  }
);

var ReactNativeBeaconExample = React.createClass({
  componentDidMount: function() {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          beacons: data.beacons.filter(item => item.rssi < 0).map(item => item.rssi)
        });
      }
    );
  },
  render() {
    var beacons = this.state.beacons.map(function(strength, index) {
      var beaconPosition = {
        marginTop: Math.pow(strength, 3) / (Math.pow(-100, 3) / 250)
      };
      return <View key={index} style={[styles.beacon, beaconPosition]} />
    }, this);

    return (
      <View style={styles.container}>
        <View style={styles.device} />
        <View style={styles.beaconContainer}>
          <View style={styles.beacon} />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  device: {
    width: 80,
    height: 80,
    backgroundColor: '#6cab36'
  },
  beaconContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  beacon: {
    width: 50,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 200,
    backgroundColor: '#7c7c81'
  }
});

AppRegistry.registerComponent('ReactNativeBeaconExample', () => ReactNativeBeaconExample);
