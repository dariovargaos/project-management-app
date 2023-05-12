import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

//components
import Avatar from "../../components/Avatar";
import ProgressBar from "./ProgressBar";
import ProjectEdit from "./ProjectEdit";
import ProjectLogs from "./ProjectLogs";
import DeleteModal from "./DeleteModal";

export default function ProjectSummary({ project }) {
  const { user } = useAuthContext();

  const [showEditForm, setShowEditForm] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const closeEdit = () => {
    setShowEditForm(false);
  };

  const closeLogs = () => {
    setShowLogs(false);
  };

  const closeDelete = () => {
    setShowDelete(false);
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      <ProgressBar project={project} />
      <div className="project-btns">
        {user.uid === project.createdBy.id && (
          <button className="btn" onClick={() => setShowDelete(true)}>
            Delete project
          </button>
        )}
        {user.uid === project.createdBy.id && (
          <button className="btn" onClick={() => setShowEditForm(true)}>
            Edit project
          </button>
        )}
        <button className="btn" onClick={() => setShowLogs(true)}>
          Project logs
        </button>

        {showEditForm && (
          <ProjectEdit closeEdit={closeEdit} project={project} />
        )}

        {showLogs && <ProjectLogs closeLogs={closeLogs} project={project} />}

        {showDelete && (
          <DeleteModal closeDelete={closeDelete} project={project} />
        )}
      </div>
    </div>
  );
}
