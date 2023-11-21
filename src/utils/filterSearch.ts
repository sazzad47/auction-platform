import { useNavigate, useLocation } from 'react-router-dom';

const filterSearch = ({ sold, page, limit }: { sold?: boolean; page?: number; limit?: number }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    if (sold !== undefined) queryParams.set('sold', sold.toString());
    if (page !== undefined) queryParams.set('page', page.toString());
    if (limit !== undefined) queryParams.set('limit', limit.toString());

    navigate({
        pathname: location.pathname,
        search: '?' + queryParams.toString(),
    });
};

export default filterSearch;
