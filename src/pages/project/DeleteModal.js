import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({ closeDelete, project }) {
  const { deleteDocument } = useFirestore("projects");
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDocument(project.id);
    navigate("/");
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-delete">
        <h2 className="page-title-delete">
          Are you sure you want to delete project?
        </h2>
        <div className="delete-modal-btns">
          <button className="btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn" onClick={closeDelete}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
