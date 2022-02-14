import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';


export default function App() {

  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try{
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      setRecipes(data.meals);
    } catch(error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.list}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={ ({item}) => 
          <View>
            <Text>{item.strMeal}</Text>
            <Image 
              source={{uri: item.strMealThumb}} 
              style={{width:70, height:70}}/>
          </View> }
        data={recipes}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      <TextInput 
        style={styles.input} 
        placeholder='Ingredient'
        value={ingredient}
        onChangeText={ text => setIngredient(text) }
        />
      <Button 
        title='Find'
        onPress={ getRecipes }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#CED8CE',
    marginLeft: '10%'
  },
  input:{
    fontSize: 18,
    width: 200
  },
  list:{
    marginLeft: '5%'
  }
});
