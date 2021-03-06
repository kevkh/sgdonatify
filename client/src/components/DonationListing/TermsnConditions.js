import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Box,Button, TextField } from '@mui/material'
import {useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {updateDonation} from '../../actions/donationListing.js'
import {updateDonorDonationDetails} from '../../actions/donorAuth.js'
import Alert from '@mui/material/Alert'
import { deepOrange } from '@material-ui/core/colors';
import { deepPurple } from '@material-ui/core/colors';
import Axios from 'axios'

const TermsnConditions = ({custom, id, buttonValue, donationValue}) => {

    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)
    const [textFieldValue,setTextFieldValue] = useState("")
    const [displayAlert,setDisplayAlert] = useState(false)
    const validAmount = parseInt(donationValue[1]) - parseInt(donationValue[0])
    const buttonValueInt = parseInt(buttonValue.substring(1))
    const user = JSON.parse(localStorage.getItem('profile'))
    const [validCC, setValidCC] = useState(null) 

    const handleDialogOpen = () => setOpenDialog(true)
    const handleDialogClose = () => {
        if (custom)
            setTextFieldValue("")
            setDisplayAlert(false)
        setOpenDialog(false)
    }

    const handleDialogCloseandUpdateDonation = () => {
      if (validCC){
      const type = "totalAmountCollected"
        if (custom) {
            if (!checkCustomAmount())
                setDisplayAlert(true)
            else
            {
                setDisplayAlert(false)
                const amount = textFieldValue
                dispatch(updateDonation(id, {type, amount}))
                dispatch(updateDonorDonationDetails(user.result._id, {id, amount}))
                setOpenDialog(false)
                setTextFieldValue("")
            }
        }
        else{
            const amount = buttonValueInt
            dispatch(updateDonation(id, {type, amount }))
            dispatch(updateDonorDonationDetails(user.result._id, {id, amount }))
            setOpenDialog(false)
        }
    }
    else{
      alert('Credit card number and csv must be updated')
      setOpenDialog(false)
    }
        
    }

    const handleTextField = (e) => {
        setTextFieldValue(e.target.value)
    }

    const checkCustomAmount = () => {
        const validInt = parseInt(textFieldValue)
        if (validInt >= 1 && validInt <= validAmount)
            return true
        else
            return false
    }

    const closeDisplayAlert = () => setDisplayAlert(false)

    useEffect (() => {

      const fetchDonor = async () => {

      const response = await Axios.get(`http://localhost:5000/donor/${user.result._id}`)
      setValidCC(response.data.ccNum != '' && response.data.csv != '')
      }

      fetchDonor()

    },[])

  return (
    <Box>
      {buttonValueInt <= validAmount || (custom && !(donationValue[0] == donationValue[1]))? <Button sx={{ width:"100%", height:"50px", backgroundColor: deepPurple[500] }} variant="contained" color="primary" onClick={handleDialogOpen}>Donate {buttonValue}</Button>:
      <Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" onClick={handleDialogOpen} disabled>Donate {buttonValue} </Button>}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          {"Terms & Conditions"}
        </DialogTitle>
         {custom && 
         <TextField
            label="Donation Amount"
            value={textFieldValue}
            onChange={handleTextField}
            sx={{ml:2,mr:2}}
          />}
         {displayAlert && <Alert severity="error" sx={{my:1}} onClick={closeDisplayAlert} >Invalid value. Please enter an integer value between $1 and ${validAmount}</Alert>}
        <DialogContent>
          <DialogContentText>
            The user agree to donate the amount stated and no refunds will be given once the terms and conditions is accepted by the user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseandUpdateDonation}>Agree</Button>
          <Button onClick={handleDialogClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TermsnConditions