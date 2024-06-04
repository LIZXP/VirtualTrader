import { Alert, CircularProgress } from "@mui/material";

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

export default CircularWithResultMessage;