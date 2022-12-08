import { useContext } from 'react'
import { Context as TrackContext } from '../context/TrackContext'
import { Context as LocationContext } from '../context/LocationContext'
import { navigate } from '../helpers/navigationRef'

export default () => {
  const { createTrack } = useContext(TrackContext)
  const { state, reset } = useContext(LocationContext)

  const saveTrack = async () => {
    await createTrack(state.name, state.locations)
    reset()
    navigate('TrackList')
  }

  return [saveTrack]
}
