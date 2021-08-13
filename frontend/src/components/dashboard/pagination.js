import React from 'react';
import ReactPaginate from 'react-paginate';
import { Box } from '@chakra-ui/react';

function Pagination({ totalPages, setPage, page }) {
  return (
    <Box>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        initialPage={0}
        forcePage={page}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        // onPageChange={({ selected }) => {
        //   setPage(selected);
        //   window.scrollTo(0, 0);
        // }}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </Box>
  );
}

export default Pagination;
