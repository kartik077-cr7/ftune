import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeShop } from "../../store/shop";
import Shop from "../SingleShop/SingleShop";
import './AllShop.css';

const AllShop = ({allShops}) => {

  const dispatch = useDispatch();

	console.log("LIST OF ALL SHOPS ...",allShops);

	const removeShopHandler = (id) => {
      console.log('deleting shop with id ',id);
      dispatch(removeShop({id}));
	};

	const editShop = ({id,value}) => {

	};

	return (
		<div className="all_table">
			<table className="table">
				<thead>
					<tr>
						<th>NAME</th>
						<th>AREA</th>
						<th>CATEGORY</th>
						<th>OPENING DATA</th>
						<th>CLOSING DATE</th>
						<th>EDIT</th>
						<th>DELETE</th>
					</tr>
				</thead>
				<tbody>
					{allShops && allShops.map((shop,index) => 
							<Shop key={index} editShop={editShop} removeShopHandler={removeShopHandler} shop = {shop}/>
							)}
				</tbody>
			</table>
		</div>
	)
};

export default AllShop;