import image from "../images/image.svg"
import { Button, Card, Container } from "react-bootstrap";

console.log(image);
function UploadPage() {
  return (
    <Card className="base-card upload-card">
      <Card.Body>
        <Card.Title>Upload your image</Card.Title>
        <Card.Text className="small-font">File should be Jpeg, Png, ...</Card.Text>
        <Container className="image-container d-flex flex-column align-items-center justify-content-around">
          <Card.Img className="placeholder-image" src={image} alt=""></Card.Img>
          <Card.Text>Drag & Drop image here</Card.Text>
        </Container>
        <Card.Text>or</Card.Text>
        <Button as="label" variant="primary" htmlFor="file">Choose A File</Button>
        <input style={{width:"0", height:"0"}} type="file" id="file" name="file" accept="image/*"/>
      </Card.Body>
    </Card>
  );
}

export { UploadPage };
