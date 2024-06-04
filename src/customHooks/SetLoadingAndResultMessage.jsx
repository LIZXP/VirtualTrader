import { useState } from 'react'

const SetLoadingAndResultMessage = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [resultMessageModel, setResultMessageModel] = useState({
        boolResult: false,
        resultMessage: ""
    })


    return { isLoading, setIsLoading, resultMessageModel, setResultMessageModel }
}

export default SetLoadingAndResultMessage