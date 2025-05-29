import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import type { Athlete } from '../models/Athletes';
import type { Country } from '../models/Country';


function ManageAthletes() {
    
    const nameRef = useRef<HTMLInputElement>(null);
    const bioRef = useRef<HTMLTextAreaElement>(null);
    const birthDateRef = useRef<HTMLInputElement>(null);
    const latRef = useRef<HTMLInputElement>(null);
    const lonRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);

    const [ athlete, setAthlete ] = useState<Athlete>({
        athleteId: 0,
        athleteName: "",
        bio: "",
        birthDate: new Date(),
        latitudeBirthPlace: 0,
        longitudeBirthPlace: 0,
        country: {
            countryId: 0,
            countryName: ""
        },
        results: [],
        points: []
    });
    const [ countryList, setCountryList ] = useState<Country[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then(res => res.json())
            .then(json => setCountryList(json))
    }, []);

    const addAthlete = () => {
    const newAthlete = {
        athleteName: nameRef.current?.value ?? "",
        bio: bioRef.current?.value ?? "",
        birthDate: birthDateRef.current?.value ?? "",               
        latitudeBirthPlace: Number(latRef.current?.value) || 0,
        longitudeBirthPlace: Number(lonRef.current?.value) || 0,
        country: { id: Number(countryRef.current?.value) }
    };

    fetch("http://localhost:8080/athlete", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(newAthlete),
    })
        .then(res => res.json())
        .then(json => {
        if (!json.status) {
            setAthlete({
                ...json,
                birthDate: new Date(json.birthDate)
            });
            toast.success("New Athlete successfully added!");
        } else {
            toast.error(json.message);
        }
        })
        .catch(err => toast.error(err.message));
    };

    return (
        <div>
            <table>
                <label>Name</label> <br />
                <input 
                    ref={nameRef} 
                    defaultValue={athlete.athleteName} 
                    type="text" 
                /> <br />

                <label>Bio</label> <br />
                <textarea 
                    ref={bioRef} 
                    defaultValue={athlete.bio} 
                    rows={4} 
                /> <br />

                <label>Birth Date</label> <br />
                <input 
                    ref={birthDateRef} 
                    type = "date" 
                    defaultValue={athlete.birthDate.toISOString().split('T')[0]}
                /> <br />

                <label>Latitude of BirthPlace</label> <br />
                <input 
                    ref={latRef} 
                    defaultValue = {String(athlete.latitudeBirthPlace)} 
                    type = "number" 
                    step = "any" 
                /> <br />

                <label>Longitude of BirthPlace</label> <br />
                <input 
                    ref={lonRef} 
                    defaultValue = {String(athlete.longitudeBirthPlace)} 
                    type = "number" 
                    step = "any" 
                /> <br />

                <label>Country</label> <br />
                <select ref={countryRef} defaultValue={String(athlete.country.countryId)}>
                {countryList.map(country => (
                    <option key={country.countryId} value={country.countryId}>
                        {country.countryName}
                    </option>
                ))}
                </select>
                <br />

                <button onClick={() => addAthlete()}>Add athlete</button>
            </table>

            {athlete.athleteId > 0 && (
                <Link to = {`/admin/addAthleteResults:${athlete.athleteId}`} >
                    <button>Add results</button>
                </Link>
            )}
            <ToastContainer/>
        </div>
    );
}

export default ManageAthletes;