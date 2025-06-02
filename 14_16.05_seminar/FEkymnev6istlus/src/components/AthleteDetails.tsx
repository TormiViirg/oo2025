import type { Athlete } from '../models/Athletes';
import { useTranslation } from 'react-i18next';

type Details = {
  athlete: Athlete;
  isVisible: boolean;
  onToggle: () => void;
};

export default function AthleteDetails({ athlete, isVisible, onToggle,}: Details) {

    const { t } = useTranslation();

    return (
        <div>
            <div>{athlete.athleteName}</div>
            <button onClick={onToggle}>
                {isVisible ? t('athleteDetails.hideDetails') : t('athleteDetails.showDetails')}
            </button>

            {isVisible && (
                <div>
                    <label> {t('athleteDetails.label.age')} </label>
                    {athlete.age ? (
                        <div>{athlete.age}</div>
                    ) : (
                        <div>{t('athleteDetails.loadingBirthdate')}</div>
                    )}
                    
                    <label>{t('athleteDetails.label.country')}</label>
                    {athlete.country ? (
                        <div>{athlete.country?.countryName}</div>
                        ) : (
                        <div>{t('athleteDetails.loadingCountry')}</div>
                    )}

                    <h3>{t('athleteDetails.heading.results')}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>{t('athleteDetails.table.results.100mRunSeconds')}</th>
                                <th>{t('athleteDetails.table.results.longJumpMeters')}</th>
                                <th>{t('athleteDetails.table.results.shotPutMeters')}</th>
                                <th>{t('athleteDetails.table.results.highJumpMeters')}</th>
                                <th>{t('athleteDetails.table.results.400mRunSeconds')}</th>
                                <th>{t('athleteDetails.table.results.110mHurdlesSeconds')}</th>
                                <th>{t('athleteDetails.table.results.discusThrowMeters')}</th>
                                <th>{t('athleteDetails.table.results.poleVaultMeters')}</th>
                                <th>{t('athleteDetails.table.results.javelinMeters')}</th>
                                <th>{t('athleteDetails.table.results.1500mRunSeconds')}</th>
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
                                <th>{t('athleteDetails.table.points.100mRunPoints')}</th>
                                <th>{t('athleteDetails.table.points.longJumpPoints')}</th>
                                <th>{t('athleteDetails.table.points.shotPutPoints')}</th>
                                <th>{t('athleteDetails.table.points.highJumpPoints')}</th>
                                <th>{t('athleteDetails.table.points.400mRunPoints')}</th>
                                <th>{t('athleteDetails.table.points.110mHurdlesPoints')}</th>
                                <th>{t('athleteDetails.table.points.discusThrowPoints')}</th>
                                <th>{t('athleteDetails.table.points.poleVaultPoints')}</th>
                                <th>{t('athleteDetails.table.points.javelinPoints')}</th>
                                <th>{t('athleteDetails.table.points.1500mRunPoints')}</th>
                                <th>{t('athleteDetails.table.points.totalScore')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{athlete.hundredMeterRun.toFixed(2)}</td>
                                <td>{athlete.longJump.toFixed(2)}</td>
                                <td>{athlete.shotPut.toFixed(2)}</td>
                                <td>{athlete.highJump.toFixed(2)}</td>
                                <td>{athlete.fourHundredMeterRun.toFixed(2)}</td>
                                <td>{athlete.hundredTenMeterHurdle.toFixed(2)}</td>
                                <td>{athlete.discusThrow.toFixed(2)}</td>
                                <td>{athlete.poleVault.toFixed(2)}</td>
                                <td>{athlete.javelin.toFixed(2)}</td>
                                <td>{athlete.thousandFiveHundredMeterRun.toFixed(2)}</td>
                                <td>{athlete.totalScore.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>                    
            )}
        </div>
    );
}