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
                className='bg-white rounded-lg p-6 px-20 shadow-lg max-w-[40rem] w-full max-h-[24rem] h-full'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default CreateWalletModal