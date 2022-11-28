import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const signup = dispatch => {
  return async ({ email, password }) => {
    try {
      console.log('made it to try')
      const response = await trackerApi.post('/signup', { email, password })
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
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
  { isSignedIn: false }
)