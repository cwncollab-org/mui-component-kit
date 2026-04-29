import UploadIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box as MuiBox,
  BoxProps as MuiBoxProps,
  FormControl as MuiFormControl,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  IconButton as MuiIconButton,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  Typography as MuiTypography,
  Box,
} from '@mui/material'
import { ReactNode, useCallback } from 'react'
import {
  Accept,
  DropEvent,
  FileError,
  FileRejection,
  useDropzone,
  DropzoneState,
} from 'react-dropzone'

// ─── helpers ────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

// ─── types ───────────────────────────────────────────────────────────────────

export type FileDropZoneRenderProps = Pick<
  DropzoneState,
  | 'getRootProps'
  | 'getInputProps'
  | 'isDragActive'
  | 'isDragAccept'
  | 'isDragReject'
  | 'isFocused'
  | 'open'
  | 'acceptedFiles'
  | 'fileRejections'
>

export type FileDropZoneBaseProps = {
  // form integration
  name?: string
  value?: File[] | null
  onChange?: (files: File[]) => void
  label?: string
  helperText?: ReactNode
  error?: boolean
  fullWidth?: boolean
  disabled?: boolean
  sx?: MuiBoxProps['sx']
  dropZoneProps?: MuiBoxProps

  // dropzone options
  accept?: Accept
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  minSize?: number
  noClick?: boolean
  noDrag?: boolean
  noKeyboard?: boolean
  autoFocus?: boolean
  validator?: <T extends File>(
    file: T
  ) => FileError | readonly FileError[] | null

  // callbacks
  onDrop?: (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
    event: DropEvent
  ) => void
  onDropAccepted?: (files: File[], event: DropEvent) => void
  onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void
  onError?: (error: Error) => void
  onFileDialogOpen?: () => void
  onFileDialogCancel?: () => void

  // customisation
  placeholder?: ReactNode
  clickText?: ReactNode
  acceptHint?: ReactNode
  icon?: ReactNode
  showFileList?: boolean
  getFileLabel?: (file: File) => ReactNode

  // render-prop override: replaces the inner drop-zone body only
  children?: (state: FileDropZoneRenderProps) => ReactNode
}

// ─── component ───────────────────────────────────────────────────────────────

export function FileDropZoneBase(props: FileDropZoneBaseProps) {
  const {
    name,
    value,
    onChange,
    label,
    helperText,
    error = false,
    fullWidth = false,
    disabled = false,
    sx,
    dropZoneProps,
    accept,
    multiple = true,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noKeyboard,
    autoFocus,
    validator,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onError,
    onFileDialogOpen,
    onFileDialogCancel,
    placeholder,
    clickText = 'click to select',
    acceptHint,
    icon = <UploadIcon sx={{ fontSize: 40, mb: 1, color: 'inherit' }} />,
    showFileList = true,
    getFileLabel,
    children,
  } = props

  const handleDrop = useCallback(
    (accepted: File[], rejected: FileRejection[], event: DropEvent) => {
      onDrop?.(accepted, rejected, event)
      if (onChange) {
        const current = value ?? []
        const merged = multiple ? [...current, ...accepted] : accepted
        onChange(merged)
      }
    },
    [onDrop, onChange, value, multiple]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
    open,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept,
    multiple,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noKeyboard,
    autoFocus,
    disabled,
    validator,
    onDrop: handleDrop,
    onDropAccepted,
    onDropRejected,
    onError,
    onFileDialogOpen,
    onFileDialogCancel,
  })

  // The visible file list is the controlled value when provided, otherwise
  // the files that react-dropzone has accumulated internally.
  const displayFiles = value != null ? value : acceptedFiles

  const handleRemove = (index: number) => {
    if (!onChange) return
    const next = displayFiles.filter((_, i) => i !== index)
    onChange(next)
  }

  const renderState: FileDropZoneRenderProps = {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
    open,
    acceptedFiles,
    fileRejections,
  }

  // ── sx composition ──────────────────────────────────────────────────────

  const baseSx: MuiBoxProps['sx'] = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    p: 3,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
    color: 'text.secondary',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    userSelect: 'none',
    ...(disabled && { opacity: 0.5, pointerEvents: 'none' }),
  }

  const stateSx: MuiBoxProps['sx'] = {
    ...(isFocused && !isDragActive && { borderColor: 'primary.main' }),
    ...(isDragAccept && {
      borderColor: 'success.main',
      bgcolor: 'success.light',
      color: 'success.dark',
      opacity: 0.5,
    }),
    ...((isDragReject || error) && {
      borderColor: 'error.main',
      bgcolor: 'error.light',
      color: 'error.dark',
      opacity: 0.5,
    }),
  }

  // ── render ───────────────────────────────────────────────────────────────

  const { sx: dropZoneSx, ...restDropZoneProps } = dropZoneProps ?? {}

  return (
    <MuiFormControl
      error={error}
      fullWidth={fullWidth}
      disabled={disabled}
      component='div'
      sx={sx}
    >
      {label && (
        <MuiFormLabel
          component='label'
          htmlFor={name}
          sx={{ mb: 0.75, display: 'block' }}
        >
          {label}
        </MuiFormLabel>
      )}

      <MuiBox
        {...restDropZoneProps}
        {...getRootProps({
          sx: [
            baseSx,
            stateSx,
            ...(Array.isArray(dropZoneSx) ? dropZoneSx : [dropZoneSx]),
          ] as MuiBoxProps['sx'],
        })}
        id={name}
        data-dropzone-drag-active={isDragActive}
        data-dropzone-drag-accept={isDragAccept}
        data-dropzone-drag-reject={isDragReject}
        data-dropzone-focused={isFocused}
        data-dropzone-disabled={disabled}
        data-dropzone-error={error}
      >
        <input {...getInputProps({ name })} />

        {children ? (
          children(renderState)
        ) : (
          <>
            {icon}
            <MuiTypography variant='body2' align='center'>
              {placeholder ?? (
                <>
                  Drag &amp; drop files here, or{' '}
                  <Box
                    component='span'
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'underline',
                    }}
                  >
                    {clickText}
                  </Box>
                </>
              )}
            </MuiTypography>
            {acceptHint !== undefined
              ? acceptHint
              : accept && (
                  <MuiTypography
                    variant='caption'
                    sx={{ mt: 0.5, opacity: 0.7 }}
                  >
                    {Object.values(accept).flat().filter(Boolean).join(', ') ||
                      Object.keys(accept).join(', ')}
                  </MuiTypography>
                )}
          </>
        )}
      </MuiBox>

      {showFileList && displayFiles.length > 0 && (
        <MuiList dense disablePadding sx={{ mt: 1 }}>
          {displayFiles.map((file, index) => (
            <MuiListItem
              key={`${file.name}-${index}`}
              disableGutters
              secondaryAction={
                onChange ? (
                  <MuiIconButton
                    edge='end'
                    size='small'
                    aria-label={`Remove ${file.name}`}
                    onClick={e => {
                      e.stopPropagation()
                      handleRemove(index)
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </MuiIconButton>
                ) : undefined
              }
            >
              <MuiListItemText
                primary={
                  getFileLabel
                    ? getFileLabel(file)
                    : `${file.name} — ${formatBytes(file.size)}`
                }
                slotProps={{
                  primary: { variant: 'body2', noWrap: true },
                }}
              />
            </MuiListItem>
          ))}
        </MuiList>
      )}

      {helperText && <MuiFormHelperText>{helperText}</MuiFormHelperText>}
    </MuiFormControl>
  )
}
