import Link from "next/link";
import { useRouter } from "next/router";
import { usePagination, DOTS } from "src/utils/usePagination";
import queryString from 'query-string';

export const Pagination = (props: any) => {
    const router = useRouter();
    const currentUrl = router.asPath;
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

    console.log(currentPage,"currentPage");


    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        // <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        //     {/* <span className="flex items-center col-span-3">
        //     Showing {1}-{2} of 100
        //     </span>
        //     <span className="col-span-2"></span> */}

        //     <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        //     <nav aria-label="Table navigation">
        //         <ul className="inline-flex items-center">
        //         <li className={`${currentPage === 1 ? 'hidden' : ''}`} onClick={onPrevious}>
        //             <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
        //             <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        //                 <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
        //             </svg>
        //             </button>
        //         </li>
        //         {paginationRange?.map((pageNumber, index) => {
        //             if (pageNumber === DOTS) {
        //                 return (
        //                     <li key={index}>
        //                         <span className="px-3 py-1">...</span>
        //                     </li>
        //                 )
        //             }

        //             return (
        //                 <li key={index} onClick={() => onPageChange(pageNumber)}>
        //                     <button className={`${pageNumber === currentPage ? 
        //                             'px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple' 
        //                                 : 
        //                             'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'
        //                     }`}>
        //                         {pageNumber}
        //                     </button>
        //             </li>
        //             )
        //         })}
        //         <li className={`${currentPage === lastPage ? 'hidden' : ''}`} onClick={onNext}>
        //             <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
        //             <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
        //                 <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
        //             </svg>
        //             </button>
        //         </li>
        //         </ul>
        //     </nav>
        //     </span>
        // </div>

        <>
            <div className="w-full flex justify-center">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li
                            onClick={onPrevious}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Previous
                        </li>
                        {
                            paginationRange?.map((item: string, index: nunber) => {
                                return <>
                                    <li onClick={() => onPageChange(item)}>
                                        <Link
                                            className={ "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                                            href={`${currentUrl}`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                </>
                            })
                        }
                        <li
                            onClick={onNext}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

                        >
                            Next
                        </li>
                    </ul>
                </nav>

            </div>
        </>
    )
}