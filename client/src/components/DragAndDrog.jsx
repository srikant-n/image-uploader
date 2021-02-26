import { useEffect, useRef, useState } from "react";

/**
 * Container that allows dragging and dropping images onto it
 * @param {Props} props Proerties passed from parent component
 */
function DragAndDrop(props) {
  const dropRef = useRef(null);
  // When we go over child elements
  const [dragCount, setDragCount] = useState(0);
  // Is the file being dragged an image?
  const [isImage, setIsImage] = useState(false);

  function handleDrag(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * File dragged into component
   * @param {Event} event Dragged object event
   */
  function handleDragIn(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragCount((state) => state + 1);
    setIsImage(event.dataTransfer.items && event.dataTransfer.items[0].type.match(/image.*/));
  }

  /**
   * File dragged out of component
   * @param {Event} event Dragged object event
   */
  function handleDragOut(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragCount((state) => {
      state === 1 && setIsImage(false);
      return state - 1;
    });
  }

  /**
   * File dropped on component
   * @param {Event} event Dropped object event
   */
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsImage(false);
    setDragCount(0);
    if (
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0 &&
      event.dataTransfer.files[0].type.match(/image.*/)
    ) {
      props.handleDrop && props.handleDrop(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);

    return () => {
      // Clean up
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  });

  /**
   * Highlight component based on the file type
   */
  function getHighlightClass() {
    if (dragCount > 0) {
      return isImage ? "shadow-green" : "shadow-red";
    } else {
      return;
    }
  }

  return (
    <div className={`image-container ${getHighlightClass()} ${props.className}`} ref={dropRef}>
      {props.children}
    </div>
  );
}

export default DragAndDrop;
