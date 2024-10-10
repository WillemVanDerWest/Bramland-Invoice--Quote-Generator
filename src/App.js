import { usePDF } from 'react-to-pdf';
import React from 'react';
import { useState } from 'react';
import '../src/App.css'
import { RunMe}from './Firebase.js'
import { doc, getDoc, getFirestore, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import LogAllData from './Compononts/entries.js';








function App() {
          
        const info = {
          quoteNumber: '0000',
          address: {
            line01 : 'Muller Heyneke / 071 855 5481',
            line02 : 'Byvanger 14',
            line03 : 'Rooihuiskraal',
            line04 : 'Centurion',
            line05 : 'mullerheyneke@gmail.com',
          },
          
          date: '0000-00-00',
          bank: 'Privaat',
          subtotaal: '0',
          subTotaalCheck: false,
          vat: '0',
          vatCheck: false,
          quoteTotal : '0',
          detailedDescription: {
                                  line1: {
                                      key: '1',
                                      details: '',
                                      amount: ''},
                                  line2: {
                                      key: '2',
                                      details: '',
                                      amount: ''},
                                  line3: {
                                      key: '3',
                                      details: '',
                                      amount: ''},
                                      }

}
const [allInputs, setAllInputs] = useState(info)


//Increase and Decrease Counter
          const counter = 3;
          const [detailsCounter, setDetailsCounter] = useState(counter)

          function incDetailsCounter(){
            const newCounter = detailsCounter  + 1;
            setDetailsCounter(newCounter)
          } //counter funciton

          function decDetailsCounter(){
            const newCounter = detailsCounter  - 1;
            setDetailsCounter(detailsCounter === 0 ? detailsCounter : newCounter)
          }
//Increase and Decrease Counter

//Logo
  const imgLink = "https://bramlandgroup.co.za/wp-content/uploads/2020/09/bramsmallerlogo.png";
//Logo
//usePDF
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
//usePDF

//Function that handles all the changes that happens on the page
  function changeState(event){
    const type = event.target.type === 'checkbox'? event.target.checked: event.target.value;
    const newInputData = {
      ...allInputs,

       [event.target.name]: type,
    }

    setAllInputs(newInputData)
  }
//Function that handles all the changes that happens on the page

//New add and remove list items
function addLines(){
  incDetailsCounter()
  const newLine = {...allInputs};
  newLine.detailedDescription[`line0${detailsCounter+1}`] = {
    key : `${detailsCounter+1}`,
    details : `${detailsCounter+1}`,
    amount : ''};

  setAllInputs(newLine);
}

function removeLines(){
  decDetailsCounter()
  const removeLine = allInputs;
  delete removeLine.detailedDescription[`line0${detailsCounter}`];
  setAllInputs(removeLine);
}
//New add and remove list items
//add line info to object
function changeLineInputs(event){
  const setId = event.target.id;
  const inputName = event.target.name;
  const inputValue = event.target.value;
  const changeTheInput = {
          ...allInputs.detailedDescription[`line${setId}`],
          [event.target.name]: inputValue
        };
  
  const newDetailedDescription = {
          ...allInputs.detailedDescription,
          [`line${setId}`] : changeTheInput
  };

  const addToAllInputs = {
          ...allInputs,
          detailedDescription: newDetailedDescription}
  
  setAllInputs(addToAllInputs)
}
function changeAmountInputs(event){
  const setId = event.target.id;
  const addLines = {...allInputs.detailedDescription[`line${setId}`], [event.target.name]:event.target.value}
  const newLine = {...allInputs};
  newLine.detailedDescription[`line${setId}`] = {
    key : event.target.id,
    details : newLine.detailedDescription[`line${setId}`].details,
    amount : event.target.value === '' ? '' : event.target.value
  }
  setAllInputs(newLine)
}
//add line info to object

//render Lines
const renderLinesList = Object.keys(allInputs.detailedDescription).map((item) => {
  return(
          // <div key={allInputs.detailedDescription[item].key}>
          //     <li>details: {allInputs.detailedDescription[item].details}</li>
          // </div>
       <div className='Flex Space-Between Right-Margin80 Div-Border'>
       <div>
         <li className='Height'>{allInputs.detailedDescription[item].details}</li>
       </div>
       <div className='Test'>
         <span >R{allInputs.detailedDescription[item].amount}-00</span>
       </div>
     </div>
       
      )});
//render Lines
//render Inputs
const renderInput = Object.keys(allInputs.detailedDescription).map((item) => {
  return(
              <div className='Flex Padding-Input'>
                <input
                  type='text' 
                  id={allInputs.detailedDescription[item].key}
                  name='details'
                  placeholder={allInputs.detailedDescription[item].key}
                  onChange={changeLineInputs} 
                  value={allInputs.detailedDescription[item].details}
                />
                <input
                    id={allInputs.detailedDescription[item].key}
                    type='text'
                    name='amount'
                    onChange={changeAmountInputs}
                    value={allInputs.detailedDescription[item].amount}
                />
              </div>
  )
})
//render Inputs
  const exampleClientAdress = {
    line01 : 'Muller Heyneke / 071 855 5481',
    line02 : 'Byvanger 14',
    line03 : 'Rooihuiskraal',
    line04 : 'Centurion',
    line05 : 'mullerheyneke@gmail.com',
  };
//update the address
  function handleClientAddress(event){
    const newClientAddress = {...allInputs.address, [event.target.name] : event.target.value,
    }
    const grabAllInputs = {...allInputs, address : newClientAddress}
    setAllInputs(grabAllInputs)
  }
//update the address

//update the Bank
  const bankDetails01 = { 
    bank : 'NEDBANK',
    rekNaam : 'J Van Der Westhuizen',
    takkode : '164445',
    rekNr : '1664 346 869'
  }

  const bankDetails02 = {
    bank : 'NEDBANK',
    rekNaam : 'BRAMLAND GROUP',
    takkode : '198765',
    rekNr : '124 865 4501'
  }

  function handleBank(event){
    const newBank = {...allInputs, bank: event.target.value};
    setAllInputs(newBank)
  }
  const bussinessBank =() => { return(
                                    
    <p>
      NEDBANK <br/>
      REKENING NAAM: {bankDetails02.rekNaam}<br/>
      TAKKODE: {bankDetails02.takkode}<br/>
      REKENING NR: {bankDetails02.rekNr}
    </p>
  )};

  const privateBank =() => { return(
                                    
                                      <p>
                                        NEDBANK <br/>
                                        REKENING NAAM: {bankDetails01.rekNaam}<br/>
                                        TAKKODE: {bankDetails01.takkode}<br/>
                                        REKENING NR: {bankDetails01.rekNr}
                                      </p>
                                    )};
//update the Bank



//Retreive data

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

      
      const [retreivedData, setRetreivedData] = useState()

      async function handleRetreivedData(){

        const docRef = doc(db, `Quote's`,`${allInputs.quoteNumber}`);
        const docSnap = await getDoc(docRef);

        const docSnapData = docSnap.data()

        const newData = docSnapData
        console.log(newData)
        setRetreivedData(newData)
        setAllInputs(newData)
      }
//Retreive data
//Retreive Data from entries
      const [grabbedData, setGrabbedData] = useState('')
      function handleDataFromEntries(data){
        setGrabbedData(data);
        setAllInputs(data);
      }
//Retreive Data from entries
  return (

    <div>
      
      {/*Add Data */}
        
        <labal>Current Quote Number: {allInputs.quoteNumber ? allInputs.quoteNumber : '0000'}</labal>
        <RunMe
        allData = {allInputs}
        />
      {/* Add Data */}

      {/* Receive Data */}
        <div>
          <button onClick={handleRetreivedData}>Receive</button>
          <label>Retreived data: {retreivedData ? `${retreivedData.quoteNumber}` : 'empty'}</label>
        </div>
      {/* Receive Data */}
      <LogAllData
            sendDataToParent = {handleDataFromEntries}
          />

      <button className='Download' onClick={() => toPDF()}>Download</button>
      <div/>
        <div className='Count-Pos'>
          <button onClick={addLines}>+</button>
          <button onClick={removeLines}>-</button>
          <label>{detailsCounter}</label>
        </div>
        
        <div className='Input-Pos'>{renderInput}</div>
              
      <div/>
{/* Address inputs */}
      <div className='Inputs'>
        <input type='text' name='line01' onChange={handleClientAddress} value={allInputs.address.line01} placeholder={exampleClientAdress.line01}/>
      <div/>
        <input type='text' name='line02' onChange={handleClientAddress} value={allInputs.address.line02} placeholder={exampleClientAdress.line02}/>
      <div/>
        <input type='text' name='line03' onChange={handleClientAddress} value={allInputs.address.line03} placeholder={exampleClientAdress.line03}/>
      <div/>
        <input type='text' name='line04' onChange={handleClientAddress} value={allInputs.address.line04} placeholder={exampleClientAdress.line04}/>
      <div/>
        <input type='text' name='line05' onChange={handleClientAddress} value={allInputs.address.line05} placeholder={exampleClientAdress.line05}/>
      <div/>
{/* Address inputs */}
{/* Date */}
      <input type='date' name='date' onChange={changeState} value={allInputs.date}/>
      </div>
{/* Date */}
{/* Bank checkboxes */}
      <div className='Inputs'>
        <input type='radio' id='Privaat' name='bank' value="Privaat" onChange={handleBank} checked={allInputs.bank === 'Privaat'}/>
        <label for="Privaat">Privaat</label>
        <input type='radio' id='Besigheid' name='bank' value="Besigheid" onChange={handleBank} checked={allInputs.bank === 'Besigheid'}/>
        <label for='Besigheid'>Besigheid</label>
      </div>
{/* Bank checkboxes */}
{/* Subtotaal */}
      <label className='Inputs'>
        <input type='checkbox' name='subTotaalCheck' onChange={changeState} checked={allInputs.subTotaalCheck === true}/>
          {` SubTotaal`}
        <input type='text' name='subtotaal' onChange={changeState} value={allInputs.subtotaal}/>
      </label>
{/* Subtotaal */}
      <div/>
{/* Vat */}
      <label className='Inputs'>
      <input type='checkbox' name='vatCheck' onChange={changeState} checked={allInputs.vatCheck === true}/>
       {` Vat`}
      <input  type='text' name='vat' onChange={changeState} value={allInputs.vat}/>
      </label>
{/* Vat */}

      <div/>
{/* Totaal */}
      <label className='Inputs'>Totaal</label>
      <input type='text' onChange={changeState} name='quoteTotal' value={allInputs.quoteTotal}/>
{/* Totaal */}
      <div/>
{/* Quote Number */}
      <label className='Inputs'>Kwotasie Nommer</label>
      <input  
              type='text' 
              onChange={changeState} 
              name='quoteNumber'
              value={allInputs.quoteNumber}
      />
{/* Quote Number */}
      
      
      

      <div ref={targetRef}>
      <div className="Margin-Top"></div>
        <div className="LeftRightSplit">

          
          {/* left kwotasie number */}
          <div className="LeftRotate LeftFont">
            <h2>Kwotasie {`  `}<span className="Colour-Red ">{allInputs.quoteNumber ? allInputs.quoteNumber : '0000'}</span></h2>
          </div>

            {/* Right side, all info       */}
          <div >
            <div><img src={imgLink} alt="Bramland Logo"/></div>
          </div>
          
        </div>

        <div className="Line Line01-Margin"></div>

        <div className="Margin-Left Flex">
            <div className="WidthHeight"><span className="Colour-Red">Datum</span>
                <p>{allInputs.date ? allInputs.date : '0000-00-00'}</p>
            </div>
            <div className="WidthHeight"><span className="Colour-Red">Aan</span>
                  <p>
                    {allInputs.address.line01}
                    <br/>
                    {allInputs.address.line02}
                    <br/>
                    {allInputs.address.line03}
                    <br/>
                    {allInputs.address.line04}
                    <br/>
                    {allInputs.address.line05}
                  </p>
                
            </div>
            <div className="WidthHeight"><span className="Colour-Red">Van</span>
                  <p>
                    Bramland Group
                    <br/>
                    Rabie Str, 146, Meyerspark
                    <br/>
                    REG NO: 2003/014403/23
                    <br/>
                    Marco / 076 541 7705
                  </p>
            </div>
        </div>

        <div className="Line line02-Margin"></div>
        
        <div className="Description"> 
          <span className="Description-Heading">Beskrywing</span>

          <ol>

            {/* {detailsArray} */}
            {renderLinesList}
          </ol>
          {allInputs.subTotaalCheck === true ? <h4 className='Totaal border'>SubTotaal: R{allInputs.subtotaal}-00</h4> : ``}
          {allInputs.vatCheck === true ? <h4 className='Totaal'>Vat: R{allInputs.vat}-00</h4>: ``}
          <h3 className="Totaal">TOTAAL: R{allInputs.quoteTotal ? allInputs.quoteTotal : '0'}-00</h3>

        </div>

        <div>
          <h4 className="Brown-Color Right-Margin80 Align-Right">Dankie vir die geleentheid om te kwoteer!</h4>

          <p className="LeftMargin180 Brown-Color">ONS BESKIK OOR "PUBLIC LIABILITY INSURANCE" BY OUTSURANCE, WAT ALLE MURE EN STRUKTURE
            <br/>
            DEK, UITGESLUIT ALLE TYDELIKE STRUKTURE, REEDS GEKRAAKTE OF GEBREEKTE MURE EN STRUKTURE,
            <br/>
            ASOOK ALLE PLANTE.
          </p>
        </div>

        <div>
          <ul className="Flex LeftMargin180 No-Bullets Space-Between Right-Margin80">
            <li>
              {allInputs.bank === 'Besigheid' ? bussinessBank() : privateBank()}
            </li>

            <li>
              <p>
                75% DEPOSITO IS BETAALBAAR VOOR<br/>
                WERK GESKEDULEER KAN WORD.
              </p>
            </li>
          </ul>
        </div>

        <div className="Flex Cell-Email-Box Right-Margin80 LeftMargin180 Space-Between">
          <div className="Each-Box"></div>
          <div className="Each-Box"><span className="Colour-Red">Email: </span>bramland.office@gmail.com</div>
        </div>
        <div className="Flex Cell-Email-Box Right-Margin80 LeftMargin180 Space-Between">
          <div className="Each-Box"><span className="Colour-Red">Cell:</span> 076 541 7705</div>
          <div className="Each-Box"><span className="Colour-Red">Web:</span> www.bramlandgroup.co.za</div>
        </div>
          
        </div>
    </div>
  );
}

export default App;
