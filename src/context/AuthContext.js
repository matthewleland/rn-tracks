import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../helpers/navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signup':
      return { errorMessage: '', token: action.payload }
    default:
      return state
  }
}

const signup =
  dispatch =>
  async ({ email, password }) => {
    try {
      // console.log('(client) POST - /signup')
      const response = await trackerApi.post('/signup', { email, password })
      await AsyncStorage.setItem('token', response.data.token)
      dispatch({ type: 'signup', payload: response.data.token })
      navigate('TrackList')
    } catch (err) {
      console.log(err)
      dispatch({ type: 'add_error', payload: 'Something went wrong' })
    }
  }

// const signin = dispatch => {
//   return ({ email, password }) => {}
// }

// const signout = dispatch => {
//   return () => {}
// }

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup },
  { token: null, errorMessage: '' }
)
