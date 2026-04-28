import { useFieldContext } from './formContext'
import { useMemo } from 'react'
import { FileDropZoneBase, FileDropZoneBaseProps } from './FileDropZoneBase'

export type FileDropZoneProps = Omit<
  FileDropZoneBaseProps,
  'name' | 'value'
> & {
  isLoading?: boolean
}

export function FileDropZone(props: FileDropZoneProps) {
  const field = useFieldContext<File[] | null>()
  const { isLoading, disabled, onChange, helperText, ...rest } = props

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return undefined
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <FileDropZoneBase
      {...rest}
      error={Boolean(errorText)}
      helperText={errorText ?? helperText}
      name={field.name}
      value={isLoading ? null : (field.state.value ?? null)}
      disabled={isLoading || disabled}
      data-isdirty={field.state.meta.isDirty || undefined}
      data-ispristine={field.state.meta.isPristine || undefined}
      data-istouched={field.state.meta.isTouched || undefined}
      data-isdefaultvalue={field.state.meta.isDefaultValue || undefined}
      data-isvalid={field.state.meta.isValid || undefined}
      onChange={files => {
        onChange?.(files)
        field.handleChange(files)
      }}
    />
  )
}
