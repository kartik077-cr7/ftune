import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import AddShop from './components/Add_Shops/AddShop';
import AllShop from './components/All_Shops/AllShop';
import { Button } from "react-bootstrap";
import { addShop, incrementShopCount } from './store/shop';
import Filter from './components/Fliters/Filter';
import './App.css';

function App() {

	const [addShopBoolean,setAddShopBoolean] = useState(false);
  const [area,setArea] = useState(-1);
	const [category,setCategory] = useState(-1);
	const [status,setStatus] = useState(-1);

	const allShops = useSelector((state) =>{ console.log("state is ",state); return state.shops; });
	const shopState = useSelector((state) => state.shops );
	const areaOptions = useSelector((state) => state.areaOptions);
	const categoryOptions = useSelector((state) => state.categoryOptions);

	const [displayShops,setDisplayShops] = useState(allShops);

	const dispatch = useDispatch();

	console.log("shop_ data is ",shopState);
 
	const addShopHandler = (value) => {
      console.log("Shop to add ",value);
			dispatch(addShop(value));
			dispatch(incrementShopCount());
	};

	const closeAddShop = () =>{
		setAddShopBoolean(false);
	}

	useEffect(() => {
 //   console.log('area is ',area,typeof(area),' category is ',category,typeof(category),' status is ',status,' ',typeof(status));
    
		let areA = parseInt(area);
		let categorY = parseInt(category);
    let statuS = parseInt(status);

		const filteredShops = allShops.filter((shop)=>{
			let result = true;
      if(areA !== -1)
			{
				if(areaOptions[areA] !== shop.area)
				{
				 console.log("OOPS !! insider area")
			   result = false;
				}
			}
		  
			if(categorY !== -1)
			{
				if(categoryOptions[categorY] !== shop.category)
				{
					console.log("OOPS !! insider category")
					result = false;
				}
			}
			
			if(statuS !== -1)
			{
				let currentDate = new Date();
				let openDate = new Date(shop.openingDate);
				let closeDate = new Date(shop.closingDate);

				if(statuS === 1)
				{
						if(currentDate < openDate || currentDate > closeDate)
						{

								console.log("OOPS !! insider status 1")
							result = false;
						}
				}
				else 
				{
						if(currentDate < closeDate && currentDate >= openDate)
						{
							console.log('OOPS !! insider status 2')
							result = false;
						}
				}
			}
      console.log('for shop ',shop,' result is ',result);
			return result;
		}); 

		setDisplayShops(filteredShops);
	},[area,category,status,allShops])

  return (
    <div className="App">
			<div>
			  {addShopBoolean ? <AddShop 
				areaOptions={areaOptions} 
				categoryOptions={categoryOptions} 
				addShopHandler={addShopHandler} 
				closeAddShop={closeAddShop}
				/> :
				 <Button onClick={() => setAddShopBoolean(true)}>ADD SHOP</Button>}
			</div>
			<Filter
			  area={area}
				setArea={setArea}
				category={category}
				setCategory={setCategory}
				status={status}
				setStatus={setStatus}
				areaOptions={areaOptions}
				categoryOptions={categoryOptions}
			/>
      <AllShop allShops={displayShops}/>
    </div>
  );
}

export default App;
