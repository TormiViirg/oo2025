import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AthleteDetails from '../components/AthleteDetails';
import type { Athlete } from '../models/Athletes';
import type { Country } from '../models/Country';

//import '../components/MainPage.css';

function MainPage() {
    
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [countryList, setCountryList] = useState<Country[]>([]);

    const [activeCountry, setActiveCountry] = useState<number>(-1);
    const [visibleDetailsId, setVisibleDetailsId] = useState<number | null>(null);
    const [athletesByPage] = useState(10);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [athleteDetailsMap, setAthleteDetailsMap] = useState<Record<number, Athlete>>({});

    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then((res) => res.json())
            .then((json) => setCountryList(json))
    }, []);

    const showByCountry = useCallback((countryId: number, currentPage: number) => {
        setActiveCountry(countryId);
        setPage(currentPage);
        fetch(`http://localhost:8080/athletes/overview?countryId=${countryId}&size=${athletesByPage}&page=${currentPage}`)
        .then(res => res.json())
        .then(json => {
            setAthletes(json.content);
            setTotalPages(json.totalPages);
        }).catch(err => {
            console.error('Error fetching athletes overview:', err);
            setAthletes([]);     
            setTotalPages(0);
        });
    }, [athletesByPage]);
    
    useEffect(() => {
        setAthleteDetailsMap({});
        if (activeCountry >= 0) {
            showByCountry(activeCountry, 0)
        }
    }, [showByCountry, activeCountry]);

    useEffect(() => {
        if( visibleDetailsId === null) {
            return;
        }

        if (athleteDetailsMap[visibleDetailsId]){
            return;
        }

        fetch(`http://localhost:8080/everything/athletes/${visibleDetailsId}`)
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then((fullAthlete: Athlete) => {
            setAthleteDetailsMap((prev) => ({
                ...prev,
                [visibleDetailsId]: fullAthlete,
            }));
        })
    }, [visibleDetailsId, athleteDetailsMap]);
            
    function updatePage(newPage: number) {
        showByCountry(activeCountry, newPage);
    }

    return (
        <div>
            <div>
                <label> Select Country: </label>
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

            <div>
                {athletes.map((athlete) => {
                    const isVisible = visibleDetailsId === athlete.athleteId;
                    const detailsToPass: Athlete =
                        athleteDetailsMap[athlete.athleteId] ?? athlete;
                    return(
                        <div key = {athlete.athleteId}>
                            <AthleteDetails
                                athlete = {detailsToPass}
                                isVisible = {isVisible}
                                onToggle = {() =>
                                    setVisibleDetailsId((current) => 
                                        current === athlete.athleteId ? null : athlete.athleteId
                                    )
                                }
                            />
                            {athlete.athleteId > 0 && (
                                <Link to = {`/admin/addAthleteResults/${athlete.athleteId}`} >
                                    <button>Add results</button>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>

            <div>
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