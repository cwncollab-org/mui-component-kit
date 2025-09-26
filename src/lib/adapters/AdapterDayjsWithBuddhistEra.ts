import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'

export class AdapterDayjsWithBuddhistEra extends AdapterDayjs {
  // Override format to display Buddhist Era year (BE) instead of Gregorian (CE)
  format: (value: Dayjs, formatKey: keyof AdapterDayjs['formats']) => string = (
    value,
    formatKey
  ) => {
    // AdapterDayjs defines format as a class field, not a prototype method, so we must access it as a property
    const base = Object.getPrototypeOf(this) as AdapterDayjs
    let formatted = base.format
      ? base.format.call(this, value, formatKey)
      : this.formatByString(value, this.formats[formatKey])
    // Replace YYYY or yyyy with Buddhist year if present in format string
    const formatString = this.formats[formatKey]
    if (typeof formatString === 'string' && /Y{2,4}/.test(formatString)) {
      const buddhistYear = value.year() + 543
      // Replace the first 4-digit year with Buddhist year
      formatted = formatted.replace(/(\d{4})/, buddhistYear.toString())
    }
    return formatted
  }

  // Override formatByString for custom format strings
  formatByString: (value: Dayjs, formatString: string) => string = (
    value,
    formatString
  ) => {
    // AdapterDayjs defines formatByString as a class field, not a prototype method, so we must access it as a property
    const base = Object.getPrototypeOf(this) as AdapterDayjs
    let formatted = base.formatByString
      ? base.formatByString.call(this, value, formatString)
      : value.format(formatString)
    if (/Y{2,4}/.test(formatString)) {
      const buddhistYear = value.year() + 543
      formatted = formatted.replace(/(\d{4})/, buddhistYear.toString())
    }
    return formatted
  }

  // Optionally override getYearText for year selection dropdowns
  getYearText(date: Dayjs): string {
    return (date.year() + 543).toString()
  }
}
