import { Button } from '../../atoms/Button/Button'
import { Text } from '../../atoms/Text/Text'
import styles from './MenuList.module.css'

export interface MenuListItem<T extends string> {
  value: T
  label: string
}

interface MenuListProps<T extends string> {
  /** Name of the list, read by screen readers. */
  label: string
  items: MenuListItem<T>[]
  /** The item to mark as the current one, if any. */
  current?: T
  onSelect: (value: T) => void
}

// A plain list of pressable lines, in columns: for long menus where buttons
// would be too much (e.g. the development scene menu).
export function MenuList<T extends string>({ label, items, current, onSelect }: MenuListProps<T>) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item.value} className={styles.item} data-current={item.value === current || undefined}>
          <Button variant="bare" silent aria-current={item.value === current || undefined} onClick={() => onSelect(item.value)}>
            <Text size="small">{item.label}</Text>
          </Button>
        </li>
      ))}
    </ul>
  )
}
