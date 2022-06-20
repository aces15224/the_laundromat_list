import React from "react";

function Pagination({dataLength, resultsLength, paginate, currentPage}){
    const pageNumbers = [];
    //Total results / number of results per page.  Round up for the amount of pages required to show all results..
    for(let i = 1; i <=  Math.ceil(dataLength / resultsLength); i++){
        // for each number pushed, display a button to control pagination
        pageNumbers.push(i)
    }
    return( 
        <nav style={{zIndex: 5}}>
            <ul className='pagination pagination-lg'>
                {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? "page-item active" : 'page-item'}>
                    {/* paginate() will set state in searchForm and controls which page of results to display */}
                    <a onClick={() => paginate(number)} className='page-link'>
                        {number}
                    </a>
                </li>
                ))}
            </ul>
        </nav> 
    )
}

export default Pagination;