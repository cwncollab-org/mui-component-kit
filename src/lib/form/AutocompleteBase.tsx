import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
  ChipTypeMap,
  AutocompleteRenderInputParams,
} from '@mui/material'
import { useId, useMemo } from 'react'
import { createTextFieldSlotProps } from './utils'

type BaseProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = MuiAutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>

type InternalAutocompleteProps =
  | 'options'
  | 'value'
  | 'autoComplete'
  | 'autoHighlight'
  | 'autoSelect'
  | 'blurOnSelect'
  | 'clearIcon'
  | 'clearOnBlur'
  | 'clearOnEscape'
  | 'clearText'
  | 'closeText'
  | 'defaultValue'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'disabled'
  | 'disabledItemsFocusable'
  | 'disableListWrap'
  | 'disablePortal'
  | 'filterOptions'
  | 'filterSelectedOptions'
  | 'forcePopupIcon'
  | 'freeSolo'
  | 'fullWidth'
  | 'getLimitTagsText'
  | 'getOptionDisabled'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'groupBy'
  | 'handleHomeEndKeys'
  | 'includeInputInList'
  | 'inputValue'
  | 'isOptionEqualToValue'
  | 'limitTags'
  | 'loading'
  | 'loadingText'
  | 'multiple'
  | 'noOptionsText'
  | 'onChange'
  | 'onClose'
  | 'onHighlightChange'
  | 'onInputChange'
  | 'onOpen'
  | 'open'
  | 'openOnFocus'
  | 'openText'
  | 'popupIcon'
  | 'readOnly'
  | 'selectOnFocus'
  | 'size'

export type AutocompleteBaseProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = Omit<MuiFormControlProps, 'onChange'> &
  Pick<
    BaseProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    InternalAutocompleteProps
  > & {
    name?: string
    label?: string
    labelBehavior?: 'auto' | 'shrink' | 'static'
    size?: 'small' | 'medium'
    fullWidth?: boolean
    helperText?: string

    getOptionValue?: (value: Value) => string | number
    renderInput?: MuiAutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >['renderInput']

    renderOption?: MuiAutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >['renderOption']

    placeholder?: string
    required?: boolean
    disabled?: boolean
    slotProps?: {
      autocomplete?: Omit<
        BaseProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
        InternalAutocompleteProps
      >
      textField?: Omit<MuiTextFieldProps, 'value' | 'onChange' | 'name'>
      helperText?: MuiFormHelperTextProps
    }
  }

export function AutocompleteBase<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(
  props: AutocompleteBaseProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >
) {
  const {
    error,
    name,
    label,
    slotProps,
    options,
    getOptionLabel,
    isOptionEqualToValue,
    getOptionValue,
    renderInput,
    renderOption,
    multiple,
    freeSolo,
    clearOnBlur,
    clearOnEscape,
    clearIcon,
    clearText,
    labelBehavior = 'auto',
    size,
    fullWidth,
    placeholder,
    required,
    disabled,
    onChange,
    autoComplete,
    autoHighlight,
    autoSelect,
    blurOnSelect,
    closeText,
    defaultValue,
    disableClearable,
    disableCloseOnSelect,
    disabledItemsFocusable,
    disableListWrap,
    disablePortal,
    filterOptions,
    filterSelectedOptions,
    forcePopupIcon,
    getLimitTagsText,
    getOptionDisabled,
    getOptionKey,
    groupBy,
    handleHomeEndKeys,
    includeInputInList,
    inputValue,
    limitTags,
    loading,
    loadingText,
    noOptionsText,
    value,
    helperText,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openOnFocus,
    openText,
    popupIcon,
    readOnly,
    selectOnFocus,
    ...rest
  } = props

  const defaultIsOptionEqualToValue = (option: Value, value: Value) => {
    if (!option) return false

    if (
      typeof option === 'object' &&
      (typeof value === 'string' || typeof value === 'number')
    ) {
      const selectedOption = getOptionValue
        ? getOptionValue(option)
        : (option as unknown as string | number)
      return selectedOption === value
    }
    return option === value
  }

  const { input: inputProps, inputLabel: inputLabelProps } = useMemo(
    () =>
      createTextFieldSlotProps({
        labelBehavior,
        slotProps: slotProps?.textField?.slotProps,
      }),
    [labelBehavior, slotProps?.textField?.slotProps]
  )

  const textFieldProps: Partial<MuiTextFieldProps> = {
    ...slotProps?.textField,
    slotProps: {
      ...slotProps?.textField?.slotProps,
      inputLabel: inputLabelProps,
      input: inputProps,
    },
  }

  const defaultRenderInput = (params: AutocompleteRenderInputParams) => {
    return (
      <MuiTextField
        {...params}
        label={label}
        placeholder={placeholder}
        error={error}
        required={required}
        name={name}
        slotProps={{
          ...textFieldProps.slotProps,
          input: {
            ...params.InputProps,
            ...inputProps,
          },
          inputLabel: inputLabelProps,
        }}
        {...(({ slotProps: _, ...rest }) => rest)(textFieldProps)}
      />
    )
  }

  const id = useId()

  return (
    <MuiFormControl {...rest} fullWidth={fullWidth} size={size}>
      <MuiAutocomplete
        id={id}
        multiple={multiple}
        freeSolo={freeSolo}
        disabled={disabled}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={
          isOptionEqualToValue ?? defaultIsOptionEqualToValue
        }
        clearOnBlur={clearOnBlur}
        clearOnEscape={clearOnEscape}
        clearIcon={clearIcon}
        clearText={clearText}
        value={value}
        onChange={onChange}
        renderInput={renderInput ?? defaultRenderInput}
        renderOption={renderOption}
        autoComplete={autoComplete}
        autoHighlight={autoHighlight}
        autoSelect={autoSelect}
        blurOnSelect={blurOnSelect}
        closeText={closeText}
        defaultValue={defaultValue}
        disableClearable={disableClearable}
        disableCloseOnSelect={disableCloseOnSelect}
        disabledItemsFocusable={disabledItemsFocusable}
        disableListWrap={disableListWrap}
        disablePortal={disablePortal}
        filterOptions={filterOptions}
        filterSelectedOptions={filterSelectedOptions}
        forcePopupIcon={forcePopupIcon}
        getLimitTagsText={getLimitTagsText}
        getOptionDisabled={getOptionDisabled}
        getOptionKey={getOptionKey}
        groupBy={groupBy}
        handleHomeEndKeys={handleHomeEndKeys}
        includeInputInList={includeInputInList}
        inputValue={inputValue}
        limitTags={limitTags}
        loading={loading}
        loadingText={loadingText}
        noOptionsText={noOptionsText}
        onClose={onClose}
        onHighlightChange={onHighlightChange}
        onInputChange={onInputChange}
        onOpen={onOpen}
        open={open}
        openOnFocus={openOnFocus}
        openText={openText}
        popupIcon={popupIcon}
        readOnly={readOnly}
        selectOnFocus={selectOnFocus}
        size={size}
        fullWidth={fullWidth}
        {...slotProps?.autocomplete}
      />
      {Boolean(helperText) && (
        <MuiFormHelperText error={error} {...slotProps?.helperText}>
          {helperText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
