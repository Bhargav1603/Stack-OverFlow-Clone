import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import './pagination.css'

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../actions/questions'

const Paginate = ({ page }) => {
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.questions)

    useEffect(() => {
        if (page) dispatch(getQuestions(page));
    }, [page])

    return (
        <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            color="primary"
            size="large"
            // shape="rounded"
            // variant="outlined"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/questions?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;