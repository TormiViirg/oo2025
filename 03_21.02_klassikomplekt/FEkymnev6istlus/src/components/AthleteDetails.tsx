import type { Athlete } from '../models/Athletes';

type Details = {
  athlete: Athlete;
  isVisible: boolean;
  onToggle: () => void;
};

export default function AthleteDetails({ athlete, isVisible, onToggle }: Details) {
    return (
        <div className="athlete-details">

            <div>{athlete.athleteName}</div>
            <button onClick={onToggle}>
                {isVisible ? 'Hide details' : 'Show details'}
            </button>

            {isVisible && <div className="bio">{athlete.bio}</div>}
            {isVisible && <div className="birthdate">{athlete.birthDate.toDateString()}</div>}
            {isVisible && <div className="country">{athlete.country.countryName}</div>}

            {isVisible && (
                <ul className="results">
                    {athlete.results.map((result) => (
                        <li key = {result.resultsId}>
                            <ul>
                                <li>100m Run: {result.secondsHundredMeterRun}s</li>
                                <li>Long Jump: {result.metersLongJump}m</li>
                                <li>Shot Put: {result.metersShotPut}m</li>
                                <li>High Jump: {result.metersHighJump}m</li>
                                <li>400m Run: {result.secondsFourHundredMeterRun}s</li>
                                <li>110m Hurdles: {result.secondsHundredTenMeterHurdle}s</li>
                                <li>Discus Throw: {result.metersDiscusThrow}m</li>
                                <li>Pole Vault: {result.metersPoleVault}m</li>
                                <li>Javelin: {result.metersJavelin}m</li>
                                <li>1500m Run: {result.secondsThousandFiveHundredMeterRun}s</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            
            {isVisible && (
                <ul className="points">
                    {athlete.points.map(point => (
                        <li key={point.pointId}>
                            <ul>
                                <li>100m Run Points: {point.hundredMeterRun}</li>
                                <li>Long Jump Points: {point.longJump}</li>
                                <li>Shot Put Points: {point.shotPut}</li>
                                <li>High Jump Points: {point.highJump}</li>
                                <li>400m Run Points: {point.fourHundredMeterRun}</li>
                                <li>110m Hurdles Points: {point.hundredTenMeterHurdle}</li>
                                <li>Discus Throw Points: {point.discusThrow}</li>
                                <li>Pole Vault Points: {point.poleVault}</li>
                                <li>Javelin Points: {point.javelin}</li>
                                <li>1500m Run Points: {point.thousandFiveHundredMeterRun}</li>
                                <li>Total Score: {point.totalScore}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}