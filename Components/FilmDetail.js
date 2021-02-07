// Components/FilmDetail.js

import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    //console.log(this.props)
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  componentDidUpdate() {
    console.log("componentDidUpdate : ")
    console.log(this.props.favoritesFilm)
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite(){
    const action = {
      type: "TOGGLE_FAVORITE",
      value: this.state.film
    }
    this.props.dispatch(action)
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>

          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(this.state.film.backdrop_path) }}
          />

          <Text style={styles.title_container}>
            {this.state.film.title}
          </Text>

          <Button title="Favoris" onPress={() => this._toggleFavorite()}/>

          <Text style={styles.description_text}>{this.state.film.overview}</Text>

          <Text style={styles.vote_text}>Sorti le {Moment(this.state.film.release_date).format('DD/MM/YYYY')}</Text>
          <Text style={styles.vote_text}>Note: {this.state.film.vote_average} / 10</Text>
          <Text style={styles.vote_text}>Nombre de votes: {this.state.film.vote_count}</Text>
          <Text style={styles.vote_text}>Budget: {Numeral(this.state.film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.vote_text}>
            Genres(s): {this.state.film.genres.map(g => g.name).join(" / ")}
          </Text>
          <Text style={styles.vote_text}>
            Companie(s): {this.state.film.production_companies.map(g => g.name).join(" / ")}
          </Text>

          {/* <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{ uri: getImageFromApi(this.state.film.backdrop_path) }}
            />
          </View> */}

          {/* Pour l'instant je n'affiche que le titre, 
          je vous laisserais le soin de créer la vue. 
          Après tout vous êtes aussi là pour ça non ? :)*/}
        </ScrollView>
      )
    }
  }

  render() {
    //console.log(this.props)
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  title_container: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  image: {
    height: 180,
    margin: 5,
  },
  vote_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)