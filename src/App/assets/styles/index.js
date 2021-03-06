import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
  navigatBar: {
    paddingLeft: 10,
  },
  profileIcon: {
    paddingRight: 10,
  },
  /* Tab style css */
  icon: {
    height: 26,
    width: 26,
  },
  /* coverflow css */
  scene: {
    overflow: 'visible',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  album: {
    backgroundColor: '#000',
    width: 300,
    height: 200,
    borderRadius: 10,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  cover: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  /* Rating Icon */
  ListIconRating: {
    width: 35,
    height: 35,
    padding: 4,
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  movieListTitle: {
    padding: 3,
    color: '#fff',
  },
  genreIconRating: {
    width: 25,
    height: 25,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 90,
    padding: 4,
    position: 'absolute',
  },
  movieGenreTitle: {
    marginTop: 140,
    marginLeft: 5,
    color: '#fff',
    padding: 3,
    position: 'absolute',
  },
  /* Detail css */
  detailHeader: {
    flex: 1,
    width: '100%',
  },
})
