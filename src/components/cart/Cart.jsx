import React from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeCartItem, setCartItem } from "../../redux/features/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  console.log(">>>check cart: ", cartItems);

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems?.length === 0 ? (
        <h2 class="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 class="mt-5">
            Your Cart: <b>{cartItems?.length} items</b>
          </h2>

          <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <>
                  <hr />
                  <div class="cart-item" data-key="product1">
                    <div class="row">
                      <div class="col-4 col-lg-3">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          height="90"
                          width="115"
                        />
                      </div>
                      <div class="col-5 col-lg-3">
                        <Link to={`product/${item?.product}`}>
                          {item?.name}
                        </Link>
                      </div>
                      <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item?.price}đ</p>
                      </div>
                      <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div class="stockCounter d-inline">
                          <span
                            class="btn btn-danger minus"
                            onClick={() => decreaseQty(item, item.quantity)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            type="number"
                            class="form-control count d-inline"
                            value={item?.quantity}
                            readonly
                          />
                          <span
                            class="btn btn-primary plus"
                            onClick={() => increaseQty(item, item.quantity)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          class="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item?.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>

            <div class="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Units:{" "}
                  <span class="order-summary-values">
                    {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span class="order-summary-values">
                    {cartItems
                      ?.reduce(
                        (acc, item) => acc + item?.price * item?.quantity,
                        0
                      )
                      .toFixed(2)}
                    đ
                  </span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  class="btn btn-primary w-100"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
