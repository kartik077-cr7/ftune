import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form } from 'react-bootstrap';
import './Filter.css';

const Filter = ({area,setArea,category,setCategory,status,setStatus,areaOptions,categoryOptions}) => {

	const areaAvail = areaOptions.map((area,index)=>{
		return <option key={index} value={index}>{area}</option>;
	})

	const categoryAvail = categoryOptions.map((category,index)=>{
		return <option key={index} value={index}>{category}</option>
	})


	return (
		<div className="main_filter_div">
			  <h5>FILTER BY</h5>
				<FloatingLabel label="Area">
					<Form.Select value={area} onChange={(e) => setArea(e.target.value)} className="mb-3">
						<option key={-1} value={-1}>NONE</option>
						{areaAvail}
					</Form.Select>
				</FloatingLabel>
				<FloatingLabel label="Category">
					<Form.Select value={category} onChange={(e) => setCategory(e.target.value)} className="mb-3">
						<option key={-1} value={-1}>NONE</option>
						{categoryAvail}
					</Form.Select>
				</FloatingLabel>
				<FloatingLabel label="Status">
					<Form.Select value={status} onChange={(e) => setStatus(e.target.value)} className="mb-3">
						<option key={-1} value={-1}>NONE</option>
						<option key={1} value={1}>OPEN</option>
						<option key={2} value={2}>CLOSED</option>
 					</Form.Select>
				</FloatingLabel>
		</div>
	)
};

export default Filter;