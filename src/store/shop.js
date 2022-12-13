import {createSlice} from '@reduxjs/toolkit';

export const shopSlice = createSlice({
	name:"shop",
	initialState:{
		shops:[],
		shopCount:0,
		categoryOptions:["Grocery","Butcher","Baker","Chemist","Stationery"],
		areaOptions:["Thane","Pune","Mumbai Suburban","Nashik","Nagpur","Ahmednagar","Solapur"],
	},
	reducers:{
		addShop: (state,action) => {
      console.log("state is ",state," action is ",action.payload);
			console.log("state shops are ",state.shops);
      state.shops.push({...action.payload,id:state.shopCount});
		},
		editShop: (state,action)=>{
			console.log("state is ",state," action is ",action.payload);

			const index = state.shops.findIndex((shop)=> {
				return shop.id === action.payload.id;
			})

			state.shops[index] = action.payload.newValues;
		},
		removeShop: (state,action)=>{
			 console.log("state is ",state," action is ",action.payload);
		  // state.shops.filter((shop)=> { console.log('current shop is ',shop); return shop.id !== action.payload.id;});

			state.shops = state.shops.filter((single_shop)=>{
				if(single_shop.id != action.payload.id)
				 return single_shop;
			});
		},
		incrementShopCount: (state,action) => {
			state.shopCount = state.shopCount+1;
		}
	}
})

export const { addShop , editShop , removeShop, incrementShopCount } = shopSlice.actions;
export default shopSlice.reducer;