import React from 'react';
import { Link } from 'gatsby';

function Pagination({ totalCount, currentPage }) {
    const totalPages = Math.ceil(totalCount / 10);
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    const firstPage = 1;
    const lastPage = totalPages;
    // const pageNumbers = [(totalPages - (totalPages - currentPage + 2)), (totalPages - (totalPages - currentPage + 1)), (totalPages - (totalPages - currentPage)), (totalPages - (totalPages - currentPage - 1)), (totalPages - (totalPages - currentPage - 2))];
    // const filteredNumbers = pageNumbers.filter((num) => (num > firstpage && num < lastPage))

    if (prevPage <= 0) {
        return (
            <div>
                <div>
                    {/* {Array.from([(totalPages - (totalPages - currentPage)), (totalPages - (totalPages - currentPage - 1)), (totalPages - (totalPages - currentPage - 2)), (totalPages - (totalPages - currentPage - 3)), (totalPages - (totalPages - currentPage - 4))], (page, i) => (
                      <Link to={`/archive/${page}`}>
                        {page}
                      </Link>
                    ))} */}
                    <Link to={`/archive/${nextPage}`}>
                        Next →
                    </Link>
                    <Link to={`/archive/${lastPage}`}>
                        Last →→
                    </Link>
                </div>
            </div>
        )
    } else if (nextPage > totalPages) {
        return (
            <div>
                <div>
                    <Link to={`/archive/${firstPage}`}>
                        ←← First
                    </Link>
                    <Link to={`/archive/${prevPage}`}>
                        ← Prev
                    </Link>
                    {/* {Array.from([(totalPages - (totalPages - currentPage + 4)), (totalPages - (totalPages - currentPage + 3)), (totalPages - (totalPages - currentPage + 2)), (totalPages - (totalPages - currentPage + 1)), (totalPages - (totalPages - currentPage))], (page, i) => (
                      <Link to={`/archive/${page}`}>
                        {page}
                      </Link>
                    ))} */}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <Link to={`/archive/${firstPage}`}>
                        ←← First
                    </Link>
                    <Link to={`/archive/${prevPage}`} >
                        ← Prev
                    </Link>
                    {/* {Array.from([(totalPages - (totalPages - currentPage + 2)), (totalPages - (totalPages - currentPage + 1)), (totalPages - (totalPages - currentPage)), (totalPages - (totalPages - currentPage - 1)), (totalPages - (totalPages - currentPage - 2))], (page, i) => ( */}
                    {/* {Array.from(filteredNumbers, (page, i) => (
                      <Link to={`/archive/${page}`}>
                        {page}
                      </Link>
                    ))} */}
                    <Link to={`/archive/${nextPage}`} >
                        Next →
                    </Link>
                    <Link to={`/archive/${lastPage}`}>
                        Last →→
                    </Link>
                </div>
            </div>
        )
    }
}

export default Pagination;