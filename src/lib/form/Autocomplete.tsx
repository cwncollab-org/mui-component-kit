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
  AutocompleteValue,
  AutocompleteRenderInputParams,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material'
import { useFieldContext } from './formContext'
import { useId, useMemo } from 'react'
import { createTextFieldSlotProps } from './utils'

type BaseAutocompleteProps<
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

export type AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = Omit<MuiFormControlProps, 'onChange'> &
  Pick<
    BaseAutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >,
    Exclude<InternalAutocompleteProps, 'value'>
  > & {
    label?: string
    labelBehavior?: 'auto' | 'shrink' | 'static'
    size?: 'small' | 'medium'
    fullWidth?: boolean

    getOptionValue?: (value: Value) => string | number
    renderInput?: MuiAutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >['renderInput']

    placeholder?: string
    required?: boolean
    disabled?: boolean
    slotProps?: {
      autocomplete?: Omit<
        BaseAutocompleteProps<
          Value,
          Multiple,
          DisableClearable,
          FreeSolo,
          ChipComponent
        >,
        InternalAutocompleteProps
      >
      textField?: Omit<MuiTextFieldProps, 'value' | 'onChange' | 'name'>
      helperText?: MuiFormHelperTextProps
    }
  }

export function Autocomplete<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(
  props: AutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >
) {
  const field = useFieldContext<
    Value | Value[] | string | string[] | number | number[]
  >()

  const {
    slotProps,
    options,
    getOptionLabel,
    isOptionEqualToValue,
    getOptionValue,
    renderInput,
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
        label={props.label}
        placeholder={placeholder}
        error={Boolean(errorText)}
        required={required}
        name={field.name}
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

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  const value = useMemo(() => {
    const value = field.state.value
    const eq = isOptionEqualToValue ?? defaultIsOptionEqualToValue
    if (multiple) {
      if (Array.isArray(value)) {
        return options.filter(option =>
          value.some(v => eq(option, v as any))
        ) as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>
      }
      return [] as AutocompleteValue<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    } else {
      if (!Array.isArray(value) && value != null) {
        return (options.find(option => eq(option, value as any)) ??
          null) as AutocompleteValue<
          Value,
          Multiple,
          DisableClearable,
          FreeSolo
        >
      }
      return null as AutocompleteValue<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    }
  }, [field.state.value, options, multiple, isOptionEqualToValue])

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value> | undefined
  ) => {
    onChange?.(event, newValue, reason, details)
    if (!event.defaultPrevented) {
      let processedValue:
        | Value
        | Value[]
        | string
        | string[]
        | number
        | number[]
        | null = null
      if (multiple) {
        if (Array.isArray(newValue)) {
          processedValue = newValue.map(item =>
            getOptionValue ? getOptionValue(item) : item
          ) as Value[]
        }
      } else {
        if (!Array.isArray(newValue)) {
          processedValue = newValue
            ? getOptionValue
              ? getOptionValue(newValue as Value)
              : (newValue as Value)
            : null
        }
      }
      if (processedValue) {
        field.handleChange(processedValue)
      }
    }
  }

  return (
    <MuiFormControl
      error={Boolean(errorText)}
      fullWidth={fullWidth}
      size={size}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      {...rest}
    >
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
        onChange={handleChange}
        renderInput={renderInput ?? defaultRenderInput}
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
      {Boolean(errorText) && (
        <MuiFormHelperText {...slotProps?.helperText}>
          {errorText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
