import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useParams,
	useSearchParams,
	useNavigate,
	Link,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import Message from "../components/Message";
import {
	Row,
	Col,
	Form,
	Button,
	ListGroup,
	Image,
	Card,
} from "react-bootstrap";

const CartScreen = () => {
	const params = useParams();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const history = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const productId = params.id;
	const qty = searchParams.get("qty");
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, Number(qty)));
		}
	}, [dispatch, productId, qty]);
	const checkOutHandler = () => {
		history("/login?redirect=shipping");
	};
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>{item.name}</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form>
											<Form.Group>
												<Form.Control
													as="select"
													value={item.qty}
													onChange={(e) =>
														dispatch(
															addToCart(item.product, Number(e.target.value))
														)
													}
												>
													{[...Array(item.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Form.Group>
										</Form>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => dispatch(removeFromCart(item.product))}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								Items
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								style={{ width: "100%" }}
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
