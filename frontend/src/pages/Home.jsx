import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then((response) => {
                console.log(response.data);
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books Lists</h1>
                <Link to={'/books/create'}>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {
                loading ? (
                    <Spinner />

                ) : (
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>no</th>
                                <th className='border border-slate-600 rounded-md'>title</th>
                                <th className='border border-slate-600 rounded-md max-md:hidden'>author</th>
                                <th className='border border-slate-600 rounded-md'>publish year</th>
                                <th className='border border-slate-600 rounded-md'>operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book._id} className='h-8'>
                                    <td className='border border-slate-600 rounded-md text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='border border-slate-600 rounded-md text-center'>
                                        {book.title}
                                    </td>
                                    <td className='border border-slate-600 rounded-md text-center'>
                                        {book.author}
                                    </td>
                                    <td className='border border-slate-600 rounded-md text-center'>
                                        {book.publishYear}
                                    </td>
                                    <td className='border border-slate-600 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/books/details/${book._id}`}>
                                                <BsInfoCircle className='text-3xl text-green-800' />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`}>
                                                <AiOutlineEdit className='text-3xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`}>
                                                <MdOutlineDelete className='text-3xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}
export default Home;