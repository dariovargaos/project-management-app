import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";

//styles
import "./Project.css";

//components
import Select from "react-select";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function ProjectEdit({ closeEdit, project }) {
  const { updateDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  // form fields
  const [name, setName] = useState(project.name);
  const [details, setDetails] = useState(project.details);
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category.");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please select at least 1 user for the project.");
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    await updateDocument(project.id, {
      name: name,
      details: details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      assignedUsersList: assignedUsersList,
    });

    if (!response.error) {
      closeEdit();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="page-title">Edit project</h2>
        <span>
          <button className="close-btn" onClick={closeEdit}>
            Close
          </button>
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Project name:</span>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>Project details:</span>
            <textarea
              required
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </label>
          <label>
            <span>Set due date:</span>
            <input
              required
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label>
            <span>Project category</span>
            <Select
              options={categories}
              onChange={(option) => setCategory(option)}
            />
          </label>
          <label>
            <span>Assign to:</span>
            <Select
              options={users}
              onChange={(option) => setAssignedUsers(option)}
              isMulti
            />
          </label>
          <button className="btn">Save project</button>
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
}
