import { useCallback, useEffect, useRef, useState } from "react";
import type { Athlete } from "../models/Athletes";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import type { Country } from "../models/Country";
import type { Results } from "../models/Results";
import type { Points } from "../models/Points";
import type { NumericResultKey } from '../components/AddResults';
import AddResults from '../components/AddResults';

export const ALL_NUMERIC_RESULT_KEYS: NumericResultKey[] = [
    "secondsHundredMeterRun",
    "metersLongJump",
    "metersShotPut",
    "metersHighJump",
    "secondsFourHundredMeterRun",
    "secondsHundredTenMeterHurdle",
    "metersDiscusThrow",
    "metersPoleVault",
    "metersJavelin",
    "secondsThousandFiveHundredMeterRun",
];

function EditAthlete() {

    const { athleteId } = useParams<{ athleteId: string }>();

    const nameRef = useRef<HTMLInputElement>(null);
    const bioRef = useRef<HTMLTextAreaElement>(null);
    const birthDateRef = useRef<HTMLInputElement>(null);
    const latRef = useRef<HTMLInputElement>(null);
    const lonRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);

    const resultRefs = useRef<Array<Array<Partial<Record<keyof Results, HTMLInputElement>>>>>([]);

    const numericKeys = ALL_NUMERIC_RESULT_KEYS;

    const [ countries, setCountries ] = useState<Country[]>([]);
    const [ athlete, setAthlete ] = useState<Athlete | null>(null);
    const [ nestedResults, setNestedResults ] = useState<Results[][]>([]);
    const [ nestedPoints, setNestedPoints ] = useState<Points[][]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/countries")
            .then(res => res.json())
            .then((json: Country[]) => setCountries(json))
    }, []);

    const reloadAthlete = useCallback(() => {
        if (!athleteId) return;
        fetch(`http://localhost:8080/everything/athletes/${athleteId}`)
        .then((res) => res.json())
        .then(
            (data: Athlete & {
                nestedResults: Results[][];
                nestedPoints: Points[][];
            }) => {
                setAthlete(data);
                setNestedResults(data.nestedResults ?? []);
                setNestedPoints(data.nestedPoints ?? []);
                resultRefs.current = (
                    data.nestedResults ?? []
                ).map((innerArr) =>
                    innerArr.map(() => ({} as Record<keyof Results, HTMLInputElement>))
                );
            }
        );
    }, [athleteId]);

    useEffect(() => {
        reloadAthlete();
    }, [reloadAthlete]);

    const editAthlete = () => {
        if (!athleteId || !athlete) return;

        const updatedNested: Results[][] = nestedResults.map((innerArr, i) =>
            innerArr.map((base, j) => {
                const updated: Results = { ...base };
                numericKeys.forEach(key => {
                    const el = resultRefs.current[i]?.[j]?.[key];
                    if (el) {
                        const raw = el.value;
                        updated[key] = raw === "" ? base[key] : parseFloat(raw);
                    }
                });
                return updated;
            })
        );

        const rawName = nameRef.current?.value ?? "";
        const rawBio = bioRef.current?.value ?? "";
        const rawBirth = birthDateRef.current?.value ?? "";
        const rawLat = latRef.current?.value;
        const rawLon = lonRef.current?.value;
        const rawCountryId = countryRef.current?.value;

        const latitude = rawLat !== "" ? Number(rawLat) : athlete.latitudeBirthPlace ?? 0;
        const longitude = rawLon !== "" ? Number(rawLon) : athlete.longitudeBirthPlace ?? 0;


        const modifiedAthlete = {
            athleteId: Number(athleteId),
            athleteName: rawName !== "" ? rawName : athlete.athleteName,
            bio: rawBio !== "" ? rawBio : athlete.bio ?? "",
            birthDate: rawBirth !== "" ? rawBirth : athlete.birthDate,
            latitudeBirthPlace: latitude,
            longitudeBirthPlace: longitude,
            country: { countryId: Number(rawCountryId) } as Country,
            nestedResults: updatedNested
        };

        fetch(`http://localhost:8080/editResults/${athleteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedAthlete)
        })
        .then((res) => res.json())
        .then((json) => {
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

    return (
        <div>
            <h2>Edit Athlete</h2>
            <label>Name</label> <br />
            <input 
                ref={nameRef} 
                defaultValue={athlete?.athleteName} 
                type="text" 
            /> {" "} <br />

            <label>Bio</label> <br />
            <textarea 
                ref={bioRef} 
                defaultValue={athlete.bio ?? ""} 
                rows={4} 
            /> {" "} <br />

            <label>Birth Date</label> <br />
            <input 
                ref={birthDateRef} 
                type = "date" 
                defaultValue={
                    athlete.birthDate
                } 
            />{" "} <br />

            <label>Latitude of BirthPlace</label> <br />
            <input 
                ref={latRef}  
                type = "number" 
                step = "any"
                defaultValue={
                    athlete.latitudeBirthPlace != null
                        ? String(athlete.latitudeBirthPlace)
                        : ""
                } 
            /> {" "} <br />

            <label>Longitude of BirthPlace</label> <br />
            <input 
                ref={lonRef}  
                type = "number" 
                step = "any" 
                defaultValue = {
                    athlete.longitudeBirthPlace != null
                        ? String(athlete.longitudeBirthPlace)
                        : ""
                }
            /> <br />

            <label>Country</label> <br />
            <select 
                ref={countryRef} 
                defaultValue={
                    athlete.country ? String(athlete.country.countryId) : ""
                }
            >
            <option value="" disabled>
                - Select country -
            </option>

            {countries.map(country => (
                <option key={country.countryId} value={country.countryId}>
                    {country.countryName}
                </option>
            ))}
            </select>
            <br />

            <label> Existing Results </label> <br />
            <label>Existing Nested Results</label> <br />
            {nestedResults.map((innerArray, i) => (
                <div key={`set-${i}`} style={{ marginBottom: "1rem" }}>
                <strong>Result Set #{i + 1}</strong>
                    {innerArray.map((result, j) => (
                        <div
                            key={result.resultsId}
                            style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                        >
                            <em>Result #{j + 1} (ID: {result.resultsId})</em>
                            {numericKeys.map((key) => (
                                <div key={key}>
                                    <label htmlFor={`r-${i}-${j}-${key}`}>{key}</label>
                                    <br />
                                    <input
                                        id={`r-${i}-${j}-${key}`}
                                        type="number"
                                        step="any"
                                        defaultValue={String(result[key])}
                                        ref={el => {
                                            if (!resultRefs.current[i]) {
                                                resultRefs.current[i] = [];
                                            }
                                            
                                            if (!resultRefs.current[i][j]) {
                                                resultRefs.current[i][j] = {} as Partial<Record<keyof Results, HTMLInputElement>>;
                                            }
                                            if (el) {
                                                resultRefs.current[i][j][key] = el;
                                            }
                                        }}
                                    />
                                    <br />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            

            <h3> Points </h3>
            <ul>
                {nestedPoints.map((innerPts, i) => (
                    <div key={`pts-group-${i}`} style={{ marginBottom: "1rem" }}>
                        <strong>Points Group #{i + 1}</strong>
                        <ul style={{ marginLeft: "1rem" }}>
                            {innerPts.map((pt) => (
                                <li key={pt.pointId}>
                                    Total: {pt.totalScore}, 
                                    100m: {pt.hundredMeterRun}, 
                                    LJ:{" "} {pt.longJump}, 
                                    SP: {pt.shotPut}, 
                                    HJ: {pt.highJump}, 
                                    400m:{" "} {pt.fourHundredMeterRun}, 
                                    110H: {pt.hundredTenMeterHurdle}, 
                                    DT:{" "} {pt.discusThrow}, 
                                    PV: {pt.poleVault}, 
                                    JT: {pt.javelin}, 
                                    1500m:{" "} {pt.thousandFiveHundredMeterRun}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>
            
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