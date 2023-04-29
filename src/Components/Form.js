import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [download, setdownload] = useState(false);
  const [msg, setmsg] = useState('');
  

  const submithandler = async(event) => {
    event.preventDefault();
   

    try {
      const details = {
        name: event.target.name.value,
        mobileNo: event.target.mobile.value,
        school: event.target.school.value,
        myclass: event.target.class.value,
        rollno: event.target.rollno.value,
        address: event.target.address.value,
      };
   

      console.log(details);
      
     await axios.post(`http://localhost:5000/api/form`, details);
      console.log("success");
      setdownload(true);

      localStorage.setItem("rollno",details.rollno);
      setmsg("You can Download your Admit Card!");
      event.target.name.value="";
      event.target.mobile.value="";
      event.target.school.value="";
      event.target.rollno.value="";
      event.target.address.value="";
   
    } catch (error) {
      alert(error);
    }
  };
  const getdata=async()=>{
    let rollno=localStorage.getItem("rollno");
    const data= await axios.get(`http://localhost:5000/api/form/${rollno}`);
    var doc=new window.jsPDF();
    doc.text(`                                             Admit Card  

    
    Name : ${data.data.data.name}                            Roll No: ${data.data.data.rollno}

    Class: ${data.data.data.myclass}

    Mobile No: ${data.data.data.mobileNo}

    School :${data.data.data.school}

    Address:${data.data.data.address}`,20,20);
    doc.save(`${data.data.data.name}AdmitCard.pdf`);
    localStorage.clear();
    setmsg("Admit Download SuccessFully!");
    
  }
  return (
    <div className="container sm text-centre">
      <h2>Admit Card Generation</h2>

      <form onSubmit={submithandler} style={{ border: "solid 2px" }}>
        <div className="form-row my-4 mx-4">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              name="mobile"
              placeholder="Mobile Number"
              required
            />
          </div>
        </div>
        <div className="form-row my-4 mx-4">
          <div className="form-group col-md-6">
            <label htmlFor="school">School</label>
            <input type="text" className="form-control" name="school" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="Class">Class</label>
            <select name="class" className="form-control">
              {Array.from(Array(12), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="rollno">Roll No.</label>
            <input
              type="text"
              className="form-control"
              name="rollno"
              placeholder="Roll No"
            />
          </div>
        </div>
        <div className="form-group my-4 mx-4">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
          />
        </div>

        <button type="submit" className="btn btn-dark my-4 mx-4">
          Generate Admit Card
        </button>
      </form>
      {download && <p>{msg}</p>}
      

      {download && (
        <button className="btn btn-primary my-4 mx-4" onClick={getdata}>
          Download Admit Card
        </button>
      )}
     
    </div>
  );
}
