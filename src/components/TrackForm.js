import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeName } =
    useContext(LocationContext)
  const [saveTrack] = useSaveTrack()

  return (
    <>
      <Spacer>
        <Input
          value={state.name}
          onChangeText={changeName}
          placeholder='Enter name'
        />
        {state.recording ? (
          <Button
            title='Stop'
            onPress={stopRecording}
          />
        ) : (
          <Button
            title='Start Recording'
            onPress={startRecording}
          />
        )}
        <Spacer />
        {!state.recording && state.locations.length > 0 ? (
          <Button
            title='Save Recorded Track'
            onPress={saveTrack}
          />
        ) : null}
      </Spacer>
    </>
  )
}

export default TrackForm
