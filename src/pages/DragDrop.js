import React, { useState } from "react";
import { CustomImage } from "./utils";

export default function DragDrop() {
    const initialImages = [
        CustomImage.Image1,
        CustomImage.Image2,
        CustomImage.Image3,
        CustomImage.Image4,
        CustomImage.Image5,
    ];

    const initialText = ["John", "Martin", "Saw", "Gipss", "Donld"];
    
    const [images, setImages] = useState(initialImages);
    const [textItems, setTextItems] = useState(initialText);
    const [dropContent, setDropContent] = useState([]);

    const handleDragStart = (e, item, type) => {
        e.dataTransfer.setData("item", item);
        e.dataTransfer.setData("type", type);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("item");
        const type = e.dataTransfer.getData("type");

        if (type === "image") {
            setImages((prev) => prev.filter((img) => img !== item));
        } else if (type === "text") {
            setTextItems((prev) => prev.filter((text) => text !== item));
        }

        setDropContent((prev) => [...prev, { type, item }]);
    };

    const handleDragOver = (e) => e.preventDefault();

    const removeFromDropArea = (item, type) => {
        setDropContent((prev) =>
            prev.filter((dropped) => dropped.item !== item)
        );

        if (type === "image") {
            setImages((prev) => [...prev, item]);
        } else if (type === "text") {
            setTextItems((prev) => [...prev, item]);
        }
    };

    return (
        <div className="container">
            <h2>Drag and Drop</h2>
            <div className="wrapper">
                {/* Draggable Items */}
                <div>
                    <h3>Images</h3>
                    <div className="images">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Draggable ${index + 1}`}
                                draggable
                                onDragStart={(e) =>
                                    handleDragStart(e, img, "image")
                                }
                                className="draggable-image"
                            />
                        ))}
                    </div>

                    <h3>Text Items</h3>
                    <div className="text-items">
                        {textItems.map((text, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={(e) =>
                                    handleDragStart(e, text, "text")
                                }
                                className="draggable-text"
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Drop Area */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="drop-area"
                >
                    {dropContent.length === 0 ? (
                        <p>Drop items here</p>
                    ) : (
                        dropContent.map((dropped, index) => (
                            <div key={index} className="dropped-item">
                                {dropped.type === "image" ? (
                                    <img
                                        src={dropped.item}
                                        alt={`Dropped ${index + 1}`}
                                        className="dropped-image"
                                    />
                                ) : (
                                    <div className="dropped-text">
                                        {dropped.item}
                                    </div>
                                )}
                                {/* Remove Button */}
                                <button
                                    onClick={() =>
                                        removeFromDropArea(
                                            dropped.item,
                                            dropped.type
                                        )
                                    }
                                    className="remove-button"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}