import FoodSelectionsComponent from './components/main/FoodSelectionsComponent';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';


  
export default function PageRoute() {
    return (
        <div>
          <Router>
            <h1>Food Random Generate</h1>
            <Routes>
              <Route path = "/" element = {<FoodSelectionsComponent/>}></Route>
            </Routes>
          </Router>
        </div>
      );
  };