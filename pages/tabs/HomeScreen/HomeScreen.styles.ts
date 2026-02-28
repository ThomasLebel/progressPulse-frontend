import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  topContainer: {
    display: 'flex',
    marginTop: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
    paddingTop: 10,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  span: {
    color: COLORS.primary,
  },

  infoIcon: {
    marginRight: 10,
  },

  textInfo: {
    color: 'white',
  },

  btnContainer: {
    display: 'flex',
    marginTop: 20,
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  seances: {
    marginHorizontal: 15,
    marginBottom: 15,
  },

  imageWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },

  image: {
    width: 350,
    height: 350,
  },
});
