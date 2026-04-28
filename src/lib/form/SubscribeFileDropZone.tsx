import { useFormContext } from './formContext'
import { FileDropZone, FileDropZoneProps } from './FileDropZone'

export type SubscribeFileDropZoneProps = FileDropZoneProps

export function SubscribeFileDropZone(props: SubscribeFileDropZoneProps) {
  const form = useFormContext()

  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <FileDropZone disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
