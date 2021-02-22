// Components/Test.js

import React from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'


class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: new Animated.Value(0)
    }
  }

  animate() {
    Animated.sequence([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        this.state.topPosition,
        {
          toValue: 0,
          duration: 1000,
          easing: Easing.elastic(2),
          useNativeDriver: false
        }
      )
    ]).start()
  }

  componentDidMount() {
    this.animate()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Animated.View style={[styles.animation_view, { top: this.state.topPosition }]}>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  }
})

export default Test