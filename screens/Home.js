import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import startimage from '../assets/images/start.png';
import {getCategories, getQuestions} from '../api/apiGets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Loading from '../components/Loading';

const levelDatas = ['easy', 'medium', 'hard'];

export default Home = ({navigation}) => {
  const [level, setLevel] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(res => {
        setCategories(res.data.trivia_categories);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderHeader = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <Text style={styles.headerTitle}>{'Trivia Crack'}</Text>
      </View>
    );
  };

  const handleStart = () => {
    if(!level || !category){
      alert('Yapma');
    }
    else{
      setLoading(true);
      getQuestions(category.id,level).then(async(res)=>{
        if(res.data.results.length < 1){
          alert('Burda soru yok');
          console.log('Burda soru yok');
        }
        else{
          await AsyncStorage.setItem('singleLevel',level);
          await AsyncStorage.setItem('singleCategory',category.name);
          console.log(res.data.results);
          navigation.navigate('Quiz',{
            questions:res.data.results
          });
        }
        setLoading(false);

      }).catch(error=>{
        console.log(error)
        setLoading(false);
      })
    }
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.viewContainer}>
        <Header title={'Trivia Crack'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.dropdownsRow}>
            <View style={styles.divider} />
            <SelectDropdown
              data={levelDatas}
              onSelect={selectedItem => {
                setLevel(selectedItem);
              }}
              defaultButtonText="Select Level"
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <View style={styles.divider} />
            <SelectDropdown
              data={categories.map(item => {
                return item.name;
              })}
              onSelect={selectedItem => {
                const cat = categories.find(
                  item => item.name === selectedItem,
                );
                setCategory(cat);
              }}
              defaultButtonText={'Select Categori'}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
          <Image
            source={startimage}
            style={styles.banner}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={()=>handleStart()} style={styles.button}>
            <Text style={styles.start}>START</Text>
          </TouchableOpacity>
        </ScrollView>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdownsRow: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
  },

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  start: {
    color: 'black',
    alignContent: 'center',

    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#92E3A9',
    padding: 20,
    borderRadius: 16,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  banner: {
    height: 300,
    width: 300,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'center', width: '100%'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'center',fontSize:14},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    width: width - 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  divider: {
    height: 20,
  },
});
