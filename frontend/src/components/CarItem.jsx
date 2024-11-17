import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Caritem = (props) => {
    const { note, updateNote } = props;

    const context = useContext(NoteContext);
    const { deleteNote } = context;

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
            <div className="card-images">
                    <p><b>Images:</b></p>
                    <div className="images-container">
                        {note.images?.slice(0, 10).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Car Image ${index + 1}`}
                                style={{
                                    width: "30%",
                                    height: "auto",
                                    marginBottom: "0.5rem",
                                    borderRadius: "5px",
                                }}
                            />
                        ))}
                        {note.images?.length > 10 && (
                            <p>...and more</p> // Show message if more than 10 images exist
                        )}
                    </div>
                </div>
                
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">
                    {note.description?.length > 50
                        ? note.description.slice(0, 50) + "..."
                        : note.description}
                </p>
                <p className="card-text">
                    <b>Type:</b> {note.tags.car_type}
                    <br />
                    <b>Company:</b> {note.tags.company}
                    <br />
                    <b>Dealer:</b> {note.tags.dealer}
                </p>
                <i
                    className="fa-solid fa-pen-to-square mx-2"
                    onClick={() => {
                        updateNote(note);
                    }}
                ></i>
                <i
                    className="fa-solid fa-trash mx-2"
                    onClick={() => {
                        deleteNote(note._id);
                    }}
                ></i>
            </div>
        </div>
    );
};

export default Caritem;