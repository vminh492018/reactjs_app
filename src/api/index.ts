import { ClearItem, GetItem, IUser, StoreItem } from '../models'

export const storeItem: StoreItem = (item) => {
  const [itemName, itemValue] = Object.entries(item)[0]
  localStorage[itemName] = itemValue
}

export const getItem: GetItem = (item) => {
  return localStorage.getItem(item)
}

export const clearItem: ClearItem = (item) => {
  localStorage.removeItem(item)
}

export const isAuthenticated = (): boolean => {
  const token = getItem('token')
  return token ? true : false
}

export const currentUser = (): IUser | null => {
  const user = getItem('currentUser') ? JSON.parse(getItem('currentUser') as string) : null

  return user
}
