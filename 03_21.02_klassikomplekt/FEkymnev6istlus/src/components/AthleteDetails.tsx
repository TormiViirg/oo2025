import type { Athlete } from '../models/Athletes';
import type { Results } from "../models/Results";
import type { Points } from "../models/Points";

type Details = {
  athlete: Athlete;
  isVisible: boolean;
  onToggle: () => void;
};

export default function AthleteDetails({ 
    athlete, 
    isVisible, 
    onToggle,
}: Details) {

    const displayBirthDate = athlete.birthDate
    ? new Date(athlete.birthDate).toDateString()
    : "No birth date";

    return (
        <div>
            <div>{athlete.athleteName}</div>
            <button onClick={onToggle}>
                {isVisible ? 'Hide details' : 'Show details'}
            </button>

            {isVisible && (
                <div>
                    {athlete.bio ? (
                        <div>{athlete.bio}</div>
                    ) : (
                        <div>Loading bio…</div>
                    )}

                    {athlete.birthDate ? (
                        <div>{displayBirthDate}</div>
                    ) : (
                        <div>Loading birthdate…</div>
                    )}

                    {athlete.country ? (
                        <div>{athlete.country?.countryName}</div>
                        ) : (
                        <div>Loading country…</div>
                    )}

                    {athlete.latitudeBirthPlace ? (
                        <div>{athlete.latitudeBirthPlace}</div>
                        ) : (
                        <div>Loading latitude…</div>
                    )}

                    {athlete.longitudeBirthPlace ? (
                        <div>{athlete.longitudeBirthPlace}</div>
                        ) : (
                        <div>Loading longitude…</div>
                    )}

                    {Array.isArray(athlete.nestedResults) ? (
                        <div>
                            {athlete.nestedResults.map((sublist: Results[], subIndex: number) => (
                                <div key={subIndex} style={{ marginBottom: "0.75rem" }}>
                                    <strong>Result Group {subIndex + 1}:</strong>
                                    <ul>
                                        {sublist.map((result: Results) => (
                                            <li key={result.resultsId}>
                                                <ul>
                                                    <li>100m Run: {result.secondsHundredMeterRun}s</li>
                                                    <li>Long Jump: {result.metersLongJump}m</li>
                                                    <li>Shot Put: {result.metersShotPut}m</li>
                                                    <li>High Jump: {result.metersHighJump}m</li>
                                                    <li>400m Run: {result.secondsFourHundredMeterRun}s</li>
                                                    <li>110m Hurdles:{" "}{result.secondsHundredTenMeterHurdle}s</li>
                                                    <li>Discus Throw: {result.metersDiscusThrow}m</li>
                                                    <li>Pole Vault: {result.metersPoleVault}m</li>
                                                    <li>Javelin: {result.metersJavelin}m</li>
                                                    <li>1500m Run:{" "}{result.secondsThousandFiveHundredMeterRun}s</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                    <div>Loading nested results…</div>
                    )}

                    {Array.isArray(athlete.nestedPoints) ? (
                        <div>
                            {athlete.nestedPoints.map((sublist: Points[], subIndex: number) => (
                                <div key={subIndex} style={{ marginBottom: "0.75rem" }}>
                                    <strong>Points Group {subIndex + 1}:</strong>
                                    <ul>
                                        {sublist.map((pt: Points) => (
                                            <li key={pt.pointId}>
                                                <ul>
                                                    <li>100m Run Points: {pt.hundredMeterRun}</li>
                                                    <li>Long Jump Points: {pt.longJump}</li>
                                                    <li>Shot Put Points: {pt.shotPut}</li>
                                                    <li>High Jump Points: {pt.highJump}</li>
                                                    <li>400m Run Points: {pt.fourHundredMeterRun}</li>
                                                    <li>110m Hurdles Points: {pt.hundredTenMeterHurdle}</li>
                                                    <li>Discus Throw Points: {pt.discusThrow}</li>
                                                    <li>Pole Vault Points: {pt.poleVault}</li>
                                                    <li>Javelin Points: {pt.javelin}</li>
                                                    <li> 1500m Run Points: {pt.thousandFiveHundredMeterRun}</li>
                                                    <li>Total Score: {pt.totalScore}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        ) : (
                        <div>Loading nested points…</div>
                    )}
                </div>
            )}
        </div>
    );
}