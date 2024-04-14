import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from "./Slice/CategorySlice";
import { addBasket, removeItem } from "./Slice/BasketSlice";

function App() {
  const dispatch = useDispatch();

  const Categories = useSelector((state) => state.categories.items);
  // const loading = useSelector(state=>state.categories.loading)
  const Basket = useSelector((state) => state.basket.items);
  // console.log(Categories);
  // console.log(loading);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    count: 0,
  });

  const [editinId, setEditingId] = useState(null);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editinId) {
      console.log(editinId);
      dispatch(editCategory(editinId, formData));
    } else {
      dispatch(addCategory(formData));
    }
    setFormData({ name: "", description: "" });
    setEditingId(null);
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, price: category.price });
    setEditingId(category.id);
  };
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    dispatch(fetchCategories());
  };
  const handleAddBasket = (item) => {
    dispatch(addBasket(item));
  };
  const handleRemove =(item)=>{
    dispatch(removeItem(item))
  }

  // console.log(Basket);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={formData.price}
          name="price"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Categories &&
            Categories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => handleAddBasket(item)}>
                    Add Basket
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        {Basket ? (
          Basket.map((item) => (
            <div key={item.id} style={{ padding: "40px" }}>
              <p>{item.name}</p>
              <p>{item.price}</p>
              
              <div>
                <p onClick={()=>handleRemove(item)}>-</p>
                <p>Count:{item.count}</p>
                <p onClick={()=>handleAddBasket(item)}>+</p>
                
              </div>
            </div>

          ))
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
}

export default App;
