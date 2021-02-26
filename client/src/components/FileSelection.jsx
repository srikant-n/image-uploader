import image from "../images/image.svg";
import { Button, Card } from "react-bootstrap";
import DragAndDrop from "./DragAndDrog";

/**
 * File Selection view where the user can select an image to upload
 * @param {Props} props Properties passed from parent
 */
function FileSelection(props) {
  return (
    <Card className="base-card upload-card">
      <Card.Body>
        <Card.Title>Upload your image</Card.Title>
        <Card.Text className="small-font">File should be Jpeg, Png, ...</Card.Text>
        <DragAndDrop
          className="d-flex flex-column align-items-center justify-content-around"
          handleDrop={props.onFileSelected}
        >
          <Card.Img className="placeholder-image" src={image} alt="" draggable={false}></Card.Img>
          <Card.Text>Drag & Drop image here</Card.Text>
        </DragAndDrop>
        <Card.Text>or</Card.Text>
        <Button as="label" variant="primary" htmlFor="file">
          Choose A File
        </Button>
        <input
          style={{ width: "0", height: "0" }}
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={(event) => props.onFileSelected(event.target.files)}
        />
      </Card.Body>
    </Card>
  );
}

export { FileSelection };
