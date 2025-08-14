import React from 'react'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode;
}

const CreateWalletModal:React.FC<ModalProps>= ({isOpen, onClose, children}) => {
    if(!isOpen) return null;

    return(
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={onClose}
        >
            <div
                className='bg-white rounded-1g p-6 shadow-lg max-w-lg w-full'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default CreateWalletModal