import { FaEnvira } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../../redux/hooks';
import PathConstants from '../../../routes/pathConstants';

const Header: React.FC = () => {
    const deposit = useAppSelector((state) => state.deposit);
    const { amount } = deposit;

    return (
        <div className="container px-6 py-4 mx-auto my-5 rounded-lg flex justify-between bg-primary shadow">
            <Link to={PathConstants.HOME}>
                <FaEnvira className="text-4xl" />
            </Link>
            <div className="flex items-center gap-5">
                <p> Balance: ${amount} </p>
                <UserMenu />
            </div>
        </div>
    );
};

export default Header;
