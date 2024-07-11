import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore,  collection, getDocs, getDoc, doc  } from "firebase/firestore";





const firebaseConfig = {
    apiKey: "AIzaSyBKorkp_Jl6CCE1Rm6lQ1Kf32-l522zX6o",
    authDomain: "quote-app-7622d.firebaseapp.com",
    projectId: "quote-app-7622d",
    storageBucket: "quote-app-7622d.appspot.com",
    messagingSenderId: "1016725166592",
    appId: "1:1016725166592:web:7cfb9c3ea82cb49efe56e5"
  };
  
  //Initialize Firebase .ie creates an instance
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const querySnapshot = await getDocs(collection(db, `Quote's`));
  //   const lists = querySnapshot.map((items) => {
  //     return(
  //         <li>{[items, " => ", items.data()]}</li>
  //     )
  //   })

  
    
      

export default function LogAllData({sendDataToParent}){
    const [selectedQuoteData, setSelectedQuoteData] = useState('')
    async function grabData(event){

        const docRef = doc(db, `Quote's`,`${event.target.textContent}`);
        const docSnap = await getDoc(docRef);

        const docSnapData = docSnap.data();
        setSelectedQuoteData(docSnapData);
        sendDataToParent(docSnapData);
      }

    function showTheData(event){
        console.log(event.target.textContent)
        grabData(event)

    }
  const iets = Object.keys(querySnapshot.docs).map((boude) => {return(<div><button name={`${querySnapshot.docs[boude].id}`} onClick={showTheData}>{querySnapshot.docs[boude].id}</button></div>)})
  return(
    <div>
        {iets}
    </div>
    
  )
}