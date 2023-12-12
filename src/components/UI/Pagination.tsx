import { IPaginationProps } from '../../models'
import { usePagination, DOTS } from '../../hooks/usePagination'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './UI.scss'
const Pagination: React.FC<IPaginationProps> = ({ total, limit, page, setSearchParams }) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit
  })

  if (!paginationRange || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    const nextPage = (page + 1).toString()
    setSearchParams({ page: nextPage })
  }

  const onPrevious = () => {
    const previousPage = (page - 1).toString()
    setSearchParams({ page: previousPage })
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className='paginationContainer'>
      <li>
        <button className='paginationItem paginationButton' disabled={page === 1} onClick={onPrevious}>
          <HiOutlineChevronLeft />
        </button>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index}>
              <span className='paginationItem dot'>...</span>
            </li>
          )
        }

        return (
          <li key={index}>
            <span
              className={`paginationItem ${pageNumber === page ? 'active' : ''}`}
              onClick={() => setSearchParams({ page: pageNumber.toString() })}
            >
              {pageNumber}
            </span>
          </li>
        )
      })}
      <li>
        <button className='paginationItem paginationButton' disabled={page === lastPage} onClick={onNext}>
          <HiOutlineChevronRight />
        </button>
      </li>
    </ul>
  )
}
export default Pagination
