import { useState } from "react";
import { Button, Card, Container, InputGroup, FormControl, Toast } from "react-bootstrap";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

/**
 * View to display on upload complete
 * @param {Object} props Props passed from parent
 */
function UploadDone(props) {
  const [showCopied, setShowCopied] = useState(false);

  function onClickCopy(event) {
    navigator.clipboard.writeText(props.imageUrl).then(setShowCopied(true));
  }

  /**
   * Get the upload status icon to display
   * @param {Boolean} isDone Has file been successfully uploaded?
   */
  function getStatusIcon(isDone) {
    const size = 35;
    return isDone ? (
      <CheckCircleFill color="green" size={size} />
    ) : (
      <XCircleFill color="red" size={size} />
    );
  }

  /**
   * Get the upload status text to display
   * @param {Boolean} isDone Has file been successfully uploaded?
   */
  function getStatusText(isDone) {
    return isDone ? "Uploaded Successfully" : "Upload Failed :(";
  }

  return (
    <Card className="base-card">
      <Card.Body className="d-flex flex-column align-items-center">
        {getStatusIcon(props.isDone)}
        <Card.Title>{getStatusText(props.isDone)}</Card.Title>
        {props.isDone && (
          <Container className="preview-image">
            <Card.Img
              className="preview-image"
              src={props.imageUrl}
              alt="Uploaded Image"
            ></Card.Img>
          </Container>
        )}
        <div className="toast-holder">
          <Toast onClose={() => setShowCopied(false)} show={showCopied} delay={2500} autohide>
            <Toast.Body>Link copied</Toast.Body>
          </Toast>
        </div>
        {props.isDone && (
          <InputGroup>
            <FormControl
              placeholder="Image Link"
              aria-label="Image Link"
              aria-describedby="basic-addon2"
              readOnly
              value={props.imageUrl}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={onClickCopy}>
                Copy Link
              </Button>
            </InputGroup.Append>
          </InputGroup>
        )}
        <Button variant="info" onClick={props.onClickNew}>
          {props.isDone ? "Upload Another Image" : "Try Again"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export { UploadDone };
