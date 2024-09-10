import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
      <div>
        <h6>{props.name}</h6>
        <div className="d-flex justify-content-between">
          <span className="fw-bold text-success">{price}</span>
          <span className="fw-bold border border-secondary rounded px-2">
            x {props.amount}
          </span>
        </div>
      </div>
      <div>
        <Button variant="outline-danger" onClick={props.onRemove}>−</Button>
        <Button variant="outline-success" onClick={props.onAdd} className="ms-2">+</Button>
      </div>
    </ListGroup.Item>
  );
};

export default CartItem;
