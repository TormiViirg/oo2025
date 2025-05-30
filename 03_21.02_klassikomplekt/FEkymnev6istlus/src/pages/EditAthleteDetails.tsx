import { useCallback, useEffect, useRef, useState } from "react";
import type { Athlete } from "../models/Athletes";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import type { Country } from "../models/Country";
import type { Results } from "../models/Results";
import type { Points } from "../models/Points";
import type { NumericResultKey } from '../components/AddResults';
import AddResults from '../components/AddResults';

function EditAthlete() {

    const { athleteId } = useParams<{ athleteId: string }>();

    const nameRef = useRef<HTMLInputElement>(null);
    const bioRef = useRef<HTMLTextAreaElement>(null);
    const birthDateRef = useRef<HTMLInputElement>(null);
    const latRef = useRef<HTMLInputElement>(null);
    const lonRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);
    const resultRefs = useRef<Array<Partial<Record<keyof Results, HTMLInputElement>>>>([]);

    const [ countries, setCountries ] = useState<Country[]>([]);
    const [ athlete, setAthlete ] = useState<Athlete | null>(null);
    const [ results, setResults ] = useState<Results[]>([]);
    const [ points, setPoints ] = useState<Points[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/countries")
            .then(res => res.json())
            .then((json: Country[]) => setCountries(json))
    }, []);

    const reloadAthlete = useCallback(() => {
        if (!athleteId) return;
        fetch(`http://localhost:8080/everything/athletes/${athleteId}`)
            .then(res => res.json())
            .then((data: Athlete & { results: Results[]; points: Points[] }) => {
                setAthlete(data);
                setResults(data.results);
                setPoints(data.points);
        });
    },[athleteId]);

    useEffect(() => {
        reloadAthlete();
    }, [reloadAthlete]);

    const editAthlete = () => {
        if (!athleteId || !athlete) return;

        const updatedExisting = results.map((result, i) => {
            const updated = { ...result };
            (Object.keys(result) as NumericResultKey[])
                    .filter(key => key !== 'resultsId')
                    .forEach(key => {
                    const input = resultRefs.current[i]?.[key];
                    if (input) {
                        const raw = input.value;
                        updated[key] = raw === '' ? result[key] : parseFloat(raw);
                    }
                });
            return updated;
        });

        const modifiedAthlete = {
            athleteId: Number(athleteId),
            athleteName: nameRef.current?.value || athlete.athleteName,
            bio: bioRef.current?.value || athlete.bio,
            birthDate: new Date(birthDateRef.current?.value || athlete.birthDate.toISOString()),
            latitudeBirthPlace: Number(latRef.current?.value) || athlete.latitudeBirthPlace,
            longitudeBirthPlace: Number(lonRef.current?.value) || athlete.longitudeBirthPlace,
            country: { countryId: Number(countryRef.current?.value) } as Country,
            results: updatedExisting
        };

        fetch(``, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedAthlete)
        })
        .then(res => res.json())
        .then(json => {
            if (json.message && json.timestamp && json.status) {
                toast.error(json.message);
            } else {
                reloadAthlete();
                toast.success("Athlete and results updated, points recalculated");
            };
        });
    };

    if (!athlete) {
        return <p>Loading…</p>;
    }

    const numericKeys: NumericResultKey[] = results.length ? (Object.keys(results[0]) as NumericResultKey[]).filter(k => k !== 'resultsId') : [];

    return (
        <div>
            <h2>Edit Athlete</h2>
            <label>Name</label> <br />
            <input 
                ref={nameRef} 
                defaultValue={athlete?.athleteName} 
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
            {countries.map(country => (
                <option key={country.countryId} value={country.countryId}>
                    {country.countryName}
                </option>
            ))}
            </select>
            <br />

            <label> Existing Results </label> <br />
            {results.map((result, i) => ( 
                <div key={result.resultsId}>
                    {numericKeys.map(key => (
                        <div key = {key}>
                            <label> {key} </label> <br />
                            <input 
                                type="number"
                                step="any"
                                defaultValue={String(result[key])}
                                ref={el => { 
                                    if (el) resultRefs.current[i][key] = el;
                                }} 
                            /> <br />
                        </div>
                    ))}
                </div>
            ))}
            

            <h3> Points </h3>
            <ul>
                {points.map(pt => (
                <li key={pt.pointId}>
                    Total Score: {pt.totalScore} |
                    100m: {pt.hundredMeterRun},
                    LJ: {pt.longJump},
                    SP: {pt.shotPut},
                    HJ: {pt.highJump},
                    400m: {pt.fourHundredMeterRun},
                    110H: {pt.hundredTenMeterHurdle},
                    DT: {pt.discusThrow},
                    PV: {pt.poleVault}, 
                    JT: {pt.javelin}, 
                    1500m: {pt.thousandFiveHundredMeterRun}
                </li>
                ))}
            </ul>
            <button onClick={editAthlete}>Save Athlete</button>
            
            <button onClick={editAthlete}>
                Save Athlete
            </button>

            <AddResults
                athleteId={athleteId!}
                numericKeys={numericKeys}
                onResultsAdded={reloadAthlete}
            />
            
            <ToastContainer />
        </div>
    );
}

export default EditAthlete