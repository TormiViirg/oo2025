import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import type { Athlete } from '../models/Athletes';
import type { Country } from '../models/Country';
import { useTranslation } from 'react-i18next';

function ManageAthletes() {
    const { t } = useTranslation();

    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const latRef = useRef<HTMLInputElement>(null);
    const lonRef = useRef<HTMLInputElement>(null);
    
    const secondsHundredMeterRunRef = useRef<HTMLInputElement>(null);
    const metersLongJumpRef = useRef<HTMLInputElement>(null);
    const metersShotPutRef = useRef<HTMLInputElement>(null);
    const metersHighJumpRef = useRef<HTMLInputElement>(null);
    const secondsFourHundredMeterRunRef = useRef<HTMLInputElement>(null);
    const secondsHundredTenMeterHurdleRef = useRef<HTMLInputElement>(null);
    const metersDiscusThrowRef = useRef<HTMLInputElement>(null);
    const metersPoleVaultRef = useRef<HTMLInputElement>(null);
    const metersJavelinRef = useRef<HTMLInputElement>(null);
    const secondsThousandFiveHundredMeterRunRef = useRef<HTMLInputElement>(null);
    

    const countryRef = useRef<HTMLSelectElement>(null);

    const [ athlete, setAthlete ] = useState<Athlete>();
    
    const [ countryList, setCountryList ] = useState<Country[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then((res) => res.json())
            .then((json) => setCountryList(json))
    }, []);

    const addAthlete = () => {
        const newAthlete = {
            athleteName: nameRef.current?.value,
            age: Number(ageRef.current?.value),               
            latitudeBirthPlace: Number(latRef.current?.value),
            longitudeBirthPlace: Number(lonRef.current?.value),
            country: { countryId: Number(countryRef.current?.value) },

            secondsHundredMeterRun: Number(secondsHundredMeterRunRef.current?.value),
            metersLongJump: Number(metersLongJumpRef.current?.value),
            metersShotPut: Number(metersShotPutRef.current?.value),
            metersHighJump: Number(metersHighJumpRef.current?.value),
            secondsFourHundredMeterRun: Number(secondsFourHundredMeterRunRef.current?.value),
            secondsHundredTenMeterHurdle: Number(secondsHundredTenMeterHurdleRef.current?.value),
            metersDiscusThrow: Number(metersDiscusThrowRef.current?.value),
            metersPoleVault: Number(metersPoleVaultRef.current?.value),
            metersJavelin: Number(metersJavelinRef.current?.value),
            secondsThousandFiveHundredMeterRun: Number(secondsThousandFiveHundredMeterRunRef.current?.value)
        };

        fetch("http://localhost:8080/athlete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAthlete),
        })
        .then(res => res.json())
        .then(json => {
            if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                setAthlete(json);
                toast.success(t("Athlete sucessfully added"));
            } else {
                toast.error(json.message);
            }
        })
    };

    return (
        <div>
            <form
                onSubmit={addAthlete}
                style={{
                    display: "grid",
                    gridTemplateColumns: "max-content 1fr",
                    gap: "0.5rem 1rem",
                    alignItems: "center"
                }}
            >
                <label>{t('manageAthletes.fields.name')}</label> <br />
                <input 
                    ref={nameRef} 
                    defaultValue={athlete?.athleteName} 
                    type="text" 
                /> <br />

                <label>{t('manageAthletes.fields.ageAtCompetition')}</label> <br />
                <input
                    ref={ageRef} 
                    type="number"
                    defaultValue={athlete?.age}
                /> <br />

                <label>{t('manageAthletes.fields.latitudeBirthPlace')}</label> <br />
                <input 
                    ref={latRef} 
                    defaultValue = {athlete?.latitudeBirthPlace} 
                    type = "number" 
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.longitudeBirthPlace')}</label> <br />
                <input 
                    ref={lonRef} 
                    defaultValue = {athlete?.longitudeBirthPlace} 
                    type = "number" 
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.country')}</label> <br />
                <select 
                    ref={countryRef} 
                    defaultValue={athlete?.country.countryName}
                >
                    {countryList.map((country) => (
                        <option key={country.countryId} value={country.countryId}>
                            {country.countryName}
                        </option>
                    ))}
                </select>
                <br />
                
                <label>{t('manageAthletes.sections.results')}</label> <br />
                <label>{t('manageAthletes.fields.hundredMeterRun')}</label> <br />
                <input
                    ref={secondsHundredMeterRunRef} 
                    type="number"
                    defaultValue={athlete?.secondsHundredMeterRun}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.longJump')}</label> <br />
                <input
                    ref={metersLongJumpRef} 
                    type="number"
                    defaultValue={athlete?.metersLongJump}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.shotPut')}</label> <br />
                <input
                    ref={metersShotPutRef} 
                    type="number"
                    defaultValue={athlete?.metersShotPut}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.highJump')}</label> <br />
                <input
                    ref={metersHighJumpRef} 
                    type="number"
                    defaultValue={athlete?.metersHighJump}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.fourHundredMeterRun')}</label> <br />
                <input
                    ref={secondsFourHundredMeterRunRef} 
                    type="number"
                    defaultValue={athlete?.secondsFourHundredMeterRun}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.hundredTenMeterHurdle')}</label> <br />
                <input
                    ref={secondsHundredTenMeterHurdleRef} 
                    type="number"
                    defaultValue={athlete?.secondsHundredTenMeterHurdle}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.discusThrow')}</label> <br />
                <input
                    ref={metersDiscusThrowRef} 
                    type="number"
                    defaultValue={athlete?.metersDiscusThrow}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.poleVault')}</label> <br />
                <input
                    ref={metersPoleVaultRef} 
                    type="number"
                    defaultValue={athlete?.metersPoleVault}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.javelin')}</label> <br />
                <input
                    ref={metersJavelinRef} 
                    type="number"
                    defaultValue={athlete?.metersJavelin}
                    step="any"
                /> <br />

                <label>{t('manageAthletes.fields.thousandFiveHundredMeterRun')}</label> <br />
                <input
                    ref={secondsThousandFiveHundredMeterRunRef} 
                    type="number"
                    defaultValue={athlete?.secondsThousandFiveHundredMeterRun}
                    step="any"
                /> <br />


                <button>{t('manageAthletes.buttons.addAthlete')}</button>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default ManageAthletes;