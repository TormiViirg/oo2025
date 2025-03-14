package ee.tormi.KT1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Conversion {

    @Entity
    public static class ConversionResult {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // Originaalne number (kümnendsüsteemi väärtus)
        private int originalNumber;

        // Teisendatud väärtus (näiteks binaarne, kaheksand või kuueteistkümnes stringina)
        private String convertedValue;

        // Teisenduse tüüp ("binary", "octal" või "hexadecimal")
        private String conversionType;

        public ConversionResult() {}

        public ConversionResult(int originalNumber, String convertedValue, String conversionType) {
            this.originalNumber = originalNumber;
            this.convertedValue = convertedValue;
            this.conversionType = conversionType;
        }

        public Long getId() {
            return id;
        }

        public int getOriginalNumber() {
            return originalNumber;
        }

        public void setOriginalNumber(int originalNumber) {
            this.originalNumber = originalNumber;
        }

        public String getConvertedValue() {
            return convertedValue;
        }

        public void setConvertedValue(String convertedValue) {
            this.convertedValue = convertedValue;
        }

        public String getConversionType() {
            return conversionType;
        }

        public void setConversionType(String conversionType) {
            this.conversionType = conversionType;
        }
    }
}
