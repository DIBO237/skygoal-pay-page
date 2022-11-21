import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../css/Home.css";

function Home() {
  const [item, setItem] = useState("bank");
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.persist();
    console.log(e.target.value);

    setItem(e.target.value);
    if (e.target.value === "bank") {
      navigate("/bank");
    }

    if (e.target.value === "online") {
      navigate("/onlinepayment");
    }
  };

  useEffect(()=>{
    navigate(item)
  },[])

  return (
    <div className="container box mb-5">
      <Form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Form.Check inline type={"radio"} name="group1">
          <div
            className=""
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Form.Check.Input
              value="bank"
              className="mt-3"
              onChange={handleChange}
              checked={item === "bank"}
              type={"radio"}
            />
            <div style={{ display: "flex", marginLeft: 10 }}>
              <img
                className="img-fluid"
                src="assets/cashless-payment.svg"
                width={50}
              />
              <div style={{ marginLeft: 5 }}>
                <h5 className="" style={{fontSize:17}}>Bank Transfer</h5>
                <p style={{fontSize:10}}>{"(UPI/IMPS/RTGS/NEFT)"}</p>
              </div>
            </div>
          </div>
        </Form.Check>

        <Form.Check inline type={"radio"} name="group1">
          <div
            className=""
            style={{ display: "inline-flex", justifyContent: "space-around" }}
          >
            <Form.Check.Input
              value="online"
              className="mt-3"
              onChange={handleChange}
              checked={item === "online"}
              type={"radio"}
              isValid
            />
            <div style={{ display: "flex", marginLeft: 10 }}>
              <img
                src="assets/mobile-banking.svg"
                className="img-fluid"
                width={50}
              />
              <div style={{ marginLeft: 5 }}>
                <h5 className="" style={{fontSize:17}}>Online</h5>
                <p style={{fontSize:10}}>(Credit card/Debit card/Net <br></br> banking/Others)</p>
              </div>
            </div>
          </div>
          <Form.Control.Feedback type="valid">
            You did it!
          </Form.Control.Feedback>
        </Form.Check>
      </Form>

      <hr></hr>

      <Outlet />
    </div>
  );
}
export default Home;
