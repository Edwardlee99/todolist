'use client'

import moment from "moment";
import { useState } from "react";
import Popup from 'reactjs-popup';
import { useRouter } from 'next/navigation';

export default function Create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    const router = useRouter();

    const createTodoLists = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/todolists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    created_at: time,
                    updated_at: time,
                }),
            });

            if (response.ok) {
                setPopupMessage('You have successfully created a To-Do list!');
                setIsSuccess(true);
            } else {
                setPopupMessage(`Error: Unable to create To-Do list (Status Code: ${response.status})`);
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
            window.location.reload();
        }
    };

    return (
        <>
            <head>
                <title>To Do List</title>
            </head>
            <div style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "10px" }}>
                <button style={{ marginRight: '10px' }} onClick={() => router.push('/')}>Home</button>
                <button onClick={() => router.push('/view')}>View A To Do Lists</button>
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create Your To Do List
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={createTodoLists}>
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
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textbox description"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="form-button"                            >
                                Create
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
                                    <button className="button" onClick={() => { handlePopupClose() }}>
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    )}
                </div>
            </div>
        </>
    )
}
