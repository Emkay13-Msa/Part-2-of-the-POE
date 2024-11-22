import React, { createContext, useState, useContext, ReactNode } from 'react';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (dishName: string) => void; // Added function to remove menu item
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { dishName: 'Salad', description: 'Fresh greens', course: 'Starter', price: '7.99' },
    { dishName: 'Cheesy Pretzel Bread', description: 'Sliced Pitzel rolls homemade ranch served with BBQ sauce', course: 'Starter', price: '4.99' },
    { dishName: 'Chicken Wings', description: '1/2 dozen, served with baby carrots with a choice of your sauce', course: 'Starter', price: '6.49' },
    { dishName: 'Fried Calamari', description: 'Breaded calamari, lightly fried in canola oil', course: 'Main', price: '9' },
    { dishName: 'Stuffed Mushroom', description: 'Mushroom caps baked with a filling of three choice cheeses, breadcrumbs, and clams', course: 'Main', price: '11.30' },
    { dishName: 'Four cheese garlic bread', description: 'Toasted French bread topped with cheddar, jack, and parmesan, with a light layer of roasted garlic butter', course: 'Main', price: '5' },
    { dishName: 'Lemon cake', description: 'With the best toppings of strawberries', course: 'Dessert', price: '13.00' },
    { dishName: 'Pumpkin Spice Muffin', description: 'Warm spices like cinnamon', course: 'Dessert', price: '9.50' },
    { dishName: 'Chocolate Donut', description: 'Chocolate layer, topped with rich chocolate glaze', course: 'Dessert', price: '8' },
  ]);

  // Function to add a new menu item
  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove a menu item based on its dishName
  const removeMenuItem = (dishName: string) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.dishName !== dishName));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
