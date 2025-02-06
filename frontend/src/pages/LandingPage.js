import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AnalyzePage() {
    const [inputText, setInputText] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) {
            toast.error("Please enter some text to analyze!");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5001/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText }),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setResponse(data);
            toast.success("Text analyzed successfully!");
        } catch (error) {
            console.error("Error submitting text:", error);
            toast.error("Failed to analyze text. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black-100 ">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-4">Advanced Text Analysis</h1>
            <p className="text-center text-gray-600 mb-8">
                Analyze your text for Vectara similarity and toxicity scores using our cutting-edge AI technology.
            </p>
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="border outline-none p-3 rounded w-full h-32 resize-none"
                        placeholder="Enter your text here..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="inline-block animate-spin" />
                        ) : (
                            "Analyze Text"
                        )}
                    </button>
                </form>
                {response && (
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-100 rounded-lg text-center">
                            <h3 className="font-bold text-green-700">Vectara Score</h3>
                            <p className="text-2xl font-semibold text-green-800">{response.vectara || "N/A"}</p>
                        </div>
                        <div className="p-4 bg-blue-100 rounded-lg text-center">
                            <h3 className="font-bold text-blue-700">Toxicity Score</h3>
                            <p className="text-2xl font-semibold text-blue-800">{response.toxicity || "N/A"}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnalyzePage;
