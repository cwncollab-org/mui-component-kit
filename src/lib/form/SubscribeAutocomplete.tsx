import { ChipTypeMap } from '@mui/material'
import { Autocomplete, AutocompleteProps } from './Autocomplete'
import { useFormContext } from './formContext'

export type SubscribeAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = AutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>

export function SubscribeAutocomplete<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(
  props: SubscribeAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >
) {
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
