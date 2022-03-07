import React from 'react'
import { useState, useEffect,useRef } from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AlertTitle from '@mui/material/AlertTitle'
import Filter from './Filter'
import { Box,Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination';
import Map from '../Property/Map'; // Import map
import Loader from '../Property/Loader';
import {getDonation} from '../../actions/donationListing.js'
import {useSelector,useDispatch} from 'react-redux'
import IndividualDonationListing from "../DonationListing/IndividualDonationListing"
import Container from '@mui/material/Container';
import useStyles from "./styles";

const DisplayListings = () => {

    const dispatch = useDispatch()
    const donationListings = useSelector(state => state.donationListings)
    var filteredDonationListings = []
    const [pagenatedDonationListings, setpagenatedDonationListings] = useState([])
    const [closeAlert, setCloseAlert] = useState()
    const [sort,setSort] = useState("")
    const text = localStorage.getItem('searchText')

    
    const [pagenationLength, setPagenationLength] = useState(0)
    const [page,setPage] = useState(1)


    const handleChange = (event, value) => {
       
        if (value >= 1 && value <= pagenationLength) {
            setPage(value)
            const indexOfLastPost = value * 15
            const indexOfFirstPost = indexOfLastPost - 15
            setpagenatedDonationListings(donationListings.slice(indexOfFirstPost, indexOfLastPost))
            window.scrollTo(0, 0)
        }
      }

    const compareDate = (a, b, flag) => {

        const dateA = new Date(a.dateCreated)
        const dateB = new Date(b.dateCreated)
        if (flag)
            return dateA.getTime() < dateB.getTime() ? 1 : -1
        else
            return dateA.getTime() > dateB.getTime() ? 1 : -1
    }

    const sortDonations = (sort) => {

        switch (sort) {
            case "Newest":
                filteredDonationListings.sort((a,b)=>compareDate(a,b,true))
                break
            case "Oldest":
                filteredDonationListings.sort((a,b)=>compareDate(a,b,false))
                break
            case "Highest Amount":
                filteredDonationListings.sort((a, b) => (a.totalAmountCollected < b.totalAmountCollected ? 1 : -1))
                break
            case "Lowest Amount":
                filteredDonationListings.sort((a, b) => (a.totalAmountCollected > b.totalAmountCollected ? 1 : -1))
                break
            default:
                filteredDonationListings.sort((a,b)=>compareDate(a,b,true))

        }
    }

    const filterDonations = (text) => {
      
        if (text === "")
            filteredDonationListings = [...donationListings]
        else
            filteredDonationListings = donationListings.filter((listing)=> listing.name.toLowerCase() === text)
        
    }

    useEffect (() => {

        dispatch(getDonation())

    },[])

    
    useEffect(() => {
        
        filterDonations(text)
        sortDonations(sort)

        if (filteredDonationListings.length < 1)
            setCloseAlert(true)
        else
            setPagenationLength(Math.ceil(filteredDonationListings.length / 15))
        
        var endIndex = 15
        if (filteredDonationListings.length < 15)
        endIndex = filteredDonationListings.length
        setpagenatedDonationListings(filteredDonationListings.slice(0, endIndex))
        setPage(1)

        setCloseAlert(true)

    }, [donationListings,sort,text])
    

    return (
        
        // <Box sx={{}}>  
        // <Box>
        <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px"}}>
            <Filter sort={sort} setSort={setSort} ></Filter>
        </Container>
        // </Box>
                
        //     <Box sx={{my:2}}>
        //         {pagenatedDonationListings.length >= 1 && <Pagination sx={{ paddingLeft:"45%"}} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
        //     </Box>
        //      {/* <Box sx={{ display: 'flex', flexWrap:'wrap', justifyContent:"space-evenly", flexDirection: 'row'}}> */}
        //             {pagenatedDonationListings.length < 1 && closeAlert &&
        //                 <Alert sx={{ mt: 2, maxWidth:"15%"}} severity="error" action={<IconButton size='small' onClick={() => { setCloseAlert(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>}
        //                     >
        //                     <AlertTitle>Error</AlertTitle>
        //                     <strong> No listings found. Please try again. </strong>
        //                 </Alert>}
        //         <Grid container spacing={2} rowSpacing={5} columnSpacing={15}>

        //             {/* {pagenatedDonationListings.length < 1 ? <CircularProgress/> :   */}
        //              {pagenatedDonationListings.map((singleListing, index) => (<IndividualDonationListing singleListing={singleListing} key={index}/>))}

        //         </Grid>
        //     {/* </Box> */}
        //     <Box sx={{my:5}}>
        //         {pagenatedDonationListings.length >= 1 && <Pagination sx={{ paddingLeft:"45%"}} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
        //     </Box>    
        // </Box>

    )

}

export default DisplayListings