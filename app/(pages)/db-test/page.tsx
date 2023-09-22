"use client";
import bootstrapDb from "@/app/lib/bootstrap-db";
import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState<string | null>(null);
    const [creationResult, setCreationResult] = useState<string | null>(null);


    const testDatabaseConnection = async () => {
        try {
            const response = await fetch("/api/test-db");
            if (response.ok) {
                setResult("Database connection was successful");
            } else {
                setResult("Database connection failed");
            }
        } catch (error) {
            console.error("Client-side request error:", error);
            setResult("Database operation failed");
        }
    };

    const createTestUser = async () => {
        try {
            const response = await fetch("/api/create-test-user");
            if (response.ok) {
                setCreationResult("User creation was successful");
            } else {
                setCreationResult("User creation failed");
            }
        } catch (error) {
            console.error("Client-side request error:", error);
            setCreationResult("User creation failed");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Test Database Connection</h1>
            {result && <p>{result}</p>}
            {result && <button
                onClick={createTestUser}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Create Marius - check db after
            </button>}
            {creationResult && <p>{creationResult}</p>}

            <button
                onClick={testDatabaseConnection}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Test db connection
            </button>
        </main>
    );
}
