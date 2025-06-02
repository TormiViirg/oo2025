import { useCallback, useEffect, useState } from "react";
import type { Athlete } from "../models/Athletes";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import type { Country } from "../models/Country";

function EditAthlete() {

    const { athleteId } = useParams<{ athleteId: string }>();

    const [athlete, setAthlete] = useState<Athlete | null>(null);

    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(0);
    const [latitudeBirthPlace, setLatitudeBirthPlace] = useState<number>(0);
    const [longitudeBirthPlace, setLongitudeBirthPlace] = useState<number>(0);
    const [selectedCountryId, setSelectedCountryId] = useState<number>(0);

    const [secondsHundredMeterRun, setSecondsHundredMeterRun] = useState<number>(0);
    const [metersLongJump, setMetersLongJump] = useState<number>(0);
    const [metersShotPut, setMetersShotPut] = useState<number>(0);
    const [metersHighJump, setMetersHighJump] = useState<number>(0);
    const [secondsFourHundredMeterRun, setSecondsFourHundredMeterRun] = useState<number>(0);
    const [secondsHundredTenMeterHurdle, setSecondsHundredTenMeterHurdle] = useState<number>(0);
    const [metersDiscusThrow, setMetersDiscusThrow] = useState<number>(0);
    const [metersPoleVault, setMetersPoleVault] = useState<number>(0);
    const [metersJavelin, setMetersJavelin] = useState<number>(0);
    const [secondsThousandFiveHundredMeterRun, setSecondsThousandFiveHundredMeterRun] = useState<number>(0);

    const [countryList, setCountryList] = useState<Country[]>([]);


    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then((res) => res.json())
            .then((json) => setCountryList(json))
    }, []);


    const reloadAthlete = useCallback(() => {
        if (!athleteId) return;
        fetch(`http://localhost:8080/everything/athletes/${athleteId}`)
        .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch athlete (status ${res.status})`);
            return res.json();
        })
        .then((json: Athlete) => {
            setAthlete(json);

            setName(json.athleteName);
            setAge(json.age);
            setLatitudeBirthPlace(json.latitudeBirthPlace);
            setLongitudeBirthPlace(json.longitudeBirthPlace);
            setSelectedCountryId(json.country.countryId);

            setSecondsHundredMeterRun(json.secondsHundredMeterRun);
            setMetersLongJump(json.metersLongJump);
            setMetersShotPut(json.metersShotPut);
            setMetersHighJump(json.metersHighJump);
            setSecondsFourHundredMeterRun(json.secondsFourHundredMeterRun);
            setSecondsHundredTenMeterHurdle(json.secondsHundredTenMeterHurdle);
            setMetersDiscusThrow(json.metersDiscusThrow);
            setMetersPoleVault(json.metersPoleVault);
            setMetersJavelin(json.metersJavelin);
            setSecondsThousandFiveHundredMeterRun(json.secondsThousandFiveHundredMeterRun);

            toast.success("Athlete data loaded");
        })
        .catch((err) => {
            toast.error("Error loading athlete: " + err.message);
        })
    }, [athleteId]);

    useEffect(() => {
        reloadAthlete();
    }, [reloadAthlete]);

    const editAthlete = () => {
        if (!athleteId || !athlete) return;

        const modifiedAthlete = {
            athleteId: Number(athleteId),
            athleteName: name,
            age: Number(age),
            latitudeBirthPlace: Number(latitudeBirthPlace),
            longitudeBirthPlace: Number(longitudeBirthPlace),
            country: { countryId: Number(selectedCountryId) },

            secondsHundredMeterRun: Number(secondsHundredMeterRun),
            metersLongJump: Number(metersLongJump),
            metersShotPut: Number(metersShotPut),
            metersHighJump: Number(metersHighJump),
            secondsFourHundredMeterRun: Number(secondsFourHundredMeterRun),
            secondsHundredTenMeterHurdle: Number(secondsHundredTenMeterHurdle),
            metersDiscusThrow: Number(metersDiscusThrow),
            metersPoleVault: Number(metersPoleVault),
            metersJavelin: Number(metersJavelin),
            secondsThousandFiveHundredMeterRun: Number(secondsThousandFiveHundredMeterRun),
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
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                /> <br />

                <label>Age at Time of Competition</label> <br />
                <input
                    value={age} 
                    type="number"
                    onChange={(e) => setAge(Number(e.target.value))}
                /> <br />

                <label>Latitude of BirthPlace</label> <br />
                <input 
                    value={latitudeBirthPlace} 
                    onChange={(e) => setLatitudeBirthPlace(Number(e.target.value))}
                    type = "number" 
                    step="any"
                /> <br />

                <label>Longitude of BirthPlace</label> <br />
                <input 
                    value={longitudeBirthPlace} 
                    onChange={(e) => setLongitudeBirthPlace(Number(e.target.value))}
                    type = "number" 
                    step="any"
                /> <br />

                <label>Country</label> <br />
                    <select 
                        value={selectedCountryId} 
                        onChange={(e) => setSelectedCountryId(Number(e.target.value))}
                    >
                        {countryList.map((country) => (
                            <option key={country.countryId} value={country.countryId}>
                                {country.countryName}
                            </option>
                        ))}
                    </select>
                    <br />

                <label>ENTER RESULTS</label> <br />
                    <label>hundredMeterRun</label> <br />
                    <input
                        value={secondsHundredMeterRun} 
                        type="number"
                        onChange={(e) => setSecondsHundredMeterRun(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>longJump</label> <br />
                    <input
                        value={metersLongJump} 
                        type="number"
                        onChange={(e) => setMetersLongJump(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>shotPut</label> <br />
                    <input
                        value={metersShotPut} 
                        type="number"
                        onChange={(e) => setMetersShotPut(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>highJump</label> <br />
                    <input
                        value={metersHighJump} 
                        type="number"
                        onChange={(e) => setMetersHighJump(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>fourHundredMeterRun</label> <br />
                    <input
                        value={secondsFourHundredMeterRun} 
                        type="number"
                        onChange={(e) => setSecondsFourHundredMeterRun(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>hundredTenMeterHurdle</label> <br />
                    <input
                        value={secondsHundredTenMeterHurdle} 
                        type="number"
                        onChange={(e) => setSecondsHundredTenMeterHurdle(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>discusThrow</label> <br />
                    <input
                        value={metersDiscusThrow} 
                        type="number"
                        onChange={(e) => setMetersDiscusThrow(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>poleVault</label> <br />
                    <input
                        value={metersPoleVault} 
                        type="number"
                        onChange={(e) => setMetersPoleVault(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>javelin</label> <br />
                    <input
                        value={metersJavelin} 
                        type="number"
                        onChange={(e) => setMetersJavelin(Number(e.target.value))}
                        step="any"
                    /> <br />

                    <label>thousandFiveHundredMeterRun</label> <br />
                    <input
                        value={secondsThousandFiveHundredMeterRun} 
                        type="number"
                        onChange={(e) => setSecondsThousandFiveHundredMeterRun(Number(e.target.value))}
                        step="any"
                    /> <br />
                
            
            <button onClick={editAthlete}>
                Save Athlete
            </button>
            <ToastContainer />
        </div>
    );
}

export default EditAthlete