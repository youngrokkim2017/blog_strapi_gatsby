import React from 'react';
import { Link } from 'gatsby';

function Pagination({ totalCount, currentPage }) {
    const totalPages = Math.ceil(totalCount / 10);
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    // return (
    //     <div>
    //         <div>
    //             <Link 
    //                 disabled={prevPage <= 0 ? true : 'null'} 
    //                 to={`/archive/${prevPage}`}
    //             >
    //                 Prev
    //             </Link>
    //             <Link 
    //                 disabled={nextPage > totalPages ? true : 'null'} 
    //                 to={`/archive/${nextPage}`}
    //             >
    //                 Next
    //             </Link>
    //         </div>
    //     </div>
    // )

    if (prevPage <= 0) {
        return (
            <div>
                <div>
                    <Link to={`/archive/${nextPage}`} >
                        Next →
                    </Link>
                </div>
            </div>
        )
    } else if (nextPage > totalPages) {
        return (
            <div>
                <div>
                    <Link to={`/archive/${prevPage}`} >
                        ← Prev
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <Link to={`/archive/${prevPage}`} >
                        ← Prev
                    </Link>
                    <Link to={`/archive/${nextPage}`} >
                        Next →
                    </Link>
                </div>
            </div>
        )
    }
}

export default Pagination;