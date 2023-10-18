import { usePagination, DOTS } from "src/utils/usePagination";

export const Pagination = (props) => {

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageCount,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageCount
    });

    // if (currentPage === 0 || paginationRange.length < 2) {
    //   return null;
    // }

    const onNext = () => {
      onPageChange(currentPage + 1);
    };
  
    const onPrevious = () => {
      onPageChange(currentPage - 1);
    };
    
    console.log(currentPage);
    

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
            Showing {22}-{30} of 100
            </span>
            <span className="col-span-2"></span>

            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                <li className={`${currentPage === 1 ? 'hidden' : ''}`} onClick={onPrevious}>
                    <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                    <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                    </button>
                </li>
                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li key={index}>
                                <span className="px-3 py-1">...</span>
                            </li>
                        )
                    }

                    return (
                        <li key={index} onClick={() => onPageChange(pageNumber)}>
                            <button className={`${pageNumber === currentPage ? 
                                    'px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple' 
                                        : 
                                    'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'
                            }`}>
                                {pageNumber}
                            </button>
                    </li>
                    )
                })}
                <li className={`${currentPage === lastPage ? 'hidden' : ''}`} onClick={onNext}>
                    <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                    </button>
                </li>
                </ul>
            </nav>
            </span>
        </div>
    )
}