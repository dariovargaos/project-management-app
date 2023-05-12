import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("Document that you are looking for does not exist.");
        }
      },
      (error) => {
        console.log(error.message);
        setError("Failed to get documents.");
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
