import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AnalyzePage() {
    const [inputText, setInputText] = useState("");
    const [response, setResponse] = useState(null);
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("trends");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/history");
                const data = await res.json();
                setHistory(data);
                setFilteredHistory(data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        let filtered = history;

        if (searchQuery) {
            filtered = filtered.filter(entry =>
                entry.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedDate) {
            filtered = filtered.filter(entry =>
                new Date(entry.timestamp).toISOString().split("T")[0] === selectedDate
            );
        }

        setFilteredHistory(filtered);
    }, [searchQuery, selectedDate, history]);

    const graphData = {
        labels: filteredHistory.map(row => new Date(row.timestamp).toLocaleString()),
        datasets: [
            {
                label: "Toxicity Score",
                data: filteredHistory.map(row => row.scores.toxicity || 0),
                borderColor: "red",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
            {
                label: "Vectara Score",
                data: filteredHistory.map(row => row.scores.vectara || 0),
                borderColor: "blue",
                backgroundColor: "rgba(54, 187, 235, 0.2)",
                tension: 0.4,
            }
        ],
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <ToastContainer />
            <aside className="w-1/4 bg-white shadow-md p-4">
                <h2 className="text-lg font-bold">FILTERS</h2>
                <button onClick={() => {
                    setSearchQuery("");
                    setSelectedDate("");
                }} className="text-blue-500 text-sm"></button>
                <div className="mt-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search analyses..." 
                            className="w-full pl-10 p-2 border rounded" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block font-semibold">Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-2.5 text-gray-400" />
                            <input 
                                type="date" 
                                className="w-full pl-10 p-2 border rounded" 
                                value={selectedDate} 
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 p-6">
                <div className="flex gap-6 border-b">
                    <button onClick={() => setActiveTab("trends")} className={`py-2 px-4 ${activeTab === "trends" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}>Analysis Trends</button>
                    <button onClick={() => setActiveTab("history")} className={`py-2 px-4 ${activeTab === "history" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}>Analysis History</button>
                </div>
                {activeTab === "trends" ? (
                    <div className="mt-6">
                        {filteredHistory.length > 0 ? <Line data={graphData} /> : <p>No data available to display trends.</p>}
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        {filteredHistory.map((entry, index) => (
                            <div key={index} className="bg-white p-4 shadow rounded">
                                <p className="text-gray-500">{new Date(entry.timestamp).toLocaleDateString()}</p>
                                <p className="font-semibold">{entry.text}</p>
                                <p className="text-blue-500">Vectara Score: {entry.scores.vectara.toFixed(5)}%</p>
                                <p className="text-red-500">Toxicity Score: {entry.scores.toxicity.toFixed(5)}%</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default AnalyzePage;
