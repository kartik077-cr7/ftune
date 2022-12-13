import React, { useEffect } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

const EditShop = ({shop,editShopHandler,closeEditHandler}) => {

	const areaOptions = useSelector((state) => state.areaOptions);
	const categoryOptions = useSelector((state) => state.categoryOptions);

	const [category,setCategory] = useState();
	const [area,setArea] = useState();
	const [name,setName] = useState(shop.name);
	const [openingDate,setOpeningDate] = useState(shop.openingDate);
	const [closingDate,setClosingDate] = useState(shop.closingDate);
	const [error,setError] = useState(false);
	const [errMsg,setErrMsg] = useState(false); 

	useEffect(()=>{

        for(let i = 0 ; i < areaOptions.length;i++)
				  if(areaOptions[i] == shop.area)
					  setArea(i);

			for(let i = 0 ; i < categoryOptions.length;i++)
			  if(categoryOptions[i] == shop.category)
				  setCategory(i);

	},[shop?.area,shop?.category])

	const formSubmitHandler = (e) =>{
		e.preventDefault();
		if(name === "")
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
			editShopHandler({name,area:areaOptions[area],category:categoryOptions[category],openingDate,closingDate});
		}
	}

	const areaAvail = areaOptions.map((area,index)=>{
		return <option key={index} value={index}>{area}</option>;
	})

	const categoryAvail = categoryOptions.map((category,index)=>{
		return <option key={index} value={index}>{category}</option>;
	})

	return (
		<Modal style={{margin:"10px"}} show={true} onHide = {() => closeEditHandler()}>
			<Modal.Header closeButton>
			  <Modal.Title>
					EDIT {shop?.name}
				</Modal.Title>
			</Modal.Header>
			<div style={{margin:"20px"}}>
                <Form onSubmit={formSubmitHandler}>
									<Form.Group className="mb-3">
										<FloatingLabel label="Shop Name" controlId="floatingInput">
											<Form.Control
												onChange={(e) => setName(e.target.value)}
												type="text"
												value={name}
											/>
										</FloatingLabel>
									</Form.Group>
									<Form.Group className="mb-3">
										<FloatingLabel label="Place">
											<Form.Select value={area} onChange={(e) => setArea(e.target.value)} className="mb-3">
												{areaAvail}
											</Form.Select>
										</FloatingLabel>
									</Form.Group>
									<Form.Group className="mb-3">
										<FloatingLabel label="Category">
											<Form.Select value={category} onChange={(e) => setCategory(e.target.value)} className="mb-3" >
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
									  onClick={()=>closeEditHandler()}
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
	  </Modal>
	)
};

export default EditShop;