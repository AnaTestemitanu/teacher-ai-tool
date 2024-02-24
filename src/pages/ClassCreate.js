import React, { useState } from 'react';
import "../styles/sidebar.css"
import "../styles/dashboard.css"
import "../styles/content.css"
import "../styles/ClassCreate.css"
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { createClass } from '../api/class.api.js';

const ClassCreate = () => {
  const [classData, setClassData] = useState({
    ClassName: '',
    courseBookPdf: null,
    Topic: '',
    ClassLevel: '',
    ClassAge: '',
    Tons: '',
    ClassGroupName: '',
    PdfPages: '',
    humour: false,
    analogy: false 
  })

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.checked })
  }

  const handleFileChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let tons = "";
    console.log(classData.humour)
    tons = classData.humour ? tons + "humour," : tons;
    tons = classData.analogy ? tons + "analogy" : tons;
    delete classData.humour;
    delete classData.analogy;
    classData.Tons = tons;
    createClass(classData);
    navigate('/previousclasses');
  }

  return (
    <div className="form-container">
    <Sidebar />
        <form className="form" onSubmit={handleSubmit}>
        <label className="form-input-label">
            Name of class:
            <input className="form-input-text" type="text" name="ClassName" onChange={handleInputChange} />
        </label>
        <label className="form-input-label">
            Course Book PDF:
            <input type="file" name="courseBookPdf" onChange={handleFileChange}/>
        </label>
        <label className="form-input-label">
            PDF pages(please separate the page numbers with a comma):
            <input className="form-input-text" type="text" name="PdfPages" onChange={handleInputChange} />
        </label>
        <label className="form-input-label">
            Topic:
            <input className="form-input-text" type="text" name="Topic" onChange={handleInputChange} />
        </label>
        <label className="form-input-label">
            Level of the class:
            <select name="ClassLevel" onChange={handleInputChange}>
                <option value="">Choose a level...</option>
                <option value="1">Lower Ability</option>
                <option value="2">Medium Ability</option>
                <option value="3">High Ability</option>
            </select>
        </label>
        <label className="form-input-label">
            Age of class:
            <input className="form-input-text" type="number" name="ClassAge" onChange={handleInputChange} />
        </label>
        <div style={{textAlign: 'left'}}>
            <label className="form-input-label">
                Tons
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}}>
                        <div style={{textAlign: 'center'}}>
                            <label className="form-input-label">Humour</label>
                            <input type="checkbox" name="humour" onChange={handleCheckboxChange} style={{display: 'block', margin: '0 auto', transform: 'scale(1.5)'}} />
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <label className="form-input-label">Analogy</label>
                            <input type="checkbox" name="analogy" onChange={handleCheckboxChange} style={{display: 'block', margin: '0 auto', transform: 'scale(1.5)'}} />
                        </div>
                    </div>
                </div>
            </label>
        </div>
        <label className="form-input-label">
            Student group name:
            <input className="form-input-text" type="text" name="ClassGroupName" onChange={handleInputChange} />
        </label>
        {/* <div style={{textAlign: 'center'}}>
            <label className="form-input-label">
                Mark as "To share"
                <input type="checkbox" name="toShare" onChange={handleCheckboxChange} style={{display: 'block', margin: '0 auto', transform: 'scale(1.5)'}} />
            </label>
        </div> */}
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ClassCreate;