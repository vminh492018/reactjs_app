//Xử lý việc phân trang
import { IArticleState } from '../../models'

export const getPagination = (state: IArticleState): number[] => {
  const { total, limit } = state
  const length = Math.ceil(total / limit)
  return Array.from({ length }, (_, i) => i + 1)
}
