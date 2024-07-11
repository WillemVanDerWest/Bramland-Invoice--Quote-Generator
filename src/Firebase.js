import { initializeApp } from "firebase/app";
import { setDoc, getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, getStorage, ref, uploadString} from "firebase/storage";
// Step 02
// Config
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



// add data to database
export function RunMe(prop){
  async function addData(){
    //Store data on the cloud
    await setDoc(doc(db, `Quote's`, `${prop.allData.quoteNumber}`),prop.allData);
  }

return(
  <div>
    <button onClick={addData}>Upload Data</button>
    <label>{prop.allData.quoteNumber}</label>
  </div>
)
}



