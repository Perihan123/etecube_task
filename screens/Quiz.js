import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import AlertDialog from '../components/AlertDialog';
//suffle array ???
const shuffleArray = array => {
  for (let i = array.lenght - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({navigation, route}) => {
  const {questions} = route.params;
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isDisabled,setIsDisabled] = useState(false);
  const [visible,setVisible] = useState(false);
  const [isCorrect,setIsCorrect] = useState(false);
  const getQuiz = async () => {
    setOptions(generateOptionsAndShuffle(questions[ques]));
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const [count, setCount] = useState(15);
  // console.log(route.params.handleNextPress());
  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 500);
    } else {
      if (ques === 9) {
        console.log('ques === 9');
        handleShowResult();
      } else {
        setIsDisabled(false);
        setCount(15);
        setQues(ques+1);
        setOptions(generateOptionsAndShuffle(questions[ques + 1]));
      }
    }
  }, [count]);
  const generateOptionsAndShuffle = _question => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleSelectedOption = _option => {
    setIsDisabled(true);
    setVisible(true);
    if (_option === questions[ques].correct_answer) {
      setScore(score + 10);
      setIsCorrect(true);
      setTimeout(()=>{setVisible(false),setIsCorrect(false)},1500)
    }
  };

  const handleShowResult = async() => {
    let getAllScores = await AsyncStorage.getItem('allScores');
    let level = await AsyncStorage.getItem('singleLevel');
    let category = await AsyncStorage.getItem('singleCategory');
    if(getAllScores){
      getAllScores = JSON.parse(getAllScores);
      getAllScores = [...getAllScores,{level,category,score}]
      const jsonValue = JSON.stringify(getAllScores);
      await AsyncStorage.setItem('allScores',jsonValue)
    }else{
      const FirstScores = [{level,category,score}];
      const jsonValue = JSON.stringify(FirstScores);
      await AsyncStorage.setItem('allScores',jsonValue)

    }
    navigation.navigate('Result', {
      score: score,
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: '#FFF'}]}>
      <Header title={`Question ${ques+1}`} />
      {visible && <AlertDialog visible={visible} setVisible={setVisible} correct={isCorrect} />}
      {questions && (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>
              {decodeURIComponent(questions[ques].question)}
            </Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              style={isDisabled ? styles.disableOptionButton : styles.optionButton}
              disabled={isDisabled}
              onPress={() => handleSelectedOption(options[0])}>
              <Text style={styles.option}>
              A-{")\t"}{decodeURIComponent(options[0])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDisabled ? styles.disableOptionButton: styles.optionButton}
              disabled={isDisabled}
              onPress={() => handleSelectedOption(options[1])}>
              <Text style={styles.option}>
                B-{")\t"}{decodeURIComponent(options[1])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDisabled ? styles.disableOptionButton : styles.optionButton}
              disabled={isDisabled}
              onPress={() => handleSelectedOption(options[2])}>
              <Text style={styles.option}>
              C-{")\t"}{decodeURIComponent(options[2])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDisabled ? styles.disableOptionButton : styles.optionButton}
              disabled={isDisabled}
              onPress={() => handleSelectedOption(options[3])}>
              <Text style={styles.option}>
              D-{")\t"}{decodeURIComponent(options[3])}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom}>
            <View style={styles.timecomp}>
              <Text style={styles.time}> Time:{count}</Text>
            </View>
            {ques === 9 && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleShowResult}>
                <Text style={styles.buttonText}>Show Result</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,flex:1,flexGrow:1
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#f3d5b5',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a0908',
  },
  question: {
    fontSize: 24,
    color:'#4C3A51'
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: '#777',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#B8F1B0',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  correctButton:{
    color:'gray',
    backgroundColor:'#3B44F6',
    paddingHorizontal: 12,
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 6,
  },
  disableOptionButton:{
    color:'gray',
    backgroundColor:'#dddddd',
    paddingHorizontal: 12,
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 6,
    },
  parent: {
    height: '100%',
  },
  timecomp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    backgroundColor: '#A0D995',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    elevation:10,
    borderWidth:.4
  },
});
