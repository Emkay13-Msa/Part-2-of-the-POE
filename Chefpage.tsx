import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNPickerSelect from 'react-native-picker-select';
import { useMenu } from './MenuContext';

type RootStackParamList = {
  Homepage: undefined;
  ChefPage: undefined;
  FilterPage: undefined;
};

type ChefPageProps = NativeStackScreenProps<RootStackParamList, 'ChefPage'>;

type Course = {
  label: string;
  value: string | null;
};

const ChefPage: React.FC<ChefPageProps> = ({ navigation }) => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string | null>(null);
  const [price, setPrice] = useState<string>('');
  const { addMenuItem } = useMenu(); // Access the addMenuItem function from the context

  const courses: Course[] = [
    { label: 'Starter', value: 'Starter' },
    { label: 'Main Course', value: 'Main Course' },
    { label: 'Dessert', value: 'Dessert' },
  ];

  const handleAddMenuItem = () => {
    if (dishName && description && course && price) {
      const newItem = { dishName, description, course, price };
      addMenuItem(newItem); // Add the new item to the shared menuItems state

      // Reset fields after adding
      setDishName('');
      setDescription('');
      setCourse(null);
      setPrice('');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Item Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
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

      <Button title="Back to Homepage" onPress={() => navigation.navigate('Homepage')} />
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  inputAndroid: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
};

export default ChefPage;

