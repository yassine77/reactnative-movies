// Components/FilmDetail.js

import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Button, Share } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EnlargeShrink from '../Animations/EnLargeShrink'

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

    const indexFavoriteFilm =
      this.props.favoritesFilm.findIndex(item => item.idFilm === this.props.route.params.idFilm)

    if (indexFavoriteFilm !== -1) {
      this.setState({
        film: this.props.favoritesFilm[indexFavoriteFilm]
      })
      return
    }
    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }


  componentDidUpdate() {
    //console.log("componentDidUpdate : ")
    //console.log(this.props.favoritesFilm)
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

  _toggleFavorite() {
    const action = {
      type: "TOGGLE_FAVORITE",
      value: this.state.film
    }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    var shouldEnlarge = false // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../Images/ic_favorite.png')
      shouldEnlarge = true // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
    }
    return (
      <EnlargeShrink
        shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
}

  _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      console.log("_displayFloatingActionButton")
      return (
        <TouchableOpacity
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')} />
        </TouchableOpacity>
      )
    }
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>

          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(this.state.film.backdrop_path) }}
          />

          <Text style={styles.title_text}>
            {this.state.film.title}
          </Text>

          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>

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

          {/* Pour l'instant je n'affiche que le titre, 
          je vous laisserais le soin de créer la vue. 
          Après tout vous êtes aussi là pour ça non ? :)*/}
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayFilm()}
        </View>
        <View style={styles.share_touchable_floatingactionbutton}>
          {this._displayFloatingActionButton()}
        </View>
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
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
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
  favorite_container: {
    alignItems: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)