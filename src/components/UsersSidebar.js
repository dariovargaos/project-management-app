import { useCollection } from "../hooks/useCollection";

//components
import Avatar from "./Avatar";

//styles
import "./UsersSidebar.css";

export default function UsersSidebar() {
  const { error, documents } = useCollection("users");
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="user-status"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
