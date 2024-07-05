import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import './suggestions.css'
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);

export const Suggestions = () => {
    const { data: suggestions, isLoading: isLoadingSuggestions } = useQuery({
		queryKey: ["Suggestions"],
		queryFn: async () => {
			const res = await axios.get("https://bagginsdonutsapi-fa.azurewebsites.net/api/GetLastWeeksSuggestions?code=316AajT8wIoy5TjKyjOEeq4Up_VOyfvug1fRcfma5MDwAzFuPvHVMw==");
			// const res = await axios.get("http://localhost:7199/api/GetLastWeeksSuggestions");
			return res.data;
		},
	});

    if(isLoadingSuggestions) return <p>Loading...</p>
    if(suggestions.length === 0) return <p>There are no suggestions for this week! Suggest one below</p>
    return(
        <div className="suggestionContainer">
        {suggestions.map(s => (
            <div key={s.id} className="suggestionCard">
                <p>Nominated by {s.userName}</p>
                <p>Nominee {s.nominee}</p>
                <p>Reason {s.reason}</p>
                <p>Date {dayjs(s.suggestionDate).format('dddd Do MMMM, h:mma')}</p>
            </div>
        ))}
        </div>
    )
}