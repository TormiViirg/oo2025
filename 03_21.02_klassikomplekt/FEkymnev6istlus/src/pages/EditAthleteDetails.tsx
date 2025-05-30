import React, { useEffect, useRef, useState } from "react";
import type { Athlete } from "../models/Athletes";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import type { Country } from "../models/Country";
import type { Results } from "../models/Results";
import type { Points } from "../models/Points";

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

    type NumericResultKey = { [K in keyof Results]: Results[K] extends number ? K : never }[keyof Results];

    useEffect(() => {
        fetch("http://localhost:8080/countries")
            .then(res => res.json())
            .then((json: Country[]) => setCountries(json))
    }, []);

    useEffect(() => {
        if (!athleteId) return;
        fetch(`http://localhost:8080/everything/athletes/${athleteId}`)
            .then(res => res.json())
            .then((json: Athlete & { results: Results[]; points: Points[] }) => {
                setAthlete(json);
                setResults(json.results);
                setPoints(json.points);
            })
    }, [athleteId]);

    const editAthlete = () => {
        if (!athleteId || !athlete) return;

        const updatedResults = results.map((result, i) => {
            const updatedResult = { ...result } as Results;
            const keys = Object.keys(result) as NumericResultKey[];
            const numericKeys = keys.filter( k =>
                k !== 'resultsId'
            );
            numericKeys.forEach((key) => {
                const input = resultRefs.current[i]?.[key];
                if (!input) return;                                                         
                const raw = input.value;
                updatedResult[key] = raw ===""
                    ? result[key]
                    : parseFloat(raw)
            });
            return updatedResult; 
        });

        const modifiedAthlete = {
            athleteId: Number(athleteId),
            athleteName: nameRef.current?.value || athlete.athleteName,
            bio: bioRef.current?.value || athlete.bio,
            birthDate: new Date(birthDateRef.current?.value || athlete.birthDate.toISOString()),
            latitudeBirthPlace: Number(latRef.current?.value) || athlete.latitudeBirthPlace,
            longitudeBirthPlace: Number(lonRef.current?.value) || athlete.longitudeBirthPlace,
            country: { countryId: Number(countryRef.current?.value) } as Country,
            results: updatedResults
        };

        fetch(`http://localhost:8080/results/batch/${athleteId}`, {
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
                fetch(`http://localhost:8080/everything/athletes/${athleteId}`)
                .then(res => res.json())
                .then((pts: Points[]) => {
                    setPoints(pts);
                    toast.success('Athlete and results updated, points recalculated');
                })
            }
        })
    }

    if (!athlete) {
        return <p>Loading…</p>;
    }

    return (
        <div>
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
                ref={birthDateRef} type = "date" 
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

            <label> Results </label> <br />
            {results.map((result, i) => {

                if (!resultRefs.current[i]) {
                    resultRefs.current[i] = {};
                }

                const keys = Object.keys(result) as NumericResultKey[];
                const numericKeys = keys.filter( k =>
                    k !== 'resultsId'
                );

                return (
                    <div key={result.resultsId ?? i}>
                        {numericKeys.map(key => (
                            <div key = {key}>
                                <label> {key} </label> <br />
                                <input 
                                    type = "number"
                                    step = "any"
                                    defaultValue = {String(result[key])}
                                    ref = {el =>
                                        { if (el) resultRefs.current[i][key] = el; }
                                    }
                                /> <br />
                            </div>
                        ))}
                    </div>
                );
            })}

            <label> Points</label>
            <ul>
                {points.map(points => (
                    <React.Fragment key = {points.pointId}>
                        <li key = {points.pointId}> {points.hundredMeterRun} </li>
                        <li key = {points.pointId}> {points.longJump} </li>
                        <li key = {points.pointId}> {points.shotPut} </li>
                        <li key = {points.pointId}> {points.highJump} </li>
                        <li key = {points.pointId}> {points.fourHundredMeterRun} </li>
                        <li key = {points.pointId}> {points.hundredTenMeterHurdle} </li>
                        <li key = {points.pointId}> {points.discusThrow} </li>
                        <li key = {points.pointId}> {points.poleVault} </li>
                        <li key = {points.pointId}> {points.javelin} </li>
                        <li key = {points.pointId}> {points.thousandFiveHundredMeterRun} </li>
                        <li key = {points.pointId}> {points.totalScore} </li>
                    </React.Fragment>
                ))}
            </ul>
            <button onClick={editAthlete}>Save Athlete</button>
            <ToastContainer />
        </div>
    )
}

export default EditAthlete