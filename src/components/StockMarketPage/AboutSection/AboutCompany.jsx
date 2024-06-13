import { Box } from '@mui/material'
import PropTypes from 'prop-types'

const AboutCompany = ({ stockObj }) => {
    return (
        <Box>this is about section</Box>
    )
}

AboutCompany.propTypes = {
    stockObj: PropTypes.object.isRequired
}

export default AboutCompany