import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProgressBar({ project }) {
  const [progress, setProgress] = useState(10);
  const [progressInput, setProgressInput] = useState("");
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("projects");

  const handleClick = () => {
    if (project.progressBar < 100) {
      setProgress(progress + 10);
    }

    if (project.progressBar === 100) {
      return;
    }

    updateDocument(project.id, {
      progressBar: progress,
    });
  };

  const handleInput = (e) => {
    e.preventDefault();

    updateDocument(project.id, {
      progressBar: progressInput,
    });

    setProgressInput("");
  };

  const progressColor = () => {
    if (project.progressBar < 40) {
      return "#ff0000";
    } else if (project.progressBar < 80) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };
  return (
    <div className="container-bar">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${project.progressBar}%`,
            backgroundColor: progressColor(),
          }}
        ></div>
      </div>
      <div className="progress-label">{project.progressBar}%</div>
      {project.progressBar === 100 && <p>Finished!</p>}
      {/* {user.uid === project.createdBy.id && project.progressBar < 100 && (
        <button className="btn" onClick={handleClick}>
          Make progress
        </button>
      )} */}

      {user.uid === project.createdBy.id && (
        <form onSubmit={handleInput}>
          <input
            type="number"
            min="0"
            max="100"
            onChange={(e) => setProgressInput(e.target.value)}
            value={progressInput}
            placeholder="0"
          />
        </form>
      )}
    </div>
  );
}
