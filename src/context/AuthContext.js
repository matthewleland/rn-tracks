import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../helpers/navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'authenticate':
      return { errorMessage: '', token: action.payload }
    case 'clear_error':
      return { ...state, errorMessage: '' }
    case 'signout':
      return { token: null, errorMessage: '' }
    default:
      return state
  }
}

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: 'signin', payload: token })
    navigate('TrackList')
  } else {
    navigate('loginFlow')
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error' })
}

const signup =
  dispatch =>
  async ({ email, password }) => {
    try {
      console.log('(client) POST - /signup')
      const response = await trackerApi.post('/signup', { email, password })
      await AsyncStorage.setItem('token', response.data.token)
      dispatch({ type: 'authenticate', payload: response.data.token })
      navigate('TrackList')
    } catch (err) {
      console.log(err)
      dispatch({ type: 'add_error', payload: 'Something went wrong' })
    }
  }

const signin =
  dispatch =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signin', { email, password })
      await AsyncStorage.setItem('token', response.data.token)
      dispatch({ type: 'authenticate', payload: response.data.token })
      navigate('TrackList')
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      })
    }
  }

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token') // this line is broken!
  dispatch({ type: 'signout' })
  navigate('loginFlow')
  console.log('hello')
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, clearErrorMessage, tryLocalSignin, signout },
  { token: null, errorMessage: '' }
)
