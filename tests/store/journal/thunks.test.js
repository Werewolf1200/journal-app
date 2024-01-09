import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => {
   
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote Debe crear una nota nueva en blanco', async() => {

        const uid = '123456';
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
        }));

        // Borrar de Firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);

    });
});