import { Button } from '@mui/material'

const GreenButton = ({value, shirina, func}: any) => {
  return <>
    <Button
  variant="contained"
  sx={{
    backgroundColor: "#4caf50", // зелёный
    color: "white",
	 width: `${shirina}px`,
	 textTransform: 'none',
	 fontSize: '16px',
	 letterSpacing:'1px',
    '&:hover': {
      backgroundColor: "#43a047",
		  // чуть темнее при ховере
    }
  }}
  onClick={func}
>
 {value}
</Button>
  </>
}

export const SecondaryButton = ({value, shirina, func}: any) => {
  return <>
    <Button
  variant="contained"
  sx={{
    borderColor: "#4caf50", // зелёный
    color: "#4caf50",
	 backgroundColor: 'transparent',
	 width: `${shirina}px`,
	 textTransform: 'none',
	 fontSize: '16px',
	 letterSpacing:'1px',
    '&:hover': {
      backgroundColor: "#43a047",
		color: 'white'
		  // чуть темнее при ховере
    }
  }}
  onClick={func}
>
 {value}
</Button>
  </>
}

export default GreenButton