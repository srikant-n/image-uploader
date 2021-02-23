import { Card, ProgressBar } from "react-bootstrap";

function Uploading() {
  return (
    <Card className="base-card uploading-card">
      <Card.Body>
        <Card.Title>Uploading...</Card.Title>
        <progress height="10px" width="100%">
        {/* <ProgressBar now={50} /> */}
        </progress>
        
      </Card.Body>
    </Card>
  );
}

export { Uploading };
