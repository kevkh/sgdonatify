import React from 'react'
import Button from '@mui/material/Button';
import { Box, Card, Stack, Typography, Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonation } from '../../actions/donationListing.js'
import DonationRequest from './DonationRequest.js';

const ViewRequests = () => {

    const dispatch = useDispatch()
    const donationRequests = useSelector(state => state.donationListings)
    const [sortedDonationRequests, setSortedDonationRequests] = useState()

    const [buttonValue, setButtonValue] = useState("all")
    
    const compareDate = (a, b, flag) => {

        const dateA = new Date(a.dateCreated)
        const dateB = new Date(b.dateCreated)
        if (flag)
            return dateA.getTime() < dateB.getTime() ? 1 : -1
        else
            return dateA.getTime() > dateB.getTime() ? 1 : -1
    }

    const sortDonations = (sort) => {
        let tempdonationRequests = []
        setButtonValue(sort)
        switch (sort) {
            case "all":
                setSortedDonationRequests([...donationRequests])
                break
            case "pending":
                tempdonationRequests = donationRequests.filter((listing) => listing.status ==  "Pending")
                tempdonationRequests.sort((a,b)=> a.name> b.name)
                setSortedDonationRequests(tempdonationRequests)


                break
            case "approved":
                tempdonationRequests = donationRequests.filter((listing) => listing.status ==  "Approved")
                tempdonationRequests.sort((a,b)=>a.name> b.name)
                setSortedDonationRequests(tempdonationRequests)

                break
            case "rejected":
                tempdonationRequests = donationRequests.filter((listing) => listing.status ==  "Rejected")
                tempdonationRequests.sort((a,b)=>a.name> b.name)
                setSortedDonationRequests(tempdonationRequests)

                break
            default:
                setSortedDonationRequests([...donationRequests])
                setButtonValue("all")

        }
        
    }

    useEffect(() => {

        dispatch(getDonation())

    }, [])

    useEffect(() => {

        sortDonations("")

    }, [donationRequests])



    // return (
    //     <Box sx={{ ml: '15%', mr: '15%' }}>
    //         <Box >
    //             <Button variant={buttonValue === "all" ? "contained" : "outlined"} sx={{ borderRadius: 10, mr: 2, backgroundColor: (buttonValue === "all" ? "" : "white") }} onClick={() => sortDonations('all')}>ALL</Button>
    //             <Button variant={buttonValue === "pending" ? "contained" : "outlined"} sx={{ borderRadius: 10, mr: 2, backgroundColor: (buttonValue === "pending" ? "" : "white") }} onClick={() => sortDonations('pending')}>PENDING</Button>
    //             <Button variant={buttonValue === "approved" ? "contained" : "outlined"} sx={{ borderRadius: 10, mr: 2, backgroundColor: (buttonValue === "approved" ? "" : "white") }} onClick={() => sortDonations('approved')}>APPROVED</Button>
    //             <Button variant={buttonValue === "rejected" ? "contained" : "outlined"} sx={{ borderRadius: 10, backgroundColor: (buttonValue === "rejected" ? "" : "white") }} onClick={() => sortDonations('rejected')}>REJECTED</Button>
    //         </Box>
    //         <Grid container spacing={3} sx={{ mt: 2 }}>
  return (
    <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px"}}>
        <Grid  container>
          <Box sx={{display:'flex', columnGap:2 }} >
              <Button variant={buttonValue === "all" ? "contained" : "outlined"} sx={{ borderRadius: 10, backgroundColor: (buttonValue === "all"? "" : "white")}} onClick={()=>sortDonations('all')}>ALL</Button>
              <Button variant={buttonValue === "pending" ? "contained" : "outlined"} sx={{ borderRadius: 10,  backgroundColor: (buttonValue === "pending"? "" : "white")}} onClick={()=>sortDonations('pending')}>PENDING</Button>
              <Button variant={buttonValue === "approved" ? "contained" : "outlined"} sx={{ borderRadius: 10,  backgroundColor: (buttonValue === "approved"? "" : "white")}} onClick={()=>sortDonations('approved')}>APPROVED</Button>
              <Button variant={buttonValue === "rejected" ? "contained" : "outlined"} sx={{ borderRadius: 10,  backgroundColor: (buttonValue === "rejected"? "" : "white")}} onClick={()=>sortDonations('rejected')}>REJECTED</Button>
          </Box>
            <Grid container spacing={3} sx={{mt:2, mb:2}}>
                {sortedDonationRequests?.map((singleListing, index) => (<DonationRequest singleListing={singleListing} key={index} />))}
            </Grid>
        </Grid>
    </Container>
    )
}

export default ViewRequests