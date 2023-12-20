import React, {useState, useEffect} from 'react';
import axios from 'axios'
import CardComponent from './CardComponent';


interface User{
    id: number;
    name: string,
    email: string,
}


interface UserInterfaceProps{
    backendName: string
}

const UserInterface: React.FC<UserInterfaceProps> = ({backendName}) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const [users, setUsers] = useState<User[]>([]);

    const [newUser, setNewUser] = useState({name: '', email: ''});
    const [updateUser, setUpdateUser] = useState({id: '', name: '', email: ''});

    const backgroundColors: {[key: string]: string} = {
        rust: 'bg-orange-500'
    };

    const buttonColors: {[key: string]: string} = {
        rust: 'bg-orange-700 hover:bg-orange-600'
    };

    const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
    const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
                setUsers(response.data.reverse());
            } catch(err){
                console.error('error fetching data', err);
            }
        };
        fetchData();
    }, [backendName, apiUrl])


    return (
        <div className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
      
        <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />

            <div className='space-y-4'>
                {users.map((user) => (
                    <div key={user.id} className='flex item-center justify-between bg-white p-4 rounded-lg shadow'>
                      <CardComponent card={user}/>
                      {/* <button onClick={()=> deleteUser(user.id)} className={`${btnColor} text-white py-x px-4 rounded`}>
                            Delete User
                        </button>   */}
                    </div>
                ))} 
            </div>
        </div>
        )

}

export default UserInterface;