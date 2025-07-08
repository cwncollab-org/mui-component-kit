import { createFormHook } from '@tanstack/react-form'
import { TextField } from './TextField'
import { Checkbox } from './Checkbox'
import { Select } from './Select'
import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import { fieldContext, formContext } from './formContext'
import { SubscribeButton } from './SubscribeButton'
import { MultiSelect } from './MultiSelect'
import { SubscribeTextField } from './SubscribeTextField'
import { SubscribeSelect } from './SubscribeSelect'
import { SubscribeMultiSelect } from './SubscribeMultiSelect'
import { SubscribeCheckbox } from './SubscribeCheckbox'
import { SubscribeDatePicker } from './SubscribeDatePicker'
import { SubscribeTimePicker } from './SubscribeTimePicker'
import { RadioGroup } from './RadioGroup'
import { SubscribeRadioGroup } from './SubscribeRadioGroup'

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    Checkbox,
    Select,
    MultiSelect,
    RadioGroup,
    DatePicker,
    TimePicker,
    SubscribeTextField,
    SubscribeSelect,
    SubscribeMultiSelect,
    SubscribeCheckbox,
    SubscribeDatePicker,
    SubscribeTimePicker,
    SubscribeRadioGroup,
  },
  formComponents: { SubscribeButton },
})
