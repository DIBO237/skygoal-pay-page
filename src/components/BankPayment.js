import React, { useEffect, useState } from "react";
import { Col, Button, Row, Form, InputGroup } from "react-bootstrap";
import "../css/bank.css";
import QRCode from "qrcode";
import { FaCopy } from 'react-icons/fa';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { success_notify,fail } from "../utils/Utilfunctions";


export default function BankPayment() {

    const [urls,setURl]=useState("")

const generateURL = ( upi,name) => {
  return `upi://pay?pa=${upi}&pn=${name}&cu=INR`;
};

async function upicodegen( upi,name) {
  //TODO: Add validation
 
  const url = generateURL(upi,name);
  const qrCode = await QRCode.toDataURL(url, {
    type: "image/png",
    margin: 1,
    width: 300,
  }).then((data)=>data);

  setURl(qrCode)
 
}


const bank = [{
    id:0,
    AcName:"SKYGOAL INNOVA TECHNOLOGIES PVT LTD",
    acNum:"180305500728",
    ifsc:"ICIC0001803",
    branch:"ICICI BANK LTD, ELURU ROAD VIJAYAWADA",
    gstNum:"36ABACS8072J1Z0",
    imgUrl:"assets/thunder 2.svg"
},
{
  id:1,
  AcName:"SKYGOAL INNOVA TECHNOLOGIES PVT LTD",
  acNum:"10075085892",
  ifsc:"IDFB0080391",
  branch:"Vijayawada Branch",
  gstNum:"36ABACS8072J1Z0",
  imgUrl:"assets/thunder 4.svg"
},
{
  id:2,
  AcName:"SKYGOAL INNOVA TECHNOLOGIES PVT LTD",
  acNum:"27530200001168",
  ifsc:"BARB0CYBHYD",
  branch:"Hi-tech branch, Hyderabad",
  gstNum:"36ABACS8072J1Z0",
  imgUrl:"assets/thunder 5.svg"
},


]

const [selectBank,setBank]= useState(0)
const [bankDetails,setDetails]=useState(bank[selectBank])

const handler = (data)=>{
   setBank(data)
   setDetails(bank[data])

   console.log(bank[data])
   
}


useEffect(()=>{
    upicodegen("skygoalofficial@icici","SKYGOAL INNOVA TECHNOLOGIES PVT LTD")

    console.log(selectBank)
},[selectBank])
  return (
    <div>
      <div className="px-3 py-3">
        <Form>
          {/* SWITHABLE FORM DATA BANK */}
          {
            bank.map((data)=>(
              <Form.Check inline type={"radio"} name="group1">
          <div
            className=""
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Form.Check.Input
              value="bank"
              className="mt-3"
              onChange={()=>handler(data.id)}
              checked={selectBank === data.id}
              
              type={"radio"}
            />
            <div style={{ display: "flex", marginLeft: 10 }}>
              <img
                className="img-fluid"
                src={data.imgUrl}
                width={95}
              />
             
            </div>
          </div>
        </Form.Check>
                
            ))
          }
        
        </Form>

      </div>
      <Row>
        <Col
          className="mb-5 h-100 mx-auto"
          sm={12}
          md={6}
          xl={6}
          lg={6}
          xs={12}
        >
          <div className="box-outer">
            <div className="box-inner">
              <div className="text-center mb-2">
                <img
                  className="img=fluid"
                  src={bankDetails?.imgUrl}
                  width={150}
                />
              </div>
              <div>
                <h5>Account Details</h5>
              </div>
              <Form>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Account name</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={bankDetails?.AcName}
                      className="form-field"
                    />
                    <InputGroup.Text
                      className="copy-button"
                      style={{ backgroundColor: "transparent" ,border:"none"}}
                      id="basic-addon2"
                      
                    ><CopyToClipboard text={bankDetails?.AcName}
                    onCopy={() => success_notify('Copied Successfully !',3000)}>
                    <span><div >
                        <FaCopy />
                    </div></span>
                  </CopyToClipboard>
                      
                      
                      
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Account number</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={bankDetails?.acNum}
                      className="form-field"
                    />
                    <InputGroup.Text
                      className="copy-button"
                      style={{ backgroundColor: "transparent" ,border:"none"}}
                      id="basic-addon2"
                      
                    ><CopyToClipboard text={bankDetails?.acNum}
                    onCopy={() => success_notify('Copied Successfully !',3000)}>
                    <span><div >
                        <FaCopy />
                    </div></span>
                  </CopyToClipboard>
                      
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Enter IFSC code</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={bankDetails?.ifsc}
                      className="form-field"
                    />
                    <InputGroup.Text
                      className="copy-button"
                      style={{ backgroundColor: "transparent" ,border:"none"}}
                      id="basic-addon2"
                      
                    ><CopyToClipboard text={bankDetails?.ifsc}
                    onCopy={() => success_notify('Copied Successfully !',3000)}>
                    <span><div >
                        <FaCopy />
                    </div></span>
                  </CopyToClipboard>
                      
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Bank Branch</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={bankDetails?.branch}
                      className="form-field"
                    />
                     <InputGroup.Text
                      className="copy-button"
                      style={{ backgroundColor: "transparent" ,border:"none"}}
                      id="basic-addon2"
                      
                    ><CopyToClipboard text={bankDetails?.branch}
                    onCopy={() => success_notify('Copied Successfully !',3000)}>
                    <span><div >
                        <FaCopy />
                    </div></span>
                  </CopyToClipboard>
                      
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>GST Number</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={bankDetails?.gstNum}
                      className="form-field"
                    />
                    <InputGroup.Text
                      className="copy-button"
                      style={{ backgroundColor: "transparent" ,border:"none"}}
                      id="basic-addon2"
                      
                    ><CopyToClipboard text={bankDetails?.gstNum}
                    onCopy={() => success_notify('Copied Successfully !',3000)}>
                    <span><div >
                        <FaCopy />
                    </div></span>
                  </CopyToClipboard>
                      
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
        <Col
          className="mb-5 h-100 mx-auto"
          sm={12}
          md={6}
          xl={6}
          lg={6}
          xs={12}
        >
          <div className="box-outer"> 
             <div className="box-inner"> 
               <div className="text-center mb-3">
                 <h5>Scan & Pay Using this Payments App</h5>
               </div>
               <div className="text-center mb-5">
                 <img src="assets/111.svg" />
               </div>
               <div className="text-center mb-5">
                <img className="img-fluid" src={urls} />

               </div>

               <div>
                <h5>UPI ID</h5>
               </div>

               <div>
               <Form.Group className="mb-3">
                 
                  <InputGroup className="mb-3 upi-field p-1" >
                    <Form.Control
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={"skygoalofficial@icici"}
                      className=""
                      style={{border:"none"}}
                    />
                    <CopyToClipboard text={"skygoalofficial@icici"}
                    onCopy={() => success_notify('Copied Successfully !',3000)}>
                     <InputGroup.Text
                      className=""
                      style={{ backgroundColor: "black",color:"white",cursor:"pointer" }}
                      id="basic-addon2"
                    >
                      copy
                    </InputGroup.Text>
                  </CopyToClipboard>
                   
                  </InputGroup>
                </Form.Group>
               </div>

             </div>
            </div>
        </Col>
      </Row>
    </div>
  );
}
