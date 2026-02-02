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
import { renderOptions } from './utils'

export type CheckboxListBaseProps<TOption = string | any> = {
  name?: string
  value?: string[] | null
  onChange?: (value: string[]) => void
  label?: string
  labelBehavior?: 'auto' | 'shrink' | 'static'
  fullWidth?: MuiFormControlProps['fullWidth']
  options?: TOption[]
  dense?: MuiListProps['dense']
  disabled?: boolean
  isLoading?: boolean
  error?: boolean
  helperText?: string
  getOptionLabel?: (option: TOption) => string
  getOptionValue?: (option: TOption) => string
  getOptionDescription?: (option: TOption) => string | null | undefined
  sx?: MuiBoxProps['sx']
}

export function CheckboxListBase<TOption = string | any>(
  props: CheckboxListBaseProps<TOption>
) {
  const {
    name,
    value,
    onChange,
    disabled,
    isLoading,
    sx,
    label,
    fullWidth,
    options,
    dense,
    error,
    helperText,
    getOptionLabel,
    getOptionValue,
    getOptionDescription,
    ...rest
  } = props

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

  const handleToggle = (optionValue: string) => () => {
    if (disabled || !onChange) return
    const currentValues = value || []
    const currentIndex = currentValues.indexOf(optionValue)
    const newValues = [...currentValues]

    if (currentIndex === -1) {
      newValues.push(optionValue)
    } else {
      newValues.splice(currentIndex, 1)
    }

    onChange(newValues)
  }

  return (
    <MuiFormControl
      error={error}
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
              const labelId = `checkbox-list-${name ? `${name}-` : ''}label-${option.value}`
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
                        checked={(value || []).indexOf(option.value) !== -1}
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
      {helperText && <MuiFormHelperText>{helperText}</MuiFormHelperText>}
    </MuiFormControl>
  )
}
