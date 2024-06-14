import { Box, Link } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import PropTypes from 'prop-types'

const AboutCompany = ({ selectedStockModel }) => {
    const linkTextformat = selectedStockModel.website.replace("https://www.", "")
    return (
        <>
            <Link href={selectedStockModel.website} target="_blank" rel="noopener noreferrer"
                sx={{ display: "flex", alignItems: "center", border: "grey solid 1px", padding: "3px 5px", borderRadius: "15px", width: "116px" }}>
                <PublicIcon sx={{ marginRight: "5px" }} />
                {linkTextformat}
            </Link>
            <Box dangerouslySetInnerHTML={{ __html: selectedStockModel.about }}></Box>
        </>
    )
}

AboutCompany.propTypes = {
    selectedStockModel: PropTypes.object.isRequired
}

export default AboutCompany
