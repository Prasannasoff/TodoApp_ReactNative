// import { SafeAreaView, StyleSheet, Text, View, Image, Button } from 'react-native'
// //import { scale, verticalScale, moderateScale,s,vs,rrMS } from 'react-native-size-matters'; //to make page responsive. Vertical scale for height and scale for width
// import { rMS, rS, rV } from './src/styles/responsive'

// import React, { useState } from 'react'
// // if normal scale will increase your size by +2X, moderateScale will only increase it by +X. 
// const App = () => {
//   const [count, setcount] = useState(0)

//   return (
//     //safe areas is phone screen without notches, the View component renders a container
//     <SafeAreaView style={[styles.cont, { flex: 2, alignItems: 'center' }]}>
//       <View style={[styles.div1]}>
//         <Image
//           source={{
//             uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTJ9PiXYRPBIWO2maHbR9UZHFId3Jj0aDTYR6uXROOA&s"
//           }}
//           style={{ height: rV(300), width: rS(400) }} />
//       </View>

//       <View style={[styles.div2]}>
//         <Text style={[styles.poppins]}>App</Text>
//         <Text style={{ fontSize: rMS(30) }}>Your Count is {count}</Text>
//         <Button onPress={() => setcount(count + 1)} title='click' />
//         <Button onPress={() => setcount(0)} title='reset' />

//       </View>
//     </SafeAreaView>


//   )

// }
// export default App
// const styles = StyleSheet.create({
//   poppins: {
//     fontFamily: 'Poppins-Black',
//     fontSize: rMS(60),
//     color: 'red',
//   },
//   cont: {

//     width: 'auto',
//     height: 'auto',


//   },
//   div1: {
//     width: rS(400),
//     height: 'auto',
//     backgroundColor:'blue',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 20
//   },
//   div2: {
//     width: 'auto',
//     height: 'auto',
//     flex:1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:'red',
//     gap: 20
//   }
// })
//-------------------------------------------------------------------------------------------------//
import { SafeAreaView, StyleSheet, Text, View, Image, Button,TextInput, Touchable, TouchableOpacity } from 'react-native'

import React from 'react';

// import Task from './src/components/Task';
import TODO from './src/components/Todo';
const App = () => {
  return(
 <SafeAreaView>
  <TODO/>
 </SafeAreaView>
  )

}
export default App;
const styles = StyleSheet.create({
  


})