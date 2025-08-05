import { createFormHook } from '@tanstack/react-form'
import { Autocomplete } from './Autocomplete'
import { TextField } from './TextField'
import { Checkbox } from './Checkbox'
import { Select } from './Select'
import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import { fieldContext, formContext } from './formContext'
import { SubscribeButton } from './SubscribeButton'
import { MultiSelect } from './MultiSelect'
import { SubscribeAutocomplete } from './SubscribeAutocomplete'
import { SubscribeTextField } from './SubscribeTextField'
import { SubscribeSelect } from './SubscribeSelect'
import { SubscribeMultiSelect } from './SubscribeMultiSelect'
import { SubscribeCheckbox } from './SubscribeCheckbox'
import { SubscribeDatePicker } from './SubscribeDatePicker'
import { SubscribeTimePicker } from './SubscribeTimePicker'
import { RadioGroup } from './RadioGroup'
import { SubscribeRadioGroup } from './SubscribeRadioGroup'
import { MaskedTextField } from './MaskedTextField'
import { SubscribeMaskedTextField } from './SubscribeMaskedTextField'

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Autocomplete,
    TextField,
    Checkbox,
    Select,
    MaskedTextField,
    MultiSelect,
    RadioGroup,
    DatePicker,
    TimePicker,
    SubscribeAutocomplete,
    SubscribeTextField,
    SubscribeMaskedTextField,
    SubscribeSelect,
    SubscribeMultiSelect,
    SubscribeCheckbox,
    SubscribeDatePicker,
    SubscribeTimePicker,
    SubscribeRadioGroup,
  },
  formComponents: { SubscribeButton },
})
