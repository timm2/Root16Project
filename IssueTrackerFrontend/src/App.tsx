
import { useEffect, useState } from "react";
import { getIssues, getStatuses, getUsers } from "./services/api";
import IssueTable from "./components/IssueTable";
import type { Issue } from "./types/Issue";
import type { Status } from "./types/Status";
import type { User } from "./types/User";

function App() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [users, setUsers] = useState<User[]>([]);


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

        const fetchUsers = async () => {
          try {
            const data = await getUsers();
            setUsers(data);
          } catch (error) {
            console.error("Failed to fetch users:", error);
          }
        };

        fetchIssues();
        fetchStatuses();
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: "24px" }}>
            <h1>Issue Tracker</h1>

            {loading ? (
                <p>Loading issues...</p>
            ) : (
              <IssueTable issues={issues} statuses={statuses} users={users} />
                
            )}
        </div>
    );
}

export default App;
