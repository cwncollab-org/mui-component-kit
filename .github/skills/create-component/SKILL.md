---
name: create-component
description: "Create a new MUI form component in this library. Use when: adding a new form field component, wrapping a new MUI input, creating a Base/Field/Subscribe trio, registering a component in useAppForm, or adding a route example."
argument-hint: "<ComponentName> [module]"
---

# Create a New Component

This library uses a **three-tier component architecture** for all form field components, integrated with `@tanstack/react-form` and MUI v9.

## Architecture Overview

| File | Purpose |
|------|---------|
| `*Base.tsx` | Uncontrolled presentational component — no form context, pure props |
| `*.tsx` | TanStack Form `fieldContext`-aware wrapper using `useFieldContext` |
| `Subscribe*.tsx` | Form-level wrapper that subscribes to `isSubmitting` via `useFormContext` |

---

## Procedure

### 1. Identify the Module

Determine which module the component belongs to:
- `src/lib/form/` — form field components (most common)
- `src/lib/dialogs/` — dialog components
- `src/lib/table/` — table components
- `src/lib/tabs/` — tab components
- `src/lib/link/` — link components

### 2. Create `<ComponentName>Base.tsx`

```tsx
import { <MuiComponent>, <MuiComponentProps> } from '@mui/material'

export type <ComponentName>BaseProps = <MuiComponentProps> & {
  // Add any extra props here
}

export function <ComponentName>Base(props: <ComponentName>BaseProps) {
  const { ...rest } = props
  return <<MuiComponent> {...rest} />
}
```

Rules:
- Import MUI components with `as Mui*` prefix (e.g., `TextField as MuiTextField`)
- Export both the function and the props type
- Keep it purely presentational — no hooks, no context

### 3. Create `<ComponentName>.tsx` (Field-context wrapper)

```tsx
import { useFieldContext } from './formContext'
import { useMemo } from 'react'
import { <ComponentName>Base, <ComponentName>BaseProps } from './<ComponentName>Base'

export type <ComponentName>Props = Omit<<ComponentName>BaseProps, 'name' | 'value'> & {
  isLoading?: boolean
}

export function <ComponentName>(props: <ComponentName>Props) {
  const field = useFieldContext<string>()
  const { isLoading, disabled, onChange, ...rest } = props

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return undefined
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <<ComponentName>Base
      {...rest}
      error={Boolean(errorText)}
      helperText={errorText}
      name={field.name}
      value={isLoading ? '' : (field.state.value ?? '')}
      disabled={isLoading || disabled}
      onChange={(ev) => {
        onChange?.(ev)
        if (!ev.defaultPrevented) {
          field.handleChange(ev.target.value)
        }
      }}
    />
  )
}
```

Rules:
- Always omit `name` and `value` from the props type (controlled by field context)
- Use `useMemo` for `errorText`
- Pass TanStack Form metadata as `data-*` attributes when useful (see `Select.tsx` for example)

### 4. Create `Subscribe<ComponentName>.tsx`

```tsx
import { <ComponentName>, <ComponentName>Props } from './<ComponentName>'
import { useFormContext } from './formContext'

export type Subscribe<ComponentName>Props = <ComponentName>Props

export function Subscribe<ComponentName>(props: Subscribe<ComponentName>Props) {
  const form = useFormContext()
  const { disabled, ...rest } = props

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <<ComponentName> disabled={isSubmitting || disabled} {...rest} />
      )}
    </form.Subscribe>
  )
}
```

### 5. Register in `formHooks.ts`

Add the new component to `createFormHook` in [src/lib/form/formHooks.ts](../../../src/lib/form/formHooks.ts):

```ts
import { <ComponentName> } from './<ComponentName>'
import { Subscribe<ComponentName> } from './Subscribe<ComponentName>'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    // ... existing components ...
    <ComponentName>,
    Subscribe<ComponentName>,
  },
  // ...
})
```

### 6. Export from `form/index.ts`

Add to [src/lib/form/index.ts](../../../src/lib/form/index.ts):

```ts
export { type <ComponentName>Props } from './<ComponentName>'
export { type Subscribe<ComponentName>Props } from './Subscribe<ComponentName>'
// If Base is public:
export { <ComponentName>Base, type <ComponentName>BaseProps } from './<ComponentName>Base'
```

### 7. Create a Route Example

Add a demo route in `src/routes/<component-name>-example.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { z } from 'zod'

const formSchema = z.object({
  value: z.string().min(1, 'Required'),
})

export const Route = createFileRoute('/<component-name>-example')({
  component: <ComponentName>Example,
})

export function <ComponentName>Example() {
  const form = useAppForm({
    defaultValues: { value: '' },
    validators: { onChange: formSchema },
    onSubmit: async ({ value }) => console.log(value),
  })

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
        <Stack spacing={2}>
          <Typography variant="h6"><ComponentName> Example</Typography>
          <form.Field name="value">
            {(field) => <field.Subscribe<ComponentName> label="Value" fullWidth />}
          </form.Field>
        </Stack>
      </form>
    </Paper>
  )
}
```

Register the route in the router (`src/router.tsx` or auto-generated `routeTree.gen.ts` via TanStack Router).

---

## Checklist

- [ ] `<ComponentName>Base.tsx` created with `BaseProps` type exported
- [ ] `<ComponentName>.tsx` created using `useFieldContext`, omitting `name`/`value`
- [ ] `Subscribe<ComponentName>.tsx` created subscribing to `isSubmitting`
- [ ] Component registered in `formHooks.ts` `createFormHook`
- [ ] Types exported from `form/index.ts`
- [ ] Route example created in `src/routes/`
- [ ] Build passes: `npm run build`

---

## Key Patterns Reference

- MUI import alias: `import { TextField as MuiTextField } from '@mui/material'`
- Form context: `useFieldContext` from `./formContext`, `useFormContext` from `./formContext`
- Error text: always derived via `useMemo` from `field.state.meta.errors`
- State attributes: `data-isdirty`, `data-ispristine`, `data-istouched`, `data-isdefaultvalue`, `data-isvalid`
- Existing components to reference: `Select`, `TextField`, `Autocomplete`, `DatePicker`
