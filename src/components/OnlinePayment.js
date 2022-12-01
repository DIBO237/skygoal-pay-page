import React, { useEffect, useState,useRef } from "react";
import { Col, Button, Row, Form, InputGroup } from "react-bootstrap";
import "../css/bank.css";
import QRCode from "qrcode";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { success_notify, fail, fail_notify } from "../utils/Utilfunctions";
import { RWebShare } from "react-web-share";
import _ from "lodash";
import Spinner from 'react-bootstrap/Spinner';


import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function OnlinePayment() {
  const [isLoading,setLoading]=useState(false)
  const formEl = useRef();
  const [urls, setURl] = useState("");
  //SWITCH ON TO DEV MODE FROM HERE
  const dev = false

  let host_url = "https://payapi.skygoaltech.com"

  if (dev){
     host_url = "http://localhost:4000"
  }
  const generateURL = (upi, name) => {
    return `upi://pay?pa=${upi}&pn=${name}&cu=INR`;
  };

  async function upicodegen(upi, name) {
    //TODO: Add validation

    const url = generateURL(upi, name);
    const qrCode = await QRCode.toDataURL(url, {
      type: "image/png",
      margin: 1,
      width: 300,
    }).then((data) => data);

    setURl(qrCode);
  }

  const bank = [
    {
      id: 0,
      name:"cashfree",
      url:`${host_url}/cashfree-pay`,
      disabled:false,
      imgUrl: "assets/cash.svg",
    },
    {
      id: 1,
      name:"Payu",
      url:`${host_url}/payu-pay`,
      disabled:false,
      imgUrl: "assets/cash1.svg",
    },
  ];

  const [selectBank, setBank] = useState(0);
  const [bankDetails, setDetails] = useState(bank[selectBank]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [gst, setGst] = useState("");
  const [convienceFee, setConviencefee] = useState(0);
  const [amtTotal, setTotal] = useState(0);

  const submitPay = async (e) => {
    
    if (_.isEmpty(name)) {
      return fail_notify("Name is required !", 3000);
    }
    
    if (_.isEmpty(phone)) {

      return fail_notify("Mobile number is required !", 3000);

    }
    if (_.isEmpty(email)) {
      return fail_notify("Email is required !", 3000);
    }
    if (_.isEmpty(amount)) {
      return fail_notify("Please Enter an amount", 3000);
    }
    let datas = {
     remarks: remarks,
     custGst:gst
      
    };

    
    try{
      setLoading(true)
      formEl.current.custDetails.value = JSON.stringify(datas);
      formEl.current && formEl.current.submit();
      //setLoading(false)
    }catch(err){
      setLoading(false)
       fail_notify("Something went wrong try again later",4000)
    }
    


  };

  //AMOUNT HANDLER
  const AmountHandle = (e) => {
    setAmount(e);

    if (!_.isEmpty(e)) {
      setConviencefee(((2 / 100) * e).toFixed(2));
      console.log(((2 / 100) * e).toFixed(2));
      let fee = ((2 / 100) * e).toFixed(2);
    }

    if (_.isEmpty(e)) {
      setConviencefee(0);
      setTotal(0);
    }
  };
  const handler = (data) => {
    setBank(data);
    setDetails(bank[data]);

    console.log(bank[data]);
  };

  useEffect(() => {
    

    console.log(selectBank);
  }, [selectBank]);
  return (
    <div>
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
              <div>
                <h5>Enter Details</h5>
              </div>
              <Form>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Recipient name*</Form.Label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      placeholder="Enter Your Name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={name}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      className="form-field"
                    />
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Mobile number*</Form.Label>
                  <InputGroup className="mb-3">
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(e) => setPhone(e)}
                      className=""
                      
                      inputClass="form-field w-100"
                      containerClass="W-100"
                    />
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Email ID*</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Recipient's Email"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-field"
                    />
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Amount*</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Enter your Amount"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={(e) => AmountHandle(e.target.value)}
                      value={amount}
                      type="number"
                      className="form-field"
                    />
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>Remarks (optional)</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Enter your Remarks"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      type="text"
                      className="form-field"
                    />
                  </InputGroup>
                </Form.Group>
                {/* // INPUT GROUPS */}
                <Form.Group className="mb-3">
                  <Form.Label>GST Number (optional)</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Recipient's GST Number"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={gst}
                      onChange={(e) => setGst(e.target.value)}
                      type="text"
                      className="form-field"
                    />
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
              <div className=" mb-3">
                <h5>Payment Details</h5>
              </div>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Amount</p>
                  <p>&#8377;{amount ? amount : 0}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Convinence Fees (2%):</p>
                  <p>&#8377;{convienceFee}</p>
                </div>
                <hr></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Total Amount:</p>
                  <p>
                    &#8377;
                    {amount ? parseInt(convienceFee) + parseInt(amount) : 0}
                  </p>
                </div>
              </div>
              <div>
                <p style={{ color: "red", fontWeight: "bold" }}>
                  NOTE: To avoid convinence fee use Bank Transfer
                </p>
              </div>
              {/* DYNAMIC PAYMENT SECTION */}
              <div>
                <div className="px-3 py-3">
                  <Form>
                    {/* SWITHABLE FORM DATA BANK */}
                    {bank.map((data) => (
                      <Form.Check className="mb-3" type={"radio"} name="group1"  >
                        <div
                          className=""
                          style={{ display: "flex", justifyContent: "" }}
                        >
                          <Form.Check.Input
                            value="bank"
                            className="mt-3"
                            onChange={() => handler(data.id)}
                            checked={selectBank === data.id}
                            type={"radio"}
                            disabled ={data.disabled}
                          />
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              flexDirection: "row",
                              paddingLeft: 5,
                            }}
                          >
                            <img
                              className="img-fluid mt-2"
                              src={data.imgUrl}
                              width={70}
                            />
                          </div>

                         {data.disabled ?<small style={{color:"red"}}>* Temporarily unavailable.</small>:"" } 
                        </div>
                      </Form.Check>
                    ))}

                    <div className="mt-5">
                      {
                        !isLoading ?  <Button
                        className={amount > 0 ? "py-2" : "disabled py-2"  }
                        onClick={(e) => submitPay(e)}
                        style={{ width: "100%", backgroundColor: "#2A2742" }}
                        disabled = {bankDetails.disabled}
                      >
                        PAY &#8377;
                        {amount ? parseInt(convienceFee) + parseInt(amount) : 0}
                      </Button> 
                      : 
                       <Button className="py-2" style={{ width: "100%", backgroundColor: "#2A2742" }} disabled>
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                  Loading please wait...
                                </Button>
                      }
                    
                    </div>
                  </Form>
                </div>
              </div>

              <div>
      
          <Form
            className="d-none"
            name="form"
            ref={formEl}
            id="x1"
            method="POST"
            action={bankDetails.url}
            //action="http://localhost:4000/paynow"
          >
            
            <input type="text" name="name" value={name}></input>
            <input type="email" name="email" value={email}></input>
            <input type="text" name="phone" value={phone}></input>
            <input type="text" name="amount" value={amount ? parseInt(convienceFee )+ parseInt(amount): 1}></input>
            <input type="text" name="gatewaytype" value={bankDetails.name}></input>
            <input type="text" name="custDetails" value={""}></input>
          </Form>
      
      </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
