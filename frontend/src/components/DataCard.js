import { useState, useEffect } from 'react';
import { fetchInvestorMentor } from '../services/api';

const DataCard = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const investorMentor = await fetchInvestorMentor();
                setData(investorMentor);
            } catch (error) {
                console.error(error);
            }   
        };
        fetchData();  
    }, []);

    return (
        <div className='mt-6 w-full'>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className='p-4 border rounded-lg shadow-md mb-4'>
                        <h2 className='text-lg font-semibold'>{item.name}</h2>
                        <p className='text-gray-600'>Category: {item.category}</p>
                        <p className='text-gray-600'>Type: {item.type}</p>
                    </div>
                ))
            ) : (
                <p className='text-center'>No data available</p>
            )}
        </div>
    );
};

export default DataCard;