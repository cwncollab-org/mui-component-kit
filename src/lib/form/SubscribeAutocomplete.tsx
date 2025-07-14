import { Autocomplete, AutocompleteProps } from './Autocomplete'
import { useFormContext } from './formContext'

export type SubscribeAutocompleteProps = AutocompleteProps

export function SubscribeAutocomplete(props: SubscribeAutocompleteProps) {
  const form = useFormContext()

  const { disabled, required, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Autocomplete
          disabled={isSubmitting || disabled}
          required={required}
          {...rest}
        />
      )}
    </form.Subscribe>
  )
}
