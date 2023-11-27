import React, {useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

interface TableState {
  newTableData: any[];
  selection: string;
  apiResponse: string;
}

const FOOD_API_BASE_URL = "http://localhost:8080/api/food/selection";


export default function FoodSelectionsComponent() {

  const [state, setState] = useState<TableState>({
    newTableData: [],
    selection: '',
    apiResponse: ''
  });

  const handleAddTable = () => {
    if (state.selection === '') {
      alert('Missing Data');
    } else {
      setState((prevState) => ({
        ...prevState,
        newTableData: [...prevState.newTableData, prevState.selection],
        selection: '',
      }));
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleClearTable = () => {
    setState({ 
      newTableData: [],
      selection : '',
      apiResponse : ''
    });
    // Handle the button click here
    alert('table is clear!');
  };

  
  const spinRandomFood = () => {
  
      const dataToSend = {
        "foodList": state.newTableData
      }

      if (dataToSend.foodList.length === 0) {
        alert("No selection provided.");
      } else {
          axios.post(FOOD_API_BASE_URL, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            const parsedApiResponse = JSON.parse(JSON.stringify(response.data));
          setState((prevState) => ({
            ...prevState,
            apiResponse: parsedApiResponse.foodResult,
          }));
        })
        .catch((error) => {
          alert("error : " + error);
          console.log("error : " + error);
        })
      }
  }



  return (
    <div>
       <h2>Food Result</h2>

      <div className = "container">
        <Table variant="dark">
          <thead>
            <tr>
            Added Selection
            </tr>
          </thead>
          <tbody>
          {state.newTableData.map((row, index) => (
            <tr key={index}>
              <td>{row}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>


       <input 
        type = "text" 
        name="selection"
        autoComplete="off"
        value={state.selection}
        onChange={handleInputChange}
       />

       <div className = "container">
        <button onClick={handleAddTable}>Add Selection</button>
        <button onClick={spinRandomFood}>Spin It</button>
        <button onClick={handleClearTable}>Clear</button>
       </div>

       {state.apiResponse && (
            <div>
              <p>API response:</p>
              <ul>
                <li>Decision result : {state.apiResponse}</li>
              </ul>
            </div>
          )}     
    </div>
  );
}