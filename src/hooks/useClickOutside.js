import { useEffect } from 'react';

const useClickOutside = (ref, onClickOutside) => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            onClickOutside();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

export default useClickOutside;
