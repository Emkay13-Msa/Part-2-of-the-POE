import { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: string;
  price: number;
}

const courses = ["Starters", "Mains", "Desserts"];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    course: courses[0],
    price: "" // Keep as string since input type="number" returns a string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMenuItem = () => {
    if (!form.name || !form.description || !form.price) return;

    const newItem: MenuItem = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      course: form.course,
      price: parseFloat(form.price) // Ensure conversion to number
    };

    setMenuItems([...menuItems, newItem]);
    setForm({ name: "", description: "", course: courses[0], price: "" });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chef's Menu</h1>
      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Add a Menu Item</h2>
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        />
        <select 
          name="course"
          value={form.course}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        >
          {courses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={addMenuItem}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Dish
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6">Menu ({menuItems.length} items)</h2>
      <div className="mt-4">
        {menuItems.length === 0 ? (
          <p className="text-gray-500">No menu items yet.</p>
        ) : (
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.id} className="border p-3 rounded shadow">
                <h3 className="font-semibold">{item.name} - ${item.price.toFixed(2)}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">Course: {item.course}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
