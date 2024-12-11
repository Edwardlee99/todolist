"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <head>
        <title>To Do List</title>
      </head>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "40px",color: "blue", fontWeight:"bold" }}>
          Welcome to the To-Do List
        </h1>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={() => router.push('/create')}>
            Create To-Do List
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={() => router.push('/view')}>
            View To-Do List
          </button>
        </div>
      </div>
    </>
  );
}
