/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import { Button } from '@/components/ui/button'
import { useRecordRooomAudioHook } from './hook'
import { Navigate } from 'react-router-dom'


export function RecordRoomAudio() {
 
const hook = useRecordRooomAudioHook()


  if (!hook.roomId) {
    return <Navigate replace to="/" />
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {hook.isRecording ? (
        <Button onClick={hook.stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={hook.startRecording}>Gravar áudio</Button>
      )}
      {hook.isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}