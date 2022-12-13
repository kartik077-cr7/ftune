import { useState } from "react";
import { PencilSquare, FileEarmarkX } from "react-bootstrap-icons";
import ModelAlert from "../ModalAlert/ModalAlert";
import EditShop from "../Edit_Shops/EditShop";
import { editShop } from "../../store/shop";
import { useDispatch } from "react-redux";

const Shop = ({shop,removeShopHandler}) =>{

	const [alert,setAlert] = useState(false);
	const [edit,setEdit] = useState(false);

	const dispatch = useDispatch();
	const closeEditHandler = () => {
		setEdit(false);
	}

	const editShopHandler = (newValues) => {
     console.log('Shop to be edited ',shop.id,'and new values are ',newValues);
		 const id = shop.id;
		 dispatch(editShop({newValues:newValues,id}));
		 setEdit(false);
	}

	if(alert)
	{
		return(
			<ModelAlert
			  name={shop?.name}
				handleClose={() => setAlert(false)}
				handleDelete={() => {removeShopHandler(shop?.id);setAlert(false);} } 
			/>
		)
	}

	if(edit)
	{
		return <EditShop shop = { shop } editShopHandler={editShopHandler} closeEditHandler={closeEditHandler}/>
	}

	return (
      <tr key={shop?.index}>
				<td data-label="name">{shop?.name}</td>
				<td data-label="area">{shop?.area}</td>
				<td data-label="category">{shop?.category}</td>
				<td data-label="opening date">{shop?.openingDate}</td>
				<td data-label="closing date">{shop?.closingDate}</td>
				<td data-label="Edit">
					<PencilSquare style={{cursor:'pointer'}} onClick={() => setEdit(true)} />
				</td>
				<td data-label="Remove">
					<FileEarmarkX style={{cursor:'pointer'}} onClick={() => setAlert(true)} />
				</td>
			</tr>
	)
}

export default Shop;