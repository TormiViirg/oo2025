import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      selectCountry: "Select Country",
      chooseCountryPlaceholder: "-- Choose a Country --",
      addResults: "Add Results",
      previous: "Previous",
      next: "Next",
      pageNumber: "{{current}} / {{total}}",

      nav: {
        overview: "Overview",
        map: "Athlete birthplaces"
      },
      "admin-nav": {
        athletes: "Manage athletes"
      },

      editAthlete: {
        title: "Edit Athlete"
      },
      label: {
        name: "Name",
        age: "Age at Time of Competition",
        latitudeBirthPlace: "Latitude of Birthplace",
        longitudeBirthPlace: "Longitude of Birthplace",
        country: "Country",
        enterResults: "ENTER RESULTS",
        hundredMeterRun: "100m Run (seconds)",
        longJump: "Long Jump (meters)",
        shotPut: "Shot Put (meters)",
        highJump: "High Jump (meters)",
        fourHundredMeterRun: "400m Run (seconds)",
        hundredTenMeterHurdle: "110m Hurdle (seconds)",
        discusThrow: "Discus Throw (meters)",
        poleVault: "Pole Vault (meters)",
        javelin: "Javelin (meters)",
        thousandFiveHundredMeterRun: "1,500m Run (seconds)"
      },
      placeholder: {
        name: "Enter name",
        age: "Enter age",
        latitude: "Enter latitude",
        longitude: "Enter longitude",
        seconds: "Seconds",
        meters: "Meters"
      },
      button: {
        saveAthlete: "Save Athlete"
      },
      toast: {
        athleteDataLoaded: "Athlete data loaded",
        errorLoadingAthlete: "Error loading athlete: {{message}}",
        athleteUpdatedWithPoints: "Athlete and results updated, points recalculated",
        errorUpdatingAthlete: "Error updating athlete: {{message}}"
      },
      loading: "Loading…",

      athleteDetails: {
        showDetails: "Show details",
        hideDetails: "Hide details",
        label: {
          age: "Age:",
          country: "Country:"
        },
        loadingBirthdate: "Loading birthdate…",
        loadingCountry: "Loading country…",
        heading: {
          results: "Results",
          points: "Points"
        },
        table: {
          results: {
            "100mRunSeconds": "100m Run Seconds",
            longJumpMeters: "Long Jump (Meters)",
            shotPutMeters: "Shot Put (Meters)",
            highJumpMeters: "High Jump (Meters)",
            "400mRunSeconds": "400m Run Seconds",
            "110mHurdlesSeconds": "110m Hurdles Seconds",
            discusThrowMeters: "Discus Throw (Meters)",
            poleVaultMeters: "Pole Vault (Meters)",
            javelinMeters: "Javelin (Meters)",
            "1500mRunSeconds": "1500m Run Seconds"
          },
          points: {
            "100mRunPoints": "100m Run Points",
            longJumpPoints: "Long Jump Points",
            shotPutPoints: "Shot Put Points",
            highJumpPoints: "High Jump Points",
            "400mRunPoints": "400m Run Points",
            "110mHurdlesPoints": "110m Hurdles Points",
            discusThrowPoints: "Discus Throw Points",
            poleVaultPoints: "Pole Vault Points",
            javelinPoints: "Javelin Points",
            "1500mRunPoints": "1500m Run Points",
            totalScore: "Total Score"
          }
        }
      },

      manageAthletes: {
        fields: {
          name: "Name",
          ageAtCompetition: "Age at Time of Competition",
          latitudeBirthPlace: "Latitude of Birthplace",
          longitudeBirthPlace: "Longitude of Birthplace",
          country: "Country",
          hundredMeterRun: "100m Run (seconds)",
          longJump: "Long Jump (meters)",
          shotPut: "Shot Put (meters)",
          highJump: "High Jump (meters)",
          fourHundredMeterRun: "400m Run (seconds)",
          hundredTenMeterHurdle: "110m Hurdle (seconds)",
          discusThrow: "Discus Throw (meters)",
          poleVault: "Pole Vault (meters)",
          javelin: "Javelin (meters)",
          thousandFiveHundredMeterRun: "1500m Run (seconds)"
        },
        sections: {
          results: "Results"
        },
        buttons: {
          addAthlete: "Add Athlete"
        },
        toast: {
          success: "Athlete successfully added!",
          error: "An error occurred while adding the athlete."
        }
      }
    }
  },

  et: {
    translation: {
      selectCountry: "Vali riik",
      chooseCountryPlaceholder: "-- Vali riik --",
      addResults: "Lisa tulemused",
      previous: "Eelmine",
      next: "Järgmine",
      pageNumber: "{{current}} / {{total}}",

      nav: {
        overview: "Ülevaade",
        map: "Sportlaste kasvukohad"
      },
      "admin-nav": {
        athletes: "Halda sportlasi"
      },

      editAthlete: {
        title: "Muuda sportlast"
      },
      label: {
        name: "Nimi",
        age: "Vanus võistluse ajal",
        latitudeBirthPlace: "Sünnikoha laiuskraad",
        longitudeBirthPlace: "Sünnikoha pikkuskraad",
        country: "Riik",
        enterResults: "SISSE SISETA TULEMUSED",
        hundredMeterRun: "100 m jooks (sekundid)",
        longJump: "Pikkushüpe (meetrid)",
        shotPut: "Kettaheit (meetrid)",
        highJump: "Kõrgushüpe (meetrid)",
        fourHundredMeterRun: "400 m jooks (sekundid)",
        hundredTenMeterHurdle: "110 m tõkkejooks (sekundid)",
        discusThrow: "Kettaheit (meetrid)",
        poleVault: "Teivashüpe (meetrid)",
        javelin: "Odavise (meetrid)",
        thousandFiveHundredMeterRun: "1500 m jooks (sekundid)"
      },
      placeholder: {
        name: "Sisesta nimi",
        age: "Sisesta vanus",
        latitude: "Sisesta laiuskraad",
        longitude: "Sisesta pikkuskraad",
        seconds: "Sekundid",
        meters: "Meetrid"
      },
      button: {
        saveAthlete: "Salvesta sportlane"
      },
      toast: {
        athleteDataLoaded: "Sportlase andmed laetud",
        errorLoadingAthlete: "Viga sportlase laadimisel: {{message}}",
        athleteUpdatedWithPoints: "Sportlane ja tulemused uuendatud, punktid ümber arvutatud",
        errorUpdatingAthlete: "Viga sportlase uuendamisel: {{message}}"
      },
      loading: "Laadin…",

      athleteDetails: {
        showDetails: "Näita üksikasju",
        hideDetails: "Peida üksikasjad",
        label: {
          age: "Vanus:",
          country: "Riik:"
        },
        loadingBirthdate: "Laadin sünnikuupäeva…",
        loadingCountry: "Laadin riiki…",
        heading: {
          results: "Tulemused",
          points: "Punktid"
        },
        table: {
          results: {
            "100mRunSeconds": "100 m jooks (sek)",
            longJumpMeters: "Pikkushüpe (m)",
            shotPutMeters: "Kettaheit (m)",
            highJumpMeters: "Kõrgushüpe (m)",
            "400mRunSeconds": "400 m jooks (sek)",
            "110mHurdlesSeconds": "110 m tõkkejooks (sek)",
            discusThrowMeters: "Kettaheit (m)",
            poleVaultMeters: "Teivashüpe (m)",
            javelinMeters: "Odavise (m)",
            "1500mRunSeconds": "1500 m jooks (sek)"
          },
          points: {
            "100mRunPoints": "100 m jooks punktid",
            longJumpPoints: "Pikkushüpe punktid",
            shotPutPoints: "Kettaheit punktid",
            highJumpPoints: "Kõrgushüpe punktid",
            "400mRunPoints": "400 m jooks punktid",
            "110mHurdlesPoints": "110 m tõkkejooks punktid",
            discusThrowPoints: "Kettaheit punktid",
            poleVaultPoints: "Teivashüpe punktid",
            javelinPoints: "Odavise punktid",
            "1500mRunPoints": "1500 m jooks punktid",
            totalScore: "Kokku punktid"
          }
        }
      },

      manageAthletes: {
        fields: {
          name: "Nimi",
          ageAtCompetition: "Vanus võistluse ajal",
          latitudeBirthPlace: "Sünnikoha laiuskraad",
          longitudeBirthPlace: "Sünnikoha pikkuskraad",
          country: "Riik",
          hundredMeterRun: "100 m jooks (sekundid)",
          longJump: "Pikkushüpe (meetrid)",
          shotPut: "Kettaheit (meetrid)",
          highJump: "Kõrgushüpe (meetrid)",
          fourHundredMeterRun: "400 m jooks (sekundid)",
          hundredTenMeterHurdle: "110 m tõkkejooks (sekundid)",
          discusThrow: "Kettaheit (meetrid)",
          poleVault: "Teivashüpe (meetrid)",
          javelin: "Odavise (meetrid)",
          thousandFiveHundredMeterRun: "1500 m jooks (sekundid)"
        },
        sections: {
          results: "Tulemused"
        },
        buttons: {
          addAthlete: "Lisa sportlane"
        },
        toast: {
          success: "Sportlane edukalt lisatud!",
          error: "Tekkis viga sportlase lisamisel."
        }
      }
    }
  }
}

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "et", 
    interpolation: {
      escapeValue: false 
    }
  })

export default i18n
