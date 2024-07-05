import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import './suggestDonutModal.css'

export const SuggestDonutModal = () => {
    const navigate = useNavigate()
    const [suggestion, setSuggestion] = useState({
        userName: "",
        nominee: "",
        reason: ""
    })
    const [showError, setShowError] = useState(false)

    const suggestMutation = useMutation({
        mutationFn: async () => {
            // const url = 'http://localhost:7199/api/SuggestADonut';
            const url = "https://bagginsdonutsapi-fa.azurewebsites.net/api/SuggestADonut?code=316AajT8wIoy5TjKyjOEeq4Up_VOyfvug1fRcfma5MDwAzFuPvHVMw=="
            await axios.post(url, {
                "UsersName": suggestion.userName,
                "Nominee": suggestion.nominee,
                "Reason": suggestion.reason
            })
        }
    })
    
    useEffect(() => {
        const closeOnOutsideClick = (e) => {
            const modalEl = document.getElementById("suggestDonutModal")
            const hasClickedOutside = modalEl && !modalEl.contains(e.target)
            hasClickedOutside && navigate({search: createSearchParams({}).toString()})
        }
        document.addEventListener('click', closeOnOutsideClick)
        return () => document.removeEventListener('click', closeOnOutsideClick)
    }, [navigate])
    return(
        <div className='modal'>
					<div className='modal-content' id='suggestDonutModal'>
						<h1 className="suggestDonutTitle">Suggest a 🍩</h1>
                        <div className="suggestItem">
						<p>Your name:</p>
                        <input type="text" value={suggestion.userName} onChange={(e) => setSuggestion(prev => ({...prev, userName: e.target.value}))} />
                        </div>
                        <div className="suggestItem">
						<p>Who are you nominating:</p>
                        <input type="text" value={suggestion.nominee} onChange={(e) => setSuggestion(prev => ({...prev, nominee: e.target.value}))} />
                        </div>
                        <div className="suggestItem">
						<p>What are they nominated for:</p>
                        <input type="text" value={suggestion.reason} onChange={(e) => setSuggestion(prev => ({...prev, reason: e.target.value}))} />
                        </div>
                        <button className="suggestButton" onClick={async () => {
                            const isValid = !Object.values(suggestion).some(s => s.trim().length === 0)
                            setShowError(!isValid)
                            if(isValid){
                                await suggestMutation.mutate()
                                setSuggestion({
                                    nominee: "",
                                    reason: "",
                                    userName: ""
                                })

                            }
                            }}>Submit suggestion</button>
                            {showError && <p style={{color: 'red'}}>All inputs require values.</p>}
                            {suggestMutation.isSuccess && <p style={{color: 'green'}}>Suggestion submitted!</p>}
					</div>
				</div>
    )
}