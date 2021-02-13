// Components/Favorites.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'

class Favorites extends React.Component {

  render() {
    console.log(this.props.favoritesFilm)
    return (
      <View style={styles.main_container}>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)