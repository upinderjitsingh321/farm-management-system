import React, { useEffect, useState } from "react";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading users...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="p-4 shadow-lg rounded-lg">
                        <div>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-gray-400 text-sm">{user.phone}</p>
                            <button className="mt-2">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList;
