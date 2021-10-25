import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import { Shop } from "./Shop/Shop.js";
import { Register } from "./Auth/Register.js";
import { LogIn } from "./Auth/LogIn.js";
import { AuthContextProvider } from "./Auth/AuthContext";
import { Cart } from "./Shop/Cart/Cart.js";
import { Orders } from "./Shop/Orders/Orders";
import { AdminProducts } from "./Admin/Products/AdminProducts.js";
import { AdminOrders } from "./Admin/Orders/AdminOrders.js";

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
