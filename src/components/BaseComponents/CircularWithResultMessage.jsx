import { Alert, CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';

function CircularWithResultMessage({ isLoadingProp, boolResultProp, resultMessageProp }) {
    return (
        <>
            {isLoadingProp ? (
                <CircularProgress />
            ) : (
                resultMessageProp && (
                    <Alert severity={boolResultProp ? "success" : "error"}>
                        {resultMessageProp}
                    </Alert>
                )
            )}
        </>
    );
}


CircularWithResultMessage.propTypes = {
    isLoadingProp: PropTypes.bool.isRequired,
    boolResultProp: PropTypes.bool.isRequired,
    resultMessageProp: PropTypes.string
}

export default CircularWithResultMessage;