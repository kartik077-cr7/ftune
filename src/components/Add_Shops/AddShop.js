import React,{ useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './AddShop.css';

const AddShop = ({ areaOptions, categoryOptions,addShopHandler,closeAddShop }) => {
  
	const [shopName,setShopName] = useState('');
	const [shopArea,setShopArea] = useState(0);
	const [shopCategory,setShopCategory] = useState(0);
	const [openingDate,setOpeningDate] = useState();
	const [closingDate,setClosingDate] = useState();
	const [error,setError] = useState(false);
	const [errMsg,setErrMsg] = useState('');
	 

//	console.log("options are ",areaOptions," ",categoryOptions);

	const areaAvail = areaOptions.map((area,index)=>{
		return <option key={index} value={index}>{area}</option>;
	})

	const categoryAvail = categoryOptions.map((category,index)=>{
		return <option key={index} value={index}>{category}</option>;
	})

	const formSubmitHandler = (e) => {
		e.preventDefault();
		//console.log("new shop values ",shopName," ",shopArea," ",shopCategory," ",openingDate," ",closingDate);

		if(shopName === "")
		{
			setError(true);
			setErrMsg("ENTER A SHOP NAME");
		} 
		else if(openingDate === undefined)
		{
			setError(true);
			setErrMsg("ENTER AN OPENING DATE");
		}
    else if(closingDate === undefined)
		{
			setError(true);
			setErrMsg("ENTER A CLOSING DATE");
		}
		else if(openingDate > closingDate)
		{
			setError(true);
			setErrMsg("OPENING DATE SHOULD BE BEFORE CLOSING DATE");
		}
		else 
		{
      setError(false);
			setErrMsg("");
			closeAddShop();
			addShopHandler({name:shopName,area:areaOptions[shopArea],category:categoryOptions[shopCategory],openingDate,closingDate});
		}

	}

	return ( <div className="add-shop-form">
							<div className=" inner-form">
								<h3>ENTER SHOP DETAILS</h3>
								<Form onSubmit={formSubmitHandler}>
									<Form.Group className="mb-3">
										<FloatingLabel label="Shop Name" controlId="floatingInput">
											<Form.Control
												onChange={(e) => setShopName(e.target.value)}
												type="text"
												value={shopName}
											/>
										</FloatingLabel>
									</Form.Group>
									<Form.Group className="mb-3">
										<FloatingLabel label="Place">
											<Form.Select onChange={(e) => setShopArea(e.target.value)} className="mb-3">
												{areaAvail}
											</Form.Select>
										</FloatingLabel>
									</Form.Group>
									<Form.Group className="mb-3">
										<FloatingLabel label="Category">
											<Form.Select onChange={(e) => setShopCategory(e.target.value)} className="mb-3" >
												{categoryAvail}
											</Form.Select>
										</FloatingLabel>
									</Form.Group>
									<Form.Group className="mb-3">
										<FloatingLabel label="Opening Date">
											<Form.Control
												type="date"
												name="openingdate"
												placeholder="Opening Date"
												value={openingDate}
												onChange={(e)=>setOpeningDate(e.target.value)}
											/>
										</FloatingLabel>
									</Form.Group>
									<Form.Group className="mb-3">
										<FloatingLabel label="Closing Date">
											<Form.Control
												type="date"
												name="closingdate"
												placeholder="Closing Date"
												value={closingDate}
												onChange={(e)=>setClosingDate(e.target.value)}
											/>
										</FloatingLabel>
									</Form.Group>
									{ error && <p className="error">{errMsg} </p>}
									<Button
										className="add-shop-submit"
										style={{
											marginLeft: "0",
										}}
										variant="primary"
										type="submit"
									>
										Submit
									</Button>
									<Button
									  onClick={()=>closeAddShop()}
										className="add-shop-cancel"
										variant="danger"
										style={{
											marginLeft: "5%",
										}}
									>
										Cancel
									</Button>
								</Form>
							</div>
						</div>)
};

export default AddShop;