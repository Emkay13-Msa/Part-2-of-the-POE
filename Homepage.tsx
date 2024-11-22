import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, FlatList, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMenu } from './MenuContext';

type RootStackParamList = {
  Homepage: undefined;
  ChefPage: undefined;
  FilterPage: undefined;
};

type HomepageProps = NativeStackScreenProps<RootStackParamList, 'Homepage'>;

const Homepage: React.FC<HomepageProps> = ({ navigation }) => {
  const { menuItems, removeMenuItem } = useMenu(); // Get menuItems and removeMenuItem from context
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>({});

  // Function to handle item deletion
  const handleDeleteItem = (dishName: string) => {
    removeMenuItem(dishName); // Call removeMenuItem to delete the item from the menu
  };

  // Calculate average prices for each course
  useEffect(() => {
    const calculateAveragePrices = () => {
      const totals: Record<string, { total: number; count: number }> = {};

      menuItems.forEach((item) => {
        if (item.course) {
          if (!totals[item.course]) {
            totals[item.course] = { total: 0, count: 0 };
          }
          totals[item.course].total += parseFloat(item.price.replace(',', '.'));
          totals[item.course].count += 1;
        }
      });

      const averages: Record<string, number> = {};
      for (const course in totals) {
        averages[course] = parseFloat((totals[course].total / totals[course].count).toFixed(2));
      }
      setAveragePrices(averages);
    };

    calculateAveragePrices();
  }, [menuItems]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Full Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Button title="Delete" onPress={() => handleDeleteItem(item.dishName)} /> {/* Add Delete button */}
          </View>
        )}
      />
      <View style={styles.averageContainer}>
        <Text style={styles.averageTitle}>Average Prices by Course</Text>
        {Object.entries(averagePrices).map(([course, avg]) => (
          <Text key={course}>
            {course}: ${avg}
          </Text>
        ))}
      </View>
      <Button title="Go to Chef Page" onPress={() => navigation.navigate('ChefPage')} />
      <Button title="Filter Menu" onPress={() => navigation.navigate('FilterPage')} />
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
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  course: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  averageContainer: {
    marginTop: 20,
  },
  averageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Homepage;

