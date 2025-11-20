import {
  InputLabelProps,
  InputProps,
  TextFieldProps,
  SelectProps,
} from '@mui/material'
import { InputHTMLAttributes } from 'react'
import { PickersOutlinedInputProps } from '@mui/x-date-pickers'

export type CreateTextFieldSlotPropsOptions = {
  slotProps?: TextFieldProps['slotProps']
  labelBehavior?: 'auto' | 'shrink' | 'static'
  min?: InputHTMLAttributes<HTMLInputElement>['min']
  max?: InputHTMLAttributes<HTMLInputElement>['max']
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength']
  pattern?: InputHTMLAttributes<HTMLInputElement>['pattern']
}

export type TextFieldSlotProps = {
  input: InputProps
  inputLabel: InputLabelProps
}

export type CreatePickerSlotPropsOptions = {
  labelBehavior?: 'auto' | 'shrink' | 'static'
  sx?: any
}

export type PickerSlotProps = {
  inputProps: Partial<PickersOutlinedInputProps>
  inputLabelProps: Partial<InputLabelProps>
}

export type CreateSelectSlotPropsOptions = {
  slotProps?: {
    inputLabel?: Partial<InputLabelProps>
    select?: Partial<SelectProps>
  }
  labelBehavior?: 'auto' | 'shrink' | 'static'
}

export type SelectSlotProps = {
  inputLabelProps: Partial<InputLabelProps>
  selectProps: Partial<SelectProps>
}

export function createTextFieldSlotProps(
  opts?: CreateTextFieldSlotPropsOptions
): TextFieldSlotProps {
  const {
    labelBehavior = 'auto',
    min,
    max,
    maxLength,
    pattern,
    slotProps,
  } = opts ?? {}
  const labelShrink = labelBehavior === 'shrink' ? true : undefined

  let inputLabelProps: Partial<InputLabelProps> = {
    ...(slotProps?.inputLabel as Partial<InputLabelProps>),
    shrink: labelShrink,
    sx: {
      ...(slotProps?.inputLabel as any)?.sx,
    },
  }
  let inputProps = {
    ...slotProps?.input,
    slotProps: {
      ...(slotProps?.input as any)?.slotProps,
      input: {
        ...(slotProps?.input as any)?.slotProps?.input,
        min: min,
        max: max,
        maxLength: maxLength,
        pattern: pattern,
      },
    },
  }

  if (labelBehavior === 'static') {
    inputLabelProps = {
      ...inputLabelProps,
      sx: {
        ...(inputLabelProps as any)?.sx,
        position: 'relative',
        transform: 'none',
      },
    }
    inputProps = {
      ...inputProps,
      notched: true,
      sx: {
        ...(inputProps as any)?.sx,
        '& legend > span': {
          display: 'none',
        },
      },
    }
  }
  return {
    input: inputProps,
    inputLabel: inputLabelProps,
  }
}

export function createPickerSlotProps(
  opts?: CreatePickerSlotPropsOptions
): PickerSlotProps {
  const { labelBehavior = 'auto', sx } = opts ?? {}
  const labelShrink = labelBehavior === 'shrink' ? true : undefined

  let inputLabelProps: Partial<InputLabelProps> = {
    shrink: labelShrink,
  }

  let inputProps: Partial<PickersOutlinedInputProps> = {
    notched: labelShrink,
  }

  if (labelBehavior === 'static') {
    inputLabelProps = {
      ...inputLabelProps,
      shrink: true,
      sx: {
        position: 'relative',
        transform: 'none',
      },
    }
    inputProps = {
      ...inputProps,
      notched: true,
      sx: {
        ...sx,
        '& legend > span': {
          display: 'none',
        },
      },
    }
  }

  return {
    inputProps,
    inputLabelProps,
  }
}

export function createSelectSlotProps(
  opts?: CreateSelectSlotPropsOptions
): SelectSlotProps {
  const { labelBehavior = 'auto', slotProps } = opts ?? {}
  const labelShrink = labelBehavior === 'shrink' ? true : undefined

  let inputLabelProps: Partial<InputLabelProps> = {
    ...slotProps?.inputLabel,
    shrink: labelShrink,
  }

  let selectProps: Partial<SelectProps> = {
    ...slotProps?.select,
    notched: labelShrink,
  }

  if (labelBehavior === 'static') {
    inputLabelProps = {
      ...inputLabelProps,
      sx: {
        ...(inputLabelProps as any)?.sx,
        position: 'relative',
        transform: 'none',
      },
    }
    selectProps = {
      ...selectProps,
      notched: true,
      sx: {
        ...(selectProps as any)?.sx,
        '& legend > span': {
          display: 'none',
        },
      },
    }
  }

  return {
    inputLabelProps,
    selectProps,
  }
}
