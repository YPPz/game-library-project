import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate(`/search?term=${term}`);
        setTerm('')
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-full'>
                <input
                    placeholder='Search...'
                    className="w-full px-4 py-2 rounded-md outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    value={term}
                    onChange={(e) => { setTerm(e.target.value) }}
                />
            </form>
        </div>
    )
}