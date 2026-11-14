
import { useEffect, useState } from "react";
import { getIssues, getStatuses } from "./services/api";
import IssueTable from "./components/IssueTable";
import type { Issue } from "./types/Issue";
import type { Status } from "./types/Status";

function App() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState<Status[]>([]);

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
        const fetchStatuses = async () => {
          try {
            const data = await getStatuses();
            setStatuses(data);
          } catch (error) {
            console.error("Failed to fetch statuses:", error);
          }
        }

        fetchIssues();
        fetchStatuses();
    }, []);

    return (
        <div style={{ padding: "24px" }}>
            <h1>Issue Tracker</h1>

            {loading ? (
                <p>Loading issues...</p>
            ) : (
                <IssueTable issues={issues} statuses={statuses} />
            )}
        </div>
    );
}

export default App;
