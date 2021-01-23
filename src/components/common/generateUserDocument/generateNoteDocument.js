import {firestore} from '../../../firebase';

export const generateNoteDocument = async (user, data) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}/notes/${data.createdAt}`);
  const snapshot = await userRef.get();
  try {
    await userRef.set({
      ...data
    });
  } catch (error) {
    console.error("Error creating user note document", error);
  }
  return getNoteDocument(user.uid,data.createdAt);
};

const getNoteDocument = async (uid,timeStamp) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}/notes/${timeStamp}`).get();
    return {
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching note", error);
  }
};
