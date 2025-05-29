import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AthleteDetails from '../components/AthleteDetails';
import type { Athlete } from '../models/Athletes';
import type { Country } from '../models/Country';
import '../components/MainPage.css';

function MainPage() {
    
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [countryList, setCountryList] = useState<Country[]>([]);

    const [activeCountry, setActiveCountry] = useState<number>(-1);
    const [visibleDetailsId, setVisibleDetailsId] = useState<number | null>(null);
    
    const [athletesByPage] = useState(10);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then(res => res.json())
            .then(json => setCountryList(json))
    }, []);

    const showByCountry = useCallback((countryId: number, currentPage: number) => {
        setActiveCountry(countryId);
        setPage(currentPage);
        fetch("http://localhost:8080/athletes/overview/" + countryId + 
          "&size=" + athletesByPage +
          "&page=" + currentPage
        )
        .then(res => res.json()) 
        .then(json => {
            setAthletes(json.content);
            setTotalPages(json.totalPages);
        }) 
    }, [athletesByPage]);
    
    useEffect(() => {
        if (activeCountry >= 0){
            showByCountry(activeCountry, 0)
        }
    }, [showByCountry, activeCountry]);

    function updatePage(newPage: number) {
        showByCountry(activeCountry, newPage);
    }

    return (
        <div>
            <div>
                <label htmlFor="country-dropdown"> Select Country: </label>
                <select 
                    id="country-dropdown"
                    value={activeCountry}
                    onChange={e => showByCountry(Number(e.target.value), 0)}
                >
                    <option value = {-1} disabled>
                        -- Choose a Country --
                    </option>
                    {countryList.map(country => (
                        <option key = {country.countryId} value={country.countryId}>
                            {country.countryName}
                        </option>
                    ))}
                </select>
            </div>

            <div className='resultpointlist'>
                {athletes.map(athlete => (
                    <div key = {athlete.athleteId} className="athlete-entry">
                        <AthleteDetails
                            athlete = {athlete}
                            isVisible = {visibleDetailsId === athlete.athleteId}
                            onToggle = {() =>
                                setVisibleDetailsId(current => 
                                    current === athlete.athleteId ? null : athlete.athleteId
                                )
                            }
                        />
                        {athlete.athleteId > 0 && (
                            <Link to = {`/admin/addAthleteResults:${athlete.athleteId}`} >
                                <button>Add results</button>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className='movement'>
                <button disabled = { page === 0 } onClick={() => updatePage( page - 1 )}>
                    Previous 
                </button>
                <span>{page + 1}</span>
                <button disabled={page >= totalPages - 1} onClick={() => updatePage(page + 1)}>
                    Next 
                </button>
            </div>
            
        </div>
    )
}
export default MainPage;