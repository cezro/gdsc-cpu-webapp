import React, { useState } from "react";

type Merch = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
};

function StoreItem(merch: Merch) {
  const [id] = useState<number>(merch.id);
  const [name] = useState<string>(merch.name);
  const [description, setDescription] = useState<string>(merch.description);
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number | string>(merch.price);

  const quantity: number = 0;
  function increaseCartQuantity(num: number) {
    return num + 1;
  }

  function decreaseCartQuantity(num: number) {
    if (num !== 0) {
      return num - 1;
    }
    return num = 0;
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        // src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          {/* <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span> */}
          <span className="fs-2">name</span>
          <span className="ms-2 text-muted">formatCurrency</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(quantity)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(quantity)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(quantity)}>+</Button>
              </div>
              <Button
                // onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StoreItem;
