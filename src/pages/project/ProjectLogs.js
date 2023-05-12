import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//components
import Avatar from "../../components/Avatar";

//styles
import "./Project.css";

export default function ProjectLogs({ closeLogs, project }) {
  const [newLog, setNewLog] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newLog,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      logs: [...project.logs, logToAdd],
    });
    if (!response.error) {
      setNewLog("");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="page-title">Project logs</h2>
        <button className="close-btn" onClick={closeLogs}>
          Close
        </button>
        <div className="project-comments">
          {(!project.logs || project.logs.length === 0) && (
            <p className="comment-content">No logs yet!</p>
          )}
          <ul>
            {project.logs?.length > 0 &&
              project.logs.map((log) => (
                <li key={log.id}>
                  <div className="comment-author">
                    <Avatar src={log.photoURL} />
                    <p>{log.displayName}</p>
                  </div>
                  <div className="comment-date">
                    <p>
                      {formatDistanceToNow(log.createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="comment-content">
                    <p>{log.content}</p>
                  </div>
                </li>
              ))}
          </ul>

          {user.uid === project.createdBy.id ? (
            <form className="add-comment" onSubmit={handleSubmit}>
              <label>
                <span>Add new log</span>
                <textarea
                  required
                  onChange={(e) => setNewLog(e.target.value)}
                  value={newLog}
                ></textarea>
              </label>
              <button className="btn">Add log</button>
            </form>
          ) : (
            <p>You don't have permission to add logs.</p>
          )}
        </div>
      </div>
    </div>
  );
}
