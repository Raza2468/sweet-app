import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom';
import { useGlobalState, useGlobalStateUpdate } from '../../Context/globaleContext';
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'
import "./Basket.css"
// import { DataContext } from '../contexts/AuthContexts'




function Basket() {

  const globalState = useGlobalState();
  const globalStateUpdate = useGlobalStateUpdate();
  const history = useHistory();
  const itemsPrice = globalState.cart.reduce((accumulator, current) => accumulator + current.qty * current.price, 0);
  // const [totalPrice , settotalPrice] = useState()
  // console.log(globalState.cart.qty,"globalState.cart.reduce");
  // const totalPrice = itemsPrice;

  // console.log(globalState.cart, "globalState.cart.reduce");
  // console.log(globalState.cart, "global my cart");
  console.log(itemsPrice, "Add item  itemsPrice");

  function increment(index) {
    console.log('increment ====>', index)
    globalStateUpdate((prev) => {

      let cart = prev.cart;

      prev.cart[index].qty = prev.cart[index].qty + 1;

      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...prev, cart: cart }

    })
  }

  function decrement(index) {
    console.log('decrement index :', index)

    globalStateUpdate((prev) => {
      let cart = prev.cart;
      prev.cart[index].qty = prev.cart[index].qty === 1 ? 1 : prev.cart[index].qty - 1

      localStorage.setItem('cart', JSON.stringify(cart))

      return { ...prev, cart: cart }
    })

  }

  function deleteFromCart(index) {
    globalStateUpdate((prev) => {
      let cart = prev.cart;

      prev.cart = prev.cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...prev, cart: cart }

    })
  }
  function checkout() {

    globalStateUpdate((prev) => ({

      ...prev,

      // cart: { cart: globalState.cart, itemsPrice: itemsPrice },
      cart: { cart: globalState.cart, itemsPrice: itemsPrice }

    }))
    console.log(globalState, "mati");
    console.log(itemsPrice, "mati");

    history.push('/Checkout')

  }

  // console.log(globalState.cart.length, "Da");
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          {globalState.cart.map((e, index) => {
            return (
              <>
                <div>

                  {/* <span><strong>{itemsPrice}</strong></span> */}
                  <section>
                    <div class="mb-3" >
                      <div class="pt-4 wish-list" >
                        {/* <h5 class="mb-4">Cart (<span>2</span> items)</h5> */}
                        <hr class="mb-4" />
                        <div class="row mb-4">
                          <div class="col-md-5 col-lg-3 col-xl-3">
                            <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0 ">
                              <img class="img-fluid w-100"
                                src={e.profileUrl} alt="Sample" />
                            </div>
                          </div>
                          <div class="col-lg-9 col-xl-9">
                            <div>
                              <div class="d-flex justify-content-between">
                                <div>
                                  <h5>{e.productname}</h5>
                                  <p class="mb-3 text-muted text-uppercase small">{e.description}</p>
                                  <p class="mb-2 text-muted text-uppercase small">{e.stock}</p>
                                  <p class="mb-3 text-muted text-uppercase small">Size: M</p>
                                </div>
                                <div>
                                  <div class="def-number-input number-input safari_only mb-0 w-100">
                                    <Button onClick={() => decrement(index)} class="minus">-</Button>
                                    {/* <input className="quantity" min="0" name="quantity" value={e.qty} type="number" /> */}
                                    <input className="form-control font-weight-light" min="0" name="quantity" value={e.qty} type="number" />
                                    <Button onClick={() => increment(index)} class="plus">+</Button>
                                    <small id="passwordHelpBlock" class="form-text text-muted text-center">
                                      (Note, 1 piece)</small>
                                  </div>
                                </div>
                              </div>

                              <div class="d-flex justify-content-between align-items-center">

                                <div>
                                  <a href type="button" class="card-link-secondary small text-uppercase mr-3"><i
                                    class="fas fa-trash-alt mr-1"></i><span onClick={(e) => deleteFromCart(index)}>Remove item</span> </a>
                                  <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                                    class="fas fa-heart mr-1"></i> Move to wish list </a>
                                </div>

                                <p class="mb-0"><span><strong>Price: ${e.price}</strong></span></p>
                                <p class="mb-0"><span><strong id="summary">Total Price: ${e.price * e.qty}</strong></span></p>

                              </div>

                            </div>
                          </div>
                        </div>
                        <p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
            items to your cart does not mean booking them.</p>
                      </div>
                    </div>
                  </section>
                </div>
              </>)
          })}

          {/* qty 22 */}
        </div>
        <div class="col-sm-4">
          <div class="mb-3">
            <div class="pt-4">
              <h5 class="mb-3">The total amount of</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Total Product
                  <span><strong>{globalState.cart.length}</strong></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Temporary amount
                <span>${globalState.cart.length * 8}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                 <span>Gratis</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>The total amount of</strong>
                    <strong>
                      <p class="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span><strong>${itemsPrice}</strong></span>
                </li>
              </ul>
              <button type="button" class="btn btn-primary btn-block" onClick={checkout}>go to Checkout</button>
            </div>
          </div>
          <div class="mb-3">
            <div class="pt-4">
              <a class="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample"
                aria-expanded="false" aria-controls="collapseExample">
                Add a discount code (optional)
                <span><i class="fas fa-chevron-down pt-1"></i></span>
              </a>

              <div class="collapse" id="collapseExample">
                <div class="mt-3">
                  <div class="md-form md-outline mb-0">
                    <input type="text" id="discount-code" class="form-control font-weight-light"
                      placeholder="Enter discount code" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  )
}
// }

export default Basket



                //     {product.map(item => (
                //         <div className="detail" key={item._id}>
                //             <img src={item.src} alt="" />
                //             <div className="box">
                //                 <div className="row">
                //                     <h2>{item.title}</h2>
                //                     <span>${item.price}</span>
                //                 </div>
                //                  <span>${item.colors}</span> 
                //                 <Colors colors={item.colors}/>
                //                 <p>{item.description}</p>

                //                 <Link to="/cart" className="cart">
                //                     Add to Cart
                //                     </Link>
                //             </div>
                //         </div>
                //     )
                //     )}
                // </> 