'use client'

import moment from "moment";
import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Update() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const time = moment().format('YYYY-MM-DD HH:mm:ss');

    useEffect(() => {
        if (!id) return; // If ID is not available, don't try to fetch
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/todolists/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description || ''); // Handle empty descriptions
                setStatus(data.status); // Default to an empty string or any default status
                setLoading(false);
            } catch (err) {
                setPopupMessage(`Error: ${err.message}`);
                setIsPopupOpen(true);
            }
        };

        getData();
    }, [id]); // Only run when 'id' is available

    const updateTodoLists = async (e) => {
        e.preventDefault();

        if (!status) {
            setPopupMessage('Please select a status.');
            setIsPopupOpen(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/todolists/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status,
                    updated_at: time,
                }),
            });

            if (response.ok) {
                setPopupMessage('You have successfully updated the To-Do list!');
                setIsSuccess(true);
            } else {
                setPopupMessage(`Error: Unable to update To-Do list (Status Code: ${response.status})`);
                setIsSuccess(false);
            }
        } catch (error) {
            setPopupMessage(`Error: ${error.message}`);
            setIsSuccess(false);
        } finally {
            setIsPopupOpen(true);
        }
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        if (isSuccess) {
            router.push('/view');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <>
            <head>
                <title>Update To Do List</title>
            </head>
            <div style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "10px" }}>
                <button style={{ marginRight: '10px' }} onClick={() => router.push('/')}>Home</button>
                <button onClick={() => router.back()}>Back</button>
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update Your To Do Lists
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={updateTodoLists}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="textbox sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textbox description"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="textbox sm"
                                >
                                     <option value="">Select a status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="form-button"
                            >
                                Update
                            </button>
                        </div>
                    </form>

                    {isPopupOpen && (
                        <Popup open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)} modal nested>
                            <div className="modal">
                                <button className="close" onClick={() => setIsPopupOpen(false)}>
                                    &times;
                                </button>
                                <div className="header">Message</div>
                                <div className="content">{popupMessage}</div>
                                <div className="actions">
                                    <button className="button" onClick={handlePopupClose}>
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    )}
                </div>
            </div>
        </>
    );
}
