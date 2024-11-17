import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext"; // Assuming your context is named this

const AddCar = () => {
    const context = useContext(NoteContext);
    const { addNote: addCar } = context; // Assuming addCar function is in context

    const [car, setCar] = useState({
        title: "",
        description: "",
        tags: { car_type: "", company: "", dealer: "" },
        images: "",
    });

    const handleClick = (e) => {
        e.preventDefault();
        const imageArray = car.images.split(",").map((img) => img.trim());
        if (imageArray.length > 10) {
            alert("A car can have up to 10 images only.");
            return;
        }
        addCar(car.title, car.description, car.tags, imageArray);
        setCar({
            title: "",
            description: "",
            tags: { car_type: "", company: "", dealer: "" },
            images: "",
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;

        if (["car_type", "company", "dealer"].includes(name)) {
            setCar((prevCar) => ({
                ...prevCar,
                tags: { ...prevCar.tags, [name]: value },
            }));
        } else {
            setCar((prevCar) => ({ ...prevCar, [name]: value }));
        }
    };

    return (
        <div>
            <div className="addnote-box">
                <form>
                    <h4>Add New Car</h4>
                    <div className="user-box">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={onChange}
                            value={car.title}
                            required
                        />
                        <label>Car Name</label>
                    </div>

                    <div className="user-box">
                        <textarea
                            id="description"
                            rows="3"
                            name="description"
                            onChange={onChange}
                            value={car.description}
                            required
                        ></textarea>
                        <label>Description</label>
                    </div>

                    <div className="user-box">
                        <input
                            type="text"
                            id="car_type"
                            name="car_type"
                            onChange={onChange}
                            value={car.tags.car_type}
                            required
                        />
                        <label>Car Type (e.g., Petrol, Disel)</label>
                    </div>

                    <div className="user-box">
                        <input
                            type="text"
                            id="company"
                            name="company"
                            onChange={onChange}
                            value={car.tags.company}
                            required
                        />
                        <label>Company (e.g., Tesla)</label>
                    </div>

                    <div className="user-box">
                        <input
                            type="text"
                            id="dealer"
                            name="dealer"
                            onChange={onChange}
                            value={car.tags.dealer}
                            required
                        />
                        <label>Dealer</label>
                    </div>

                    <div className="user-box">
                        <input
                            type="text"
                            id="images"
                            name="images"
                            onChange={onChange}
                            value={car.images}
                            required
                        />
                        <label>Images (comma-separated URLs)</label>
                    </div>

                    <center>
                        <button type="submit" onClick={handleClick}>
                            Add Car<span></span>
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
