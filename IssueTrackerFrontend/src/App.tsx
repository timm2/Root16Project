
import { useEffect, useState } from "react";
import { getIssues } from "./services/api";
import IssueTable from "./components/IssueTable";
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

    return (
        <div style={{ padding: "24px" }}>
            <h1>Issue Tracker</h1>

            {loading ? (
                <p>Loading issues...</p>
            ) : (
                <IssueTable issues={issues} />
            )}
        </div>
    );
}

export default App;
