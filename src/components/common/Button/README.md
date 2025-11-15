# Button Component

Usage, props, accessibility and testing guidance for the shared Button component.

## Usage

Import:

```ts
import { Button } from '@components/common/Button';
```

Basic usage:

```tsx
<Button title="Save" onPress={handleSave} />
```

## Props

- title: string — Button text
- onPress: () => void — Handler for press
- variant?: 'primary' | 'secondary' | 'outline' | 'ghost' — Visual variant (default: primary)
- size?: 'small' | 'medium' | 'large' — Button size (default: medium)
- disabled?: boolean — Disabled visual & behavior
- loading?: boolean — Shows ActivityIndicator and disables press
- fullWidth?: boolean — Expand to container width
- leftIcon?: React.ReactNode — Optional left icon
- rightIcon?: React.ReactNode — Optional right icon
- style?: ViewStyle — Pass additional style
- accessibilityLabel?: string — Override a11y label
- accessibilityHint?: string — a11y hint
- testID?: string — test identifier

## Accessibility

- Button sets `accessibilityRole="button"`.
- `accessibilityLabel` defaults to the button `title` unless overridden.
- Loading state sets `accessibilityState.busy = true` and `accessibilityLabel` to `Loading...` if not provided.
- Ensure `accessibilityHint` is used for complex actions.

## Testing

- Use `getByText` or `getByLabelText` to query buttons.
- Pass `testID` for more deterministic queries in tests.
- Loading state replaces the title with an ActivityIndicator; query the ActivityIndicator via `getByTestId` if needed.

## Notes

- Prefer theme colors and sizes rather than inline styles.
- Buttons are memoizable and lightweight; avoid inline functions for onPress in lists.
