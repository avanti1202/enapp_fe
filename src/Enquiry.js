
import {useFormik } from "formik";
import axios from "axios";

export default function Enquiry()

{
		const initialValues = { "name": " " , "phone": " " , "query": " "};

		const validate = (values ) => {
				const errors = {};

				if(values.name.trim().length < 2)
						errors.name = "invalid name";

				if( !values.name.match('[A-Za-z ]+') )
						errors.name = "name should contains only alphabet";

				if(values.phone.toString().length !== 10)
						errors.phone = "invalid phone";

				if(values.query.trim().length < 2)
						errors.query = "invalid query";

				return errors;
		
		}

		const onSubmit = (values, resetForm) => {
				let data = {"name":values.name, "phone":values.phone, "query":values.query };
				let urladd = "https://enapp-28june23be.vercel.app/save";
				axios.post(urladd, data)
				.then(res => {
						alert("We will get back to you");
						resetForm();

				})
				.catch(err => console.log(err));
}
		

		const formik = useFormik({initialValues, validate, onSubmit});

		return(
		<>
		<center>
		<h1> Fill the Form </h1>
		<form onSubmit = {formik.handleSubmit}>
		<input type = "text" name= "name" placeholder = "Enter ur name"
		onChange = {formik.handleChange} onBlur = {formik.handleBlur} value= {formik.values.name}/>
		{formik.touched.name && formik.errors.name ? <div className = "err"> {formik.errors.name} </div>: null }
		<br/><br/>
		<input type = "number" name= "phone" placeholder = "Enter ur phone no."
		onChange = {formik.handleChange} onBlur = {formik.handleBlur} value= {formik.values.phone}/>
		{formik.touched.phone && formik.errors.phone ? <div className = "err"> {formik.errors.phone} </div>: null }
		<br/><br/>
		<textarea name= "query" placeholder = "Enter ur query" rows= {5} cols = {30}
		onChange = {formik.handleChange} onBlur = {formik.handleBlur} value= {formik.values.query}/>
		{formik.touched.query && formik.errors.query ? <div className = "err"> {formik.errors.query} </div>: null }
		<br/><br/>
		<input type = "submit"/>
		</form>
		</center>
		</>
		);

}