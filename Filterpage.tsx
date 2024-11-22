import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, Button, View, StyleSheet } from 'react-native';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const FilterPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { dishName: 'Salad', description: 'Fresh greens', course: 'Starter', price: '7.99' },
      { dishName: 'Cheesy Pretzel Bread', description: 'Sliced Pitzel rolls home made ranch servedwith BBQ sauce', course: 'Starter', price: '4.99' },
      { dishName: 'Chicken Wings', description: '1/2 dozen,served with baby carrots with a choice of your sauce', course: 'Starter', price: '6.49' },
      { dishName: 'Fried Calamari', description: 'Breaded calamari,lightly fried in canola oil', course: 'Main', price: '9' },
      { dishName: 'Stuffed Mushroom', description: 'Mushroom caps baked with a filling of three choice cheeses,breadrumbs and clams', course: 'Main', price: '11.30' },
      { dishName: 'Four cheese garlic bread', description: 'Toasted french bread topped with chedder, jack and parrmesa, with a light layer of roasted garlic butter ', course: 'Main', price: '5' },
      { dishName: 'Lemon cake', description: 'With the best toppings of strawberries', course: 'Dessert', price: '13,00' },
      { dishName: 'Pumpkin Spice Muffin', description: 'Warm spices like cinnamon ', course: 'Dessert', price: '9.50' },
      { dishName: 'Chocolate Donut', description: 'Choclat laver, topped with rich choclate glaze ', course: 'Dessert', price: '8' },
  ]);

  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  const handleFilter = (course: string | null) => {
    if (course === null) {
      setFilteredItems(menuItems); // Show all items
    } else {
      setFilteredItems(menuItems.filter((item) => item.course === course));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filter Menu by Course</Text>
      
      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => handleFilter(null)} />
        <Button title="Starters" onPress={() => handleFilter('Starter')} />
        <Button title="Main Course" onPress={() => handleFilter('Main')} />
        <Button title="Desserts" onPress={() => handleFilter('Dessert')} />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.dishName}</Text>
            <Text style={styles.menuText}>{item.description}</Text>
            <Text style={styles.menuText}>{item.course}</Text>
            <Text style={styles.menuText}>${item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFCCCB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
});

export default FilterPage;
