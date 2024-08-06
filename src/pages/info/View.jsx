import { Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, Paper, TextField, Typography, useTheme, Tab, Tabs, Grid, Button } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useForm } from 'react-hook-form';
import Contacts from './Contacts'
import {useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SvgIcon from '@mui/material/SvgIcon';
import { divisions, top100Films, category, vendors, currency, modeTransport, paymentTerm, vendorState, store, priceBasis  } from "../constants";
import dayjs from 'dayjs';
import axios from 'axios';
import {  toast } from 'react-toastify';
const Team = () => {
    const location = useLocation();
    const [date, setDate] = useState(new Date());
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [storyStatus, setStoryStatusError] = useState("");

    const [divisionError, setDivisionError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [showTab, setShowTab] = useState(true);
    const [storeError, setStoreError] = useState("");
    const [amendDateError, setAmendDateError] = useState("");
    const [affDateError, setAffDateError] = useState("");
    const [vendorError, setVendorError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [effDateError, setEffDateError] = useState("");
    const [comboboxError, setComboboxError] = useState("");
    const [priceDesc, setPriceDesc] = useState("");
    const [amendment, setAmendment] = useState(false);
    const [selectVendor, setSelectVendor] = useState("");

    
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const [addressError, setAddressError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addresError, setAddresError] = useState("");
    const [latitudeError, setLatitudeError] = useState("");
    const [longitudeError, setLongitudeError] = useState("");
    const [pricebasisError, setPricebasisError] = useState("");
    const [vendorEvent, setVendorEvent] = useState("");
    const [selectedValue, setSelectedValue] = useState("onetimepo");
    const [modeOfTransportDesc, setModeOfTransportDesc] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("");
    const [vendorStateError, setVendorStateError] = useState("");

    const [vendorAddressError, setVendorAddressError] = useState("");
    const [formData, setFormData] = useState("");
    
   
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    // document.write(today);
    const [currentDate, setCurrentDate] = useState(today);
    const [currentValue, setCurrentValue] = useState("");
    const [data, setData] = useState("");
    const [poDateError, setPoDateError] = useState("");
    const { register, handleSubmit, reset } = useForm();
    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };
    useEffect(()=>{
        let data=[];
        let phone = currentValue != "" ? currentValue : location.pathname.split("/")[2];
       
            if(localStorage.getItem("contactData") != undefined){
                data=JSON.parse(localStorage.getItem("contactData"));
                const emailExists = data.find(item => item.phoneNumber === phone);
                if (emailExists) {
                    setData(emailExists);
                }
            }
            console.log(data);
    },[]);
    const [poDate, sePotDate] = useState(null);
    const handlePoDateChange = (e, value) => {
        console.log(e.target.value)
        const date = e.target.value;
        sePotDate(date);
        setPoDateError('');
    };
    console.log(currentDate)
    const [effDate, setEffDate] = useState(null);
    useEffect(() => {
        setCurrentDate(today);
    }, [])
    const handleEffDateChange = (e, value) => {
        const date = e.target.value;
        setEffDate(date);
    };
    const [amendDate, setAmendDate] = useState(null);
    const handleAmendDateChange = (e, value) => {
        const date = e.target.value;
        setAmendDate(date);
    };
    const [endDate, setEndDate] = useState(null);
    const handleEndDateChange = (e, value) => {
        const date = e.target.value;
        setEndDate(date);
    };
    const handleFormSubmit = async (formData) => {

        let formDirty = false;      
        
       

        if (formData.name.length == 0) {console.log(8);
            setNameError('Name is required');
            formDirty = true
        } else {
            setNameError('');
        }
        if (formData.phoneNumber.length == 0) {
            setPhoneNumberError('phone Number Is required');
            formDirty = true
        } else {
            setPhoneNumberError('');
        }
        if (formData.email.length == 0) {
            setEmailError('Email Is required');
            formDirty = true
        } else {
            setEmailError('');
        }
      
        if (parseInt(formData.address.length) == 0) {
            setAddressError('Address Is required');
            formDirty = true
        } else {
            setAddressError('');
        }
       
        if (formData.latitude.length == 0) {
            setLatitudeError('Latitude is required');
            formDirty = true
        } else {
            setLatitudeError('');
        }

        if (formData.longitude.length == 0) {console.log(13);
            setLongitudeError('longitude is required');
            formDirty = true
        } else {
            setLongitudeError('');
        }


     console.log(formDirty);
        if (formDirty) {           
            //reset();
            console.log('form data is - ', formData);
            return false;
        } else {      
            
            setPhoneNumberError("");           
            formData["name"] = formData.name;
            formData["phoneNumber"] = formData.phoneNumber;
            formData["email"]= formData.email;
            formData["address"]= formData.address;
            formData["latitude"]= formData.latitude;
            formData["longitude"] = formData.longitude;
            console.log('form data is - ', formData);
            //setFormData(formData);   
            let data=[];
            if(localStorage.getItem("contactData") != undefined){
                data=JSON.parse(localStorage.getItem("contactData"));
                console.log(data);
                const index = data.findIndex(item => item.phoneNumber === formData.phoneNumber);
                    if (index === -1) {
                    data.push(formData);
                    console.log("Entry added successfully");
                    toast.success('Contact Detail saved successfully!');
                    } else {
                    data[index] = formData;
                    console.log("Entry updated successfully");
                    toast.success('Contact Detail updated successfully!');
                    }

                localStorage.setItem("contactData", JSON.stringify(data));
               // localStorage.setItem("contactData",JSON.stringify(data)); 
            }else{
              //  localStorage.setItem("contactData",JSON.stringify([formData])); 
            }
                   
           
            reset();
            // axios.post('http://localhost:8080/api/poc/add', formData)
            //     .then(res=>{
            //      // const { navigate } = this.props
                 
            //       console.log(res);
                 
                  
            //       toast.success("Added Successfully", {
            //         position: toast.POSITION.TOP_RIGHT,
            //       });
            //       setFormData(formData);
            //     }).catch(error => { //console.log(history.push('/companyDetail'),"jjjjjjjj");
            //       console.log(error.response);
            //       toast.error(error.response, {
            //         position: toast.POSITION.TOP_RIGHT,
            //       });
            //     });
        }

        // reset();

    }
    
    const checkValidation = (field, value) => {
       
        if (field === 'name') {
            setNameError('');
        }
        if (field === 'email') {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
            if(!regex.test(value)){
                setEmailError('Enter Valid Email Id!');
                return ;
            }else{
                setEmailError('');
            }            
        }
        if (field === 'category') {
            setCategoryError('');
        }
        if (field === 'phoneNumber') {
            const regex = /^[0-9]{10}$/;
           
            if(!regex.test(value)){
                setPhoneNumberError('Enter Valid Digit Phone Number!');  
                return;
            }else{
                setPhoneNumberError(''); 
            }
            
        }
        


        if (field === 'latitude') {
            setLatitudeError('');
        }
        if (field === 'longitude') {
            setLongitudeError('');
        }
        
        if (field === 'phoneNumber') {
            //console.log("test");
            setPhoneNumberError('');
        }
        if (field === 'vendorAddress') {            
            setVendorAddressError('');
        }
        
       
        if (field === 'name') {
            setNameError('');
        }

        if (field === 'email') {
            setEmailError('');
        }
       
       
    }
    return (
        <Box m="20px">

            {/* <Header title="Main" subtitle="SIETZ TECHNOLOGIES INDIA PVT LTD." /> */}

            <Tabs value={currentTabIndex} onChange={handleTabChange}>
                <Tab style={{ fontWeight: "900" }} label='Main' />
                <Tab style={{ fontWeight: "900" }} label='Item' disabled={showTab} />

            </Tabs>

            {/* TAB 1 Contents */}
            {currentTabIndex === 0 && (
                <Box sx={{ p: 3 }}>

                   
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm={2}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    my: 2,
                                    ml: 5

                                }}
                            >
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                                
                                aria-readonly
                                autoComplete='given-name'
                                type='text'
                                fullWidth
                                label="Name"
                                sx={{ width: 300 }}
                                id='storyStatus'
                                name="name"
                                autoFocus
                                value={data['name']}
                                helperText={nameError}
                                onKeyUp={(e, value) => checkValidation('name', value)}
                                error={nameError && nameError.length > 0 ? true : false}
                                {...register('name')}
                            />
                            
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    my: 2,
                                    ml: 5

                                }}
                            >
                                Phone Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField

                                aria-readonly
                                autoComplete='given-name'
                                type='number'
                                fullWidth
                                id='storyStatus'
                                label="Phone Number"
                                name="phoneNumber"
                                value={data['phoneNumber']}
                                sx={{ width: 300 }}
                                onKeyUp={(e, value) => checkValidation('phoneNumber', e.target.value)}
                                helperText={phoneNumberError}
                                error={phoneNumberError && phoneNumberError.length > 0 ? true : false}
                                {...register('phoneNumber')}
                                autoFocus

                            />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    my: 2,
                                    ml: 5

                                }}
                            >
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField

                                aria-readonly
                                autoComplete='given-name'
                                type='email'
                                fullWidth
                                id='storyStatus'
                                label="Email"
                                value={data['email']}
                                name="email"
                                sx={{ width: 300 }}
                                onKeyUp={(e, value) => checkValidation('email', e.target.value)}
                                helperText={emailError}
                                error={emailError && emailError.length > 0 ? true : false}
                                {...register('email')}
                                autoFocus

                            />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    my: 2,
                                    ml: 5

                                }}
                            >
                                Address
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField                                
                                aria-readonly
                                autoComplete='given-name'
                                type='text'
                                fullWidth
                                label="Address"
                                value={data['address']}
                                sx={{ width: 300 }}
                                id='storyStatus'
                                name="address"
                                autoFocus
                                helperText={addresError}
                                onKeyUp={(e, value) => checkValidation('address', value)}
                                error={addresError && addresError.length > 0 ? true : false}
                                {...register('address')}
                            />
                            
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    my: 2,
                                    ml: 5

                                }}
                            >
                                Latitude
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                                
                                aria-readonly
                                autoComplete='given-name'
                                type='text'
                                fullWidth
                                label="Latitude"
                                sx={{ width: 300 }}
                                id='storyStatus'
                                value={data['latitude']}
                                autoFocus
                                readonly
                                helperText={latitudeError}
                                onKeyUp={(e, value) => checkValidation('latitude', value)}
                                error={latitudeError && latitudeError.length > 0 ? true : false}
                                {...register('latitude')}
                            />
                            
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    my: 2,
                                    ml: 5

                                }}
                            >
                                Longitude
                            </Typography>
                        </Grid>
                       

                        <Grid item xs={12} sm={4}>
                        <TextField
                                
                                aria-readonly
                                autoComplete='given-name'
                                type='text'
                                fullWidth
                                label="Longitude"
                                sx={{ width: 300 }}
                                id='storyStatus'
                                value={data['longitude']}
                                autoFocus
                                readonly
                                helperText={longitudeError}
                                onKeyUp={(e, value) => checkValidation('longitude', value)}
                                error={longitudeError && longitudeError.length > 0 ? true : false}
                                {...register('longitude')}
                            />
                            
                        </Grid>
                        





                        <Grid container spacing={2} my={5}>
                            <Grid item xs={12} sm={6} align="right">
                                <Button variant='outlined' style={{ fontSize: "15px" }} > Reset </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} align="left">
                                <Button variant="contained" style={{ fontSize: "15px" }} onClick={handleSubmit(handleFormSubmit)} color="success"> Update </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            )}

            {/* TAB 2 Contents */}
            {currentTabIndex === 1 && (
                <Box sx={{ p: 3 }}>
                    <Contacts  formdata={formData}/>
                </Box>
            )}


        </Box>
    );
};

export default Team;