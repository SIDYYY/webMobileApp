import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*');

            if (error) console.error('Error fetching users:', error);
            else setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
