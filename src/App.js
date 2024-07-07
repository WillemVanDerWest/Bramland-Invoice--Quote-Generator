import { usePDF } from 'react-to-pdf';
import React from 'react';
import { useState } from 'react';
import '../src/App.css'

function App() {
          const counter = 2;
          const [detailsCounter, setDetailsCounter] = useState(counter)

          function incDetailsCounter(){
            const newCounter = detailsCounter  + 1;
            setDetailsCounter(newCounter)
          } //counter funciton

          function decDetailsCounter(){
            const newCounter = detailsCounter  - 1;
            setDetailsCounter(detailsCounter === 0 ? detailsCounter : newCounter)
          }
          


  const imgLink = "https://bramlandgroup.co.za/wp-content/uploads/2020/09/bramsmallerlogo.png";
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const placeHolders = {
    input01 : 'placeholder01',
    input02 : 'placeholder02',
    quoteTotal : '5000',
    quoteNumber : '4339',
    date: '2024',
  }

  
  const [allInputs, setAllInputs] = useState(placeHolders)

 
  function changeState(event){
    const type = event.target.type === 'checkbox'? event.target.checked: event.target.value;
    
    // const change = type === 'checkbox' ? event.target.checked : event.target.value
    const newInputData = {
      ...allInputs,

       [event.target.name]: type,
    }

    setAllInputs(newInputData)
  }
  
  const detailsArray = []
  const detailsInputs = []
 
  for (let i = 0; i < detailsCounter; i++) {
    const name = `line${i}`;
    const amount = `line${i} Amount`;
    detailsArray.push(
      
      <div className='Flex Space-Between Right-Margin80 Div-Border'>
        <div>
          <li className='Height'>{allInputs[name]}</li>
        </div>
        <div className='Test'>
          <span >R{allInputs[amount]}-00</span>
        </div>
      </div>
    );
    
    detailsInputs.push(
      <div className='Flex Padding-Input'>
        <input
          type='text' 
          id={i}
          name={`line${i}`}
          placeholder={i+1}
          onChange={changeState}
        />
        <input
            type='text'
            name={`line${i} Amount`}
            onChange={changeState}

        />
        
       </div>
    )
    
  }

  const exampleClientAdress = {
    line01 : 'Muller Heyneke / 071 855 5481',
    line02 : 'Byvanger 14',
    line03 : 'Rooihuiskraal',
    line04 : 'Centurion',
    line05 : 'mullerheyneke@gmail.com',
  };

  const [clientAddress, setClientAddress] = useState(exampleClientAdress);

  function handleClientAddress(event){
    const newClientAddress = {...clientAddress,
                            [event.target.name] : event.target.value,
    }
    setClientAddress(newClientAddress)
  }

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
  const [selectedBank, setSelectedBank] = useState()

  function handleBank(event){
    const newBank = event.target.value;
    setSelectedBank(newBank)
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







  return (
    <div>
      <button className='Download' onClick={() => toPDF()}>Download</button>
      <div/>
        <div className='Count-Pos'>
          <button onClick={incDetailsCounter}>+</button>
          <button onClick={decDetailsCounter}>-</button>
          <label>{detailsCounter}</label>
        </div>
        
        <div className='Input-Pos'>{detailsInputs}</div>
              
      <div/>
      <div className='Inputs'>
        <input type='text' name='line01' onChange={handleClientAddress} placeholder={exampleClientAdress.line01}/>
      <div/>
        <input type='text' name='line02' onChange={handleClientAddress} placeholder={exampleClientAdress.line02}/>
      <div/>
        <input type='text' name='line03' onChange={handleClientAddress} placeholder={exampleClientAdress.line03}/>
      <div/>
        <input type='text' name='line04' onChange={handleClientAddress} placeholder={exampleClientAdress.line04}/>
      <div/>
        <input type='text' name='line05' onChange={handleClientAddress} placeholder={exampleClientAdress.line05}/>
      <div/>
      
      <input type='date' name='date' onChange={changeState}/>
      </div>
      <div className='Inputs'>
        <input type='radio' id='Privaat' name='bank' value="Privaat" onChange={handleBank}/>
        <label for="Privaat">Privaat</label>
        <input type='radio' id='Besigheid' name='bank' value="Besigheid" onChange={handleBank}/>
        <label for='Besigheid'>Besigheid</label>
      </div>
      {/* Subtotaal */}
      <label className='Inputs'><input type='checkbox' name='subTotaalCheck' onChange={changeState}/> SubTotaal<input type='text' name='subtotaal' onChange={changeState}/></label>
      <div/>
      {/* Vat */}
      <label className='Inputs'>
      <input type='checkbox' name='vatCheck' onChange={changeState}/>
       {` `}Vat{` `}
      <input  type='text' name='vat' onChange={changeState}/>
      </label>

      <div/>
      {/* Totaal */}
      <label className='Inputs'>Totaal</label>
      <input  
              
              type='text' 
              onChange={changeState} 
              name='quoteTotal'
      />
      <div/>
      {/* Quote Number */}
      <label className='Inputs'>Kwotasie Nommer</label>
      <input  
              
              type='text' 
              onChange={changeState} 
              name='quoteNumber'
      />
      
      
      

      <div ref={targetRef}>
      <div className="Margin-Top"></div>
        <div className="LeftRightSplit">

          
          {/* left kwotasie number */}
          <div className="LeftRotate LeftFont">
            <h2>Kwotasie {`  `}<span className="Colour-Red ">{allInputs.quoteNumber}</span></h2>
          </div>

            {/* Right side, all info       */}
          <div >
            <div><img src={imgLink} alt="Bramland Logo"/></div>
          </div>
          
        </div>

        <div className="Line Line01-Margin"></div>

        <div className="Margin-Left Flex">
            <div className="WidthHeight"><span className="Colour-Red">Datum</span>
                <p>{allInputs.date}</p>
            </div>
            <div className="WidthHeight"><span className="Colour-Red">Aan</span>
                  <p>
                    {clientAddress.line01}
                    <br/>
                    {clientAddress.line02}
                    <br/>
                    {clientAddress.line03}
                    <br/>
                    {clientAddress.line04}
                    <br/>
                    {clientAddress.line05}
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
            {detailsArray}
          </ol>
          {allInputs.subTotaalCheck === true ? <h4 className='Totaal border'>SubTotaal: R{allInputs.subtotaal}-00</h4> : ``}
          {allInputs.vatCheck === true ? <h4 className='Totaal'>Vat: R{allInputs.vat}-00</h4>: ``}
          <h3 className="Totaal">TOTAAL: R{allInputs.quoteTotal}-00</h3>

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
              {selectedBank === 'Besigheid' ? bussinessBank() : privateBank()}
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
