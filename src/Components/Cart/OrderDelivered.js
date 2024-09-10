import { Fragment } from "react";
import Button from "react-bootstrap/Button";

const OrderDelivered = (props) => {
  return (
    <Fragment>
      <section>
        <h2>Thank you so much for your order!</h2>
        <p>We really appreciate it.</p>
        <p>
          Enjoy <b>10%</b> off your next purchase with this coupon code:
          <b>THANKYOU10.</b>
        </p>
      </section>
      <div className="text-end">
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </div>
    </Fragment>
  );
};

export default OrderDelivered;
