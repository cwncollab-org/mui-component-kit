import {
  Box as MuiBox,
  BoxProps as MuiBoxProps,
  Checkbox as MuiCheckbox,
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  ListProps as MuiListProps,
  Skeleton,
} from '@mui/material'
import { useMemo } from 'react'
import { useFieldContext } from './formContext'
import { renderOptions } from './utils'

export type CheckboxListProps<TOption = string | any> = {
  label?: string
  labelBehavior?: 'auto' | 'shrink' | 'static'
  fullWidth?: MuiFormControlProps['fullWidth']
  options?: TOption[]
  dense?: MuiListProps['dense']
  disabled?: boolean
  isLoading?: boolean
  getOptionLabel?: (option: TOption) => string
  getOptionValue?: (option: TOption) => string
  getOptionDescription?: (option: TOption) => string | null | undefined
  sx?: MuiBoxProps['sx']
}

export function CheckboxList(props: CheckboxListProps) {
  const {
    disabled,
    isLoading,
    sx,
    label,
    labelBehavior = 'auto',
    fullWidth,
    options,
    dense,
    getOptionLabel,
    getOptionValue,
    getOptionDescription,
    ...rest
  } = props
  const field = useFieldContext<string[] | null | undefined>()
  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const renderedOptions = useMemo(
    () =>
      renderOptions(
        options,
        getOptionLabel,
        getOptionValue,
        getOptionDescription
      ),
    [isLoading, options, getOptionLabel, getOptionValue, getOptionDescription]
  )

  const handleToggle = (value: string) => () => {
    if (disabled) return
    const currentValues = field.state.value || []
    const currentIndex = currentValues.indexOf(value)
    const newValues = [...currentValues]

    if (currentIndex === -1) {
      newValues.push(value)
    } else {
      newValues.splice(currentIndex, 1)
    }

    field.handleChange(newValues)
  }

  return (
    <MuiFormControl
      error={!!errorText}
      component='fieldset'
      variant='standard'
      fullWidth={fullWidth}
      sx={sx}
      {...rest}
    >
      {label && <MuiFormLabel component='legend'>{label}</MuiFormLabel>}
      <MuiList dense={dense} role='group' aria-label={label}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <MuiListItem key={index} disablePadding>
                <MuiListItemButton dense={dense} disabled>
                  <MuiListItemIcon>
                    <MuiBox sx={{ p: '9px', ml: '-11px', display: 'flex' }}>
                      <Skeleton variant='circular' width={24} height={24} />
                    </MuiBox>
                  </MuiListItemIcon>
                  <MuiListItemText
                    primary={<Skeleton variant='text' width='60%' />}
                  />
                </MuiListItemButton>
              </MuiListItem>
            ))
          : renderedOptions.map(option => {
              const labelId = `checkbox-list-label-${option.value}`
              return (
                <MuiListItem key={option.value} disablePadding>
                  <MuiListItemButton
                    role={undefined}
                    onClick={handleToggle(option.value)}
                    dense={dense}
                    disabled={disabled}
                  >
                    <MuiListItemIcon>
                      <MuiCheckbox
                        edge='start'
                        checked={
                          (field.state.value || []).indexOf(option.value) !== -1
                        }
                        tabIndex={-1}
                        disableRipple
                        slotProps={{ input: { 'aria-labelledby': labelId } }}
                      />
                    </MuiListItemIcon>
                    <MuiListItemText
                      id={labelId}
                      primary={option.label}
                      secondary={option.description}
                    />
                  </MuiListItemButton>
                </MuiListItem>
              )
            })}
      </MuiList>
      {errorText && <MuiFormHelperText>{errorText}</MuiFormHelperText>}
    </MuiFormControl>
  )
}
