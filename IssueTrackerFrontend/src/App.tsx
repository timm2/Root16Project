import { useEffect, useState } from "react";
import { getIssues } from "./services/api";
import type { Issue } from "./types/Issue";

function App() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const data = await getIssues();
                setIssues(data);
            } catch (error) {
                console.error("Failed to fetch issues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    if (loading) {
        return <p>Loading issues...</p>;
    }

    return (
        <div style={{ padding: "24px" }}>
            <h1>Issue Tracker</h1>

            <h2>Issues</h2>

            {issues.map(issue => (
                <div key={issue.id}>
                    <h3>{issue.title}</h3>
                    <p>{issue.description}</p>
                    <p>Status ID: {issue.statusId}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default App;