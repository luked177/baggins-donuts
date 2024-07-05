import { useEffect } from "react"

/* eslint-disable react/prop-types */
export const DonutInfo = ({modalDetails, setModal}) => {
    useEffect(() => {
        const closeOnOutsideClick = (e) => {
            const modalEl = document.getElementById("myModal")
            const hasClickedOutside = modalEl && !modalEl.contains(e.target)
            hasClickedOutside && setModal(false)
        }
        document.addEventListener('click', closeOnOutsideClick)
        return () => document.removeEventListener('click', closeOnOutsideClick)
    }, [setModal])

    return(
        <div className='modal'>
					<div id='myModal' className='modal-content'>
						{modalDetails.map((m, i) => (
                            <div key={i} className="modal-item">
                                <p>Awarded to: {m?.awardedTo}</p>
                                <p>Date: {m?.awardedDate}</p>
                                <p>Reason: {m?.awardedReason}</p>
                            </div>
                        ))}
					</div>
				</div>
    )
}