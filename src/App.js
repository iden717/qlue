import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListPeople from "./pages/ListPeople";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListPeople} />
        <Route exact path="/:page" component={ListPeople} />
      </Switch>
    </Router>
  );
}

export default App;
