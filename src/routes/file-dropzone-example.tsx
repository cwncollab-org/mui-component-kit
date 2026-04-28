import { createFileRoute } from '@tanstack/react-router'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ImageIcon from '@mui/icons-material/Image'
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { FileDropZone } from '../lib'

export const Route = createFileRoute('/file-dropzone-example')({
  component: FileDropZoneExample,
})

function FileDropZoneExample() {
  // controlled state for each demo
  const [basicFiles, setBasicFiles] = useState<File[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [singleFile, setSingleFile] = useState<File[]>([])
  const [errorFiles, setErrorFiles] = useState<File[]>([])

  return (
    <Paper sx={{ p: 3, maxWidth: 720 }}>
      <Typography variant='h5' gutterBottom>
        FileDropZone Example
      </Typography>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        Demonstrates the <code>FileDropZone</code> component (
        <code>FileDropZoneBase</code>) in various configurations.
      </Typography>

      <Stack spacing={4} divider={<Divider />} sx={{ mt: 3 }}>
        {/* ── 1. Basic controlled ─────────────────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            1 · Basic (controlled, multiple)
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Default appearance. Accepts any file type. The file list with remove
            buttons is rendered below the drop zone.
          </Typography>
          <FileDropZone
            label='Attachments'
            value={basicFiles}
            onChange={setBasicFiles}
            fullWidth
            helperText='Any file type accepted'
          />
          <Typography variant='caption' sx={{ mt: 1, display: 'block' }}>
            {basicFiles.length} file(s) selected
          </Typography>
        </Box>

        {/* ── 2. Accept filter — images only ──────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            2 · Accept filter (images only)
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            <code>accept</code> restricts to PNG / JPEG / GIF. Non-image files
            will be rejected. The accepted extensions are shown as a hint.
          </Typography>
          <FileDropZone
            label='Images'
            value={imageFiles}
            onChange={setImageFiles}
            accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
            icon={<ImageIcon sx={{ fontSize: 40, mb: 1, color: 'inherit' }} />}
            fullWidth
            helperText='Only image files will be accepted'
          />
        </Box>

        {/* ── 3. Single file ──────────────────────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            3 · Single file (<code>multiple=false</code>)
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Each drop replaces the previous selection.
          </Typography>
          <FileDropZone
            label='Upload document'
            value={singleFile}
            onChange={setSingleFile}
            multiple={false}
            accept={{ 'application/pdf': ['.pdf'] }}
            placeholder='Drop a PDF here, or click to select'
            helperText='Only one PDF at a time'
            fullWidth
          />
        </Box>

        {/* ── 4. Error state ──────────────────────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            4 · Error state
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            The <code>error</code> prop turns the border red and colours the
            helper text accordingly.
          </Typography>
          <FileDropZone
            label='Required upload'
            value={errorFiles}
            onChange={setErrorFiles}
            error={errorFiles.length === 0}
            helperText={
              errorFiles.length === 0
                ? 'At least one file is required'
                : undefined
            }
            fullWidth
          />
        </Box>

        {/* ── 5. Disabled ─────────────────────────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            5 · Disabled
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            The zone is greyed out and all interactions are blocked.
          </Typography>
          <FileDropZone
            label='Upload (locked)'
            disabled
            value={[]}
            helperText='Uploads are currently disabled'
            fullWidth
          />
        </Box>

        {/* ── 6. No file list, custom sx ──────────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            6 · Custom <code>sx</code> + <code>showFileList=false</code>
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            External file list rendered separately. The drop zone itself has a
            custom height and background via <code>sx</code>.
          </Typography>
          <FileDropZone
            label='Files'
            value={basicFiles}
            onChange={setBasicFiles}
            showFileList={false}
            fullWidth
            sx={{ minHeight: 140, bgcolor: 'action.hover' }}
          />
          <Stack direction='row' spacing={1} flexWrap='wrap' sx={{ mt: 1 }}>
            {basicFiles.map((f, i) => (
              <Chip
                key={i}
                icon={<AttachFileIcon />}
                label={f.name}
                size='small'
                onDelete={() =>
                  setBasicFiles(prev => prev.filter((_, idx) => idx !== i))
                }
              />
            ))}
            {basicFiles.length === 0 && (
              <Typography variant='caption' color='text.secondary'>
                No files yet
              </Typography>
            )}
          </Stack>
        </Box>

        {/* ── 7. render-prop children ─────────────────────────────────── */}
        <Box>
          <Typography variant='h6' gutterBottom>
            7 · Custom body via <code>children</code> render-prop
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            The <code>children</code> prop replaces the inner zone content
            entirely, giving full layout control while keeping all drag/drop
            wiring.
          </Typography>
          <FileDropZone fullWidth noClick>
            {({ getRootProps, getInputProps, isDragActive, open }) => (
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? 'secondary.main' : 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  bgcolor: isDragActive
                    ? 'secondary.light'
                    : 'background.paper',
                  transition: 'all 0.2s ease',
                }}
              >
                <input {...getInputProps()} />
                <Typography variant='body1' gutterBottom>
                  {isDragActive
                    ? '✨ Release to upload'
                    : 'Custom drop zone body'}
                </Typography>
                <Button variant='outlined' size='small' onClick={open}>
                  Browse files
                </Button>
              </Box>
            )}
          </FileDropZone>
        </Box>
      </Stack>
    </Paper>
  )
}
