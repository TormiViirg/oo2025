import type { Athlete } from '../models/Athletes';

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


    return (
        <div>
            <div>{athlete.athleteName}</div>
            <button onClick={onToggle}>
                {isVisible ? 'Hide details' : 'Show details'}
            </button>

            {isVisible && (
                <div>
                    <label> Age: </label>
                    {athlete.age ? (
                        <div>{athlete.age}</div>
                    ) : (
                        <div>Loading birthdate…</div>
                    )}
                    
                    <label> Country: </label>
                    {athlete.country ? (
                        <div>{athlete.country?.countryName}</div>
                        ) : (
                        <div>Loading country…</div>
                    )}

                    <h3>Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>100m Run Seconds</th>
                                <th>Long Jump Meters</th>
                                <th>Shot Put Meters</th>
                                <th>High Jump Meters</th>
                                <th>400m Run Seconds</th>
                                <th>110m Hurdles Seconds</th>
                                <th>Discus Throw Meters</th>
                                <th>Pole Vault Meters</th>
                                <th>Javelin Meters</th>
                                <th>1500m Run Seconds</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{athlete.secondsHundredMeterRun}</td>
                                <td>{athlete.metersLongJump}</td>
                                <td>{athlete.metersShotPut}</td>
                                <td>{athlete.metersHighJump}</td>
                                <td>{athlete.secondsFourHundredMeterRun}</td>
                                <td>{athlete.secondsHundredTenMeterHurdle}</td>
                                <td>{athlete.metersDiscusThrow}</td>
                                <td>{athlete.metersPoleVault}</td>
                                <td>{athlete.metersJavelin}</td>
                                <td>{athlete.secondsThousandFiveHundredMeterRun}</td>

                            </tr>
                        </tbody>
                    </table>

                    <h3>Points</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>100m Run Points</th>
                                <th>Long Jump Points</th>
                                <th>Shot Put Points</th>
                                <th>High Jump Points</th>
                                <th>400m Run Points</th>
                                <th>110m Hurdles Points</th>
                                <th>Discus Throw Points</th>
                                <th>Pole Vault Points</th>
                                <th>Javelin Points</th>
                                <th>1500m Run Points</th>
                                <th>Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{athlete.hundredMeterRun}</td>
                                <td>{athlete.longJump}</td>
                                <td>{athlete.shotPut}</td>
                                <td>{athlete.highJump}</td>
                                <td>{athlete.fourHundredMeterRun}</td>
                                <td>{athlete.hundredTenMeterHurdle}</td>
                                <td>{athlete.discusThrow}</td>
                                <td>{athlete.poleVault}</td>
                                <td>{athlete.javelin}</td>
                                <td>{athlete.thousandFiveHundredMeterRun}</td>
                                <td>{athlete.totalScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>                    
            )}
        </div>
    );
}