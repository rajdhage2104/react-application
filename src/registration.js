import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px',
    width: '50%',
    left: '19%',
    position: 'relative',
    marginTop: '10%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password:'',
    designation: '',
    phone_number: '',
    previous_exp: '',
    is_admin: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(process.env.REACT_APP_API_URL,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('inside')
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.message);
        navigate('/success');
        // Handle success or display an appropriate message to the user
      } else {
        console.error('Error:', response.status);
        // Handle error or display an appropriate message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error or display an appropriate message to the user
    }
  };

  return (
    <div className={classes.card}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <h2>Add User Form</h2>
        <TextField
          className={classes.input}
          label="First Name"
          id="first_name"
          placeholder="First Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Middle Name"
          id="middle_name"
          placeholder="Middle Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Last Name"
          id="last_name"
          placeholder="Last Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Email"
          id="email"
          placeholder="Email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Password"
          id="password"
          placeholder="Password"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Designation"
          id="designation"
          placeholder="Designation"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Contact Number"
          id="phone_number"
          placeholder="Contact Number"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Previous Experience"
          id="previous_exp"
          placeholder="Previous Experience"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          label="Is Admin"
          id="is_admin"
          placeholder="Is Admin"
          variant="outlined"
          onChange={handleChange}
        />
        <div>
          <Button variant="contained">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;