'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function View() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://localhost:3000/todolists");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTasks(data); // Set the fetched data to state
            } catch (err) {
                setError(err.message); // Handle errors
            }
        };

        getData();
    }, []);

    const handleEdit = (id) => {
        router.push(`/update?id=${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/todolists/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Error deleting task with ID: ${id}`);
                }
                setTasks(tasks.filter(task => task.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <>
            <head>
                <title>To Do List</title>
            </head>
            <div>
                <div style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "10px" }}>
                    <button style={{ marginRight: '10px' }} onClick={() => router.push('/')}>Home</button>
                    <button onClick={() => router.push('/create')}>Create A To Do List</button>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        To Do Lists Table
                    </h2>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
                                        {error}
                                    </td>
                                </tr>
                            ) : tasks.length > 0 ? (
                                tasks.map(({ id, title, description, status, created_at, updated_at }) => (
                                    <tr key={id}>
                                        <td>{title}</td>
                                        <td>{description ? description : ''}</td>
                                        <td>{status}</td>
                                        <td>{new Date(created_at).toLocaleString()}</td>
                                        <td>{new Date(updated_at).toLocaleString()}</td>
                                        <td>
                                            <button className=" button edit" style={{ marginRight: '5px' }} onClick={() => handleEdit(id)}> Edit </button>
                                            <button className=" button delete" onClick={() => handleDelete(id)}> Delete </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                        Loading...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

