import { ReactNode } from 'react';

interface ModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose, children }) => {
    return (
        <div
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center items-center transition-colors
                ${isModalOpen ? 'visible bg-black/20' : 'invisible'}
            `}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white w-1/3 rounded-xl shadow transition-all
                    ${isModalOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
                `}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
