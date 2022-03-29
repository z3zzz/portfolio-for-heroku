import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {certificate.title}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.when_date}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
