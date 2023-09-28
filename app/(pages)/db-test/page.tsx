"use client";
import { useState } from "react";

interface ApiResponse {
    data: string
}

export default function Home() {
    const [result, setResult] = useState<string | null>(null);
    const [creationResult, setCreationResult] = useState<string | null>(null);

    const testDatabaseConnection = async () => {
        const response = await fetch("/api/test-db");

        if (response.ok) {

            try {
                const apiResult: ApiResponse = await response.json();
                setResult(apiResult.data);
            } catch (error) {
                console.error("Failed to parse json response:", error);
                setResult("Failed to parse json response");
            }
        } else {
            setResult("Database connection failed");
        }
    };

    const initiateDatabaseBootstrap = async () => {
        try {
            const response = await fetch("/api/bootstrap-db");
            if (response.ok) {
                setCreationResult("db bootstrap was successful");
            } else {
                setCreationResult("db boostrap failed.");
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
            {result && (
                <button
                    onClick={initiateDatabaseBootstrap}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Run database bootstrap (check db after)
                </button>
            )}
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
