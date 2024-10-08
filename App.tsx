import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Define your course type according to your data structure
type Course = {
  label: string;
  value: string | null;
};

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const MenuEntry: React.FC = () => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string | null>(null);
  const [price, setPrice] = useState<string>('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const courses: Course[] = [
    { label: 'Appetizer', value: 'appetizer' },
    { label: 'Main Course', value: 'main' },
    { label: 'Dessert', value: 'dessert' },
  ];

  const handleAddMenuItem = () => {
    if (dishName && description && course && price) {
      const newItem: MenuItem = {
        dishName,
        description,
        course,
        price,
      };
      setMenuItems((prevItems) => [...prevItems, newItem]);
      
      // Reset state after adding
      setDishName('');
      setDescription('');
      setCourse(null);
      setPrice('');
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chefs Item Entry</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        textAlign='center'
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <RNPickerSelect
        onValueChange={setCourse}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Course...', value: null }} 
        items={courses}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />

      <FlatList
        data={menuItems}
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

      <Text style={styles.footer}>
        Total Items: {menuItems.length}
      </Text>
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
    marginBottom: 10,
    color: '#FF0000', 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
  footer: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Add your pickerSelectStyles here according to your UI design
const pickerSelectStyles = {
  inputIOS: {
    // iOS styles
  },
  inputAndroid: {
    // Android styles
  },
};

export default MenuEntry;




