import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Caritem from "./CarItem";
import AddCar from "./AddCar";
import { useNavigate } from "react-router-dom";

const Cars = () => {
    const context = useContext(NoteContext);
    const { notes, fetchNote, editNote } = context;

    const [note, setNote] = useState({
        eid: "",
        etitle: "",
        edescription: "",
        etag: { car_type: "", company: "", dealer: "" },
        eimages: "",
    });

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchNote();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [fetchNote]);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            eid: currentNote._id,
            etitle: currentNote.title,
            etag: currentNote.tags,
            edescription: currentNote.description,
            eimages: currentNote.images.join(", "),
        });
    };

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        const updatedImages = note.eimages.split(",").map((img) => img.trim());
        editNote(note.eid, note.etitle, note.edescription, note.etag, updatedImages);
        refClose.current.click();
    };

    const onChange = (e) => {
        const { name, value } = e.target;

        if (["car_type", "company", "dealer"].includes(name)) {
            setNote((prevNote) => ({
                ...prevNote,
                etag: { ...prevNote.etag, [name]: value },
            }));
        } else {
            setNote({ ...note, [name]: value });
        }
    };

    return (
        <div className="container">
            <AddCar />

            <button
                style={{ display: "none" }}
                type="button"
                ref={ref}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            ></button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Update Car
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        onChange={onChange}
                                        value={note.etitle}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="edescription"
                                        rows="10"
                                        name="edescription"
                                        onChange={onChange}
                                        value={note.edescription}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="car_type" className="form-label">
                                        Car Type
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="car_type"
                                        name="car_type"
                                        onChange={onChange}
                                        value={note.etag.car_type}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="company" className="form-label">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="company"
                                        name="company"
                                        onChange={onChange}
                                        value={note.etag.company}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="dealer" className="form-label">
                                        Dealer
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dealer"
                                        name="dealer"
                                        onChange={onChange}
                                        value={note.etag.dealer}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="eimages" className="form-label">
                                        Images (comma-separated URLs)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="eimages"
                                        name="eimages"
                                        onChange={onChange}
                                        value={note.eimages}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleClick}
                            >
                                Update Car
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container allnotesbox my-3">
                {notes.length === 0 && "No cars to display"}
                {notes.map((note) => {
                    return (
                        <Caritem key={note._id} updateNote={updateNote} note={note} />
                    );
                })}
            </div>
        </div>
    );
};

export default Cars;
